import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import { ensureSeed } from './demoStore'
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
    // Initialize app state
    const init = async () => {
      // Seed demo data
      await ensureSeed()
      
      // Force redirect to login on initial load
      await checkAuthStatus()
      
      // Use client-side navigation instead of forcing a full-page redirect
      // (Full-page redirects to '/bank-app/...' can cause GitHub Pages to return 404.)
      if (!isAuthenticated) {
        // `useNavigate` can't be used directly inside this scope, we'll navigate after init via state below
      }
    }
    
    init()
  }, [])

  const checkAuthStatus = async () => {
    // Do not attempt network calls. Use static demo data only.
    setUseMock(true)
    setIsAuthenticated(false) // require explicit login
    setLoading(false)
  }

  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = (accountId: string) => {
    setCurrentAccountId(accountId)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentAccountId(null)
  }

  // After loading and checking auth, navigate to /login only when user is trying to access a protected route
  const location = useLocation()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Allow these public routes without forcing login
      const publicPaths = ['/', '/login', '/register', '/about', '/contact', '/faq', '/gallery']
      const path = location.pathname || '/'
      const isPublic = publicPaths.some(p => path.endsWith(p))
      if (!isPublic) {
        navigate('/login', { replace: true })
      }
    }
  }, [loading, isAuthenticated, navigate, location])

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
            <Dashboard useMock={useMock} currentAccountId={currentAccountId || undefined} /> : 
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
