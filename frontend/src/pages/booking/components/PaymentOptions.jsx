import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentOptions = ({ formData, onChange, errors }) => {
  const [showCalculator, setShowCalculator] = useState(false);

  const packagePrices = {
    basic: 250000,
    standard: 450000,
    premium: 750000,
    luxury: 1200000
  };

  const installmentOptions = [
    { value: '1', label: 'Pago único' },
    { value: '3', label: '3 cuotas sin interés' },
    { value: '6', label: '6 cuotas sin interés' },
    { value: '12', label: '12 cuotas' },
    { value: '24', label: '24 cuotas' },
    { value: '36', label: '36 cuotas' },
    { value: '48', label: '48 cuotas' },
    { value: '60', label: '60 cuotas' }
  ];

  const calculateInstallment = () => {
    const price = packagePrices?.[formData?.selectedPackage] || 450000;
    const installments = parseInt(formData?.installments) || 1;
    const interestRate = installments > 6 ? 0.15 : 0;
    const totalWithInterest = price * (1 + interestRate);
    return Math.round(totalWithInterest / installments);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-accent)" />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Opciones de Financiación Flexibles
            </h4>
            <p className="text-sm text-muted-foreground">
              Ofrecemos planes de pago de hasta 60 cuotas para hacer realidad su
              evento soñado. Las primeras 6 cuotas son sin interés.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Paquete Seleccionado"
          options={[
            { value: 'basic', label: 'Básico - ARS 250.000' },
            { value: 'standard', label: 'Estándar - ARS 450.000' },
            { value: 'premium', label: 'Premium - ARS 750.000' },
            { value: 'luxury', label: 'Lujo - ARS 1.200.000' }
          ]}
          value={formData?.selectedPackage}
          onChange={(value) => onChange('selectedPackage', value)}
          error={errors?.selectedPackage}
          required
          placeholder="Seleccionar paquete"
        />

        <Select
          label="Plan de Cuotas"
          description="Seleccione su plan de pago preferido"
          options={installmentOptions}
          value={formData?.installments}
          onChange={(value) => onChange('installments', value)}
          error={errors?.installments}
          required
          placeholder="Seleccionar cuotas"
        />
      </div>
      {formData?.selectedPackage && formData?.installments && (
        <div className="bg-card rounded-xl shadow-organic-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-semibold text-foreground">
              Resumen de Pago
            </h4>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-sm text-primary hover:text-primary/80 transition-organic"
            >
              {showCalculator ? 'Ocultar' : 'Ver'} detalles
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Precio del Paquete:
              </span>
              <span className="font-medium text-foreground">
                {formatCurrency(packagePrices?.[formData?.selectedPackage])}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Número de Cuotas:
              </span>
              <span className="font-medium text-foreground">
                {formData?.installments}x
              </span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">
                  Cuota Mensual:
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(calculateInstallment())}
                </span>
              </div>
            </div>

            {parseInt(formData?.installments) > 6 && (
              <p className="text-xs text-muted-foreground">
                * Incluye 15% de interés para cuotas mayores a 6 meses
              </p>
            )}
          </div>

          {showCalculator && (
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seña (30%):</span>
                <span className="font-medium">
                  {formatCurrency(
                    packagePrices?.[formData?.selectedPackage] * 0.3
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total a Financiar:
                </span>
                <span className="font-medium">
                  {formatCurrency(
                    packagePrices?.[formData?.selectedPackage] * 0.7
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="space-y-3">
        <Checkbox
          label="Acepto los términos y condiciones del contrato de reserva"
          checked={formData?.acceptTerms}
          onChange={(e) => onChange('acceptTerms', e?.target?.checked)}
          required
        />
        <Checkbox
          label="Deseo recibir información sobre promociones y eventos especiales"
          checked={formData?.acceptMarketing}
          onChange={(e) => onChange('acceptMarketing', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

export default PaymentOptions;