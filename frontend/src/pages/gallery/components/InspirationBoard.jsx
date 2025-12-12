import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InspirationBoard = ({ savedImages, onRemoveImage, onClearBoard }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (savedImages?.length === 0) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-card rounded-full shadow-organic-lg p-4 flex items-center space-x-2">
          <Icon name="Heart" size={20} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            0 imágenes guardadas
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded ? (
        <div className="bg-card rounded-lg shadow-organic-lg w-80 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={20} color="var(--color-error)" fill="var(--color-error)" />
              <span className="font-serif font-semibold text-foreground">
                Mis Favoritos ({savedImages?.length})
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-muted rounded transition-organic"
              aria-label="Minimizar"
            >
              <Icon name="ChevronDown" size={20} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-64">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {savedImages?.map((image) => (
                <div key={image?.id} className="relative group">
                  <div className="aspect-square rounded overflow-hidden bg-muted">
                    <Image
                      src={image?.image}
                      alt={image?.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => onRemoveImage(image?.id)}
                    className="absolute top-1 right-1 p-1 bg-error/90 rounded-full opacity-0 group-hover:opacity-100 transition-organic"
                    aria-label="Quitar"
                  >
                    <Icon name="X" size={14} color="white" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                fullWidth
                iconName="Share2"
                iconPosition="left"
                size="sm"
              >
                Compartir Tablero
              </Button>
              <Button
                variant="ghost"
                fullWidth
                iconName="Trash2"
                iconPosition="left"
                size="sm"
                onClick={onClearBoard}
              >
                Limpiar Todo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-error text-white rounded-full shadow-organic-lg px-6 py-3 flex items-center space-x-2 hover:bg-error/90 transition-organic"
          aria-label="Ver favoritos"
        >
          <Icon name="Heart" size={20} fill="white" />
          <span className="font-medium">{savedImages?.length}</span>
        </button>
      )}
    </div>
  );
};

export default InspirationBoard;