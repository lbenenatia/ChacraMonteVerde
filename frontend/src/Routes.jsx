import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookingConsultation from './pages/booking/BookingIndex.jsx';
import EventGallery from './pages/gallery/GalleryIndex.jsx';
import ContactLocation from './pages/contact/ContactIndex.jsx';
import AmenitiesActivities from './pages/activities/ActivitesIndex.jsx';
import PackagesPricing from './pages/pricing/PricingIndex.jsx';
import Homepage from './pages/homepage/HomepageIndex.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/booking-consultation" element={<BookingConsultation />} />
        <Route path="/event-gallery" element={<EventGallery />} />
        <Route path="/contact-location" element={<ContactLocation />} />
        <Route path="/amenities-activities" element={<AmenitiesActivities />} />
        <Route path="/packages-pricing" element={<PackagesPricing />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
