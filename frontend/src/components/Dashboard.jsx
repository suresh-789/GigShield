import { useState, useEffect } from 'react'

const PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy', color: '#FF8C00', icon: '🍔' },
  { id: 'zomato', name: 'Zomato', color: '#CB202D', icon: '🍕' },
  { id: 'zepto', name: 'Zepto', color: '#7C3AED', icon: '⚡' },
  { id: 'blinkit', name: 'Blinkit', color: '#F59E0B', icon: '🛒' },
  { id: 'dunzo', name: 'Dunzo', color: '#10B981', icon: '📦' },
  { id: 'uber_eats', name: 'Uber Eats', color: '#06C167', icon: '🚗' },
  { id: 'amazon_flex', name: 'Amazon Flex', color: '#FF9900', icon: '📱' },
  { id: 'flipkart', name: 'Flipkart', color: '#2874F0', icon: '🛍️' },
  { id: 'other', name: 'Other', color: '#6B7280', icon: '📋' }
]

const getPlatformInfo = (platformId) => {
  return PLATFORMS.find(p => p.id === platformId) || PLATFORMS.find(p => p.id === 'other')
}

export default function Dashboard({ user, token, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [weather, setWeather] = useState({ temp: 28, aqi: 145, rain: false })
  const [claims, setClaims] = useState([
    { id: 1, date: '2024-03-15', trigger: 'Heavy Rain', amount: 200, status: 'Paid' },
    { id: 2, date: '2024-03-10', trigger: 'High AQI', amount: 150, status: 'Paid' },
  ])
  
  const platformInfo = getPlatformInfo(user?.platform)

  // Simulated live data
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather({
        temp: Math.floor(Math.random() * 10) + 25,
        aqi: Math.floor(Math.random() * 100) + 100,
        rain: Math.random() > 0.7
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getRiskLevel = (aqi) => {
    if (aqi > 300) return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' }
    if (aqi > 200) return { level: 'Poor', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (aqi > 100) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Good', color: 'text-green-600', bg: 'bg-green-100' }
  }

  const riskInfo = getRiskLevel(weather.aqi)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">GigShield AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-lg">{platformInfo?.icon}</span>
              <span className="text-sm font-medium">{platformInfo?.name}</span>
            </div>
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={onLogout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Platform</p>
            <p className="text-2xl font-bold">{platformInfo?.icon} {platformInfo?.name}</p>
            <p className="text-sm text-gray-600 mt-1">Active</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Coverage Amount</p>
            <p className="text-3xl font-bold text-primary-600">₹2,000</p>
            <p className="text-sm text-green-600 mt-1">Active Plan</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Today's Risk</p>
            <p className={`text-3xl font-bold ${riskInfo.color}`}>{riskInfo.level}</p>
            <p className="text-sm text-gray-600 mt-1">AQI: {weather.aqi}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Total Claims</p>
            <p className="text-3xl font-bold text-gray-900">{claims.length}</p>
            <p className="text-sm text-green-600 mt-1">₹350 earned back</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Week Progress</p>
            <p className="text-3xl font-bold text-gray-900">3/7</p>
            <p className="text-sm text-gray-600 mt-1">days covered</p>
          </div>
        </div>

        {/* Live Conditions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Live Conditions in {user?.city || 'Your Area'}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{weather.temp}°C</p>
                <p className="text-sm text-gray-500">Temperature</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${riskInfo.bg}`}>
                <svg className={`w-8 h-8 ${riskInfo.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{weather.aqi}</p>
                <p className="text-sm text-gray-500">AQI Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${weather.rain ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <svg className={`w-8 h-8 ${weather.rain ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{weather.rain ? 'Raining' : 'Clear'}</p>
                <p className="text-sm text-gray-500">Weather</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('claims')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'claims'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Claims History
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'plans'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Plans
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Your Protection Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Active Coverage</span>
                </div>
                <span className="text-green-700">₹20/week plan</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Next Billing</span>
                </div>
                <span className="text-blue-700">3 days (₹20)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{claim.trigger}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{claim.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">₹15<span className="text-sm font-normal text-gray-500">/week</span></p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>✓ Rain protection (₹150)</li>
                <li>✓ AQI protection (₹100)</li>
                <li>✓ Basic support</li>
              </ul>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Current Plan
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-primary-500 relative">
              <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs px-2 py-1 rounded-bl-lg">Popular</div>
              <h3 className="text-lg font-semibold mb-2">Standard</h3>
              <p className="text-3xl font-bold mb-4">₹20<span className="text-sm font-normal text-gray-500">/week</span></p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>✓ Rain protection (₹200)</li>
                <li>✓ AQI protection (₹150)</li>
                <li>✓ Curfew protection (₹300)</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Upgrade
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">₹30<span className="text-sm font-normal text-gray-500">/week</span></p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>✓ Rain protection (₹300)</li>
                <li>✓ AQI protection (₹250)</li>
                <li>✓ Curfew protection (₹500)</li>
                <li>✓ 24/7 support</li>
              </ul>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Upgrade
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
