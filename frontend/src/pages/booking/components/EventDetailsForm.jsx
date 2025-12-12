import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EventDetailsForm = ({ formData, onChange, errors }) => {
  const eventTypes = [
    { value: 'wedding', label: 'Boda (Wedding)' },
    { value: 'corporate', label: 'Evento Corporativo (Corporate Event)' },
    { value: 'birthday', label: 'Cumpleaños (Birthday)' },
    { value: 'anniversary', label: 'Aniversario (Anniversary)' },
    { value: 'quinceañera', label: 'Quinceañera' },
    { value: 'other', label: 'Otro (Other)' }
  ];

  const guestCounts = [
    { value: '50-100', label: '50-100 invitados' },
    { value: '100-150', label: '100-150 invitados' },
    { value: '150-200', label: '150-200 invitados' },
    { value: '200-300', label: '200-300 invitados' },
    { value: '300+', label: 'Más de 300 invitados' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Mañana (9:00 - 13:00)' },
    { value: 'afternoon', label: 'Tarde (14:00 - 18:00)' },
    { value: 'evening', label: 'Noche (19:00 - 02:00)' },
    { value: 'full-day', label: 'Día Completo' }
  ];

  const services = [
    { id: 'catering', label: 'Catering y Bebidas' },
    { id: 'decoration', label: 'Decoración' },
    { id: 'photography', label: 'Fotografía y Video' },
    { id: 'music', label: 'Música y Entretenimiento' },
    { id: 'coordination', label: 'Coordinación de Evento' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Tipo de Evento"
          description="Seleccione el tipo de celebración"
          options={eventTypes}
          value={formData?.eventType}
          onChange={(value) => onChange('eventType', value)}
          error={errors?.eventType}
          required
          placeholder="Seleccionar tipo de evento"
        />

        <Input
          label="Fecha del Evento"
          type="date"
          value={formData?.eventDate}
          onChange={(e) => onChange('eventDate', e?.target?.value)}
          error={errors?.eventDate}
          required
          min={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <Select
          label="Número de Invitados"
          description="Estimación aproximada"
          options={guestCounts}
          value={formData?.guestCount}
          onChange={(value) => onChange('guestCount', value)}
          error={errors?.guestCount}
          required
          placeholder="Seleccionar cantidad"
        />

        <Select
          label="Horario Preferido"
          options={timeSlots}
          value={formData?.timeSlot}
          onChange={(value) => onChange('timeSlot', value)}
          error={errors?.timeSlot}
          required
          placeholder="Seleccionar horario"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Servicios Adicionales
        </label>
        <div className="space-y-3">
          {services?.map((service) => (
            <Checkbox
              key={service?.id}
              label={service?.label}
              checked={formData?.services?.includes(service?.id)}
              onChange={(e) => {
                const currentServices = formData?.services || [];
                const newServices = e?.target?.checked
                  ? [...currentServices, service?.id]
                  : currentServices?.filter((s) => s !== service?.id);
                onChange('services', newServices);
              }}
            />
          ))}
        </div>
      </div>
      <Input
        label="Detalles Adicionales"
        type="text"
        placeholder="Cuéntenos más sobre su visión para el evento..."
        value={formData?.additionalDetails}
        onChange={(e) => onChange('additionalDetails', e?.target?.value)}
        description="Cualquier información especial que debamos conocer"
      />
    </div>
  );
};

export default EventDetailsForm;