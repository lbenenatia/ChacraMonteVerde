import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonMatrix = ({ packages, onSelectPackage }) => {
  const [selectedPackages, setSelectedPackages] = useState([packages?.[0]?.id, packages?.[1]?.id, packages?.[2]?.id]?.filter(Boolean));

  const allFeatures = [
    { category: 'Espacio y Capacidad', features: [
      'Salón principal climatizado',
      'Área exterior con jardines',
      'Zona de ceremonia',
      'Estacionamiento incluido',
      'Capacidad de invitados'
    ]},
    { category: 'Servicios Básicos', features: [
      'Mobiliario completo',
      'Mantelería y vajilla',
      'Personal de servicio',
      'Coordinador de eventos',
      'Limpieza post-evento'
    ]},
    { category: 'Gastronomía', features: [
      'Servicio de catering',
      'Barra de bebidas',
      'Menú personalizado',
      'Torta de celebración',
      'Coffee break'
    ]},
    { category: 'Entretenimiento', features: [
      'Sistema de sonido',
      'Iluminación ambiental',
      'Pista de baile',
      'DJ profesional',
      'Animación infantil'
    ]},
    { category: 'Extras', features: [
      'Decoración floral',
      'Fotografía profesional',
      'Video HD',
      'Fuegos artificiales',
      'Hospedaje incluido'
    ]}
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getFeatureStatus = (packageId, featureName) => {
    const pkg = packages?.find(p => p?.id === packageId);
    if (!pkg) return false;
    
    return pkg?.features?.some(f => 
      f?.text?.toLowerCase()?.includes(featureName?.toLowerCase()) && f?.included
    );
  };

  const selectedPackageData = packages?.filter(pkg => selectedPackages?.includes(pkg?.id));

  return (
    <div className="bg-card rounded-2xl shadow-organic-md overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon name="GitCompare" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Comparación de Paquetes
            </h3>
            <p className="text-sm text-white/80">
              Encuentra el paquete perfecto para tu evento
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="sticky left-0 bg-card p-6 text-left">
                <span className="text-sm font-medium text-muted-foreground">
                  Características
                </span>
              </th>
              {selectedPackageData?.map(pkg => (
                <th key={pkg?.id} className="p-6 min-w-[280px]">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon name={pkg?.icon} size={28} color="var(--color-primary)" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                      {pkg?.name}
                    </h4>
                    <p className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(pkg?.price)}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Hasta {pkg?.capacity} personas
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => onSelectPackage(pkg)}
                    >
                      Seleccionar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures?.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                <tr className="bg-muted/30">
                  <td colSpan={selectedPackageData?.length + 1} className="sticky left-0 p-4">
                    <span className="font-serif text-base font-semibold text-foreground">
                      {category?.category}
                    </span>
                  </td>
                </tr>
                {category?.features?.map((feature, featIndex) => (
                  <tr key={featIndex} className="border-b border-border hover:bg-muted/20 transition-organic">
                    <td className="sticky left-0 bg-card p-4">
                      <span className="text-sm text-foreground">{feature}</span>
                    </td>
                    {selectedPackageData?.map(pkg => (
                      <td key={pkg?.id} className="p-4 text-center">
                        {getFeatureStatus(pkg?.id, feature) ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                            <Icon name="Check" size={18} color="var(--color-success)" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                            <Icon name="X" size={18} color="var(--color-muted-foreground)" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Todos los precios incluyen IVA. Consulta por servicios adicionales.</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrix;