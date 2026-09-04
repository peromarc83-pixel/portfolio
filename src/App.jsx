import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import Hero from '@/sections/Hero.jsx'
import About from '@/sections/About.jsx'
import Skills from '@/sections/Skills.jsx'
import Projects from '@/sections/Projects.jsx'
import Journey from '@/sections/Journey.jsx'
import Contact from '@/sections/Contact.jsx'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
