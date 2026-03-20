# GigShield AI – Smart Income Protection for Delivery Workers

---

## 🚨 Problem Statement

Gig workers in India (Swiggy, Zomato, Zepto, Blinkit delivery partners) face significant income instability due to unpredictable external factors:

- **Rain** – Customers cancel orders, routes become dangerous
- **Extreme Heat** – Health risks, reduced deliveries
- **High Pollution (AQI)** – Health hazards, delivery restrictions
- **Curfews/Restrictions** – Inability to work during lockdowns
- **Traffic Disruptions** – Lost hours, reduced efficiency

**Impact:** Delivery workers lose **20-30% of their daily income** during adverse conditions, with no financial safety net. Traditional insurance doesn't cover income loss from weather/pollution-related disruptions.

---

## 👤 Persona

### Raju – Swiggy Delivery Partner, Bangalore

- **Age:** 28 years
- **Work:** Delivers 30-40 orders daily on a motorcycle
- **Income:** ₹18,000-22,000/month (daily earnings: ₹600-800)
- **Challenge:** Depends on daily earnings to support family; any day without work means no income
- **Pain Points:**
  - No protection during monsoon season
  - Manual claim processes are time-consuming
  - Cannot afford expensive monthly insurance premiums
  - No visibility into high-risk days

---

## 💡 Our Solution

**GigShield AI** is an AI-based parametric insurance platform designed specifically for gig workers.

### Key Features:

- **Weekly Subscription Model** – Flexible, affordable plans starting at ₹20/week
- **Auto Claim Detection** – AI continuously monitors weather, AQI, and traffic conditions
- **Instant Payouts** – Claims are verified and processed automatically within minutes
- **Zero-Touch Claims** – No paperwork, no waiting, no hassle

---

## ⚙️ Workflow

```
1. USER REGISTRATION
   └── Phone number + vehicle details + service area

2. PLAN SELECTION
   └── Choose weekly coverage plan (₹15-30/week based on risk)

3. CONTINUOUS MONITORING (AI Engine)
   ├── Weather API (rain, temperature)
   ├── AQI API (air quality index)
   ├── Traffic & Road Conditions
   └── Government Alerts (curfews, restrictions)

4. TRIGGER DETECTION
   └── AI detects when conditions exceed defined thresholds

5. AUTO CLAIM PROCESSING
   ├── Claim auto-triggered
   ├── AI verifies: GPS location + timestamp + conditions
   └── Fraud detection: checks for GPS mismatch, fake claims

6. INSTANT PAYOUT
   └── Money credited to UPI/Paytm wallet within minutes
```

---

## 🌧️ Parametric Triggers

| Trigger | Condition | Payout Amount |
|---------|-----------|----------------|
| Heavy Rain | > 50mm rainfall | ₹200 |
| Extreme Heat | Temperature > 42°C | ₹150 |
| High AQI | AQI > 300 | ₹150 |
| Severe AQI | AQI > 400 | ₹250 |
| Curfew/Lockdown | Government restriction active | ₹300 |
| Traffic Ban | Vehicle restrictions | ₹100 |
| Storm Warning | Red alert issued | ₹200 |

**Note:** Multiple triggers can be activated in a single day. Maximum daily payout: ₹500

---

## 💸 Weekly Pricing Model

### Base Premium: ₹20/week

#### Risk-Based Dynamic Pricing:

| Risk Level | Area Type | Weekly Premium |
|------------|-----------|-----------------|
| Low Risk | Tier 2-3 cities, good weather | ₹15/week |
| Medium Risk | Suburban areas | ₹20/week |
| High Risk | Metro cities, flood-prone | ₹30/week |

### Pricing Algorithm:

- **AI analyzes historical data** (weather patterns, AQI trends, past disruptions)
- **Dynamic adjustment** based on:
  - City risk profile
  - Season (monsoon = higher risk)
  - Vehicle type (bike vs EV)
  - Delivery zone risk score

---

## 🤖 AI/ML Usage

### 1. Risk Prediction Model
- Predicts disruption probability for the next 7 days
- Uses historical weather, AQI, and traffic data
- Helps users plan their work schedule proactively

### 2. Fraud Detection System
- **GPS Validation:** Cross-checks user location with weather condition
- **Pattern Analysis:** Detects suspicious claim patterns
- **Anomaly Detection:** Flags unusual activity (e.g., claiming from indoors during heavy rain)
- **Behavioral Analysis:** Learns user behavior to identify fake claims

### 3. Dynamic Pricing Engine
- Adjusts premiums based on real-time risk assessment
- Offers personalized quotes based on user profile and location

### 4. Claim Verification AI
- Automatically verifies claim authenticity
- Reduces manual verification time from days to seconds

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – Modern UI framework
- **Tailwind CSS** – Responsive styling
- **Framer Motion** – Smooth animations

### Backend
- **Node.js** – Server runtime
- **Express.js** – REST API framework

### Database
- **MongoDB Atlas** – Cloud database
  - Users collection
  - Claims collection
  - Transactions collection

