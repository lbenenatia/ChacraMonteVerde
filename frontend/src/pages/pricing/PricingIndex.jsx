import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PackageCard from './components/PackageCard';
import PricingCalculator from './components/PricingCalculator';
import FinancingSimulator from './components/FinancingSimulator';
import ComparisonMatrix from './components/ComparisonMatrix';
import CustomizationWizard from './components/CustomizationWizard';

const PackagesPricing = () => {
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: 'esencial',
      name: 'Esencial',
      icon: 'Leaf',
      description: 'Perfecto para celebraciones íntimas y eventos corporativos pequeños',
      price: 1,
      capacity: 80,
      discount: null,
      financing: { maxInstallments: 12 },
      features: [
        { text: 'Salón climatizado hasta 80 personas', included: true },
        { text: 'Jardines exteriores naturales', included: true },
        { text: 'Mobiliario completo (mesas y sillas)', included: true },
        { text: 'Mantelería básica', included: true },
        { text: 'Estacionamiento para 30 vehículos', included: true },
        { text: 'Personal de limpieza', included: true },
        { text: 'Coordinador de eventos', included: false },
        { text: 'Decoración floral', included: false },
        { text: 'Servicio de catering', included: false },
        { text: 'Iluminación especial', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: 'TreePine',
      description: 'La elección más popular para bodas y eventos especiales',
      price: 2,
      capacity: 150,
      discount: 15,
      financing: { maxInstallments: 24 },
      features: [
        { text: 'Salón climatizado hasta 150 personas', included: true },
        { text: 'Jardines exteriores con zona de ceremonia', included: true },
        { text: 'Mobiliario premium completo', included: true },
        { text: 'Mantelería y vajilla de diseño', included: true },
        { text: 'Estacionamiento para 60 vehículos', included: true },
        { text: 'Personal de servicio completo', included: true },
        { text: 'Coordinador de eventos dedicado', included: true },
        { text: 'Decoración floral básica', included: true },
        { text: 'Sistema de sonido profesional', included: true },
        { text: 'Iluminación ambiental LED', included: true },
        { text: 'Servicio de catering', included: false },
        { text: 'Fotografía profesional', included: false }
      ]
    },
    {
      id: 'exclusivo',
      name: 'Exclusivo',
      icon: 'Crown',
      description: 'Experiencia completa de lujo para eventos inolvidables',
      price: 3,
      capacity: 250,
      discount: 20,
      financing: { maxInstallments: 60 },
      features: [
        { text: 'Salón climatizado hasta 250 personas', included: true },
        { text: 'Acceso completo a todos los espacios', included: true },
        { text: 'Mobiliario de lujo personalizado', included: true },
        { text: 'Mantelería, vajilla y cristalería premium', included: true },
        { text: 'Estacionamiento ilimitado con valet', included: true },
        { text: 'Personal de servicio exclusivo', included: true },
        { text: 'Coordinador y asistente dedicados', included: true },
        { text: 'Decoración floral premium personalizada', included: true },
        { text: 'Sistema audiovisual completo', included: true },
        { text: 'Iluminación arquitectónica y efectos', included: true },
        { text: 'Catering gourmet de 3 pasos', included: true },
        { text: 'Barra premium de bebidas', included: true },
        { text: 'Fotografía y video profesional', included: true },
        { text: 'DJ y entretenimiento', included: true },
        { text: 'Suite nupcial incluida', included: true }
      ]
    }
  ];

  const tabs = [
    { id: 'packages', label: 'Paquetes', icon: 'Package' },
    { id: 'calculator', label: 'Calculadora', icon: 'Calculator' },
    { id: 'comparison', label: 'Comparar', icon: 'GitCompare' },
    { id: 'customize', label: 'Personalizar', icon: 'Wand2' }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setCalculatedTotal(pkg?.price);
    setShowCustomization(false);
  };

  const handleCalculate = (data) => {
    setCalculatedTotal(data?.total);
    setSelectedPackage(data?.package);
  };

  const handleCustomizationComplete = (data) => {
    setCalculatedTotal(data?.total);
    setShowCustomization(false);
    setActiveTab('packages');
  };

  const benefits = [
    {
      icon: 'Users',
      title: 'Asesoramiento Experto',
      description: 'Equipo de planificación dedicado durante todo el proceso'
    }
  ];

  const faqs = [
    {
      question: '¿Qué incluye el precio del paquete?',
      answer: 'Cada paquete incluye el alquiler del espacio, mobiliario, personal básico y servicios detallados en la descripción. Los servicios adicionales como catering, fotografía y decoración se cotizan por separado según tus necesidades.'
    },
    {
      question: '¿Cómo funcionan las cuotas sin interés?',
      answer: 'Ofrecemos hasta 60 cuotas sin interés con todas las tarjetas de crédito. Para los plazos mayores, aplicamos tasas preferenciales que puedes simular en nuestra calculadora de financiación.'
    },
    {
      question: '¿Puedo visitar el lugar antes de reservar?',
      answer: 'Por supuesto. Ofrecemos visitas guiadas de lunes a viernes con cita previa. Durante la visita, nuestro coordinador te mostrará todos los espacios y responderá tus consultas.'
    },
    {
      question: '¿Qué pasa si necesito cancelar?',
      answer: 'Si cancelas con más de 30 días de anticipación, reembolsamos el 100% de la seña. Entre 15-30 días, el 50%. Con menos de 15 días, la seña no es reembolsable pero puede transferirse a otra fecha.'
    },
    {
      question: '¿Puedo traer mis propios proveedores?',
      answer: 'Sí, trabajamos con una red de proveedores recomendados pero también aceptamos proveedores externos que cumplan con nuestros estándares de calidad y seguridad.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Icon name="Sparkles" size={18} color="var(--color-primary)" />
                <span className="text-sm font-medium text-primary">
                  Financiación hasta 60 cuotas
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                Paquetes y Precios Transparentes
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Elige el paquete perfecto para tu evento. Precios claros, sin sorpresas, 
                con opciones de financiación flexibles para hacer realidad tu celebración soñada.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/booking">
                  <Button variant="default" size="lg" iconName="Calendar" iconPosition="right">
                    Reservar Consulta
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" iconName="Phone" iconPosition="left">
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-2 mb-12 overflow-x-auto pb-4">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-organic whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-organic-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={tab?.icon} size={20} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {activeTab === 'packages' && (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages?.map((pkg, index) => (
                    <PackageCard
                      key={pkg?.id}
                      package={pkg}
                      isPopular={index === 1}
                      onSelect={handlePackageSelect}
                      selectedCurrency="ARS"
                    />
                  ))}
                </div>

                {selectedPackage && (
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                          Paquete Seleccionado: {selectedPackage?.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Explora opciones de financiación para tu evento
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        iconName="Wand2"
                        iconPosition="left"
                        onClick={() => {
                          setShowCustomization(true);
                          setActiveTab('customize');
                        }}
                      >
                        Personalizar
                      </Button>
                    </div>
                    <FinancingSimulator totalAmount={calculatedTotal} />
                  </div>
                )}
              </div>
            )}

            {/* {activeTab === 'calculator' && (
              <div className="max-w-2xl mx-auto">
                <PricingCalculator packages={packages} onCalculate={handleCalculate} />
              </div>
            )} */}

            {activeTab === 'comparison' && (
              <ComparisonMatrix packages={packages} onSelectPackage={handlePackageSelect} />
            )}

            {activeTab === 'customize' && (
              <div className="max-w-4xl mx-auto">
                <CustomizationWizard
                  basePackage={selectedPackage || packages?.[1]}
                  onComplete={handleCustomizationComplete}
                />
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Beneficios Exclusivos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Cuando eliges Chacra Monte Verde, obtienes mucho más que un espacio
              </p>
            </div>

            <div>
              {benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-organic-sm hover:shadow-organic-md transition-organic"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={benefit?.icon} size={28} color="var(--color-primary)" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {benefit?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Respuestas a las consultas más comunes sobre nuestros paquetes
              </p>
            </div>

            <div className="space-y-4">
              {faqs?.map((faq, index) => (
                <details
                  key={index}
                  className="bg-background rounded-xl p-6 shadow-organic-sm hover:shadow-organic-md transition-organic group"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-serif text-lg font-semibold text-foreground pr-4">
                      {faq?.question}
                    </span>
                    <Icon
                      name="ChevronDown"
                      size={20}
                      className="text-primary transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq?.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPricing;