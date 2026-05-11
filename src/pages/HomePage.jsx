import React, { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Social from '../components/Social'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Social />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage
