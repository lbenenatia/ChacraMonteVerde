// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil
    console.log('Actualizando perfil:', formData);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">No hay usuario autenticado</p>
          <a href="/login" className="text-primary hover:underline">
            Iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
            <Button
              variant={isEditing ? "secondary" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Nombre
                </label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Tu nombre"
                  />
                ) : (
                  <p className="text-lg">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Apellido
                </label>
                {isEditing ? (
                  <Input
                    value={formData.surname}
                    onChange={(e) => setFormData({...formData, surname: e.target.value})}
                    placeholder="Tu apellido"
                  />
                ) : (
                  <p className="text-lg">{user.surname}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <p className="text-lg">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Teléfono
                </label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Tu teléfono"
                  />
                ) : (
                  <p className="text-lg">{user.phone || 'No especificado'}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button type="button" variant="default" onClick={handleSubmit}>
                Guardar Cambios
              </Button>
            </div>
          )}

          <div className="border-t border-border pt-6 mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Configuración de Cuenta
            </h2>
            <div className="space-y-3">
              <Button variant="outline" fullWidth onClick={() => {/* Cambiar contraseña */}}>
                Cambiar Contraseña
              </Button>
              <Button variant="outline" fullWidth onClick={() => {/* Preferencias */}}>
                Preferencias de Notificación
              </Button>
              <Button variant="destructive" fullWidth onClick={logout}>
                Cerrar Sesión en Todos los Dispositivos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;