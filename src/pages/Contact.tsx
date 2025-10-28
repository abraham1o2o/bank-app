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

        {/* Quick Contact Methods */}
        <div className="quick-contact-section fade-in">
          <a href="tel:+15551234567" className="card">
            <i className="fas fa-phone-volume"></i>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <span className="contact-badge">24/7 Support</span>
          </a>

          <a href="mailto:support@tazlembank.com" className="card">
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p>support@tazlembank.com</p>
            <span className="contact-badge">Response within 24h</span>
          </a>

          <div className="card">
            <i className="fas fa-comments"></i>
            <h3>Live Chat</h3>
            <p>Start a conversation now</p>
            <span className="contact-badge">Online</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card contact-form-section fade-in">
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

        {/* Business Hours */}
        <div className="card fade-in">
          <h2><i className="fas fa-clock"></i> Business Hours</h2>
          <div className="hours-grid">
            <div className="hours-item">
              <span>Monday - Friday</span>
              <span>8:00 AM - 8:00 PM</span>
            </div>
            <div className="hours-item">
              <span>Saturday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="hours-item">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
