import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const FinancingSimulator = ({ totalAmount }) => {
  const [installments, setInstallments] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);

  const installmentOptions = [
    { value: '3', label: '3 cuotas', description: 'Sin interés' },
    { value: '6', label: '6 cuotas', description: 'Sin interés' },
    { value: '12', label: '12 cuotas', description: 'Sin interés' },
    { value: '18', label: '18 cuotas', description: '5% de interés' },
    { value: '24', label: '24 cuotas', description: '8% de interés' },
    { value: '36', label: '36 cuotas', description: '12% de interés' },
    { value: '48', label: '48 cuotas', description: '15% de interés' },
    { value: '60', label: '60 cuotas', description: '18% de interés' }
  ];

  useEffect(() => {
    calculateFinancing();
  }, [installments, totalAmount]);

  const calculateFinancing = () => {
    const numInstallments = parseInt(installments);
    let rate = 0;

    // Interest rates based on installment count
    if (numInstallments <= 12) rate = 0;
    else if (numInstallments <= 18) rate = 0.05;
    else if (numInstallments <= 24) rate = 0.08;
    else if (numInstallments <= 36) rate = 0.12;
    else if (numInstallments <= 48) rate = 0.15;
    else rate = 0.18;

    setInterestRate(rate);

    const totalWithInterest = totalAmount * (1 + rate);
    const monthly = totalWithInterest / numInstallments;
    setMonthlyPayment(monthly);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const totalWithInterest = totalAmount * (1 + interestRate);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon name="CreditCard" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Simulador de Financiación
          </h3>
          <p className="text-sm text-muted-foreground">
            Hasta 60 cuotas para tu evento soñado
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Monto Total</span>
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        <Select
          label="Cantidad de Cuotas"
          options={installmentOptions}
          value={installments?.toString()}
          onChange={(value) => setInstallments(parseInt(value))}
        />

        <div className="bg-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cuota Mensual</p>
              <p className="text-3xl font-bold text-primary">
                {formatPrice(monthlyPayment)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Tasa de Interés</p>
              <p className="text-2xl font-semibold text-foreground">
                {(interestRate * 100)?.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total a Pagar</p>
              <p className="text-lg font-semibold text-foreground">
                {formatPrice(totalWithInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Interés Total</p>
              <p className="text-lg font-semibold text-accent">
                {formatPrice(totalWithInterest - totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-success/10 rounded-xl p-4 flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-success mb-1">
              Financiación Flexible
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Aceptamos todas las tarjetas de crédito. Las primeras 12 cuotas son sin interés. 
              Consulta por promociones bancarias especiales.
            </p>
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Primera cuota</span>
            <span className="font-medium text-foreground">{formatPrice(monthlyPayment)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cuotas restantes ({installments - 1})</span>
            <span className="font-medium text-foreground">{formatPrice(monthlyPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingSimulator;