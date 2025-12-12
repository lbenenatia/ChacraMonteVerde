import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PricingCalculator = ({ packages, onCalculate }) => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [guestCount, setGuestCount] = useState(100);
  const [eventDate, setEventDate] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addons = [
    { id: 'catering', name: 'Catering Premium', price: 1, description: 'Menú gourmet de 3 pasos' },
    { id: 'decoration', name: 'Decoración Floral', price: 1, description: 'Arreglos naturales personalizados' },
    { id: 'photography', name: 'Fotografía Profesional', price: 1, description: '8 horas de cobertura completa' },
    { id: 'music', name: 'DJ y Sonido', price: 1, description: 'Equipo profesional y DJ experimentado' },
    { id: 'lighting', name: 'Iluminación Ambiental', price: 1, description: 'Luces LED y efectos especiales' },
    { id: 'furniture', name: 'Mobiliario Extra', price: 1, description: 'Sillas, mesas y lounge adicional' }
  ];

  const packageOptions = packages?.map(pkg => ({
    value: pkg?.id,
    label: `${pkg?.name} - ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })?.format(pkg?.price)}`,
    description: `Capacidad: ${pkg?.capacity} personas`
  }));

  useEffect(() => {
    calculateTotal();
  }, [selectedPackage, guestCount, selectedAddons]);

  const calculateTotal = () => {
    const pkg = packages?.find(p => p?.id === selectedPackage);
    if (!pkg) {
      setTotalPrice(0);
      return;
    }

    let total = pkg?.price;

    // Add extra guest cost if over capacity
    if (guestCount > pkg?.capacity) {
      const extraGuests = guestCount - pkg?.capacity;
      total += extraGuests * 2500; // ARS 2,500 per extra guest
    }

    // Add selected addons
    selectedAddons?.forEach(addonId => {
      const addon = addons?.find(a => a?.id === addonId);
      if (addon) total += addon?.price;
    });

    setTotalPrice(total);
    onCalculate({ package: pkg, guestCount, addons: selectedAddons, total });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => 
      prev?.includes(addonId) 
        ? prev?.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic-md p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon name="Calculator" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Calculadora de Precios
          </h3>
          <p className="text-sm text-muted-foreground">
            Personaliza tu evento y obtén un presupuesto instantáneo
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label="Selecciona un Paquete"
          placeholder="Elige tu paquete base"
          options={packageOptions}
          value={selectedPackage}
          onChange={setSelectedPackage}
          required
        />

        <Input
          label="Número de Invitados"
          type="number"
          min="20"
          max="500"
          value={guestCount}
          onChange={(e) => setGuestCount(parseInt(e?.target?.value) || 0)}
          description="Capacidad base incluida en el paquete"
        />

        <Input
          label="Fecha del Evento"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e?.target?.value)}
          min={new Date()?.toISOString()?.split('T')?.[0]}
          description="Selecciona tu fecha preferida"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Servicios Adicionales
          </label>
          <div className="space-y-3">
            {addons?.map(addon => (
              <div 
                key={addon?.id}
                className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-organic cursor-pointer"
                onClick={() => handleAddonToggle(addon?.id)}
              >
                <Checkbox
                  checked={selectedAddons?.includes(addon?.id)}
                  onChange={() => handleAddonToggle(addon?.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {addon?.name}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {formatPrice(addon?.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {addon?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-foreground">
              Total Estimado
            </span>
            <span className="text-3xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center mb-4">
            * Precio final sujeto a confirmación y disponibilidad
          </p>
          <Button
            variant="default"
            fullWidth
            iconName="Send"
            iconPosition="right"
            disabled={!selectedPackage || !eventDate}
          >
            Solicitar Cotización Detallada
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;