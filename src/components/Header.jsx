import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSectionNav = (sectionId) => (e) => {
    setIsMobileMenuOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      scrollToSection(sectionId)
    }
  }

  const handleLogoClick = (e) => {
    setIsMobileMenuOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      scrollToSection('hero')
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-container" onClick={handleLogoClick}>
          <img
            src="/TrueLineExteriorCleaningLogoNoWords.png"
            alt="TrueLine Exterior Cleaning Logo"
            className="logo"
          />
          <div className="logo-text">
            <span className="logo-title">TRUELINE</span>
            <span className="logo-subtitle">EXTERIOR CLEANING</span>
          </div>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to={{ pathname: '/', hash: '#services' }} onClick={handleSectionNav('services')}>
            Services
          </Link>
          <Link to={{ pathname: '/', hash: '#about' }} onClick={handleSectionNav('about')}>
            About
          </Link>
          <Link to={{ pathname: '/', hash: '#follow' }} onClick={handleSectionNav('follow')}>
            Follow us
          </Link>
          <Link to={{ pathname: '/', hash: '#contact' }} onClick={handleSectionNav('contact')}>
            Contact
          </Link>
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            onClick={handleSectionNav('contact')}
            className="cta-button"
          >
            Get Quote
          </Link>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
