import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import FeaturedServices from './components/FeaturedServices';
import VenueHighlights from './components/VenueHighlights';
import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';

const Homepage = () => {

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

        <FeaturedServices />
        <VenueHighlights />
        <TestimonialsSection />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;