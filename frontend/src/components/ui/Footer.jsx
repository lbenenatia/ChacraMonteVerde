import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Img from '../AppImage';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const contactInfo = [
    { icon: 'Phone', text: '+598 92 824 644', href: 'tel:+59892824644' },
    { icon: 'Mail', text: 'monteverdechacra@gmail.com', href: 'mailto:monteverdechacra@gmail.com' },
    { icon: 'MapPin', text: 'Monte Verde, Cno Los Ceibos km 7. Maldonado, Uruguay' }
  ];

  const socialLinks = [
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Instagram', href: '#', label: 'Instagram' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Youtube', href: '#', label: 'YouTube' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <Link to="/homepage" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-organic group-hover:bg-primary/20">
                <Img 
                  src="/assets/images/logomonteverde.jpg" 
                  alt="Logo" 
                  className='w-10 h-10 rounded-full object-cover'
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-foreground">
                  Chacra Monte Verde
                </span>
                <span className="text-xs text-muted-foreground font-accent">
                  Eventos y Estadías Naturales
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Donde la belleza natural se encuentra con la elegancia refinada. Creando celebraciones inolvidables en armonía con la naturaleza.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Contáctanos
            </h3>
            <ul className="space-y-3">
              {contactInfo?.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Icon
                    name={info?.icon}
                    size={18}
                    color="var(--color-primary)"
                    className="mt-0.5 flex-shrink-0"
                  />
                  {info?.href ? (
                    <a
                      href={info?.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-organic"
                    >
                      {info?.text}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {info?.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.href}
                  aria-label={social?.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-organic"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-foreground mb-2">
                ¡Información exclusiva!
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Suscríbete para ofertas exclusivas y actualizaciones
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-organic">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Chacra Monte Verde. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Política de Privacidad
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Términos de Servicio
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Accesibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;