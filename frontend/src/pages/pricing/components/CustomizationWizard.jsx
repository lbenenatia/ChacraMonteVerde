import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationWizard = ({ basePackage, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const services = [
    { id: 'catering-premium', name: 'Catering Premium', price: 85000, icon: 'UtensilsCrossed', description: 'Menú gourmet de 3 pasos con opciones vegetarianas' },
    { id: 'catering-standard', name: 'Catering Estándar', price: 55000, icon: 'Utensils', description: 'Menú completo de 2 pasos' },
    { id: 'bar-premium', name: 'Barra Premium', price: 45000, icon: 'Wine', description: 'Bebidas premium y cócteles personalizados' },
    { id: 'bar-standard', name: 'Barra Estándar', price: 28000, icon: 'Beer', description: 'Bebidas estándar y refrescos' }
  ];

  const amenities = [
    { id: 'photo-pro', name: 'Fotografía Profesional', price: 120000, icon: 'Camera', description: '8 horas de cobertura completa' },
    { id: 'video-hd', name: 'Video HD', price: 95000, icon: 'Video', description: 'Video cinematográfico editado' },
    { id: 'dj-sound', name: 'DJ y Sonido', price: 65000, icon: 'Music', description: 'Equipo profesional y DJ experimentado' },
    { id: 'live-music', name: 'Música en Vivo', price: 110000, icon: 'Music2', description: 'Banda o conjunto musical' },
    { id: 'lighting', name: 'Iluminación Especial', price: 38000, icon: 'Lightbulb', description: 'Luces LED y efectos' }
  ];

  const extras = [
    { id: 'decoration-floral', name: 'Decoración Floral', price: 45000, icon: 'Flower', description: 'Arreglos naturales personalizados' },
    { id: 'furniture-lounge', name: 'Mobiliario Lounge', price: 28000, icon: 'Armchair', description: 'Sillones y mesas de diseño' },
    { id: 'kids-animation', name: 'Animación Infantil', price: 35000, icon: 'Baby', description: 'Recreadores y juegos' },
    { id: 'fireworks', name: 'Fuegos Artificiales', price: 55000, icon: 'Sparkles', description: 'Show pirotécnico de 10 minutos' },
    { id: 'photo-booth', name: 'Cabina de Fotos', price: 32000, icon: 'Camera', description: 'Cabina con props y impresiones' },
    { id: 'valet-parking', name: 'Valet Parking', price: 25000, icon: 'Car', description: 'Servicio de estacionamiento' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const calculateTotal = () => {
    let total = basePackage?.price || 0;
    
    selectedServices?.forEach(id => {
      const service = services?.find(s => s?.id === id);
      if (service) total += service?.price;
    });
    
    selectedAmenities?.forEach(id => {
      const amenity = amenities?.find(a => a?.id === id);
      if (amenity) total += amenity?.price;
    });
    
    selectedExtras?.forEach(id => {
      const extra = extras?.find(e => e?.id === id);
      if (extra) total += extra?.price;
    });
    
    return total;
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev?.includes(serviceId) 
        ? prev?.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAmenityToggle = (amenityId) => {
    setSelectedAmenities(prev => 
      prev?.includes(amenityId) 
        ? prev?.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleExtraToggle = (extraId) => {
    setSelectedExtras(prev => 
      prev?.includes(extraId) 
        ? prev?.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleComplete = () => {
    onComplete({
      basePackage,
      services: selectedServices,
      amenities: selectedAmenities,
      extras: selectedExtras,
      total: calculateTotal()
    });
  };

  const steps = [
    { number: 1, title: 'Servicios', icon: 'Utensils' },
    { number: 2, title: 'Entretenimiento', icon: 'Music' },
    { number: 3, title: 'Extras', icon: 'Sparkles' }
  ];

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Selecciona los servicios de gastronomía y bebidas para tu evento
            </p>
            {services?.map(service => (
              <div
                key={service?.id}
                className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-organic cursor-pointer"
                onClick={() => handleServiceToggle(service?.id)}
              >
                <Checkbox
                  checked={selectedServices?.includes(service?.id)}
                  onChange={() => handleServiceToggle(service?.id)}
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={service?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{service?.name}</h4>
                    <span className="text-lg font-semibold text-primary">
                      {formatPrice(service?.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{service?.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Agrega entretenimiento y servicios audiovisuales
            </p>
            {amenities?.map(amenity => (
              <div
                key={amenity?.id}
                className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-organic cursor-pointer"
                onClick={() => handleAmenityToggle(amenity?.id)}
              >
                <Checkbox
                  checked={selectedAmenities?.includes(amenity?.id)}
                  onChange={() => handleAmenityToggle(amenity?.id)}
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={amenity?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{amenity?.name}</h4>
                    <span className="text-lg font-semibold text-primary">
                      {formatPrice(amenity?.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{amenity?.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Personaliza tu evento con servicios adicionales
            </p>
            {extras?.map(extra => (
              <div
                key={extra?.id}
                className="flex items-start space-x-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-organic cursor-pointer"
                onClick={() => handleExtraToggle(extra?.id)}
              >
                <Checkbox
                  checked={selectedExtras?.includes(extra?.id)}
                  onChange={() => handleExtraToggle(extra?.id)}
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={extra?.icon} size={24} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{extra?.name}</h4>
                    <span className="text-lg font-semibold text-primary">
                      {formatPrice(extra?.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{extra?.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic-md overflow-hidden">
      <div className="bg-gradient-to-r from-accent to-accent/80 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon name="Wand2" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Personaliza tu Paquete
            </h3>
            <p className="text-sm text-white/80">
              Crea el evento perfecto con servicios a medida
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {steps?.map((s, index) => (
            <React.Fragment key={s?.number}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-organic ${
                  step >= s?.number 
                    ? 'bg-white text-accent' :'bg-white/20 text-white'
                }`}>
                  <Icon name={s?.icon} size={20} />
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  step >= s?.number ? 'text-white' : 'text-white/60'
                }`}>
                  {s?.title}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded transition-organic ${
                  step > s?.number ? 'bg-white' : 'bg-white/20'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="p-8">
        {renderStepContent()}

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Estimado</p>
              <p className="text-3xl font-bold text-primary">
                {formatPrice(calculateTotal())}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Paquete Base</p>
              <p className="text-lg font-semibold text-foreground">
                {basePackage?.name || 'No seleccionado'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {step > 1 && (
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={() => setStep(step - 1)}
              >
                Anterior
              </Button>
            )}
            {step < 3 ? (
              <Button
                variant="default"
                fullWidth
                iconName="ChevronRight"
                iconPosition="right"
                onClick={() => setStep(step + 1)}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="default"
                fullWidth
                iconName="Check"
                iconPosition="right"
                onClick={handleComplete}
              >
                Finalizar Personalización
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationWizard;