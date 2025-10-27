import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Gallery from './pages/Gallery'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [useMock, setUseMock] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/accounts/my-accounts', {
        credentials: 'include'
      })
      setIsAuthenticated(response.ok)
    } catch (error) {
      // If the backend is unreachable (network error), enable mock/demo mode
      // This makes the frontend usable as a static demo (for GitHub Pages)
      console.warn('Backend unreachable, enabling demo mode:', error)
      setUseMock(true)
      setIsAuthenticated(true)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
  Loading Tazlem Bank...
      </div>
    )
  }

  return (
    <div className="app">
      <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={handleLogin} useMock={useMock} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Register onLogin={handleLogin} useMock={useMock} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard useMock={useMock} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
      </Routes>
    </div>
  )
}

export default App
