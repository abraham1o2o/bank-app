import React from 'react'
import './About.css'

const About: React.FC = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>About SecureBank</h1>
          <p>Your trusted financial partner for over 50 years</p>
        </div>

        {/* Hero Section */}
        <div className="card hero-section fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Building Financial Futures Since 1970</h2>
              <p>
                SecureBank has been at the forefront of financial innovation, providing 
                secure, reliable, and personalized banking services to millions of customers 
                worldwide. We combine traditional banking values with cutting-edge technology 
                to deliver exceptional financial solutions.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Years of Service</p>
                </div>
                <div className="stat">
                  <h3>2M+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat">
                  <h3>$50B+</h3>
                  <p>Assets Under Management</p>
                </div>
                <div className="stat">
                  <h3>500+</h3>
                  <p>Branch Locations</p>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <i className="fas fa-building"></i>
                <p>Bank Headquarters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-2">
          <div className="card fade-in">
            <div className="section-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h2>Our Mission</h2>
            <p>
              To empower individuals and businesses with innovative financial solutions 
              that promote growth, security, and prosperity. We are committed to 
              delivering exceptional service while maintaining the highest standards 
              of integrity and trust.
            </p>
            <ul className="mission-list">
              <li><i className="fas fa-check"></i> Customer-first approach</li>
              <li><i className="fas fa-check"></i> Innovative financial solutions</li>
              <li><i className="fas fa-check"></i> Transparent and ethical practices</li>
              <li><i className="fas fa-check"></i> Community development focus</li>
            </ul>
          </div>

          <div className="card fade-in">
            <div className="section-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h2>Our Vision</h2>
            <p>
              To be the leading digital-first bank that transforms the way people 
              manage their finances, making banking more accessible, secure, and 
              rewarding for everyone, everywhere.
            </p>
            <ul className="vision-list">
              <li><i className="fas fa-star"></i> Global financial inclusion</li>
              <li><i className="fas fa-star"></i> Technology-driven innovation</li>
              <li><i className="fas fa-star"></i> Sustainable banking practices</li>
              <li><i className="fas fa-star"></i> World-class customer experience</li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="card fade-in">
          <h2 className="text-center"><i className="fas fa-heart"></i> Our Core Values</h2>
          <div className="grid grid-4">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Security</h3>
              <p>Protecting your assets and personal information with bank-level security measures.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Trust</h3>
              <p>Building lasting relationships through transparency, honesty, and reliability.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>Continuously evolving our services with cutting-edge technology and solutions.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community</h3>
              <p>Supporting local communities and contributing to sustainable development.</p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="card fade-in">
          <h2 className="text-center"><i className="fas fa-users-cog"></i> Leadership Team</h2>
          <div className="grid grid-3">
            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="position">Chief Executive Officer</p>
              <p className="bio">
                With over 20 years in banking, Sarah leads our strategic vision 
                and digital transformation initiatives.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Michael Chen</h3>
              <p className="position">Chief Technology Officer</p>
              <p className="bio">
                Michael oversees our technology infrastructure and drives 
                innovation in digital banking solutions.
              </p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Emily Rodriguez</h3>
              <p className="position">Chief Financial Officer</p>
              <p className="bio">
                Emily manages our financial operations and ensures 
                sustainable growth and profitability.
              </p>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="card fade-in">
          <h2 className="text-center"><i className="fas fa-trophy"></i> Awards & Recognition</h2>
          <div className="grid grid-2">
            <div className="award-item">
              <div className="award-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="award-content">
                <h3>Best Digital Bank 2023</h3>
                <p>Financial Times Global Banking Awards</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="award-content">
                <h3>Customer Service Excellence</h3>
                <p>Banking Industry Awards 2023</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="award-content">
                <h3>Most Secure Bank</h3>
                <p>Cybersecurity Excellence Awards</p>
              </div>
            </div>
            <div className="award-item">
              <div className="award-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="award-content">
                <h3>Sustainable Banking Leader</h3>
                <p>Green Finance Initiative</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card cta-section fade-in">
          <div className="cta-content">
            <h2>Ready to Join the SecureBank Family?</h2>
            <p>Experience banking reimagined with our innovative solutions and exceptional service.</p>
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary">
                <i className="fas fa-user-plus"></i>
                Open Account
              </a>
              <a href="/contact" className="btn btn-secondary">
                <i className="fas fa-envelope"></i>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
