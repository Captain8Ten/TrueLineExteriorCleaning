import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  formatPhoneInput
} from '../constants/contactInfo'
import {
  IconBriefcase,
  IconClock,
  IconEnvelope,
  IconMapPin,
  IconPhone
} from './icons/ThemeIcons'
import './Contact.css'

// Default: POST /api/contact → Pages Function → email Worker (set EMAIL_WORKER_URL on Pages).
// Or set VITE_CONTACT_API_URL to call the Worker *.workers.dev URL directly.
const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL?.trim() || '/api/contact'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhoneChange = (e) => {
    setFormData({
      ...formData,
      phone: formatPhoneInput(e.target.value)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      let data = {}
      try {
        data = await res.json()
      } catch {
        /* non-JSON response */
      }

      if (!res.ok) {
        setSubmitStatus('error')
        setErrorMessage(
          typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.'
        )
        return
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch {
      setSubmitStatus('error')
      setErrorMessage(
        import.meta.env.DEV
          ? 'Could not reach the email API. In a second terminal run npm run pages:dev (then keep Vite on 5173), or test after deploying to Cloudflare Pages.'
          : 'Could not send right now. Please call or email us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get Your Free Quote</h2>
          <p className="section-subtitle">
            Ready to transform your property? Contact me today for a free estimate
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">
                <IconPhone />
              </span>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${BUSINESS_PHONE_TEL}`}>{BUSINESS_PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">
                <IconEnvelope />
              </span>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">
                <IconMapPin />
              </span>
              <div>
                <strong>Service Area</strong>
                <p>Auburn Hills & Surrounding Areas</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">
                <IconClock />
              </span>
              <div>
                <strong>Business Contact Hours</strong>
                <p>Every day: 8:00 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">
                <IconBriefcase />
              </span>
              <div>
                <strong>Business working hours</strong>
                <p className="contact-working-hours-text">
                  Afternoon through evening and weekend work available, weather permitting.
                </p>
              </div>
            </div>
            <p className="contact-response">
              My goal is to respond within 24 hours or less—often sooner.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
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
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder={BUSINESS_PHONE_DISPLAY}
                maxLength={12}
                aria-describedby="phone-hint"
              />
              <span id="phone-hint" className="field-hint">
                Numbers only — dashes are added automatically.
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Needed</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <optgroup label="Individual services">
                  <option value="driveways">Driveways</option>
                  <option value="decks-patios">Decks & Patios</option>
                  <option value="siding">Siding</option>
                  <option value="walkways">Walkways & Sidewalks</option>
                  <option value="other">Other</option>
                </optgroup>
                <optgroup label="Bundles (save on your total project)">
                  <option value="bundle-driveway-siding">Driveway + Siding</option>
                  <option value="bundle-driveway-walkways">Driveway + Walkways &amp; Sidewalks</option>
                  <option value="bundle-deck-siding">Decks/Patios + Siding</option>
                  <option value="bundle-driveway-deck">Driveway + Decks/Patios</option>
                  <option value="bundle-custom">Custom bundle (describe below)</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="form-success">
                Thank you! We'll contact you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-error" role="alert">
                {errorMessage}
              </div>
            )}

            <p className="contact-privacy-note">
              By sending this form, you agree we may use your details to respond to your request.{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Request Free Quote'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
