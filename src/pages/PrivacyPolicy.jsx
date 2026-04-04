import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <main className="privacy-page">
        <div className="privacy-inner">
          <p className="privacy-back">
            <Link to="/">← Back to home</Link>
          </p>
          <h1>Privacy Policy</h1>
          <p className="privacy-effective">
            <strong>Effective date:</strong> March 29, 2026
          </p>

          <p>
            TrueLine Exterior Cleaning (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            operates this website. This policy describes how we collect, use, and protect personal
            information when you contact us or use our site.
          </p>
          <p>This policy applies to visitors and customers in the United States.</p>

          <h2>Information we collect</h2>
          <p>When you use our contact form or reach out to us, we may collect:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (if you provide it)</li>
            <li>The type of service you are interested in</li>
            <li>Any details you include in your message</li>
          </ul>
          <p>
            We may also collect standard technical data that browsers and servers commonly share
            (such as general device or browser type) through normal website operation and hosting.
          </p>
          <p>
            We may use basic cookies or similar technologies to help the site function properly and
            understand general visitor activity.
          </p>

          <h2>How we use your information</h2>
          <p>We use this information to:</p>
          <ul>
            <li>Respond to your questions and quote requests</li>
            <li>Schedule or discuss services you asked about</li>
            <li>Improve how our website works for visitors</li>
          </ul>
          <p>
            We do not sell your personal information. We do not use your contact details to run
            unrelated marketing lists.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep inquiry and contact information only as long as needed to respond to you,
            follow up on estimates or jobs, and meet ordinary business or legal recordkeeping needs,
            or as required by law.
          </p>

          <h2>Sharing with others</h2>
          <p>
            We may share information with trusted service providers who help us run the website or
            communicate with you (for example, email or hosting), and only so they can perform
            those services for us. We do not authorize them to use your data for their own
            marketing.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable administrative and technical measures to protect your information.
            However, no method of transmission over the internet is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>Your choices</h2>
          <p>
            You may contact us to request access to or deletion of your personal information. We
            will respond within a reasonable timeframe.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            Our services are not directed to children under 13, and we do not knowingly collect
            personal information from children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will revise the effective
            date at the top of this page. Please review it occasionally.
          </p>

          <h2>Contact us</h2>
          <p>
            For questions about this policy or your information, contact us at{' '}
            <a href="mailto:info@truelinecleaning.com">info@truelinecleaning.com</a> or call{' '}
            <a href="tel:+15551234567">(555) 123-4567</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default PrivacyPolicy
