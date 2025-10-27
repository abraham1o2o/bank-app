import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

interface LoginProps {
  onLogin: () => void
  useMock?: boolean
}

const Login: React.FC<LoginProps> = ({ onLogin, useMock = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onLogin()
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Network error - please check your connection')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <i className="fas fa-university"></i>
              <h1>Tazlem Bank</h1>
            </div>
            <p>Welcome back! Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing In...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>

            {useMock && (
              <div className="demo-section">
                <p className="muted">Backend not available — you can try the demo account.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onLogin()}
                >
                  <i className="fas fa-user"></i>
                  Use Demo Account
                </button>
              </div>
            )}

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register">Create one here</Link></p>
              <a href="#" className="forgot-password">Forgot your password?</a>
            </div>
          </form>

          <div className="security-features">
            <h3>Your Security Matters</h3>
            <div className="features">
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Bank-level encryption</span>
              </div>
              <div className="feature">
                <i className="fas fa-lock"></i>
                <span>Secure authentication</span>
              </div>
              <div className="feature">
                <i className="fas fa-eye"></i>
                <span>24/7 fraud monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
