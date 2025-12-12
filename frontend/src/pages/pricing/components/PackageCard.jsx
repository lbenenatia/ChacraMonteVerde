import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PackageCard = ({ 
  package: pkg, 
  isPopular, 
  onSelect, 
  selectedCurrency 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div 
      className={`relative bg-card rounded-2xl shadow-organic-md transition-organic hover:shadow-organic-lg ${
        isPopular ? 'ring-2 ring-primary scale-105' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-organic-sm">
          Más Popular
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name={pkg.icon} size={28} color="var(--color-primary)" />
          </div>
          {pkg.discount && (
            <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold">
              {pkg.discount}% OFF
            </span>
          )}
        </div>

        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
          {pkg.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {pkg.description}
        </p>

        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-bold text-foreground">
              {formatPrice(pkg.price)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Capacidad: {pkg.capacity} personas
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon 
                name={feature.included ? "Check" : "X"} 
                size={18} 
                color={feature.included ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                className="mt-0.5 flex-shrink-0"
              />
              <span className={`text-sm ${
                feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
              }`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant={isPopular ? "default" : "outline"}
          fullWidth
          iconName="Calendar"
          iconPosition="right"
          onClick={() => onSelect(pkg)}
        >
          Seleccionar Paquete
        </Button>

        {pkg.financing && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Hasta {pkg.financing.maxInstallments} cuotas sin interés
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageCard;