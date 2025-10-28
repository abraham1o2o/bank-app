import React from 'react'
import './About.css'

const About: React.FC = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>About Tazlem Bank</h1>
          <p>Your trusted financial partner for over 50 years</p>
        </div>

        {/* Hero Section */}
        <div className="card hero-section fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Building Financial Futures Since 1970</h2>
              <p>
                At Tazlem Bank, we're not just a financial institution – we're your partner in 
                progress. With over five decades of excellence, we combine time-tested banking 
                principles with innovative technology to create seamless, secure, and 
                personalized banking experiences.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Years of Excellence</p>
                </div>
                <div className="stat">
                  <h3>1M+</h3>
                  <p>Satisfied Clients</p>
                </div>
                <div className="stat">
                  <h3>$30B+</h3>
                  <p>Assets Managed</p>
                </div>
                <div className="stat">
                  <h3>100+</h3>
                  <p>Locations</p>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&w=800" 
                alt="Tazlem Bank Headquarters" 
                className="headquarters-image"
              />
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
          <h2 className="text-center">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-image">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&w=400" 
                  alt="Security First"
                />
              </div>
              <div className="value-content">
                <div className="value-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Security First</h3>
                <p>Your trust is our foundation. We employ state-of-the-art security measures to protect your assets and data.</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-image">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&w=400" 
                  alt="Customer Focus"
                />
              </div>
              <div className="value-content">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Customer Focus</h3>
                <p>Every decision we make starts with you. We're committed to exceeding your expectations.</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-image">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=400" 
                  alt="Digital Innovation"
                />
              </div>
              <div className="value-content">
                <div className="value-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Digital Innovation</h3>
                <p>Leading the future of banking with cutting-edge technology and innovative solutions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="card leadership-section fade-in">
          <h2 className="text-center">Meet Our Leadership</h2>
          <div className="leadership-grid">
            <div className="team-member">
              <div className="member-photo">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=400" 
                  alt="Alexander Richardson"
                  className="member-image"
                />
              </div>
              <div className="member-info">
                <h3>Alexander Richardson</h3>
                <p className="position">Chief Executive Officer</p>
                <p className="bio">
                  A distinguished leader with over 25 years in global banking, 
                  driving sustainable growth and digital innovation in financial services.
                </p>
                <div className="member-social">
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&w=400" 
                  alt="David Anderson"
                  className="member-image"
                />
              </div>
              <div className="member-info">
                <h3>David Anderson</h3>
                <p className="position">Chief Technology Officer</p>
                <p className="bio">
                  A forward-thinking technologist leading our digital transformation 
                  with expertise in fintech innovation and cybersecurity.
                </p>
                <div className="member-social">
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-github"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Recognition */}
        <div className="achievements-section fade-in">
          <h2 className="text-center">Setting Industry Standards</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-content">
                <div className="achievement-metric">
                  <span className="metric-number">99.99%</span>
                  <span className="metric-label">Uptime</span>
                </div>
                <div className="achievement-details">
                  <h3>Digital Excellence</h3>
                  <p>Leading digital banking platform recognized by Financial Times</p>
                  <span className="achievement-year">2025</span>
                </div>
              </div>
              <div className="achievement-bg">
                <img 
                  src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&w=800" 
                  alt="Digital Innovation"
                />
              </div>
            </div>

            <div className="achievement-card">
              <div className="achievement-content">
                <div className="achievement-metric">
                  <span className="metric-number">AAA+</span>
                  <span className="metric-label">Security Rating</span>
                </div>
                <div className="achievement-details">
                  <h3>Security Leader</h3>
                  <p>Highest security standards in digital banking</p>
                  <span className="achievement-year">2025</span>
                </div>
              </div>
              <div className="achievement-bg">
                <img 
                  src="https://images.unsplash.com/photo-1483706600674-e0c87d3fe85b?auto=format&w=800" 
                  alt="Security Excellence"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section fade-in">
          <div className="cta-background">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&w=1200" 
              alt="Join Tazlem Bank"
              className="cta-bg-image"
            />
          </div>
          <div className="cta-content">
            <h2>Experience Banking Excellence</h2>
            <p>Join thousands of satisfied customers who trust Tazlem Bank with their financial future.</p>
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary btn-glow">
                <i className="fas fa-user-plus"></i>
                Start Your Journey
              </a>
              <a href="/contact" className="btn btn-glass">
                <i className="fas fa-envelope"></i>
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
