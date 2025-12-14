// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://localhost:4028/api';

  useEffect(() => {
    // Verificar sesión al cargar la aplicación
    checkAuth();
    
    // Opcional: Verificar periodicamente (cada 5 minutos)
    const interval = setInterval(() => {
      if (user) checkAuth();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      const token = getToken();
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          // Actualizar localStorage con datos frescos
          localStorage.setItem('userData', JSON.stringify(data.user));
        } else {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => {
    return localStorage.getItem('authToken') || 
           sessionStorage.getItem('authToken');
  };

  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      const { token, user } = data;

      // Guardar token según rememberMe
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('rememberedEmail', email);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      // Guardar datos del usuario
      localStorage.setItem('userData', JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAuthData();
    // Opcional: llamar a endpoint de logout en el backend
    // fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error en el registro');
      }

      const { token, user } = data;

      // Auto-login después del registro
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    checkAuth,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};