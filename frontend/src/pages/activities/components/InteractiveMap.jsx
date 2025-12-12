import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveMap = ({ amenities }) => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const mapPoints = [
    { id: 1, name: 'Main Event Hall', x: 30, y: 40, icon: 'Home' },
    { id: 2, name: 'Garden Terrace', x: 60, y: 30, icon: 'Trees' },
    { id: 3, name: 'Pool Area', x: 45, y: 65, icon: 'Waves' },
    { id: 4, name: 'Parking', x: 15, y: 20, icon: 'Car' },
    { id: 5, name: 'Guest Rooms', x: 75, y: 50, icon: 'Bed' },
    { id: 6, name: 'Kitchen', x: 35, y: 55, icon: 'UtensilsCrossed' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic-sm">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Interactive Property Map
      </h3>
      <div className="relative bg-muted rounded-lg overflow-hidden" style={{ paddingBottom: '60%' }}>
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <rect width="100" height="100" fill="var(--color-muted)" />
            
            <path
              d="M 10,10 L 90,10 L 90,90 L 10,90 Z"
              fill="var(--color-background)"
              stroke="var(--color-border)"
              strokeWidth="0.5"
            />

            <ellipse cx="60" cy="30" rx="15" ry="10" fill="var(--color-primary)" opacity="0.2" />
            <ellipse cx="45" cy="65" rx="12" ry="8" fill="var(--color-accent)" opacity="0.2" />

            {mapPoints?.map((point) => (
              <g key={point?.id}>
                <circle
                  cx={point?.x}
                  cy={point?.y}
                  r="3"
                  fill={selectedAmenity === point?.id ? 'var(--color-primary)' : 'var(--color-accent)'}
                  className="cursor-pointer transition-organic hover:r-4"
                  onClick={() => setSelectedAmenity(point?.id)}
                />
                {selectedAmenity === point?.id && (
                  <text
                    x={point?.x}
                    y={point?.y - 5}
                    textAnchor="middle"
                    fontSize="3"
                    fill="var(--color-foreground)"
                    className="font-medium"
                  >
                    {point?.name}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        {mapPoints?.map((point) => (
          <button
            key={point?.id}
            onClick={() => setSelectedAmenity(point?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-organic ${
              selectedAmenity === point?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={point?.icon} size={16} />
            <span>{point?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMap;