import React, { useState } from 'react'
import './Contact.css'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    }, 2000)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Contact Us</h1>
          <p>We're here to help! Get in touch with our team</p>
        </div>

        <div className="grid grid-2">
          {/* Contact Information */}
          <div className="card fade-in">
            <h2><i className="fas fa-map-marker-alt"></i> Get in Touch</h2>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="contact-details">
                  <h3>Headquarters</h3>
                  <p>123 Financial District<br />New York, NY 10004</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567<br />Mon-Fri: 8AM-8PM EST</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>support@securebank.com<br />info@securebank.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 8:00 PM<br />Saturday: 9:00 AM - 5:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card fade-in">
            <h2><i className="fas fa-paper-plane"></i> Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <i className="fas fa-check-circle"></i>
                Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type</label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="general">General Inquiry</option>
                  <option value="account">Account Support</option>
                  <option value="technical">Technical Support</option>
                  <option value="business">Business Banking</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={6}
                  required
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card fade-in">
          <h2><i className="fas fa-info-circle"></i> Additional Information</h2>
          <div className="grid grid-3">
            <div className="info-section">
              <h3><i className="fas fa-shield-alt"></i> Security</h3>
              <p>Your personal information is protected with bank-level security. We never share your data with third parties.</p>
            </div>
            <div className="info-section">
              <h3><i className="fas fa-headset"></i> Support</h3>
              <p>Our customer support team is available 24/7 for urgent matters. Non-urgent inquiries are responded to within 24 hours.</p>
            </div>
            <div className="info-section">
              <h3><i className="fas fa-mobile-alt"></i> Mobile App</h3>
              <p>Download our mobile app for instant access to your accounts and quick customer support through in-app chat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
