import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CapacityShowcase = ({ capacityExamples }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
          Capacidad para Cada Ocasión
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Desde reuniones íntimas hasta grandes celebraciones, nuestro espacio se adapta perfectamente a tus necesidades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capacityExamples?.map((example) => (
          <div
            key={example?.id}
            className="bg-card rounded-lg shadow-organic-sm overflow-hidden group hover:shadow-organic-md transition-organic"
          >
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={example?.image}
                alt={example?.imageAlt}
                className="w-full h-full object-cover transition-organic group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                    {example?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {example?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Icon name="Users" size={16} />
                  <span className="text-sm font-semibold">{example?.capacity}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-foreground">
                  <Icon name="MapPin" size={16} color="var(--color-primary)" />
                  <span>{example?.area}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-foreground">
                  <Icon name="Layout" size={16} color="var(--color-primary)" />
                  <span>{example?.setup}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {example?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-foreground rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapacityShowcase;