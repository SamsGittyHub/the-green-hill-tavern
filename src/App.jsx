import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Menu from './components/Menu'
import WhatsOn from './components/WhatsOn'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import FindUs from './components/FindUs'
import Book from './components/Book'
import Footer from './components/Footer'

export default function App() {
  return (
    // reducedMotion="user": transforms are dropped for visitors who ask for less motion; opacity fades remain
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[70] rounded bg-brass px-4 py-2 text-fascia focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <>
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Marquee />
          <Menu />
          <WhatsOn />
          <Gallery />
          <Reviews />
          <FindUs />
          <Book />
        </main>
        <Footer />
      </>
    </MotionConfig>
  )
}
