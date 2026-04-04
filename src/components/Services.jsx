import React from 'react'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: '🛣️',
      title: 'Driveways',
      description:
        'Oil spots, tire marks, that dull gray look—I get it. I\'ll hit the concrete or asphalt and bring it back so you\'re loving your driveway again.',
      pricingLines: ['Small: $150', 'Medium: $200', 'Large: $250+'],
      features: ['Concrete & asphalt', 'Spot treatment where it needs it', 'You get a real quote before I start']
    },
    {
      icon: '🪵',
      title: 'Decks, Patios, & Fences',
      description:
        'Wood gone gray, composite slick with gunk, or pavers fuzzy with mildew—I\'ll have your deck or patio looking brand new.',
      pricingLines: ['Small: $150', 'Medium: $200', 'Large / detailed: $300+'],
      features: ['Wood, composite, pavers', 'Steps & railings', 'Happy to talk stain or seal after']
    },
    {
      icon: '🏠',
      title: 'Siding',
      description:
        'Green streaks and algae? I use a soft approach on vinyl and fiber cement so I lift the crud without beating up your paint or siding.',
      pricingLines: ['1-story: $200', '2-story: $300+'],
      features: ['Vinyl & fiber cement', 'Soffits & trim', 'Low-pressure where it matters']
    },
    {
      icon: '🚶',
      title: 'Walkways & Sidewalks',
      description:
        'Front walk, side path, that strip of sidewalk everyone sees first—same honest cleanup as the driveway, just scoped to foot traffic and smaller slabs.',
      pricingLines: ['Small: $100', 'Medium: $150', 'Large: $200+'],
      features: ['Paths & entry walks', 'Steps & landings', 'Pairs great with a driveway clean']
    }
  ]

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Exterior Cleaning Services</h2>
          <p className="section-subtitle">
            I&apos;m a small shop—I focus on a few jobs and do them right. If it&apos;s not on the
            list, ask anyway; I&apos;ll tell you straight if I&apos;m the right fit.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-pricing" aria-label="Starting prices">
                <p className="service-pricing-label">Starting at:</p>
                <ul className="service-pricing-list">
                  {service.pricingLines.map((line, i) => (
                    <li key={i} className="service-pricing-line">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="services-bundle">
          <strong>Bundle &amp; save:</strong> Combine multiple services (like driveway + sidewalk) and
          save on your total project.
        </p>
      </div>
    </section>
  )
}

export default Services
