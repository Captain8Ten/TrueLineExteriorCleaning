import React from 'react'
import './Services.css'

/** Horizontal deck boards (reads better than a single-log emoji). */
const IconDeckPlanks = () => (
  <svg className="service-icon-svg" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="4" y="10" width="40" height="6.5" rx="1" fill="#c9a06c" />
    <rect x="4" y="18.5" width="40" height="6.5" rx="1" fill="#b8905a" />
    <rect x="4" y="27" width="40" height="6.5" rx="1" fill="#a67d4a" />
    <rect x="4" y="35.5" width="40" height="6.5" rx="1" fill="#8f6a3f" />
  </svg>
)

/** Picket fence silhouette (replaces construction-barrier emoji). */
const IconFence = () => (
  <svg className="service-icon-svg" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="3" y="34" width="42" height="4" rx="1" fill="#6d7a88" />
    <rect x="3" y="22" width="42" height="3.5" rx="1" fill="#8a97a6" />
    <g fill="#5a6570">
      <polygon points="8,11 11,21 11,34 5,34 5,21" />
      <polygon points="16,11 19,21 19,34 13,34 13,21" />
      <polygon points="24,11 27,21 27,34 21,34 21,21" />
      <polygon points="32,11 35,21 35,34 29,34 29,21" />
      <polygon points="40,11 43,21 43,34 37,34 37,21" />
    </g>
  </svg>
)

const SERVICES = [
    {
      icon: '🛣️',
      title: 'Driveways',
      description:
        'Oil spots, tire marks, that dull gray look—I get it. I\'ll hit the concrete or asphalt and bring it back so you\'re loving your driveway again.',
      features: ['Concrete & asphalt', 'Spot treatment where it needs it']
    },
    {
      icon: '🛖',
      title: 'Roofs',
      description:
        'Algae streaks, dark stains, and buildup don\'t belong up there—I soft-wash asphalt shingles so your roof looks cared for without the damage of high-pressure blasting.',
      features: ['Asphalt shingle focus', 'Low-pressure / soft wash']
    },
    {
      icon: <IconDeckPlanks />,
      title: 'Decks & Patios',
      description:
        'Wood gone gray, composite slick with gunk, or pavers fuzzy with mildew—I\'ll have your deck or patio looking brand new.',
      features: ['Wood, composite, pavers', 'Steps & railings']
    },
    {
      icon: <IconFence />,
      title: 'Fences',
      description:
        'Privacy panels, pickets, or board-on-board—same gentle approach as the deck so we lift mildew and weathering without chewing up the wood or finish.',
      features: ['Wood & similar materials', 'Both sides when accessible']
    },
    {
      icon: '🏠',
      title: 'Siding',
      description:
        'Green streaks and algae? I use a soft approach on vinyl and fiber cement so I lift the crud without beating up your paint or siding.',
      features: ['Vinyl & fiber cement', 'Soffits & trim']
    },
    {
      icon: '🚶',
      title: 'Walkways & Sidewalks',
      description:
        'Front walk, side path, that strip of sidewalk everyone sees first—same honest cleanup as the driveway, just scoped to foot traffic and smaller slabs.',
      features: ['Paths & entry walks', 'Steps & landings']
    },
    {
      icon: '📦',
      title: 'Custom or bundle',
      description:
        'Mixing a driveway with walks, siding with a deck, or several spots in one visit? Tell me what you want combined and I\'ll scope it as one job with one straight quote.',
      features: [
        'Combine any of the services above',
        'Spell out each area in your message (or on the contact form)',
        'Single visit and one quote when it makes sense'
      ]
    }
]

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Exterior Cleaning Services</h2>
          <p className="section-subtitle">
            I&apos;m a small shop—pick a single service or use{' '}
            <strong>Custom or bundle</strong> when you want several areas done together. Every job
            gets a clear quote; if something&apos;s not a fit, I&apos;ll say so.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
