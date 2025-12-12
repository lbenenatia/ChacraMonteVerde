import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BeforeAfterSlider = ({ beforeImage, beforeImageAlt, afterImage, afterImageAlt, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging && e?.type !== 'click') return;

    const container = e?.currentTarget?.getBoundingClientRect();
    const x = (e?.clientX || e?.touches?.[0]?.clientX) - container?.left;
    const percentage = Math.max(0, Math.min(100, (x / container?.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="bg-card rounded-lg shadow-organic-md overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="ArrowLeftRight" size={20} color="var(--color-primary)" />
          <span>{title}</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Desliza para ver la transformación
        </p>
      </div>

      <div
        className="relative aspect-[16/9] overflow-hidden cursor-ew-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleMove}
        onClick={handleMove}
      >
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded text-white text-sm font-medium">
            Después
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded text-white text-sm font-medium">
            Antes
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-organic-md flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={20} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;