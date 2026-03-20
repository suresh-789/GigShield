import { useState } from 'react'

export default function Landing({ onLogin, onShowLogin, onShowRegister }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [step, setStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // For quick registration from landing, redirect to register page
    onShowRegister()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GigShield AI
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Smart Income Protection for Delivery Workers
            </p>
            <p className="text-lg text-primary-200 max-w-2xl mx-auto mb-8">
              Get instant payouts when rain, pollution, or curfews stop you from working.
              Pay just ₹20/week. No paperwork. No waiting.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onShowRegister}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={onShowLogin}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Weekly Plans</h3>
            <p className="text-gray-600">Flexible ₹15-30/week plans that fit your budget. Pay only for what you need.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
            <p className="text-gray-600">AI automatically detects disruptions and credits your account within minutes.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Zero-Touch Claims</h3>
            <p className="text-gray-600">No paperwork. No forms. Our AI handles everything automatically.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Platform</h3>
              <p className="text-gray-600">Select which delivery platform you work on - Swiggy, Zomato, Zepto, and more.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Pick Your Plan</h3>
              <p className="text-gray-600">Choose from Basic, Standard, or Premium plans starting at just ₹15/week.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Protected</h3>
              <p className="text-gray-600">Our AI monitors weather, AQI, and curfews. Automatic payouts when conditions are bad.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">We Support All Major Platforms</h2>
        <p className="text-gray-600 text-center mb-12">Protect your income from any gig work platform</p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: 'Swiggy', color: '#FF8C00' },
            { name: 'Zomato', color: '#CB202D' },
            { name: 'Zepto', color: '#7C3AED' },
            { name: 'Blinkit', color: '#F59E0B' },
            { name: 'Dunzo', color: '#10B981' },
            { name: 'Uber Eats', color: '#06C167' },
            { name: 'Amazon Flex', color: '#FF9900' },
            { name: 'Flipkart', color: '#2874F0' }
          ].map((platform) => (
            <div key={platform.name} className="bg-white px-6 py-3 rounded-lg shadow-md font-semibold text-gray-700">
              {platform.name}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Protect Your Income?</h2>
          <p className="text-primary-100 mb-8 text-lg">Join thousands of delivery workers who trust GigShield AI</p>
          <button
            onClick={onShowRegister}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Now - Only ₹20/week
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 GigShield AI. Built for India's Gig Economy.</p>
        </div>
      </footer>
    </div>
  )
}
