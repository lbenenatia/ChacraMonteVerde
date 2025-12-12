import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ContactForm from './components/ContactForm';
import ContactInfoCard from './components/ContactInfoCard';
import LocationMap from './components/LocationMap';
import FAQSection from './components/FAQSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContactLocation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickActions = [
    {
      icon: 'Calendar',
      title: 'Agendar Visita',
      description: 'Conoce nuestro espacio en persona',
      action: 'schedule',
      color: 'primary'
    },
    {
      icon: 'Phone',
      title: 'Llamada Inmediata',
      description: 'Habla con nuestro equipo ahora',
      action: 'call',
      color: 'success'
    },
    {
      icon: 'MessageCircle',
      title: 'Chat en Vivo',
      description: 'Respuestas instantáneas por WhatsApp',
      action: 'chat',
      color: 'accent'
    },
    {
      icon: 'Download',
      title: 'Descargar Brochure',
      description: 'Información completa en PDF',
      action: 'download',
      color: 'secondary'
    }
  ];

  const certifications = [
    {
      icon: 'Award',
      title: 'Certificación de Calidad',
      issuer: 'Cámara Argentina de Eventos'
    },
    {
      icon: 'Shield',
      title: 'Seguridad Verificada',
      issuer: 'Ministerio de Turismo'
    },
    {
      icon: 'Leaf',
      title: 'Compromiso Ambiental',
      issuer: 'Certificación Sustentable'
    },
    {
      icon: 'Star',
      title: 'Excelencia en Servicio',
      issuer: 'Asociación de Venues Premium'
    }
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case 'schedule':
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'call':
        window.location.href = 'tel:+541145678900';
        break;
      case 'chat':
        window.open('https://wa.me/5491123456789', '_blank');
        break;
      case 'download':
        alert('Descargando brochure...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
                <span className="text-sm font-medium text-primary">Estamos Aquí Para Ti</span>
              </div>

              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Contacto y Ubicación
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Conecta con nosotros para comenzar a planificar tu celebración perfecta en Chacra Monte Verde. Nuestro equipo está listo para hacer realidad tu visión.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action?.action)}
                  className="bg-card rounded-xl p-6 shadow-organic-sm hover:shadow-organic-md transition-organic group text-left"
                >
                  <div className={`w-12 h-12 bg-${action?.color}/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-organic`}>
                    <Icon name={action?.icon} size={24} color={`var(--color-${action?.color})`} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2" id="contact-form">
                <ContactForm />
              </div>

              <div className="lg:col-span-1">
                <ContactInfoCard />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocationMap />
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                Certificaciones y Reconocimientos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nuestro compromiso con la excelencia está respaldado por certificaciones de las principales organizaciones del sector
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications?.map((cert, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-organic-sm text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={cert?.icon} size={28} color="var(--color-primary)" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">{cert?.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert?.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 lg:p-12 shadow-organic-lg">
              <Icon name="TreePine" size={48} color="white" className="mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-white mb-4">
                ¿Listo para Comenzar tu Celebración?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Nuestro equipo está esperando para ayudarte a crear el evento de tus sueños en el entorno natural más hermoso de Buenos Aires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Solicitar Consulta
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => window.location.href = 'tel:+541145678900'}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Llamar Ahora
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactLocation;