import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

interface RegisterProps {
  onLogin: () => void
  useMock?: boolean
}

const Register: React.FC<RegisterProps> = ({ onLogin, useMock = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onLogin()
        }, 2000)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (error) {
      setError('Network error - please check your connection')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card success-card">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. Redirecting to login...</p>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
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
            <p>Create your account and start banking with confidence</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
              </div>
              <div className="password-requirements">
                <p>Password must be at least 8 characters long</p>
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
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </>
              )}
            </button>

            {useMock && (
              <div className="demo-section">
                <p className="muted">Backend not available — create a demo account instead.</p>
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
              <p>Already have an account? <Link to="/login">Sign in here</Link></p>
            </div>
          </form>

          <div className="benefits-section">
            <h3>Why Choose Tazlem Bank?</h3>
            <div className="benefits">
              <div className="benefit">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <h4>Bank-Level Security</h4>
                  <p>Your data is protected with military-grade encryption</p>
                </div>
              </div>
              <div className="benefit">
                <i className="fas fa-mobile-alt"></i>
                <div>
                  <h4>Mobile Banking</h4>
                  <p>Access your accounts anywhere, anytime</p>
                </div>
              </div>
              <div className="benefit">
                <i className="fas fa-headset"></i>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Our team is always here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
