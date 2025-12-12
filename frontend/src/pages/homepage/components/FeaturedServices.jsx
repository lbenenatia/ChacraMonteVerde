import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedServices = () => {
  const services = [
  {
    id: 1,
    title: "Casamientos",
    description: "Crea la boda de tus sueños en nuestro encantador entorno natural de Monte Verde, con un servicio personalizado y atención a cada detalle.",
    image: "https://images.unsplash.com/photo-1707193393033-91ba0d862a2d",
    imageAlt: "Elegant outdoor wedding ceremony with bride and groom exchanging vows under a floral arch surrounded by seated guests in white chairs on manicured lawn",
    icon: "Heart",
    features: ["Ceremonia y Recepción", "Suite Nupcial", "Lugares para Fotografía", "Servicios de Catering"],
    link: "/packages-pricing",
    color: "bg-rose-50 text-rose-600"
  },
  {
    id: 2,
    title: "Eventos Corporativos",
    description: "Impresiona a tus colegas y clientes con un evento corporativo en Monte Verde, donde la profesionalidad se encuentra con la belleza natural.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1547e09c0-1764666161759.png",
    imageAlt: "Professional corporate event setup with business people networking around elegant cocktail tables in modern outdoor pavilion with natural lighting",
    icon: "Briefcase",
    features: ["Conferencias y Talleres", "Entretenimiento para Clientes", "Catering Personalizado", "Tecnología AudioVisual"],
    link: "/packages-pricing",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 3,
    title: "Celebraciones Especiales",
    description: "Celebra tus momentos más importantes en Monte Verde, donde cada evento se convierte en una experiencia inolvidable rodeada de naturaleza y elegancia.",
    image: "https://images.unsplash.com/photo-1668316429559-07866f73e0b0",
    imageAlt: "Festive celebration with guests dancing and celebrating under warm string lights in outdoor venue with decorated tables and colorful party atmosphere",
    icon: "PartyPopper",
    features: ["Fiestas de Cumpleaños", "Aniversarios", "Reuniones Familiares", "Eventos Temáticos"],
    link: "/packages-pricing",
    color: "bg-purple-50 text-purple-600"
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tu visión, nuestro lienzo
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Desde reuniones íntimas hasta grandes celebraciones, Monte Verde transforma cada evento en una experiencia inolvidable enraizada en la belleza natural.          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services?.map((service, index) =>
          <div
            key={service?.id}
            className={`group bg-card rounded-xl shadow-organic-sm hover:shadow-organic-md transition-organic overflow-hidden ${
            index === 1 ? 'lg:scale-105' : ''}`
            }>

              <div className="relative h-64 overflow-hidden">
                <Image
                src={service?.image}
                alt={service?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-organic-slow" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className={`absolute top-4 left-4 w-12 h-12 ${service?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={service?.icon} size={24} />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service?.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service?.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service?.features?.map((feature, featureIndex) =>
                <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} color="var(--color-primary)" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                )}
                </div>

                <Link to={service?.link}>
                  <Button
                  variant="outline"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">

                    Explorar paquetes
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/amenities-activities">
            <Button
              variant="default"
              size="lg"
              iconName="Sparkles"
              iconPosition="left">

              Desubrir todos los servicios
            </Button>
          </Link>
        </div>
      </div>
    </section>);

};

export default FeaturedServices;