import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Img from '../AppImage';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { path: '/', label: 'Inicio', icon: 'Home' },
    { path: '/gallery', label: 'Galería', icon: 'Image' },
    { path: '/pricing', label: 'Paquetes', icon: 'Package' },
    { path: '/activities', label: 'Servicios', icon: 'Sparkles' },
    { path: '/booking', label: 'Reservar', icon: 'Calendar' },
    { path: '/contact', label: 'Contáctanos', icon: 'Phone' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-card"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-organic group-hover:bg-primary/20">
                <Img 
                  src="/assets/images/logomonteverde.jpg" 
                  alt="Logo" 
                  className='w-10 h-10 rounded-full object-cover'
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground">
                  Chacra Monte Verde
                </span>
                <span className="text-xs text-muted-foreground font-accent">
                  Eventos y Estadías Naturales
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-organic flex items-center space-x-2 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : item?.highlight
                      ? 'bg-cta text-cta-foreground hover:bg-cta/90'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" iconName="LogIn" iconPosition="left">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-organic"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-20 right-0 bottom-0 w-80 bg-card shadow-organic-lg overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <nav className="p-6 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-organic ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : item?.highlight
                      ? 'bg-cta text-cta-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Link to="/contact-location" className="block">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;