import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GalleryFilters from './components/GalleryFilters';
import GalleryGrid from './components/GalleryGrid';
import LightboxModal from './components/LightboxModal';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import TestimonialCard from './components/TestimonialCard';
import InspirationBoard from './components/InspirationBoard';
import CapacityShowcase from './components/CapacityShowcase';

const EventGallery = () => {
  const [filters, setFilters] = useState({
    eventType: 'all',
    season: 'all',
    guestCount: 'all',
    style: 'all',
    timeOfDay: 'all'
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [activeTab, setActiveTab] = useState('gallery');

  const galleryImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1679526758968-23952a1bece9",
    imageAlt: "Elegant outdoor wedding ceremony with white chairs arranged in rows under natural tree canopy with hanging floral decorations and string lights at sunset",
    title: "Ceremonia al Atardecer",
    description: "Boda íntima bajo los árboles centenarios con decoración floral suspendida",
    eventType: "Bodas",
    season: "Primavera",
    guestCount: 120,
    style: "Elegante",
    timeOfDay: "evening",
    date: "15 de Octubre, 2024",
    photographer: "María González Photography"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1657556677440-2e6732b5c351",
    imageAlt: "Rustic outdoor reception with long wooden tables decorated with white linens, wildflower centerpieces, and Edison bulb string lights overhead in natural garden setting",
    title: "Recepción Rústica",
    description: "Cena al aire libre con mesas largas y decoración campestre elegante",
    eventType: "Bodas",
    season: "Verano",
    guestCount: 180,
    style: "Rústico",
    timeOfDay: "evening",
    date: "22 de Enero, 2024",
    photographer: "Studio Luz Natural"
  },
  {
    id: 3,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_157a9030c-1764648555191.png",
    imageAlt: "Corporate team building event with professional attendees in business casual attire participating in outdoor activities on green lawn with modern tent structures",
    title: "Retiro Corporativo",
    description: "Evento de team building con actividades al aire libre y espacios de networking",
    eventType: "Eventos Corporativos",
    season: "Otoño",
    guestCount: 85,
    style: "Moderno",
    timeOfDay: "afternoon",
    date: "8 de Abril, 2024",
    photographer: "Corporate Vision Media"
  },
  {
    id: 4,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d2bd513-1765065127701.png",
    imageAlt: "Quinceañera celebration with young woman in pink ball gown standing on decorated stage with floral arch, surrounded by guests in formal attire under evening lights",
    title: "Quinceañera de Ensueño",
    description: "Celebración de 15 años con decoración en tonos rosados y dorados",
    eventType: "Quinceañeras",
    season: "Primavera",
    guestCount: 200,
    style: "Elegante",
    timeOfDay: "evening",
    date: "3 de Noviembre, 2024",
    photographer: "Momentos Especiales"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1728051104698-3610d2e7a353",
    imageAlt: "Intimate anniversary dinner setup with round table for two decorated with candles, rose petals, and elegant place settings in romantic garden corner at twilight",
    title: "Aniversario Íntimo",
    description: "Cena romántica para celebración de 25 años de matrimonio",
    eventType: "Aniversarios",
    season: "Invierno",
    guestCount: 45,
    style: "Clásico",
    timeOfDay: "evening",
    date: "14 de Febrero, 2024",
    photographer: "Amor Eterno Photography"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1690552154083-4c7d3322cdd7",
    imageAlt: "Bohemian style wedding reception with macramé decorations, pampas grass arrangements, low seating areas with colorful cushions, and dreamcatcher installations in natural outdoor setting",
    title: "Boda Bohemia",
    description: "Celebración con estilo boho-chic y decoración natural",
    eventType: "Bodas",
    season: "Verano",
    guestCount: 95,
    style: "Bohemio",
    timeOfDay: "afternoon",
    date: "19 de Diciembre, 2024",
    photographer: "Wild Heart Studios"
  },
  {
    id: 7,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1899113c4-1764876590003.png",
    imageAlt: "Corporate cocktail networking event with business professionals mingling around high-top tables, bartender serving drinks, and modern lounge furniture in elegant outdoor venue at dusk",
    title: "Cóctel Corporativo",
    description: "Evento de networking empresarial con catering gourmet",
    eventType: "Eventos Corporativos",
    season: "Otoño",
    guestCount: 150,
    style: "Moderno",
    timeOfDay: "evening",
    date: "27 de Marzo, 2024",
    photographer: "Business Events Pro"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1721677337543-37b07e7e28b5",
    imageAlt: "Morning garden wedding ceremony with bride and groom exchanging vows under white floral arch, guests seated on white chairs, surrounded by blooming spring flowers and natural greenery",
    title: "Ceremonia Matutina",
    description: "Boda en jardín con ceremonia al amanecer",
    eventType: "Bodas",
    season: "Primavera",
    guestCount: 110,
    style: "Clásico",
    timeOfDay: "morning",
    date: "5 de Septiembre, 2024",
    photographer: "Dawn Light Photography"
  },
  {
    id: 9,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13839f01e-1764657453074.png",
    imageAlt: "Large family reunion celebration with multiple generations gathered around decorated picnic tables, children playing in background, colorful balloons and banners in spacious outdoor area",
    title: "Reunión Familiar",
    description: "Celebración de reencuentro familiar con actividades para todas las edades",
    eventType: "Celebraciones",
    season: "Verano",
    guestCount: 250,
    style: "Rústico",
    timeOfDay: "afternoon",
    date: "12 de Enero, 2024",
    photographer: "Familia Unida Photos"
  }];


  const beforeAfterExamples = [
  {
    id: 1,
    title: "Transformación de Ceremonia",
    beforeImage: "https://images.unsplash.com/photo-1564336070470-722f1579d49d",
    beforeImageAlt: "Empty outdoor venue space with natural grass lawn, scattered trees, and basic wooden benches before event setup",
    afterImage: "https://images.unsplash.com/photo-1566231900271-8b6bcb8baea8",
    afterImageAlt: "Same outdoor space transformed into elegant wedding ceremony with white chairs, floral arch, hanging decorations, and professional lighting setup"
  },
  {
    id: 2,
    title: "Transformación de Recepción",
    beforeImage: "https://images.unsplash.com/photo-1641216509809-590d0f38e960",
    beforeImageAlt: "Plain covered pavilion structure with concrete floor and basic wooden support beams in natural outdoor setting",
    afterImage: "https://images.unsplash.com/photo-1657556677440-2e6732b5c351",
    afterImageAlt: "Pavilion transformed into elegant reception venue with long decorated tables, string lights, floral centerpieces, and sophisticated table settings"
  }];


  const testimonials = [
  {
    id: 1,
    clientName: "Laura y Martín Rodríguez",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1040de6b2-1763293731979.png",
    clientImageAlt: "Professional portrait of smiling Hispanic woman with long dark hair wearing elegant white dress",
    eventType: "Boda",
    eventDate: "15 de Octubre, 2024",
    eventImage: "https://img.rocket.new/generatedImages/rocket_gen_img_142c76993-1765128130837.png",
    eventImageAlt: "Romantic wedding ceremony setup with couple standing under floral arch surrounded by guests in outdoor garden setting at sunset",
    testimonial: "Chacra Monte Verde superó todas nuestras expectativas. El equipo transformó nuestra visión en realidad, cuidando cada detalle. El entorno natural creó la atmósfera perfecta para nuestra ceremonia. Nuestros invitados aún hablan de lo mágico que fue ese día.",
    highlights: ["Atención personalizada", "Entorno natural", "Coordinación perfecta"],
    vendorPartners: ["Flores del Valle", "Catering Gourmet", "Fotografía Luz Natural"]
  },
  {
    id: 2,
    clientName: "Empresa TechInnovate",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_123ab4c0a-1763296550271.png",
    clientImageAlt: "Professional headshot of Hispanic businessman with short black hair wearing navy blue suit and tie",
    eventType: "Retiro Corporativo",
    eventDate: "8 de Abril, 2024",
    eventImage: "https://img.rocket.new/generatedImages/rocket_gen_img_157a9030c-1764648555191.png",
    eventImageAlt: "Corporate team building event with business professionals participating in outdoor activities on green lawn with modern tent structures",
    testimonial: "Organizamos nuestro retiro anual en Monte Verde y fue un éxito rotundo. Las instalaciones permitieron combinar sesiones de trabajo con actividades al aire libre. El equipo fue extremadamente profesional y flexible con nuestras necesidades cambiantes.",
    highlights: ["Espacios versátiles", "Tecnología moderna", "Catering excepcional"],
    vendorPartners: ["AV Solutions", "Corporate Catering", "Team Building Pro"]
  },
  {
    id: 3,
    clientName: "Familia Méndez",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_117e29f1b-1763295563764.png",
    clientImageAlt: "Warm portrait of mature Hispanic woman with gray hair and kind smile wearing elegant burgundy dress",
    eventType: "Quinceañera",
    eventDate: "3 de Noviembre, 2024",
    eventImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17d2bd513-1765065127701.png",
    eventImageAlt: "Quinceañera celebration with young woman in pink ball gown on decorated stage with floral arch surrounded by guests in formal attire",
    testimonial: "La quinceañera de nuestra hija fue un sueño hecho realidad. Monte Verde ofreció el escenario perfecto para esta celebración tan especial. La coordinación fue impecable y pudimos disfrutar cada momento sin preocupaciones.",
    highlights: ["Decoración personalizada", "Espacio amplio", "Servicio excepcional"],
    vendorPartners: ["Eventos Mágicos", "DJ Fiesta", "Pastelería Dulce Sueño"]
  }];


  const capacityExamples = [
  {
    id: 1,
    title: "Eventos Íntimos",
    description: "Perfecto para celebraciones pequeñas y personales",
    capacity: "30-50",
    area: "Jardín Secreto",
    setup: "Mesas redondas",
    image: "https://images.unsplash.com/photo-1707069443191-956103595620",
    imageAlt: "Intimate outdoor dinner setup with round table for small group decorated with candles and elegant place settings in secluded garden corner",
    features: ["Ambiente íntimo", "Servicio personalizado", "Decoración exclusiva"]
  },
  {
    id: 2,
    title: "Eventos Medianos",
    description: "Ideal para bodas y celebraciones familiares",
    capacity: "100-150",
    area: "Terraza Principal",
    setup: "Mesas largas",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16bff4ff3-1765182096691.png",
    imageAlt: "Medium-sized outdoor reception with long wooden tables decorated with white linens and wildflower centerpieces under string lights",
    features: ["Espacio versátil", "Pista de baile", "Zona lounge"]
  },
  {
    id: 3,
    title: "Eventos Grandes",
    description: "Capacidad para grandes celebraciones",
    capacity: "200-300",
    area: "Campo Abierto",
    setup: "Configuración mixta",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e246313-1764749519297.png",
    imageAlt: "Large outdoor event space with multiple decorated tables accommodating hundreds of guests in spacious open field setting",
    features: ["Amplio espacio", "Múltiples zonas", "Estacionamiento"]
  },
  {
    id: 4,
    title: "Eventos Corporativos",
    description: "Espacios profesionales para empresas",
    capacity: "50-100",
    area: "Salón Ejecutivo",
    setup: "Teatro/Banquete",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c75419f2-1764666356653.png",
    imageAlt: "Corporate event space with professional seating arrangement, presentation area, and modern amenities for business gatherings",
    features: ["Tecnología AV", "WiFi alta velocidad", "Salas de reuniones"]
  }];


  const filteredImages = useMemo(() => {
    return galleryImages?.filter((image) => {
      if (filters?.eventType !== 'all' && image?.eventType !== filters?.eventType) return false;
      if (filters?.season !== 'all' && image?.season !== filters?.season) return false;
      if (filters?.style !== 'all' && image?.style !== filters?.style) return false;
      if (filters?.timeOfDay !== 'all' && image?.timeOfDay !== filters?.timeOfDay) return false;

      if (filters?.guestCount !== 'all') {
        const count = image?.guestCount;
        switch (filters?.guestCount) {
          case 'intimate':
            if (count > 50) return false;
            break;
          case 'medium':
            if (count < 51 || count > 150) return false;
            break;
          case 'large':
            if (count < 151 || count > 300) return false;
            break;
          case 'grand':
            if (count < 300) return false;
            break;
        }
      }

      return true;
    });
  }, [filters, galleryImages]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      eventType: 'all',
      season: 'all',
      guestCount: 'all',
      style: 'all',
      timeOfDay: 'all'
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSaveToBoard = (imageId, isSaved) => {
    if (isSaved) {
      const image = galleryImages?.find((img) => img?.id === imageId);
      setSavedImages((prev) => [...prev, image]);
    } else {
      setSavedImages((prev) => prev?.filter((img) => img?.id !== imageId));
    }
  };

  const handleRemoveFromBoard = (imageId) => {
    setSavedImages((prev) => prev?.filter((img) => img?.id !== imageId));
  };

  const handleClearBoard = () => {
    setSavedImages([]);
  };

  return (
    <>
      <Helmet>
        <title>Galería de Eventos - Chacra Monte Verde</title>
        <meta
          name="description"
          content="Explora nuestra galería de eventos realizados en Chacra Monte Verde. Bodas, eventos corporativos, quinceañeras y celebraciones en un entorno natural único." />

      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_193098b22-1765340743825.png"
                alt="Elegant outdoor wedding venue with decorated ceremony space under natural tree canopy at sunset showcasing Chacra Monte Verde's event capabilities"
                className="w-full h-full object-cover" />

            </div>
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Galería de Eventos
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Descubre cómo transformamos sueños en realidad. Cada imagen cuenta una historia única de celebración y alegría.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/booking-consultation">
                    <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
                      Reservar Consulta
                    </Button>
                  </Link>
                  <Link to="/packages-pricing">
                    <Button variant="outline" size="lg" iconName="Package" iconPosition="left">
                      Ver Paquetes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-8">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-6 py-3 rounded-lg font-medium transition-organic ${
                  activeTab === 'gallery' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`
                  }>

                  <Icon name="Image" size={20} className="inline mr-2" />
                  Galería
                </button>
                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-6 py-3 rounded-lg font-medium transition-organic ${
                  activeTab === 'testimonials' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`
                  }>

                  <Icon name="MessageSquare" size={20} className="inline mr-2" />
                  Testimonios
                </button>
                <button
                  onClick={() => setActiveTab('capacity')}
                  className={`px-6 py-3 rounded-lg font-medium transition-organic ${
                  activeTab === 'capacity' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`
                  }>

                  <Icon name="Users" size={20} className="inline mr-2" />
                  Capacidad
                </button>
              </div>

              {activeTab === 'gallery' &&
              <div className="space-y-8">
                  <GalleryFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters} />


                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      Mostrando {filteredImages?.length} de {galleryImages?.length} imágenes
                    </p>
                  </div>

                  <GalleryGrid
                  images={filteredImages}
                  onImageClick={handleImageClick}
                  onSaveToBoard={handleSaveToBoard} />


                  <div className="mt-12 space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                        Transformaciones Antes y Después
                      </h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Observa cómo nuestro equipo transforma espacios naturales en escenarios de ensueño
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {beforeAfterExamples?.map((example) =>
                    <BeforeAfterSlider
                      key={example?.id}
                      title={example?.title}
                      beforeImage={example?.beforeImage}
                      beforeImageAlt={example?.beforeImageAlt}
                      afterImage={example?.afterImage}
                      afterImageAlt={example?.afterImageAlt} />

                    )}
                    </div>
                  </div>
                </div>
              }

              {activeTab === 'testimonials' &&
              <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                      Historias de Nuestros Clientes
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Conoce las experiencias de quienes confiaron en nosotros para sus momentos más especiales
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {testimonials?.map((testimonial) =>
                  <TestimonialCard key={testimonial?.id} testimonial={testimonial} />
                  )}
                  </div>

                  <div className="bg-primary/10 rounded-lg p-8 text-center">
                    <Icon name="Quote" size={48} color="var(--color-primary)" className="mx-auto mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                      ¿Listo para Crear Tu Propia Historia?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Únete a las familias y empresas que han confiado en Chacra Monte Verde para sus celebraciones más importantes
                    </p>
                    <Link to="/booking-consultation">
                      <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
                        Agendar Consulta Gratuita
                      </Button>
                    </Link>
                  </div>
                </div>
              }

              {activeTab === 'capacity' &&
              <CapacityShowcase capacityExamples={capacityExamples} />
              }
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
            <div className="max-w-7xl mx-auto text-center">
              <Icon name="Sparkles" size={48} color="var(--color-primary)" className="mx-auto mb-4" />
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Comienza a Planear Tu Evento
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nuestro equipo está listo para ayudarte a crear una experiencia inolvidable. Explora nuestros paquetes o agenda una visita al lugar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/packages-pricing">
                  <Button variant="default" size="lg" iconName="Package" iconPosition="left">
                    Ver Paquetes y Precios
                  </Button>
                </Link>
                <Link to="/amenities-activities">
                  <Button variant="outline" size="lg" iconName="Sparkles" iconPosition="left">
                    Explorar Amenidades
                  </Button>
                </Link>
                <Link to="/contact-location">
                  <Button variant="outline" size="lg" iconName="MapPin" iconPosition="left">
                    Visitar el Lugar
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {selectedImage &&
        <LightboxModal
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage} />

        }

        <InspirationBoard
          savedImages={savedImages}
          onRemoveImage={handleRemoveFromBoard}
          onClearBoard={handleClearBoard} />

      </div>
    </>);

};

export default EventGallery;