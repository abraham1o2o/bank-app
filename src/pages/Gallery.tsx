import React, { useState } from 'react'
import './Gallery.css'

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  category: string
  description: string
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Placeholder images - you can replace these with actual images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/bank-exterior.jpg',
      alt: 'SecureBank Main Branch Exterior',
      title: 'Main Branch Exterior',
      category: 'branches',
      description: 'Our flagship branch located in the heart of the financial district, featuring modern architecture and welcoming design.'
    },
    {
      id: 2,
      src: '/images/bank-lobby.jpg',
      alt: 'Bank Lobby Interior',
      title: 'Modern Lobby Design',
      category: 'interior',
      description: 'Spacious and comfortable lobby area designed to provide a welcoming environment for our customers.'
    },
    {
      id: 3,
      src: '/images/atm-center.jpg',
      alt: 'ATM Banking Center',
      title: '24/7 ATM Center',
      category: 'services',
      description: 'Convenient ATM banking center available 24/7 for all your banking needs, including deposits and withdrawals.'
    },
    {
      id: 4,
      src: '/images/conference-room.jpg',
      alt: 'Business Meeting Room',
      title: 'Business Conference Room',
      category: 'interior',
      description: 'Professional meeting spaces available for business clients to discuss their financial needs with our specialists.'
    },
    {
      id: 5,
      src: '/images/safe-deposit.jpg',
      alt: 'Safe Deposit Box Area',
      title: 'Safe Deposit Vault',
      category: 'security',
      description: 'Secure vault area housing our safe deposit boxes, protected by advanced security systems.'
    },
    {
      id: 6,
      src: '/images/drive-thru.jpg',
      alt: 'Drive-Thru Banking',
      title: 'Drive-Thru Services',
      category: 'services',
      description: 'Convenient drive-thru banking services for quick transactions without leaving your vehicle.'
    },
    {
      id: 7,
      src: '/images/online-banking.jpg',
      alt: 'Digital Banking Station',
      title: 'Digital Banking Station',
      category: 'technology',
      description: 'Modern digital banking stations equipped with the latest technology for self-service banking.'
    },
    {
      id: 8,
      src: '/images/customer-service.jpg',
      alt: 'Customer Service Desk',
      title: 'Customer Service Area',
      category: 'services',
      description: 'Dedicated customer service area where our friendly staff are ready to assist with all your banking needs.'
    },
    {
      id: 9,
      src: '/images/loan-office.jpg',
      alt: 'Loan Officer Office',
      title: 'Loan Consultation Office',
      category: 'interior',
      description: 'Private consultation rooms where our loan officers meet with clients to discuss financing options.'
    },
    {
      id: 10,
      src: '/images/security-center.jpg',
      alt: 'Security Monitoring Center',
      title: 'Security Operations Center',
      category: 'security',
      description: 'State-of-the-art security monitoring center ensuring the safety and security of all our facilities.'
    },
    {
      id: 11,
      src: '/images/community-event.jpg',
      alt: 'Community Event',
      title: 'Community Outreach Event',
      category: 'community',
      description: 'Our team participating in community events, demonstrating our commitment to local engagement.'
    },
    {
      id: 12,
      src: '/images/award-ceremony.jpg',
      alt: 'Award Ceremony',
      title: 'Industry Recognition',
      category: 'achievements',
      description: 'Celebrating our recognition as the Best Digital Bank 2023 at the Financial Times Global Banking Awards.'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Photos', icon: 'fas fa-images' },
    { id: 'branches', name: 'Branch Locations', icon: 'fas fa-building' },
    { id: 'interior', name: 'Interior Design', icon: 'fas fa-home' },
    { id: 'services', name: 'Banking Services', icon: 'fas fa-concierge-bell' },
    { id: 'security', name: 'Security Features', icon: 'fas fa-shield-alt' },
    { id: 'technology', name: 'Technology', icon: 'fas fa-laptop' },
    { id: 'community', name: 'Community', icon: 'fas fa-users' },
    { id: 'achievements', name: 'Achievements', icon: 'fas fa-trophy' }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Bank Gallery</h1>
          <p>Explore our facilities, services, and community involvement</p>
        </div>

        {/* Category Filter */}
        <div className="card categories-section fade-in">
          <h2><i className="fas fa-filter"></i> Browse by Category</h2>
          <div className="category-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`gallery-item fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(image)}
            >
              <div className="image-placeholder">
                <i className="fas fa-image"></i>
                <p>Click to view</p>
              </div>
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <div className="image-category">
                  <i className="fas fa-tag"></i>
                  <span>{categories.find(c => c.id === image.category)?.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Counter */}
        <div className="image-counter">
          <p>Showing {filteredImages.length} of {galleryImages.length} images</p>
        </div>

        {/* Virtual Tour Section */}
        <div className="card virtual-tour-section fade-in">
          <div className="tour-content">
            <div className="tour-text">
              <h2><i className="fas fa-vr-cardboard"></i> Take a Virtual Tour</h2>
              <p>
                Experience our facilities from the comfort of your home. Take an interactive 
                virtual tour of our main branch and see what makes SecureBank special.
              </p>
              <button className="btn btn-primary">
                <i className="fas fa-play"></i>
                Start Virtual Tour
              </button>
            </div>
            <div className="tour-preview">
              <div className="tour-placeholder">
                <i className="fas fa-vr-cardboard"></i>
                <p>360° Virtual Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-image">
                <div className="modal-placeholder">
                  <i className="fas fa-image"></i>
                  <p>Image: {selectedImage.title}</p>
                </div>
              </div>
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <div className="modal-meta">
                  <span className="modal-category">
                    <i className="fas fa-tag"></i>
                    {categories.find(c => c.id === selectedImage.category)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
