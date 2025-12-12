import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { path: '/homepage', label: 'Home' },
    { path: '/event-gallery', label: 'Gallery' },
    { path: '/packages-pricing', label: 'Packages' },
    { path: '/amenities-activities', label: 'Amenities' }
  ];

  const contactInfo = [
    { icon: 'Phone', text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: 'Mail', text: 'info@monteverde.com', href: 'mailto:info@monteverde.com' },
    { icon: 'MapPin', text: 'Monte Verde Estate, Nature Valley' }
  ];

  const socialLinks = [
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Instagram', href: '#', label: 'Instagram' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Youtube', href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/homepage" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-organic group-hover:bg-primary/20">
                <Icon
                  name="TreePine"
                  size={28}
                  color="var(--color-primary)"
                  className="transition-organic group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-foreground">
                  Chacra Monte Verde
                </span>
                <span className="text-xs text-muted-foreground font-accent">
                  Natural Luxury Events
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where natural beauty meets refined elegance. Creating unforgettable celebrations in harmony with nature.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-organic inline-flex items-center space-x-2"
                  >
                    <Icon name="ChevronRight" size={14} />
                    <span>{link?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Contact Us
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
                Newsletter
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Subscribe for exclusive offers and updates
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
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
              © {currentYear} Chacra Monte Verde. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-organic"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;