### AI/ML
- **Python** – ML model development
- **TensorFlow/PyTorch** – Model training
- **scikit-learn** – Prediction algorithms

### External APIs
- **OpenWeather API** – Weather data
- **AQICN API** – Air quality index
- **Google Maps API** – Location services

### Payments
- **Razorpay** – Test payment gateway
- **UPI Integration** – Instant payouts

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER LAYER                           │
│  (Mobile App / Web Dashboard)                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                         │
│  - User Registration                                        │
│  - Plan Selection                                          │
│  - Dashboard                                               │
│  - Claim Status                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)                │
│  - REST API                                                │
│  - Authentication                                          │
│  - Webhook Handlers                                        │
│  - Business Logic                                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
┌─────────────────────┐  ┌─────────────────────┐
│   DATABASE          │  │   AI ENGINE         │
│   MongoDB Atlas     │  │   (Python Flask)    │
│   - Users           │  │   - Risk Model      │
│   - Plans           │  │   - Fraud Detection │
│   - Claims          │  │   - Claims Verify   │
│   - Transactions    │  │   - Dynamic Pricing │
└─────────────────────┘  └──────────┬──────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────┐
                    │    TRIGGER SYSTEM           │
                    │    - Weather Monitor        │
                    │    - AQI Monitor            │
                    │    - Alert Processor        │
                    └─────────────┬───────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────────┐
                    │    PAYOUT SYSTEM             │
                    │    - Razorpay                │
                    │    - UPI Transfer            │
                    └─────────────────────────────┘
```

---

## 📊 Dashboard Features

### For Delivery Workers:

1. **Risk Score Display**
   - Today's risk level (Low/Medium/High)
   - 7-day forecast with risk predictions

2. **Earnings Protected**
   - Total coverage amount
   - Active plan details
   - Days remaining in current week

3. **Active Coverage Status**
   - Current protection level
   - Triggers currently active
   - Coverage summary

4. **Claim History**
   - Past claims with status
   - Payout amounts received
   - Claim timeline

5. **Quick Actions**
   - Upgrade/Downgrade plan
   - View payment history
   - Contact support

---

## 🎯 Innovation Highlights

### 1. Live Risk Alerts
- Push notifications before adverse conditions
- Proactive suggestions: "High rain expected tomorrow - claim ready!"

### 2. Smart Premium Suggestions
- AI recommends best value plans based on user's service area
- Seasonal discounts during low-risk periods

### 3. Zero-Touch Claims
- Fully automated from trigger to payout
- No human intervention required
- Average claim processing time: < 3 minutes

### 4. Micro-Insurance Flexibility
- Pay only for what you need
- Pause coverage during vacation
- Resume with one tap

### 5. Gamification
- Safe driving rewards
- Streak bonuses for continuous coverage
- Referral credits

---

## 📅 Development Plan

### Week 1: Research + UI Design
- [ ] Market research and competitor analysis
- [ ] User interviews with delivery partners
- [ ] Create wireframes and mockups
- [ ] Design system setup (colors, typography)
- [ ] React app initialization

### Week 2: Backend + Database
- [ ] Node.js server setup
- [ ] MongoDB schema design
- [ ] User authentication (JWT)
- [ ] Plan management APIs
- [ ] Weather API integration

### Week 3: Core Features
- [ ] Dashboard development
- [ ] Payment integration (Razorpay test)
- [ ] Trigger system implementation
- [ ] Basic claim flow

### Week 4: AI Integration
- [ ] Python ML server setup
- [ ] Risk prediction model training
- [ ] Fraud detection system
- [ ] Dynamic pricing engine

### Week 5: Testing + Refinement
- [ ] End-to-end testing
- [ ] Bug fixes and optimization
- [ ] Performance testing
- [ ] User feedback integration

### Week 6: Launch Prep
- [ ] Documentation
- [ ] Demo video creation
- [ ] Final presentation preparation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Razorpay test account
- OpenWeather API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/gigshield-ai.git
cd gigshield-ai

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys

# Run the application
# Frontend: npm run dev
# Backend: npm run start
```

---

## 📱 Demo Video Script

Watch our Phase-1 demo here:
https://youtu.be/EiVMLeVH87k

---

## ⚠️ What Makes Us Different

| Traditional Insurance | GigShield AI |
|------------------------|---------------|
| Monthly/Yearly premiums | Weekly pay-as-you-go |
| Manual claim process | Zero-touch auto claims |
| Health/life focus | Income protection focus |
| Complex paperwork | Simple app-based |
| No customization | AI动态定价 |

---


## Team
  

| Name                     | Role         |
|--------------------------|--------------|
| M.V Ashika Reddy         | Team Leader  |
| K. Bonishira Akshaya     | Member       |
| N. Meena Amrutha         | Member       |
| S. Jaswanth              | Member       |
| M.Suresh                 | Member       |
---

*Built with ❤️ for India's Gig Economy*
