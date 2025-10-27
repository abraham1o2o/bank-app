import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

interface NavigationProps {
  isAuthenticated: boolean
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      onLogout()
    } catch (error) {
      console.error('Logout error:', error)
      onLogout()
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <i className="fas fa-university"></i>
            <span>Tazlem Bank</span>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <i className="fas fa-tachometer-alt"></i>
                Dashboard
              </Link>
            )}

            <div className="nav-dropdown">
              <button 
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown}
              >
                <i className="fas fa-info-circle"></i>
                About Us
                <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotated' : ''}`}></i>
              </button>
              
              <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                <Link to="/about" className="dropdown-item">
                  <i className="fas fa-building"></i>
                  About Our Bank
                </Link>
                <Link to="/contact" className="dropdown-item">
                  <i className="fas fa-envelope"></i>
                  Contact Us
                </Link>
                <Link to="/faq" className="dropdown-item">
                  <i className="fas fa-question-circle"></i>
                  FAQ
                </Link>
                <Link to="/gallery" className="dropdown-item">
                  <i className="fas fa-images"></i>
                  Gallery
                </Link>
              </div>
            </div>

            <div className="nav-auth">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn btn-secondary">
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    <i className="fas fa-user-plus"></i>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <button className="nav-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
