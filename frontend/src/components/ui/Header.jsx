// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Img from '../AppImage';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Menú desplegable del usuario */}
                  <div className="relative group">
                    <Button variant="outlined" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-organic">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} />
                      </div>
                      <span>{user?.name || 'Usuario'}</span>
                      <Icon name="ChevronDown" size={16} />
                    </Button>
                    
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-organic-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-border">
                          <p className="text-sm font-medium">{user?.name} {user?.surname}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-muted transition-organic w-full"
                        >
                          <Icon name="LayoutDashboard" size={16} />
                          <span>Mi Perfil</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-destructive/10 hover:text-destructive transition-organic w-full text-left"
                        >
                          <Icon name="LogOut" size={16} />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="default" iconName="LogIn" iconPosition="left">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </>
              )}
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
      
      {/* Mobile Menu */}
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
              {/* Información del usuario si está autenticado */}
              {isAuthenticated && (
                <div className="pb-4 border-b border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{user?.name} {user?.surname}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/profile"
                      className="px-3 py-2 text-sm bg-muted rounded-lg text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/profile"
                      className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Navegación */}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {/* Acciones de autenticación para móvil */}
              <div className="pt-4 border-t border-border space-y-3">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="destructive"
                      fullWidth
                      iconName="LogOut"
                      iconPosition="left"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="LogIn"
                        iconPosition="left"
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="default"
                        fullWidth
                        iconName="UserPlus"
                        iconPosition="left"
                      >
                        Registrarse
                      </Button>
                    </Link>
                  </>
                )}
                
                {/* Contacto siempre visible */}
                <Link to="/contact" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
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