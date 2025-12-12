import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = () => {
  const [activeTab, setActiveTab] = useState('map');

  const mapCoordinates = {
    lat: -34.6037,
    lng: -58.3816
  };

  const directions = [
    {
      icon: 'Car',
      title: 'Desde Buenos Aires',
      steps: [
        'Tomar Autopista Panamericana (Ruta 9) dirección norte',
        'Salir en Km 45 hacia Ruta Provincial 23',
        'Continuar 8 km hasta Monte Verde',
        'Girar a la derecha en el cartel de Chacra Monte Verde'
      ],
      duration: '60 minutos',
      distance: '68 km'
    },
    {
      icon: 'Bus',
      title: 'En Transporte Público',
      steps: [
        'Tomar tren Mitre desde Retiro hasta Tigre',
        'Desde Tigre, tomar colectivo línea 60 hasta Monte Verde',
        'Bajarse en parada "Ruta 23 y Acceso Monte Verde"',
        'Caminar 500 metros o solicitar transfer gratuito'
      ],
      duration: '90 minutos',
      distance: 'Transfer disponible'
    }
  ];

  const nearbyLandmarks = [
    { name: 'Aeropuerto Internacional Ezeiza', distance: '45 km', time: '40 min' },
    { name: 'Aeropuerto Jorge Newbery', distance: '55 km', time: '50 min' },
    { name: 'Centro de Buenos Aires', distance: '60 km', time: '60 min' },
    { name: 'Tigre', distance: '15 km', time: '15 min' },
    { name: 'Pilar', distance: '20 km', time: '20 min' }
  ];

  const parkingInfo = [
    { icon: 'Car', text: 'Estacionamiento gratuito para 150 vehículos' },
    { icon: 'Bus', text: 'Espacio para buses y vehículos grandes' },
    { icon: 'Shield', text: 'Vigilancia 24/7 durante eventos' },
    { icon: 'Accessibility', text: 'Espacios para personas con movilidad reducida' }
  ];

  return (
    <div className="bg-card rounded-2xl shadow-organic-md overflow-hidden">
      <div className="p-6 lg:p-8 border-b border-border">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Ubicación y Cómo Llegar
        </h2>
        <p className="text-muted-foreground">
          Ruta Provincial 23, Km 45 - Monte Verde, Buenos Aires
        </p>
      </div>
      <div className="border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-organic ${
              activeTab === 'map' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="Map" size={18} className="inline mr-2" />
            Mapa
          </button>
          <button
            onClick={() => setActiveTab('directions')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-organic ${
              activeTab === 'directions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="Navigation" size={18} className="inline mr-2" />
            Direcciones
          </button>
          <button
            onClick={() => setActiveTab('parking')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-organic ${
              activeTab === 'parking' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="ParkingCircle" size={18} className="inline mr-2" />
            Estacionamiento
          </button>
        </div>
      </div>
      <div className="p-6 lg:p-8">
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Chacra Monte Verde Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapCoordinates?.lat},${mapCoordinates?.lng}&z=14&output=embed`}
                className="border-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                iconName="Navigation"
                iconPosition="left"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapCoordinates?.lat},${mapCoordinates?.lng}`, '_blank')}
              >
                Abrir en Google Maps
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Descargar Indicaciones PDF
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
                <span>Puntos de Referencia Cercanos</span>
              </h3>
              <div className="space-y-2">
                {nearbyLandmarks?.map((landmark, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{landmark?.name}</span>
                    <span className="text-muted-foreground">
                      {landmark?.distance} ({landmark?.time})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'directions' && (
          <div className="space-y-6">
            {directions?.map((direction, index) => (
              <div key={index} className="bg-muted rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={direction?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{direction?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {direction?.duration} • {direction?.distance}
                    </p>
                  </div>
                </div>
                <ol className="space-y-3">
                  {direction?.steps?.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm text-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Transfer Gratuito Disponible
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ofrecemos servicio de transfer gratuito desde estaciones de tren y puntos de encuentro. Coordina con anticipación llamando al +54 11 4567-8900.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parking' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parkingInfo?.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={info?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <span className="text-sm text-foreground">{info?.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-4">Detalles del Estacionamiento</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Capacidad</h4>
                  <p className="text-sm text-muted-foreground">
                    Nuestro amplio estacionamiento puede acomodar hasta 150 vehículos simultáneamente, con espacios adicionales para buses y vehículos de gran tamaño.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Seguridad</h4>
                  <p className="text-sm text-muted-foreground">
                    Durante los eventos, contamos con personal de seguridad y vigilancia las 24 horas para garantizar la protección de los vehículos.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Accesibilidad</h4>
                  <p className="text-sm text-muted-foreground">
                    Espacios designados cerca de la entrada principal para personas con movilidad reducida, con acceso pavimentado y sin barreras.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Servicio de Valet</h4>
                  <p className="text-sm text-muted-foreground">
                    Disponible bajo solicitud para eventos especiales. Consulta con nuestro equipo al momento de la reserva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;