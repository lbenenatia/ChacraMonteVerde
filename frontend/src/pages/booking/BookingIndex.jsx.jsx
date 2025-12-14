import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingProgress from './components/BookingProgress';
import EventDetailsForm from './components/EventDetailsForm';
import ContactInfoForm from './components/ContactInfoForm';
import ConsultationScheduler from './components/ConsultationScheduler';
import PaymentOptions from './components/PaymentOptions';
import BookingSummary from './components/BookingSummary';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guestCount: '',
    timeSlot: '',
    services: [],
    additionalDetails: '',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    referralSource: '',
    consultationDate: '',
    consultationTime: '',
    selectedPackage: '',
    installments: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const steps = [
    {
      id: 1,
      title: 'Detalles del Evento',
      description: 'Información básica'
    },
    {
      id: 2,
      title: 'Información de Contacto',
      description: 'Sus datos'
    },
    {
      id: 3,
      title: 'Programar Consulta',
      description: 'Fecha y hora'
    },
    {
      id: 4,
      title: 'Opciones de Pago',
      description: 'Financiación'
    },
    {
      id: 5,
      title: 'Confirmación',
      description: 'Revisar y confirmar'
    }
  ];

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSchedule = (date, time) => {
    setFormData((prev) => ({
      ...prev,
      consultationDate: date,
      consultationTime: time || prev?.consultationTime
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.eventType) newErrors.eventType = 'Seleccione el tipo de evento';
      if (!formData?.eventDate) newErrors.eventDate = 'Seleccione la fecha del evento';
      if (!formData?.guestCount) newErrors.guestCount = 'Seleccione el número de invitados';
      if (!formData?.timeSlot) newErrors.timeSlot = 'Seleccione el horario';
    }

    if (step === 2) {
      if (!formData?.fullName) newErrors.fullName = 'Ingrese su nombre completo';
      if (!formData?.email) newErrors.email = 'Ingrese su correo electrónico';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email))
        newErrors.email = 'Correo electrónico inválido';
      if (!formData?.phone) newErrors.phone = 'Ingrese su teléfono';
    }

    if (step === 3) {
      if (!formData?.consultationDate)
        newErrors.consultationDate = 'Seleccione una fecha';
      if (!formData?.consultationTime)
        newErrors.consultationTime = 'Seleccione un horario';
    }

    if (step === 4) {
      if (!formData?.selectedPackage)
        newErrors.selectedPackage = 'Seleccione un paquete';
      if (!formData?.installments)
        newErrors.installments = 'Seleccione un plan de cuotas';
      if (!formData?.acceptTerms)
        newErrors.acceptTerms = 'Debe aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EventDetailsForm
            formData={formData}
            onChange={handleFormChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactInfoForm
            formData={formData}
            onChange={handleFormChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ConsultationScheduler
            onSchedule={handleSchedule}
            selectedDate={formData?.consultationDate}
            selectedTime={formData?.consultationTime}
          />
        );
      case 4:
        return (
          <PaymentOptions
            formData={formData}
            onChange={handleFormChange}
            errors={errors}
          />
        );
      case 5:
        return <BookingSummary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Reserve Su Celebración
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete el proceso de reserva en simples pasos. Estamos aquí
                para hacer realidad su evento soñado.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <BookingProgress currentStep={currentStep} steps={steps} />

              <div className="bg-card rounded-xl shadow-organic-md p-6 md:p-8 mb-8">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {steps?.[currentStep - 1]?.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {steps?.[currentStep - 1]?.description}
                  </p>
                </div>

                {renderStepContent()}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Anterior
                  </Button>

                  {currentStep < steps?.length ? (
                    <Button
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      iconName="Check"
                      iconPosition="left"
                      variant="success"
                    >
                      Confirmar Reserva
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-organic-lg p-8 max-w-md mx-4 text-center animate-breathe">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
              ¡Reserva Confirmada!
            </h2>
            <p className="text-muted-foreground mb-6">
              Hemos recibido su solicitud de reserva. Le enviaremos un correo de
              confirmación con todos los detalles en breve.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Mail" size={16} />
              <span>Revise su bandeja de entrada</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;