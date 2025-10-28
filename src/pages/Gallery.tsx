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

  // High-quality online images for the gallery
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&w=800',
      alt: 'Modern Bank Building',
      title: 'Contemporary Banking Center',
      category: 'branches',
      description: 'Our flagship branch featuring stunning glass architecture and sustainable design.'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&w=800',
      alt: 'Digital Banking Interface',
      title: 'Digital Banking Solutions',
      category: 'technology',
      description: 'State-of-the-art digital banking systems for seamless transactions.'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&w=800',
      alt: 'Modern ATM Facility',
      title: '24/7 Smart ATMs',
      category: 'services',
      description: 'Advanced ATMs with contactless technology and smart features.'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&w=800',
      alt: 'Business Meeting',
      title: 'Financial Consulting',
      category: 'services',
      description: 'Expert financial advisors helping you make informed decisions.'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?auto=format&w=800',
      alt: 'Mobile Banking',
      title: 'Mobile Banking App',
      category: 'technology',
      description: 'Banking at your fingertips with our secure mobile application.'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&w=800',
      alt: 'Secure Vault',
      title: 'Advanced Security',
      category: 'security',
      description: 'State-of-the-art security systems protecting your assets.'
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
              <img 
                src={image.src} 
                alt={image.alt} 
                loading="lazy"
                className="gallery-image"
              />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <span className="category-badge">
                  <i className="fas fa-tag"></i>
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Image Counter */}
        <div className="image-counter">
          <p>Showing {filteredImages.length} of {galleryImages.length} images</p>
        </div>

        {/* Virtual tour removed per request */}

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-image">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="modal-img"
                />
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
