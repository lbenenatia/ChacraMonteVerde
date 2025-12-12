import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import AvailabilityChecker from './components/AvailabilityChecker';
import FeaturedServices from './components/FeaturedServices';
import VenueHighlights from './components/VenueHighlights';
import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';

const Homepage = () => {
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowStickyBooking(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingClick = () => {
    const availabilitySection = document.getElementById('availability-checker');
    if (availabilitySection) {
      availabilitySection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <HeroSection onBookingClick={handleBookingClick} />
        
        <section id="availability-checker" className="py-16 lg:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AvailabilityChecker />
          </div>
        </section>

        <FeaturedServices />
        <VenueHighlights />
        <TestimonialsSection />
        <CallToAction />
      </main>

      {showStickyBooking && <AvailabilityChecker isSticky={true} />}
      
      <Footer />
    </div>
  );
};

export default Homepage;