import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummary = ({ formData }) => {
  const eventTypeLabels = {
    wedding: 'Boda',
    corporate: 'Evento Corporativo',
    birthday: 'Cumpleaños',
    anniversary: 'Aniversario',
    quinceañera: 'Quinceañera',
    other: 'Otro'
  };

  const packageLabels = {
    basic: 'Básico',
    standard: 'Estándar',
    premium: 'Premium',
    luxury: 'Lujo'
  };

  const serviceLabels = {
    catering: 'Catering y Bebidas',
    decoration: 'Decoración',
    photography: 'Fotografía y Video',
    music: 'Música y Entretenimiento',
    coordination: 'Coordinación de Evento'
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date?.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const summaryItems = [
  {
    icon: 'Calendar',
    label: 'Fecha del Evento',
    value: formatDate(formData?.eventDate)
  },
  {
    icon: 'Clock',
    label: 'Horario',
    value: formData?.timeSlot
  },
  {
    icon: 'Users',
    label: 'Invitados',
    value: formData?.guestCount
  },
  {
    icon: 'Sparkles',
    label: 'Tipo de Evento',
    value: eventTypeLabels?.[formData?.eventType]
  }];


  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl shadow-organic-sm overflow-hidden">
        <div className="relative h-48">
          <Image
            src="https://images.unsplash.com/photo-1677205841890-9f0f0a114d8b"
            alt="Vista panorámica de Chacra Monte Verde con jardines verdes exuberantes, árboles maduros y espacios para eventos al aire libre bajo cielo azul despejado"
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              Resumen de Reserva
            </h3>
            <p className="text-sm text-white/90">
              Chacra Monte Verde - Su Celebración Natural
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-4">
              Detalles del Evento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summaryItems?.map((item, index) =>
              <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                    name={item?.icon}
                    size={18}
                    color="var(--color-primary)" />

                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item?.label}</p>
                    <p className="text-sm font-medium text-foreground">
                      {item?.value || 'No especificado'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {formData?.services && formData?.services?.length > 0 &&
          <div className="pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">
                Servicios Adicionales
              </h4>
              <div className="space-y-2">
                {formData?.services?.map((service) =>
              <div key={service} className="flex items-center space-x-2">
                    <Icon
                  name="Check"
                  size={16}
                  color="var(--color-success)" />

                    <span className="text-sm text-foreground">
                      {serviceLabels?.[service]}
                    </span>
                  </div>
              )}
              </div>
            </div>
          }

          <div className="pt-6 border-t border-border">
            <h4 className="font-medium text-foreground mb-4">
              Información de Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="User" size={18} color="var(--color-primary)" />
                <span className="text-sm text-foreground">
                  {formData?.fullName}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} color="var(--color-primary)" />
                <span className="text-sm text-foreground">{formData?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} color="var(--color-primary)" />
                <span className="text-sm text-foreground">{formData?.phone}</span>
              </div>
            </div>
          </div>

          {formData?.selectedPackage &&
          <div className="pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">
                Paquete Seleccionado
              </h4>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {packageLabels?.[formData?.selectedPackage]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formData?.installments}x cuotas
                  </span>
                </div>
              </div>
            </div>
          }

          {formData?.consultationDate && formData?.consultationTime &&
          <div className="pt-6 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">
                Consulta Programada
              </h4>
              <div className="bg-accent/10 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Calendar" size={20} color="var(--color-accent)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(formData?.consultationDate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formData?.consultationTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="bg-success/10 border border-success/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              ¡Casi Listo!
            </h4>
            <p className="text-sm text-muted-foreground">
              Revise todos los detalles antes de confirmar su reserva. Recibirá
              un correo de confirmación inmediatamente.
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default BookingSummary;