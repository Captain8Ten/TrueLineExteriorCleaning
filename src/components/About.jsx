import React from 'react'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title about-heading">About TrueLine Exterior Cleaning</h2>

          <div className="about-body">
            <p className="about-description">
            TrueLine is a locally owned business built right here in the community. I focus on doing a few jobs and doing them right—with professional equipment, solid technique, and real attention to detail.
            </p>
            <p className="about-description">
              As a small local business, everything runs on trust and referrals. You get fair pricing,
              free estimates, and direct communication from the person doing the work.
            </p>
            <p className="about-description">
              If your home could use a refresh, I&apos;d be happy to take a look and give you a quick
              quote.
            </p>
          </div>

          <div className="about-image">
            <div className="about-highlight-panel" aria-label="What we stand for">
              <p className="about-highlight-tagline">Local · Owner-operated</p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Customer satisfaction</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Competitive pricing (No hidden fees)</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    Owner on every job (You'll deal with me directly)
                  </span>
                </div>
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Fully insured (For your peace of mind)</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Professional equipment &amp; techniques</span>
                </div>
                <div className="about-feature">
                  <span className="feature-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>Free estimates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
