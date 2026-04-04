import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from '../constants/contactInfo'
import './Footer.css'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goToSection = (sectionId) => (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      navigate({ pathname: '/', hash: `#${sectionId}` })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src="/TrueLineExteriorCleaningLogo.png"
                alt="TrueLine Exterior Cleaning Logo"
                className="footer-logo-img"
              />
              <div className="footer-logo-text">
                <span className="footer-logo-title">TRUELINE</span>
                <span className="footer-logo-subtitle">EXTERIOR CLEANING</span>
              </div>
            </div>
            <p className="footer-description">
              Local, owner-operated pressure washing in Auburn Hills and the surrounding area.
              Driveways, decks and patios, siding, and walkways—fair pricing and the person who
              quotes the job is who shows up.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Quick links</h3>
            <ul className="footer-links">
              <li>
                <a href="/#services" onClick={goToSection('services')}>
                  Services
                </a>
              </li>
              <li>
                <a href="/#about" onClick={goToSection('about')}>
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" onClick={goToSection('contact')}>
                  Contact &amp; quotes
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li>Driveways</li>
              <li>Decks &amp; patios</li>
              <li>Siding</li>
              <li>Walkways &amp; sidewalks</li>
              <li>Bundles (combine multiple services)</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li>
                <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
              </li>
              <li>
                <span className="footer-contact-label">Service area</span>
                Auburn Hills &amp; surrounding areas
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TrueLine Exterior Cleaning. All rights reserved.</p>
          <p className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
