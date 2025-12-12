import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LightboxModal = ({ image, images, onClose, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (image && images) {
      const index = images?.findIndex(img => img?.id === image?.id);
      setCurrentIndex(index);
    }
  }, [image, images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'Escape') onClose();
      if (e?.key === 'ArrowLeft') handlePrevious();
      if (e?.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onNavigate(images?.[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < images?.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onNavigate(images?.[newIndex]);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image?.title,
          text: image?.description,
          url: window.location?.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image?.image;
    link.download = `chacra-monteverde-${image?.id}.jpg`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-organic"
            aria-label="Cerrar"
          >
            <Icon name="X" size={24} color="white" />
          </button>
          <div className="text-white">
            <h3 className="font-serif text-lg font-semibold">{image?.title}</h3>
            <p className="text-sm opacity-80">
              {currentIndex + 1} de {images?.length}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-organic"
            aria-label="Compartir"
          >
            <Icon name="Share2" size={20} color="white" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-organic"
            aria-label="Descargar"
          >
            <Icon name="Download" size={20} color="white" />
          </button>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
          <Image
            src={image?.image}
            alt={image?.imageAlt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-organic flex items-center justify-center"
          aria-label="Imagen anterior"
        >
          <Icon name="ChevronLeft" size={28} color="white" />
        </button>
      )}
      {currentIndex < images?.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-organic flex items-center justify-center"
          aria-label="Siguiente imagen"
        >
          <Icon name="ChevronRight" size={28} color="white" />
        </button>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-4xl mx-auto">
          <p className="text-white text-sm mb-3">{image?.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded text-white text-sm font-medium">
              {image?.eventType}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-sm">
              {image?.guestCount} invitados
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-sm">
              {image?.season}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-sm">
              {image?.style}
            </span>
          </div>
          <div className="flex items-center justify-between text-white text-sm opacity-80">
            <span>{image?.date}</span>
            <span>Fotografía: {image?.photographer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;