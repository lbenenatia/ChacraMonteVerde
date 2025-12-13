import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfoCard = () => {
  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Teléfono',
      primary: '+598 92 824 644',
      secondary: '+598 99 381 954',
      description: 'Lun - Vie: 9:00 - 18:00 hs',
      action: 'tel:+59892824644',
      actionLabel: 'Llamar ahora'
    },
    {
      icon: 'Mail',
      title: 'Correo Electrónico',
      primary: 'monteverdechacra@gmail.com',
      secondary: 'lucabenenati@outlook.com',
      description: 'Respuesta en 24 horas',
      action: 'mailto:monteverdechacra@gmail.com',
      actionLabel: 'Enviar email'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      primary: '+598 92 824 644',
      secondary: 'Chat disponible',
      description: 'Respuesta inmediata',
      action: 'https://wa.me/59892824644',
      actionLabel: 'Abrir chat'
    },
    {
      icon: 'MapPin',
      title: 'Dirección',
      primary: 'Camino Los Ceibos, Km 7',
      secondary: 'San Carlos. Maldonado, Uruguay',
      description: 'Chalet Monte Verde',
      action: 'https://maps.google.com/?q=-34.77381733940696,-54.96584539933728',
      actionLabel: 'Ver en mapa'
    }
  ];

  const businessHours = [
    { day: 'Lunes - Viernes', hours: '9:00 - 18:00 hs' },
    { day: 'Sábados', hours: '10:00 - 16:00 hs' },
    { day: 'Domingos', hours: 'Solo con cita previa' }
  ];

  const socialLinks = [
    { icon: 'Facebook', label: 'Facebook', url: 'https://facebook.com/monteverde' },
    { icon: 'Instagram', label: 'Instagram', url: 'https://instagram.com/monteverde' },
    { icon: 'Youtube', label: 'YouTube', url: 'https://youtube.com/monteverde' },
    { icon: 'Linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/monteverde' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl shadow-organic-md p-6 lg:p-8">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
          Información de Contacto
        </h2>

        <div className="space-y-6">
          {contactMethods?.map((method, index) => (
            <div key={index} className="flex items-start space-x-4 pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={method?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1">{method?.title}</h3>
                <p className="text-sm text-foreground font-medium">{method?.primary}</p>
                <p className="text-sm text-muted-foreground">{method?.secondary}</p>
                <p className="text-xs text-muted-foreground mt-1">{method?.description}</p>
                <a
                  href={method?.action}
                  target={method?.icon === 'MapPin' || method?.icon === 'MessageCircle' ? '_blank' : undefined}
                  rel={method?.icon === 'MapPin' || method?.icon === 'MessageCircle' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-organic mt-2"
                >
                  <span>{method?.actionLabel}</span>
                  <Icon name="ArrowRight" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-organic-md p-6 lg:p-8">
        <h3 className="font-serif text-xl font-bold text-foreground mb-4">
          Horarios de Atención
        </h3>
        <div className="space-y-3">
          {businessHours?.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{schedule?.day}</span>
              <span className="text-sm font-medium text-foreground">{schedule?.hours}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-accent/10 rounded-lg">
          <p className="text-xs text-foreground flex items-start space-x-2">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" color="var(--color-accent)" />
            <span>Para visitas fuera del horario, contáctanos con anticipación para coordinar una cita.</span>
          </p>
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-organic-md p-6 lg:p-8">
        <h3 className="font-serif text-xl font-bold text-foreground mb-4">
          Síguenos en Redes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-organic group"
            >
              <Icon name={social?.icon} size={20} />
              <span className="text-sm font-medium">{social?.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;