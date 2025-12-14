import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';
import Img from '../../components/AppImage';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    acceptTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear confirm password error when passwords match
    if (name === 'password' || name === 'confirmPassword') {
      if (formData.password === formData.confirmPassword && errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    // Validación
    const newErrors = {};
    
    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    // Apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    // Contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Debe contener mayúsculas, minúsculas y números';
    }
    
    // Confirmar contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    // Términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      // Preparar datos para el registro
      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || null,
      };
      
      // Llamar a la función de registro
      const result = await register(userData);
      
      if (result.success) {
        // Redirigir al dashboard o página de éxito
        navigate('/');
      } else {
        setErrors({ general: result.error || 'Error en el registro' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: 'Error en el servidor. Por favor, intenta de nuevo.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y Título */}
        <div className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <Img 
              src="/assets/images/logomonteverde.jpg" 
              alt="Logo Chacra Monte Verde" 
              className="w-64 h-40 rounded-full object-cover"
            />
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Crear Cuenta
            </h2>
          </div>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive text-center">{errors.general}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Nombre y Apellido en una fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                iconName="User"
              />
              
              <Input
                label="Apellido"
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
            
            {/* Email */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="ejemplo@mail.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              iconName="Mail"
            />
            
            {/* Contraseña y Confirmar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                iconName="Lock"
              />
              
              <Input
                label="Confirmar Contraseña"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                iconName="Lock"
              />
            </div>
            
            {/* Requisitos de contraseña */}
            <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-medium">La contraseña debe contener:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li className={formData.password.length >= 6 ? 'text-success' : ''}>
                  Al menos 6 caracteres
                </li>
                <li className={/(?=.*[a-z])/.test(formData.password) ? 'text-success' : ''}>
                  Una letra minúscula
                </li>
                <li className={/(?=.*[A-Z])/.test(formData.password) ? 'text-success' : ''}>
                  Una letra mayúscula
                </li>
                <li className={/(?=.*\d)/.test(formData.password) ? 'text-success' : ''}>
                  Un número
                </li>
              </ul>
            </div>
            
            {/* Términos y condiciones */}
            <div className="space-y-2">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData(prev => ({...prev, acceptTerms: e.target.checked}))}
                label={
                  <span>
                    Acepto los{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Términos y Condiciones
                    </Link>
                    {' '}y la{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Política de Privacidad
                    </Link>
                  </span>
                }
              />
              {errors.acceptTerms && (
                <p className="text-sm text-destructive">{errors.acceptTerms}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </div>

          {/* Separador */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm"></div>
          </div>
        </form>

        {/* Enlaces adicionales */}
        <div className="text-center text-sm space-y-2">
          <p className="text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:text-primary/80 transition-organic"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Nota de footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Al crear una cuenta, aceptas nuestros{' '}
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

export default Register;