import React from 'react';
import Input from '../../../components/ui/Input';

const ContactInfoForm = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre Completo"
          type="text"
          placeholder="Juan Pérez"
          value={formData?.fullName}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="juan.perez@ejemplo.com"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+54 9 11 1234-5678"
          value={formData?.phone}
          onChange={(e) => onChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Input
          label="Ciudad"
          type="text"
          placeholder="Buenos Aires"
          value={formData?.city}
          onChange={(e) => onChange('city', e?.target?.value)}
          error={errors?.city}
        />
      </div>
      <Input
        label="¿Cómo nos conoció?"
        type="text"
        placeholder="Redes sociales, recomendación, búsqueda en Google..."
        value={formData?.referralSource}
        onChange={(e) => onChange('referralSource', e?.target?.value)}
        description="Esto nos ayuda a mejorar nuestros servicios"
      />
    </div>
  );
};

export default ContactInfoForm;