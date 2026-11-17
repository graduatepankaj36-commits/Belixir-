import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { ResultsSection } from './components/ResultsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';

export default function App() {
  const [preselectedService, setPreselectedService] = useState('');
  const [preselectedNote, setPreselectedNote] = useState('');

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('#contact');
  };

  const handleStartSimilarProject = (projectTitle: string) => {
    setPreselectedNote(projectTitle);
    scrollToSection('#contact');
  };

  return (
    <div className="min-h-screen bg-[#06060A] text-[#F4F5F8] overflow-x-clip">
      <Navbar onStartProject={() => scrollToSection('#contact')} />

      <main>
        <HeroSection
          onPrimaryCta={() => scrollToSection('#contact')}
          onSecondaryCta={() => scrollToSection('#portfolio')}
        />

        <ServicesSection onSelectService={handleSelectService} />

        <WhyChooseUsSection />

        <PortfolioSection onStartSimilarProject={handleStartSimilarProject} />

        <ResultsSection />

        <ContactSection
          preselectedService={preselectedService}
          preselectedNote={preselectedNote}
        />
      </main>

      <Footer onSelectService={handleSelectService} />

      <WhatsAppFloatingButton />
    </div>
  );
}
