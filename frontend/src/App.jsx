import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [view, setView] = useState('landing') // landing, login, register

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('gigshield_user')
    const savedToken = localStorage.getItem('gigshield_token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    setIsLoggedIn(true)
    localStorage.setItem('gigshield_user', JSON.stringify(userData))
    localStorage.setItem('gigshield_token', authToken)
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    setIsLoggedIn(false)
    setView('landing')
    localStorage.removeItem('gigshield_user')
    localStorage.removeItem('gigshield_token')
  }

  const handleShowLogin = () => setView('login')
  const handleShowRegister = () => setView('register')
  const handleShowLanding = () => setView('landing')

  // Render the appropriate view
  const renderView = () => {
    if (isLoggedIn) {
      return <Dashboard user={user} token={token} onLogout={handleLogout} />
    }

    switch (view) {
      case 'login':
        return (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={handleShowRegister}
            onBack={handleShowLanding}
          />
        )
      case 'register':
        return (
          <Register 
            onLogin={handleLogin}
            onSwitchToLogin={handleShowLogin}
            onBack={handleShowLanding}
          />
        )
      default:
        return (
          <Landing 
            onLogin={handleLogin}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  )
}

export default App
