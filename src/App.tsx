import { useState } from 'react';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Gallery } from './components/sections/Gallery';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { QuoteCalculator } from './components/sections/QuoteCalculator';
import { Contact } from './components/sections/Contact';
import { ChatWidget } from './components/features/ChatWidget';
import { ScrollProgress } from './components/features/ScrollProgress';
import { PageLoader } from './components/features/PageLoader';
import { ConsultationBookingModal } from './components/features/ConsultationBookingModal';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <PageLoader />
      <AnimatedBackground>
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Process onBookConsultation={() => setBookingOpen(true)} />
          <Testimonials />
          <QuoteCalculator />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </AnimatedBackground>
      <ConsultationBookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

export default App;