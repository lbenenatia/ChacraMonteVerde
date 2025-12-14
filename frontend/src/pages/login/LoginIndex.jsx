import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuth } from '../../context/AuthContext';
import Img from '../../components/AppImage';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Obtener email guardado si existe
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

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
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});  // ✅ Limpia errores al inicio
    
    // Validación básica
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      // Llamar a la función de login del contexto
      const result = await login(
        formData.email,
        formData.password,
        formData.rememberMe
      );
      
      if (result.success) {
        // Guardar email si rememberMe está activado
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirigir al dashboard
        navigate('/');
      } else {
        setErrors({ general: result.error || 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Login error:', error);
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
              Iniciar Sesión
            </h2>
          </div>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (  // ✅ Ahora errors está definido
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
              onChange={(e) => handleCheckboxChange(e.target.checked)} // ✅ onChange estándar
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
            <div className="relative flex justify-center text-sm"></div>
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
            ¿No tienes cuenta aún?{' '}
            <Link 
              to="/register" 
              className="font-medium text-primary hover:text-primary/80 transition-organic"
            >
              Crear cuenta
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

export default Login;