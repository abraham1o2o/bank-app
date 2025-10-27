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
  // Category filtering removed; simplified gallery
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Reduced set of placeholder images for lightweight gallery
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/bank-exterior.jpg',
      alt: 'Main Branch Exterior',
      title: 'Main Branch Exterior',
      category: 'branches',
      description: 'Flagship branch with modern architecture.'
    },
    {
      id: 2,
      src: '/images/bank-lobby.jpg',
      alt: 'Bank Lobby Interior',
      title: 'Modern Lobby Design',
      category: 'interior',
      description: 'Spacious and welcoming lobby.'
    },
    {
      id: 3,
      src: '/images/atm-center.jpg',
      alt: 'ATM Banking Center',
      title: '24/7 ATM Center',
      category: 'services',
      description: 'Convenient ATM services available round the clock.'
    },
    {
      id: 4,
      src: '/images/drive-thru.jpg',
      alt: 'Drive-Thru Banking',
      title: 'Drive-Thru Services',
      category: 'services',
      description: 'Quick transactions without leaving your vehicle.'
    },
    {
      id: 5,
      src: '/images/community-event.jpg',
      alt: 'Community Event',
      title: 'Community Outreach',
      category: 'community',
      description: 'Engaging with the community through events.'
    },
    {
      id: 6,
      src: '/images/award-ceremony.jpg',
      alt: 'Award Ceremony',
      title: 'Industry Recognition',
      category: 'achievements',
      description: 'Recognized for excellence in banking services.'
    }
  ]

  const filteredImages = galleryImages

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

        {/* Category filter removed to simplify gallery */}

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
                {/* No category badge in simplified gallery */}
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
                    {selectedImage.category}
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
