import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
    preferredContact: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const eventTypeOptions = [
    { value: 'wedding', label: 'Boda' },
    { value: 'corporate', label: 'Evento Corporativo' },
    { value: 'birthday', label: 'Cumpleaños' },
    { value: 'anniversary', label: 'Aniversario' },
    { value: 'quinceañera', label: 'Quince' },
    { value: 'other', label: 'Otro' }
  ];

  const guestCountOptions = [
    { value: '1-50', label: '1-50 invitados' },
    { value: '51-100', label: '51-100 invitados' },
    { value: '101-150', label: '101-150 invitados' },
    { value: '151-200', label: '151-200 invitados' },
    { value: '200+', label: 'Más de 200 invitados' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Correo electrónico' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\+?\d{7,15}$/.test(formData?.phone)) {
      newErrors.phone = 'Ingrese un número de teléfono válido';
    }

    if (!formData?.eventType) {
      newErrors.eventType = 'Seleccione un tipo de evento';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        message: '',
        preferredContact: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic-md p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Envíanos un Mensaje
        </h2>
        <p className="text-muted-foreground">
          Completa el formulario y nos pondremos en contacto contigo dentro de las 24 horas
        </p>
      </div>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start space-x-3">
          <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-success">¡Mensaje enviado exitosamente!</p>
            <p className="text-sm text-success/80 mt-1">
              Gracias por contactarnos. Nuestro equipo revisará tu consulta y te responderá pronto.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Nombre Completo"
            type="text"
            name="name"
            placeholder="Juan Pérez"
            value={formData?.name}
            onChange={handleChange}
            error={errors?.name}
            required
          />

          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="juan@ejemplo.com"
            value={formData?.email}
            onChange={handleChange}
            error={errors?.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Teléfono"
            type="tel"
            name="phone"
            placeholder="09X XXX XXX"
            value={formData?.phone}
            onChange={handleChange}
            error={errors?.phone}
            required
          />

          <Select
            label="Tipo de Evento"
            options={eventTypeOptions}
            value={formData?.eventType}
            onChange={(value) => handleSelectChange('eventType', value)}
            placeholder="Selecciona un tipo"
            error={errors?.eventType}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Fecha del Evento (Aproximada)"
            type="date"
            name="eventDate"
            value={formData?.eventDate}
            onChange={handleChange}
            description="Si aún no tienes una fecha exacta, ingresa una aproximada"
          />

          <Select
            label="Cantidad de Invitados"
            options={guestCountOptions}
            value={formData?.guestCount}
            onChange={(value) => handleSelectChange('guestCount', value)}
            placeholder="Selecciona un rango"
          />
        </div>

        <Select
          label="Método de Contacto Preferido"
          options={contactMethodOptions}
          value={formData?.preferredContact}
          onChange={(value) => handleSelectChange('preferredContact', value)}
          placeholder="¿Cómo prefieres que te contactemos?"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Mensaje <span className="text-error">*</span>
          </label>
          <textarea
            name="message"
            rows="5"
            placeholder="Cuéntanos sobre tu evento, tus ideas y cualquier pregunta que tengas..."
            value={formData?.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-organic resize-none ${
              errors?.message ? 'border-error' : 'border-input'
            }`}
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error">{errors?.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Al enviar este formulario, aceptas nuestra política de privacidad y el uso de tus datos para responder a tu consulta.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;