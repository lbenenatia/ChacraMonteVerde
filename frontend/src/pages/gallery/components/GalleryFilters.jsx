import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GalleryFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const eventTypeOptions = [
    { value: 'all', label: 'Todos los Eventos' },
    { value: 'wedding', label: 'Bodas' },
    { value: 'corporate', label: 'Eventos Corporativos' },
    { value: 'celebration', label: 'Celebraciones' },
    { value: 'quinceañera', label: 'Quinceañeras' },
    { value: 'anniversary', label: 'Aniversarios' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'Todas las Temporadas' },
    { value: 'spring', label: 'Primavera' },
    { value: 'summer', label: 'Verano' },
    { value: 'autumn', label: 'Otoño' },
    { value: 'winter', label: 'Invierno' }
  ];

  const guestCountOptions = [
    { value: 'all', label: 'Todos los Tamaños' },
    { value: 'intimate', label: 'Íntimo (hasta 50)' },
    { value: 'medium', label: 'Mediano (51-150)' },
    { value: 'large', label: 'Grande (151-300)' },
    { value: 'grand', label: 'Gran Escala (300+)' }
  ];

  const styleOptions = [
    { value: 'all', label: 'Todos los Estilos' },
    { value: 'rustic', label: 'Rústico' },
    { value: 'elegant', label: 'Elegante' },
    { value: 'modern', label: 'Moderno' },
    { value: 'bohemian', label: 'Bohemio' },
    { value: 'classic', label: 'Clásico' }
  ];

  const timeOfDayOptions = [
    { value: 'all', label: 'Todo el Día' },
    { value: 'morning', label: 'Mañana' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'evening', label: 'Noche' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all');

  return (
    <div className="bg-card rounded-lg shadow-organic-sm p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <span>Filtrar Galería</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Tipo de Evento"
          options={eventTypeOptions}
          value={filters?.eventType}
          onChange={(value) => onFilterChange('eventType', value)}
        />

        <Select
          label="Temporada"
          options={seasonOptions}
          value={filters?.season}
          onChange={(value) => onFilterChange('season', value)}
        />

        <Select
          label="Cantidad de Invitados"
          options={guestCountOptions}
          value={filters?.guestCount}
          onChange={(value) => onFilterChange('guestCount', value)}
        />

        <Select
          label="Estilo"
          options={styleOptions}
          value={filters?.style}
          onChange={(value) => onFilterChange('style', value)}
        />

        <Select
          label="Momento del Día"
          options={timeOfDayOptions}
          value={filters?.timeOfDay}
          onChange={(value) => onFilterChange('timeOfDay', value)}
        />
      </div>
    </div>
  );
};

export default GalleryFilters;