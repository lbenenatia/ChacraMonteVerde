import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';
import Img from '../../components/AppImage';

const Account = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await login(
        formData.email,
        formData.password,
        formData.rememberMe
      );
      
      if (result.success) {
        navigate('/perfil');
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Error en el servidor' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y Título */}
        <div className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center">
              <Img 
                src="/assets/images/logomonteverde.jpg" 
                alt="Logo Chacra Monte Verde" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Iniciar Sesión
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            O{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-organic">
              crea una nueva cuenta
            </Link>
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive text-center">{errors.general}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              iconName="Mail"
            />
            
            <Input
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              iconName="Lock"
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
              label="Recordarme"
            />
            
            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="font-medium text-primary hover:text-primary/80 transition-organic"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="LogIn"
              iconPosition="left"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </div>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          {/* Login Social */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              size="default"
              iconName="Google"
              iconPosition="left"
              onClick={handleGoogleLogin}
            >
              Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="default"
              iconName="Facebook"
              iconPosition="left"
              onClick={handleFacebookLogin}
            >
              Facebook
            </Button>
          </div>
        </form>

        {/* Enlaces adicionales */}
        <div className="text-center text-sm space-y-2">
          <p className="text-muted-foreground">
            ¿Eres administrador?{' '}
            <Link 
              to="/admin/login" 
              className="font-medium text-primary hover:text-primary/80 transition-organic"
            >
              Acceso administrativo
            </Link>
          </p>
          
          <p className="text-muted-foreground">
            ¿Problemas para iniciar sesión?{' '}
            <Link 
              to="/contact" 
              className="font-medium text-primary hover:text-primary/80 transition-organic"
            >
              Contáctanos
            </Link>
          </p>
        </div>

        {/* Nota de footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link to="/terms" className="underline hover:text-primary transition-organic">
              Términos de Servicio
            </Link>
            {' '}y{' '}
            <Link to="/privacy" className="underline hover:text-primary transition-organic">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;