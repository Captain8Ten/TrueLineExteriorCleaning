import React from 'react'
import './Hero.css'

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-logo-container">
          <img 
            src="/TrueLineExteriorCleaningLogo.png" 
            alt="TrueLine Exterior Cleaning Logo" 
            className="hero-logo"
          />
        </div>
        <h1 className="hero-title">
          Professional <span className="highlight">Power Washing</span> Services
        </h1>
        <p className="hero-subtitle">
          Transform your property with our expert exterior cleaning solutions.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={scrollToContact}>
            Get Free Quote
          </button>
          <button className="btn-secondary" onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Our Services
          </button>
        </div>
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Fully Insured</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Local Business</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Free Estimates</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

