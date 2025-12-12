import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryGrid = ({ images, onImageClick, onSaveToBoard }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [savedImages, setSavedImages] = useState(new Set());

  const handleSaveToggle = (imageId, e) => {
    e?.stopPropagation();
    const newSaved = new Set(savedImages);
    if (newSaved?.has(imageId)) {
      newSaved?.delete(imageId);
    } else {
      newSaved?.add(imageId);
    }
    setSavedImages(newSaved);
    onSaveToBoard(imageId, !savedImages?.has(imageId));
  };

  if (images?.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon name="ImageOff" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          No se encontraron imágenes
        </h3>
        <p className="text-muted-foreground">
          Intenta ajustar tus filtros para ver más resultados
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images?.map((image) => (
        <div
          key={image?.id}
          className="group relative overflow-hidden rounded-lg shadow-organic-sm hover:shadow-organic-md transition-organic cursor-pointer"
          onMouseEnter={() => setHoveredId(image?.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onImageClick(image)}
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={image?.image}
              alt={image?.imageAlt}
              className="w-full h-full object-cover transition-organic group-hover:scale-110"
            />
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-organic ${
              hoveredId === image?.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold mb-1">
                    {image?.title}
                  </h4>
                  <p className="text-sm opacity-90">{image?.description}</p>
                </div>
                <button
                  onClick={(e) => handleSaveToggle(image?.id, e)}
                  className="ml-2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-organic"
                  aria-label={savedImages?.has(image?.id) ? 'Quitar de guardados' : 'Guardar imagen'}
                >
                  <Icon
                    name={savedImages?.has(image?.id) ? 'Heart' : 'Heart'}
                    size={20}
                    color={savedImages?.has(image?.id) ? '#CD5C5C' : 'white'}
                    fill={savedImages?.has(image?.id) ? '#CD5C5C' : 'none'}
                  />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-primary/80 backdrop-blur-sm rounded text-xs font-medium">
                  {image?.eventType}
                </span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">
                  {image?.guestCount} invitados
                </span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs">
                  {image?.season}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs opacity-80">
                <span>{image?.date}</span>
                <span>{image?.photographer}</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e?.stopPropagation();
              onImageClick(image);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-organic hover:bg-white"
            aria-label="Ver imagen completa"
          >
            <Icon name="Maximize2" size={18} color="var(--color-foreground)" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;