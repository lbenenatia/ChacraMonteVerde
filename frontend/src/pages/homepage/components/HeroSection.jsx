import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onBookingClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const seasonalImages = [
  {
    src: "https://images.unsplash.com/photo-1566231900271-8b6bcb8baea8",
    alt: "Elegant outdoor wedding ceremony setup with white chairs arranged in rows facing a natural arch decorated with white flowers and greenery in a lush garden setting",
    season: "Primavera",
    title: "Celebraciones de Primavera"
  },
  {
    src: "https://images.unsplash.com/photo-1657556677440-2e6732b5c351",
    alt: "Summer evening outdoor reception with string lights illuminating dining tables set with white linens under mature trees in golden hour lighting",
    season: "Verano",
    title: "Reuniones de Verano"
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_16bff4ff3-1765182096691.png",
    alt: "Autumn wedding reception featuring warm amber lighting with rustic wooden tables decorated with orange and gold seasonal flowers surrounded by fall foliage",
    season: "Otoño",
    title: "Romance de Otoño"
  },
  {
    src: "https://images.unsplash.com/photo-1447761589998-e59abcc631b9",
    alt: "Winter celebration in elegant indoor venue with crystal chandeliers, white draped tables, and large windows showing snow-covered landscape outside",
    season: "Invierno",
    title: "Elegancia Invernal"
  }];


  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % seasonalImages?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = seasonalImages?.[currentImageIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage?.src}
          alt={currentImage?.alt}
          className="w-full h-full object-cover transition-organic-slow" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-organic ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium">
            <Icon name="TreePine" size={16} className="mr-2" />
            {currentImage?.season} • {currentImage?.title}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Chacra Monte Verde
        </h1>

        <div className="space-y-4 mb-8">
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Donde los sueños florecen en armonía con la naturaleza
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Tu visión, nuestro lienzo. Arraigados en la belleza, cultivando recuerdos en armonía con la elegancia de la naturaleza.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            variant="default"
            size="lg"
            onClick={onBookingClick}
            iconName="Calendar"
            iconPosition="left"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">

            Reservar Consulta
          </Button>

          {/* Video de la chacra para un futuro */}

          {/* <Button
            variant="outline"
            size="lg"
            iconName="Play"
            iconPosition="left"
            className="border-white text-white hover:bg-white hover:text-foreground px-8 py-4">

            Ver Video Tour
          </Button> */}
          
        </div>

        <div className="flex justify-center space-x-2">
          {seasonalImages?.map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-organic ${
            index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`
            }
            aria-label={`View ${seasonalImages?.[index]?.season} image`} />

          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} color="white" />
      </div>
    </section>);

};

export default HeroSection;