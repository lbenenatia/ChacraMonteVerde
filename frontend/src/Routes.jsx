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
import Login from './pages/login/LoginIndex.jsx';
import Register from './pages/register/RegisterIndex.jsx';
import ProtectedRoute from "ProtectedRoutes.jsx";
import Account from "pages/account/AccountIndex.jsx";
import Profile from "pages/profile/ProfileIndex.jsx";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingConsultation />} />
        <Route path="/gallery" element={<EventGallery />} />
        <Route path="/contact" element={<ContactLocation />} />
        <Route path="/activities" element={<AmenitiesActivities />} />
        <Route path="/pricing" element={<PackagesPricing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
