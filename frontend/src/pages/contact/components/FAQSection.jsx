import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Reservas y Disponibilidad',
      icon: 'Calendar',
      questions: [
        {
          question: '¿Con cuánta anticipación debo reservar?',
          answer: 'Recomendamos reservar con al menos 6 meses de anticipación para fechas populares (primavera y otoño). Para eventos corporativos o fechas menos solicitadas, 3 meses suele ser suficiente. Sin embargo, siempre consulta disponibilidad ya que ocasionalmente tenemos cancelaciones de último momento.'
        },
        {
          question: '¿Puedo visitar el lugar antes de reservar?',
          answer: 'Por supuesto. Ofrecemos visitas guiadas gratuitas de lunes a sábado. Te recomendamos agendar tu visita con anticipación para asegurar que un miembro de nuestro equipo pueda dedicarte tiempo personalizado. Las visitas duran aproximadamente 60 minutos.'
        },
        {
          question: '¿Qué incluye el depósito de reserva?',
          answer: 'El depósito de reserva es del 30% del valor total del paquete seleccionado. Este monto asegura tu fecha y es reembolsable hasta 90 días antes del evento. Después de ese período, el depósito no es reembolsable pero puede transferirse a otra fecha sujeto a disponibilidad.'
        }
      ]
    },
    {
      category: 'Servicios y Amenidades',
      icon: 'Sparkles',
      questions: [
        {
          question: '¿Qué servicios están incluidos en el alquiler?',
          answer: 'El alquiler básico incluye: uso del salón principal y jardines, mesas y sillas para la capacidad contratada, estacionamiento, personal de seguridad, y acceso a baños. Los servicios adicionales como catering, decoración, sonido e iluminación se contratan por separado.'
        },
        {
          question: '¿Puedo contratar mis propios proveedores?',
          answer: 'Sí, trabajamos con una lista de proveedores recomendados pero también aceptamos proveedores externos. Los proveedores externos deben cumplir con nuestros estándares de seguro y calidad, y pueden estar sujetos a una tarifa de coordinación.'
        },
        {
          question: '¿Hay restricciones de horario?',
          answer: 'Los eventos pueden comenzar desde las 10:00 hs y deben finalizar a las 4:00 hs del día siguiente. Ofrecemos flexibilidad en los horarios según el tipo de evento. Para eventos que requieran extensión de horario, consulta disponibilidad y tarifas adicionales.'
        }
      ]
    },
    {
      category: 'Políticas y Regulaciones',
      icon: 'FileText',
      questions: [
        {
          question: '¿Cuál es la política de cancelación?',
          answer: 'Cancelaciones con más de 90 días de anticipación: reembolso del 100% del depósito. Entre 90-60 días: reembolso del 50%. Entre 60-30 días: reembolso del 25%. Menos de 30 días: sin reembolso. Todas las cancelaciones están sujetas a una tarifa administrativa del 10%.'
        },
        {
          question: '¿Permiten mascotas en el evento?',
          answer: 'Sí, permitimos mascotas en áreas exteriores bajo supervisión del dueño. Solicitamos que nos notifiques con anticipación y que las mascotas estén al día con vacunas. Hay áreas designadas para mascotas y pedimos que se respeten las zonas restringidas.'
        },
        {
          question: '¿Qué pasa si llueve el día del evento?',
          answer: 'Contamos con espacios cubiertos amplios que pueden acomodar tu evento completo en caso de lluvia. También ofrecemos carpas elegantes para eventos al aire libre. No hay cargo adicional por cambios de último momento debido al clima.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-card rounded-2xl shadow-organic-md p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Preguntas Frecuentes
        </h2>
        <p className="text-muted-foreground">
          Encuentra respuestas a las consultas más comunes sobre nuestro espacio y servicios
        </p>
      </div>
      <div className="space-y-6">
        {faqCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-6 py-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={18} color="var(--color-primary)" />
              </div>
              <h3 className="font-medium text-foreground">{category?.category}</h3>
            </div>

            <div className="divide-y divide-border">
              {category?.questions?.map((item, questionIndex) => {
                const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                return (
                  <div key={questionIndex}>
                    <button
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-organic"
                    >
                      <span className="font-medium text-foreground pr-4">{item?.question}</span>
                      <Icon
                        name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                        size={20}
                        className="flex-shrink-0 transition-organic"
                        color="var(--color-muted-foreground)"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 pt-2">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item?.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-2">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nuestro equipo está disponible para responder cualquier pregunta adicional que tengas sobre nuestro espacio, servicios o proceso de reserva.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+59892824644"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-organic text-sm font-medium"
              >
                <Icon name="Phone" size={16} />
                <span>Llamar ahora</span>
              </a>
              <a
                href="https://wa.me/59892824644"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-organic text-sm font-medium"
              >
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;