const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'gigshield-secret-key-change-in-production';

// Rate limiting - prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { success: false, message: 'Too many attempts. Please try again later.' }
});

const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 OTP requests per hour
  message: { success: false, message: 'Too many OTP requests. Please try again later.' }
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gigshield';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// OTP Storage (in production, use Redis)
const otpStore = new Map();

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  platform: { type: String, required: true },
  plan: { type: String, enum: ['basic', 'standard', 'premium'], default: 'standard' },
  coverage: { type: Number, default: 2000 },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  weeklyPremium: { type: Number, default: 20 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const ClaimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trigger: { type: String, required: true },
  condition: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'paid', 'rejected'], default: 'pending' },
  location: {
    lat: Number,
    lng: Number,
    city: String
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['payment', 'payout'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'completed' },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Claim = mongoose.model('Claim', ClaimSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Trigger Configuration
const TRIGGERS = {
  rain: { condition: 'rain > 50mm', payout: { basic: 150, standard: 200, premium: 300 } },
  aqi_high: { condition: 'AQI > 300', payout: { basic: 100, standard: 150, premium: 250 } },
  aqi_severe: { condition: 'AQI > 400', payout: { basic: 150, standard: 250, premium: 350 } },
  curfew: { condition: 'curfew active', payout: { basic: 200, standard: 300, premium: 500 } },
  heat: { condition: 'temp > 42C', payout: { basic: 100, standard: 150, premium: 200 } }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register user with password
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, phone, city, platform, password } = req.body;
    
    // Validate required fields
    if (!name || !phone || !city || !platform || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    
    // Calculate risk-based premium
    const cityRiskFactors = {
      'bangalore': 'medium',
      'mumbai': 'high',
      'delhi': 'high',
      'hyderabad': 'medium',
      'chennai': 'medium',
      'pune': 'low'
    };
    
    const riskLevel = cityRiskFactors[city.toLowerCase()] || 'medium';
    const premiumMap = { low: 15, medium: 20, high: 30 };
    const coverageMap = { low: 2500, medium: 2000, high: 1500 };
    
    const user = new User({
      name,
      phone,
      password, // Will be hashed by pre-save middleware
      city,
      platform,
      riskLevel,
      weeklyPremium: premiumMap[riskLevel],
      coverage: coverageMap[riskLevel]
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      success: true, 
      user: user.toJSON(),
      token 
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Phone number already registered' });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

// Request OTP for login
app.post('/api/users/request-otp', otpLimiter, async (req, res) => {
  try {
    const { phone } = req.body;
    
    const user = await User.findOne({ phone });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please register first.' });
    }
    
    // Generate and store OTP
    const otp = generateOTP();
    otpStore.set(phone, {
      otp,
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });
    
    // In production, send OTP via SMS (Twilio, Fast2SMS, etc.)
    // For demo, return OTP in response
    console.log(`OTP for ${phone}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent to your phone',
      // Remove this in production - only for demo
      demo_otp: otp 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login with password
app.post('/api/users/login', authLimiter, async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    if (!phone || !password) {
      return res.status(400).json({ success: false, message: 'Phone and password are required' });
    }
    
    const user = await User.findOne({ phone });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please register first.' });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      user: user.toJSON(),
      token 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login with OTP
app.post('/api/users/login-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }
    
    const storedOTP = otpStore.get(phone);
    
    if (!storedOTP) {
      return res.status(400).json({ success: false, message: 'OTP not requested. Please request OTP first.' });
    }
    
    if (Date.now() > storedOTP.expires) {
      otpStore.delete(phone);
      return res.status(400).json({ success: false, message: 'OTP expired. Please request a new one.' });
    }
    
    if (storedOTP.otp !== otp) {
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    
    // OTP verified - clear OTP and generate token
    otpStore.delete(phone);
    
    const user = await User.findOne({ phone });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      user: user.toJSON(),
      token 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user profile (protected route)
app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user claims (protected route)
app.get('/api/claims', authenticateToken, async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get weather data (simulated)
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = {
      temperature: Math.floor(Math.random() * 15) + 20,
      aqi: Math.floor(Math.random() * 200) + 100,
      rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0,
      curfewActive: Math.random() > 0.9,
      lastUpdated: new Date().toISOString()
    };
    res.json({ success: true, data: weatherData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get active triggers for a city
app.get('/api/triggers/check/:city', async (req, res) => {
  try {
    const city = req.params.city;
    
    const weatherData = {
      temperature: Math.floor(Math.random() * 15) + 20,
      aqi: Math.floor(Math.random() * 200) + 100,
      rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0,
      curfewActive: Math.random() > 0.9
    };
    
    const activeTriggers = [];
    
    if (weatherData.rainfall > 50) {
      activeTriggers.push({ type: 'rain', condition: `${weatherData.rainfall}mm`, payout: 200 });
    }
    if (weatherData.aqi > 300) {
      activeTriggers.push({ type: 'aqi', condition: `AQI ${weatherData.aqi}`, payout: 150 });
    }
    if (weatherData.curfewActive) {
      activeTriggers.push({ type: 'curfew', condition: 'Active', payout: 300 });
    }
    
    res.json({ 
      success: true, 
      triggers: activeTriggers,
      weather: weatherData 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cron job to check conditions every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running hourly trigger check...');
  try {
    const users = await User.find({ active: true });
    console.log(`Checked ${users.length} users`);
  } catch (error) {
    console.error('Trigger check error:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`GigShield AI Server running on port ${PORT}`);
});
