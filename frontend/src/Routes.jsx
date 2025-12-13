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
        <Route path="/booking" element={<BookingConsultation />} />
        <Route path="/gallery" element={<EventGallery />} />
        <Route path="/contact" element={<ContactLocation />} />
        <Route path="/activities" element={<AmenitiesActivities />} />
        <Route path="/pricing" element={<PackagesPricing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
