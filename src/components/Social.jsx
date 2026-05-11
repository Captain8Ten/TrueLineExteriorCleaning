import React from 'react'
import {
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
} from '../constants/contactInfo'
import { IconFacebook, IconInstagram } from './icons/SocialBrandIcons'
import './Social.css'

const Social = () => {
  const links = [
    {
      href: SOCIAL_FACEBOOK_URL,
      label: 'Facebook',
      description: 'Updates, promotions, and project photos.',
      Icon: IconFacebook,
      className: 'social-card--facebook',
    },
    {
      href: SOCIAL_INSTAGRAM_URL,
      label: 'Instagram',
      description: 'Before-and-afters.',
      Icon: IconInstagram,
      className: 'social-card--instagram',
    },
  ]

  return (
    <section id="follow" className="social">
      <div className="social-container">
        <div className="section-header social-header">
          <h2 className="section-title">Check out our work</h2>
          <p className="section-subtitle social-subtitle">
            Follow along for photos, reels, and the kind of results you can expect when we roll up
            to your place.
          </p>
        </div>

        <ul className="social-grid">
          {links.map(({ href, label, description, Icon, className }) => (
            <li key={label}>
              <a
                href={href}
                className={`social-card ${className}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-card-icon" aria-hidden="true">
                  <Icon className="social-card-icon-svg" />
                </span>
                <span className="social-card-label">{label}</span>
                <span className="social-card-desc">{description}</span>
                <span className="social-card-cta">
                  Visit {label}
                  <span className="social-card-cta-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Social
