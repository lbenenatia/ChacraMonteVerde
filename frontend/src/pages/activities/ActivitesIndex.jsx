import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import AmenityCard from './components/AmenityCard';
import ActivityCard from './components/ActivityCard';
import FilterSidebar from './components/FilterSidebar';
import VendorPartnerCard from './components/VendorPartnerCard';
import CertificationBadge from './components/CertificationBadge';
import InteractiveMap from './components/InteractiveMap';
import WeatherWidget from './components/WeatherWidget';

const Activities = () => {
  const [activeTab, setActiveTab] = useState('amenities');
  const [filters, setFilters] = useState({
    categories: [],
    availability: [],
    capacity: [],
    featuredOnly: false
  });
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const amenitiesData = [
  {
    id: 1,
    name: "Grand Event Hall",
    category: "Venue Spaces",
    categoryIcon: "Home",
    image: "https://images.unsplash.com/photo-1684375114796-d46b6cbf9737",
    imageAlt: "Elegant grand event hall with high ceilings, crystal chandeliers, polished wooden floors, and large windows overlooking gardens",
    description: "Spacious main hall with elegant décor, perfect for weddings and large celebrations. Features high ceilings and natural lighting.",
    features: ["Climate Control", "Sound System", "Stage Area", "Dance Floor", "Ambient Lighting"],
    capacity: "Up to 200 guests",
    availability: true,
    featured: true
  },
  {
    id: 2,
    name: "Garden Terrace",
    category: "Outdoor Features",
    categoryIcon: "Trees",
    image: "https://images.unsplash.com/photo-1666210988205-6ab8b79bafd6",
    imageAlt: "Beautiful outdoor garden terrace with manicured lawns, flowering plants, stone pathways, and wooden pergola with string lights",
    description: "Beautiful outdoor space surrounded by nature, ideal for ceremonies and cocktail receptions under the stars.",
    features: ["Natural Shade", "Garden Views", "Pergola", "String Lights", "Stone Pathways"],
    capacity: "Up to 150 guests",
    availability: true,
    featured: true
  },
  {
    id: 3,
    name: "Premium Bar Service",
    category: "Catering & Bar",
    categoryIcon: "Wine",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1714629df-1764866112156.png",
    imageAlt: "Modern premium bar setup with marble countertop, extensive wine collection, professional bartender, and elegant glassware display",
    description: "Fully stocked bar with professional bartenders, offering premium spirits, wines, and custom cocktails.",
    features: ["Premium Spirits", "Wine Selection", "Custom Cocktails", "Professional Staff", "Glassware"],
    capacity: "Full service",
    availability: true,
    featured: false
  },
  {
    id: 4,
    name: "Luxury Guest Suites",
    category: "Accommodation",
    categoryIcon: "Bed",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc75e3ca-1764654999377.png",
    imageAlt: "Luxurious guest suite with king-size bed, modern furnishings, private balcony, and elegant bathroom with marble finishes",
    description: "Comfortable overnight accommodations for guests, featuring modern amenities and scenic views.",
    features: ["King Beds", "Private Bathrooms", "WiFi", "Air Conditioning", "Garden Views"],
    capacity: "10 suites",
    availability: true,
    featured: false
  },
  {
    id: 5,
    name: "Professional Kitchen",
    category: "Catering & Bar",
    categoryIcon: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1721924960863-f241e9f1a9ac",
    imageAlt: "State-of-the-art commercial kitchen with stainless steel appliances, professional chef preparing food, and organized cooking stations",
    description: "State-of-the-art commercial kitchen for catering services, equipped with professional-grade appliances.",
    features: ["Commercial Equipment", "Prep Areas", "Cold Storage", "Serving Stations", "Safety Certified"],
    capacity: "Full catering",
    availability: true,
    featured: false
  },
  {
    id: 6,
    name: "Pool & Lounge Area",
    category: "Outdoor Features",
    categoryIcon: "Waves",
    image: "https://images.unsplash.com/photo-1584747295353-32b9e2a0d10d",
    imageAlt: "Sparkling outdoor swimming pool with surrounding lounge chairs, umbrellas, tropical plants, and sunset view over mountains",
    description: "Refreshing pool area with lounge seating, perfect for daytime events and relaxation.",
    features: ["Heated Pool", "Lounge Chairs", "Umbrellas", "Pool Bar", "Changing Rooms"],
    capacity: "Up to 80 guests",
    availability: true,
    featured: true
  },
  {
    id: 7,
    name: "Audio Visual Equipment",
    category: "Technology",
    categoryIcon: "Wifi",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c75419f2-1764666356653.png",
    imageAlt: "Modern audio visual setup with large projection screen, professional sound system, microphones, and lighting equipment in event space",
    description: "Professional AV equipment including projectors, sound systems, and lighting for presentations and entertainment.",
    features: ["Projector & Screen", "Microphones", "Speakers", "Lighting", "Tech Support"],
    capacity: "Full setup",
    availability: true,
    featured: false
  },
  {
    id: 8,
    name: "Children\'s Play Area",
    category: "Entertainment",
    categoryIcon: "Baby",
    image: "https://images.unsplash.com/photo-1722247483436-f6e70875a062",
    imageAlt: "Safe outdoor children's play area with colorful playground equipment, soft ground surface, shaded seating, and fenced perimeter",
    description: "Safe and supervised play area for children, allowing parents to enjoy the event worry-free.",
    features: ["Playground", "Supervision", "Safety Fencing", "Shade", "Age Appropriate"],
    capacity: "Up to 30 children",
    availability: true,
    featured: false
  }];


  const activitiesData = [
  {
    id: 1,
    name: "Wine Tasting Experience",
    icon: "Wine",
    image: "https://images.unsplash.com/photo-1502394912548-70935c8c30d3",
    imageAlt: "Elegant wine tasting setup with multiple wine glasses, cheese board, sommelier pouring wine, and vineyard view in background",
    description: "Guided wine tasting featuring local and international selections with expert sommelier.",
    duration: "2 hours",
    difficulty: 1,
    groupSize: "10-30 people",
    seasonal: false
  },
  {
    id: 2,
    name: "Nature Walks & Tours",
    icon: "TreePine",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_165f7c306-1765202812578.png",
    imageAlt: "Scenic nature trail through lush forest with wooden pathway, diverse plant life, and guide leading small group of hikers",
    description: "Explore the natural beauty of Monte Verde with guided tours through gardens and trails.",
    duration: "1.5 hours",
    difficulty: 2,
    groupSize: "5-20 people",
    seasonal: false
  },
  {
    id: 3,
    name: "Live Music Performances",
    icon: "Music",
    image: "https://images.unsplash.com/photo-1625116783063-3b21807de0b1",
    imageAlt: "Live band performing on outdoor stage with string lights, acoustic guitars, and intimate audience seating under evening sky",
    description: "Professional musicians available for ceremonies, cocktail hours, and receptions.",
    duration: "Customizable",
    difficulty: 1,
    groupSize: "Any size",
    seasonal: false
  },
  {
    id: 4,
    name: "Outdoor Yoga Sessions",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1687180948580-c4892a9a82c8",
    imageAlt: "Peaceful outdoor yoga class with instructor and participants on mats in garden setting, surrounded by trees and morning sunlight",
    description: "Morning yoga sessions in the garden, perfect for wellness retreats and corporate events.",
    duration: "1 hour",
    difficulty: 2,
    groupSize: "10-25 people",
    seasonal: true
  },
  {
    id: 5,
    name: "Cooking Classes",
    icon: "ChefHat",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11bd10200-1764709901951.png",
    imageAlt: "Interactive cooking class with professional chef demonstrating techniques, participants in aprons preparing dishes at cooking stations",
    description: "Learn to prepare traditional dishes with our professional chefs in hands-on classes.",
    duration: "3 hours",
    difficulty: 3,
    groupSize: "8-15 people",
    seasonal: false
  },
  {
    id: 6,
    name: "Photography Sessions",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1686040358870-8873147d0018",
    imageAlt: "Professional photographer capturing couple in scenic garden location with natural lighting, beautiful landscape, and romantic poses",
    description: "Professional photography services capturing your special moments in stunning natural settings.",
    duration: "2-4 hours",
    difficulty: 1,
    groupSize: "Any size",
    seasonal: false
  }];


  const vendorPartnersData = [
  {
    id: 1,
    name: "Elegancia Catering",
    category: "Catering Services",
    categoryIcon: "UtensilsCrossed",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5b2c502-1764688004933.png",
    logoAlt: "Elegancia Catering logo featuring elegant script typography with chef hat icon and gold accent colors",
    description: "Award-winning catering service specializing in fusion cuisine and custom menus for all event types.",
    specialties: ["Fusion Cuisine", "Custom Menus", "Dietary Options"],
    rating: 5,
    reviews: 127
  },
  {
    id: 2,
    name: "Momentos Photography",
    category: "Photography & Video",
    categoryIcon: "Camera",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f5463059-1764869782585.png",
    logoAlt: "Momentos Photography logo with modern camera lens design, minimalist black and white aesthetic, and professional typography",
    description: "Professional photography and videography team capturing authentic emotions and beautiful moments.",
    specialties: ["Wedding Photography", "Event Coverage", "Drone Footage"],
    rating: 5,
    reviews: 94
  },
  {
    id: 3,
    name: "Flores del Valle",
    category: "Floral Design",
    categoryIcon: "Flower",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9d95714-1765506080134.png",
    logoAlt: "Flores del Valle logo featuring watercolor flower illustration with elegant script font and natural green color palette",
    description: "Creative floral designers creating stunning arrangements that complement your event theme perfectly.",
    specialties: ["Bridal Bouquets", "Centerpieces", "Ceremony Décor"],
    rating: 5,
    reviews: 156
  },
  {
    id: 4,
    name: "Ritmo Musical",
    category: "Entertainment",
    categoryIcon: "Music",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14380fdd1-1764872056027.png",
    logoAlt: "Ritmo Musical logo with musical note design, vibrant colors, modern typography, and sound wave graphic element",
    description: "Versatile entertainment group offering live bands, DJs, and custom music experiences for any celebration.",
    specialties: ["Live Bands", "DJ Services", "Custom Playlists"],
    rating: 4,
    reviews: 83
  }];


  const certificationsData = [
  {
    id: 1,
    name: "Safety Certified",
    icon: "Shield",
    issuer: "National Safety Council",
    year: 2024
  },
  {
    id: 2,
    name: "Eco-Friendly Venue",
    icon: "Leaf",
    issuer: "Green Events Alliance",
    year: 2023
  },
  {
    id: 3,
    name: "Quality Service",
    icon: "Award",
    issuer: "Event Industry Association",
    year: 2024
  },
  {
    id: 4,
    name: "Food Safety",
    icon: "CheckCircle",
    issuer: "Health Department",
    year: 2024
  }];


  const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'capacity', label: 'Capacity (High to Low)' },
  { value: 'category', label: 'Category' }];


  const handleFavorite = (id) => {
    setFavorites((prev) =>
    prev?.includes(id) ? prev?.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      availability: [],
      capacity: [],
      featuredOnly: false
    });
  };

  const filteredAmenities = amenitiesData?.filter((amenity) => {
    if (filters?.featuredOnly && !amenity?.featured) return false;
    if (filters?.categories?.length > 0 && !filters?.categories?.includes(amenity?.category?.toLowerCase()?.replace(/ & /g, '-')?.replace(/ /g, '-'))) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Amenities & Activities - Chacra Monte Verde</title>
        <meta name="description" content="Explore our comprehensive amenities and activities at Chacra Monte Verde. From elegant event spaces to outdoor features, catering services, and entertainment options." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          <section className="relative h-[400px] overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40 z-10" />
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3')"
                }} />

            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Sparkles" size={24} color="var(--color-accent)" />
                  <span className="text-accent font-medium">Discover Our Features</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
                  Amenities & Activities
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Explore our comprehensive range of amenities and activities designed to make your event unforgettable. From elegant spaces to unique experiences.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <button
                    onClick={() => setActiveTab('amenities')}
                    className={`px-6 py-3 rounded-lg font-medium transition-organic ${
                    activeTab === 'amenities' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    Amenities
                  </button>
                  <button
                    onClick={() => setActiveTab('activities')}
                    className={`px-6 py-3 rounded-lg font-medium transition-organic ${
                    activeTab === 'activities' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                    }>

                    Activities
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort by"
                    className="w-48" />

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-organic ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                      }
                      aria-label="Grid view">

                      <Icon name="Grid3x3" size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-organic ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                      }
                      aria-label="List view">

                      <Icon name="List" size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onClearFilters={handleClearFilters} />

                </div>

                <div className="lg:col-span-3">
                  {activeTab === 'amenities' ?
                  <>
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                          Showing {filteredAmenities?.length} of {amenitiesData?.length} amenities
                        </p>
                        {favorites?.length > 0 &&
                      <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-organic">
                            <Icon name="Heart" size={16} className="fill-current" />
                            <span>{favorites?.length} Favorites</span>
                          </button>
                      }
                      </div>

                      <div className={`grid gap-6 ${
                    viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`
                    }>
                        {filteredAmenities?.map((amenity) =>
                      <AmenityCard
                        key={amenity?.id}
                        amenity={amenity}
                        onFavorite={handleFavorite}
                        isFavorited={favorites?.includes(amenity?.id)} />

                      )}
                      </div>
                    </> :

                  <>
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground">
                          Showing {activitiesData?.length} available activities
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activitiesData?.map((activity) =>
                      <ActivityCard key={activity?.id} activity={activity} />
                      )}
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <InteractiveMap amenities={amenitiesData} />
                </div>
                <div>
                  <WeatherWidget />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Icon name="Users" size={24} color="var(--color-primary)" />
                  <span className="text-primary font-medium">Trusted Partners</span>
                </div>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                  Our Vendor Partners
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We collaborate with the finest local vendors to ensure exceptional service and quality for your event.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {vendorPartnersData?.map((vendor) =>
                <VendorPartnerCard key={vendor?.id} vendor={vendor} />
                )}
              </div>

              <div className="text-center">
                <Button variant="outline" iconName="ExternalLink" iconPosition="right">
                  View All Partners
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>);

};

export default Activities;