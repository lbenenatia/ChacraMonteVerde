import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import FeaturedServices from './components/FeaturedServices';
import VenueHighlights from './components/VenueHighlights';
import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';

const Homepage = () => {

  return (
    <>
    <Helmet>
      <title>Chacra Monte Verde</title>
      <meta
        name="description"
        content="Encuentra toda la información sobre Chacra Monte Verde, un lugar único para eventos y estadías naturales en Maldonado, Uruguay." />
    </Helmet>
    <div className="min-h-screen bg-background">
    <Header />
    
    <main className="main-content">
      <HeroSection />

      <FeaturedServices />
      <VenueHighlights />
      <TestimonialsSection />
      <CallToAction />
    </main>
    
    <Footer />
    </div>
    </>
  );
};

export default Homepage;