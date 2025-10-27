import React, { useState } from 'react'
import './FAQ.css'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What should I do if I forgot my password?",
      answer: "If you've forgotten your password, click the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password. Alternatively, you can contact our customer support team at 1-800-SECURE-BANK for assistance.",
      category: "account"
    },
    {
      id: 2,
      question: "How do I open a new account?",
      answer: "Opening a new account is easy! Click the 'Register' button on our homepage, fill out the required information, and verify your identity. The process typically takes 5-10 minutes, and you'll have immediate access to your new account.",
      category: "account"
    },
    {
      id: 3,
      question: "What are your banking hours?",
      answer: "Our digital banking services are available 24/7. Branch locations are open Monday-Friday 8:00 AM - 8:00 PM, Saturday 9:00 AM - 5:00 PM, and closed on Sundays. Customer support is available 24/7 for urgent matters.",
      category: "general"
    },
    {
      id: 4,
      question: "How secure is my money with Tazlem Bank?",
      answer: "Your money is protected by multiple layers of security including FDIC insurance up to $250,000 per account, advanced encryption, fraud monitoring, and secure authentication. We use bank-level security measures to protect your assets.",
      category: "security"
    },
    {
      id: 5,
      question: "Can I access my account from my mobile device?",
      answer: "Yes! Download our mobile app from the App Store or Google Play. Our mobile banking app provides full access to your accounts, allows you to make transfers, pay bills, deposit checks, and manage your finances on the go.",
      category: "mobile"
    },
    {
      id: 6,
      question: "What fees do you charge?",
      answer: "We offer many accounts with no monthly maintenance fees. Some services may have fees, which are clearly disclosed when you sign up. You can view all fees in our fee schedule, available in your online banking portal or by contacting customer service.",
      category: "fees"
    },
    {
      id: 7,
      question: "How do I report suspicious activity on my account?",
      answer: "If you notice suspicious activity, contact us immediately at 1-800-SECURE-BANK or through our mobile app's 'Report Fraud' feature. We have a dedicated fraud team that works 24/7 to protect your accounts and investigate any suspicious transactions.",
      category: "security"
    },
    {
      id: 8,
      question: "What is the minimum balance required for accounts?",
      answer: "Many of our accounts have no minimum balance requirement. For premium accounts, minimum balances vary by account type. You can find specific requirements for each account type in our account comparison tool or by speaking with a banking representative.",
      category: "account"
    },
    {
      id: 9,
      question: "How do I set up automatic bill payments?",
      answer: "Log into your online banking account, navigate to 'Bill Pay', and follow the setup wizard. You can schedule one-time or recurring payments to most companies. You'll receive email confirmations for all scheduled payments.",
      category: "payments"
    },
    {
      id: 10,
      question: "Can I get a loan or mortgage through Tazlem Bank?",
      answer: "Yes! We offer personal loans, auto loans, home mortgages, and business loans. Our loan specialists can help you find the right product for your needs. Visit any branch or call 1-800-TAZLEM-BANK to speak with a loan officer.",
      category: "loans"
    },
    {
      id: 11,
      question: "What should I do if my card is lost or stolen?",
      answer: "Immediately call 1-800-SECURE-BANK or use our mobile app to report the card as lost or stolen. We'll freeze the card and issue a replacement. You can also temporarily freeze your card through our mobile app if you think you've misplaced it.",
      category: "security"
    },
    {
      id: 12,
      question: "How do I update my personal information?",
      answer: "You can update most personal information through your online banking account under 'Profile Settings'. For address changes or legal name changes, you may need to visit a branch with proper documentation. Contact customer service for assistance.",
      category: "account"
    }
  ]

  const filteredFAQs = faqData

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our banking services</p>
        </div>

        {/* Search Bar */}
        <div className="card search-section fade-in">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search for questions..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Category filter removed for simplified FAQ view */}

        {/* FAQ Items */}
        <div className="faq-container">
          {filteredFAQs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`card faq-item fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button 
                className="faq-question"
                onClick={() => toggleItem(faq.id)}
              >
                <h3>{faq.question}</h3>
                <i className={`fas fa-chevron-down ${openItem === faq.id ? 'rotated' : ''}`}></i>
              </button>
              
              <div className={`faq-answer ${openItem === faq.id ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="card support-section fade-in">
          <div className="support-content">
            <div className="support-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="support-text">
              <h2>Still Need Help?</h2>
              <p>Our customer support team is here to assist you 24/7</p>
            </div>
            <div className="support-actions">
              <a href="/contact" className="btn btn-primary">
                <i className="fas fa-envelope"></i>
                Contact Support
              </a>
              <a href="tel:1-800-SECURE-BANK" className="btn btn-secondary">
                <i className="fas fa-phone"></i>
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card quick-links-section fade-in">
          <h2><i className="fas fa-external-link-alt"></i> Quick Links</h2>
          <div className="grid grid-4">
            <a href="/dashboard" className="quick-link">
              <i className="fas fa-tachometer-alt"></i>
              <span>Online Banking</span>
            </a>
            <a href="/register" className="quick-link">
              <i className="fas fa-user-plus"></i>
              <span>Open Account</span>
            </a>
            <a href="#" className="quick-link">
              <i className="fas fa-mobile-alt"></i>
              <span>Mobile App</span>
            </a>
            <a href="#" className="quick-link">
              <i className="fas fa-file-alt"></i>
              <span>Fee Schedule</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
