import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "María Elena & Carlos Rodriguez",
    event: "Casamiento",
    date: "Octubre 2024",
    rating: 5,
    content: `Nuestro casamiento en Monte Verde fue un sueño hecho realidad. Desde el momento en que visitamos el lugar, supimos que era el escenario perfecto para nuestro día especial. La combinación de la belleza natural y la elegancia del lugar creó una atmósfera mágica. El equipo de Monte Verde fue increíblemente atento y profesional, asegurándose de que cada detalle fuera perfecto. Nuestros invitados no dejaron de elogiar la ubicación y la organización del evento. Estamos eternamente agradecidos por haber elegido Monte Verde para celebrar nuestro amor.`,
    image: "https://images.unsplash.com/photo-1723052371142-6a6a424520bb",
    imageAlt: "Happy newlywed couple María Elena in elegant white wedding dress and Carlos in classic black tuxedo embracing and smiling in natural outdoor setting with soft lighting",
    eventImage: "https://images.unsplash.com/photo-1566231900271-8b6bcb8baea8",
    eventImageAlt: "Beautiful outdoor wedding ceremony setup at Monte Verde with white chairs arranged in perfect rows facing floral arch under mature trees with natural lighting"
  },
  {
    id: 2,
    name: "Ana Patricia Mendoza",
    event: "Quince",
    date: "Setiembre 2024",
    rating: 5,
    content: `Celebrar mis quinces en Monte Verde fue una experiencia inolvidable. Desde el primer momento, el equipo de Monte Verde hizo que me sintiera especial y cuidada. La locación es simplemente espectacular, con jardines hermosos y espacios elegantes que hicieron que mi fiesta fuera mágica. Mis amigos y familiares quedaron impresionados con la organización y la atención al detalle. Cada momento de la celebración fue perfecto, desde la ceremonia hasta la recepción. Monte Verde superó todas mis expectativas y siempre llevaré esos recuerdos en mi corazón.`,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb7551b-1763293899118.png",
    imageAlt: "Elegant Hispanic woman Ana Patricia in formal evening dress with warm smile standing in beautifully decorated venue with soft ambient lighting",
    eventImage: "https://images.unsplash.com/photo-1702342457383-e0e35559d261",
    eventImageAlt: "Festive quinceañera celebration with guests dancing under string lights in outdoor venue decorated with colorful flowers and traditional elements"
  },
  {
    id: 3,
    name: "Roberto Silva - Tech Solutions Inc.",
    event: "Evento Corporativo",
    date: "Noviembre 2024",
    rating: 5,
    content: `Organizar nuestro evento corporativo en Monte Verde fue una decisión que resultó ser excepcional. Desde el inicio, el equipo de Monte Verde demostró un alto nivel de profesionalismo y atención al detalle. La ubicación ofrecía un ambiente perfecto para combinar trabajo y relajación, con espacios versátiles y tecnología de punta para nuestras presentaciones. Nuestros empleados quedaron encantados con las comodidades y la belleza del entorno natural. La experiencia en Monte Verde no solo fortaleció nuestro equipo, sino que también dejó una impresión duradera en todos los asistentes. Sin duda, volveremos a elegir Monte Verde para futuros eventos corporativos.`,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1531fe9-1765040853978.png",
    imageAlt: "Professional businessman Roberto Silva in navy blue suit with confident smile standing in modern corporate setting with natural lighting",
    eventImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1547e09c0-1764666161759.png",
    eventImageAlt: "Professional corporate retreat setup with business people networking around elegant tables in outdoor pavilion with natural forest backdrop"
  }];


  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const current = testimonials?.[activeTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comentarios de eventos pasados
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Escucha a las familias que han creado recuerdos duraderos en Monte Verde, donde cada celebración se convierte en una historia apreciada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-organic-md">
                  <Image
                    src={current?.eventImage}
                    alt={current?.eventImageAlt}
                    className="w-full h-full object-cover" />

                </div>
                <div className="relative h-32 rounded-xl overflow-hidden shadow-organic-sm">
                  <Image
                    src={current?.image}
                    alt={current?.imageAlt}
                    className="w-full h-full object-cover" />

                </div>
              </div>
              <div className="mt-8">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-organic-md">
                  <Image
                    src="https://images.unsplash.com/photo-1469648783079-805d22de1f95"
                    alt="Scenic view of Monte Verde venue showing lush green landscape with mature trees, manicured gardens, and elegant outdoor event spaces in natural setting"
                    className="w-full h-full object-cover" />

                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(current?.rating)]?.map((_, i) =>
              <Icon key={i} name="Star" size={20} color="var(--color-accent)" className="fill-current" />
              )}
            </div>

            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic">
              "{current?.content}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  {current?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {current?.event} • {current?.date}
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-organic"
                  aria-label="Previous testimonial">

                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-organic"
                  aria-label="Next testimonial">

                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-organic ${
                index === activeTestimonial ? 'bg-primary' : 'bg-muted'}`
                }
                aria-label={`View testimonial ${index + 1}`} />

              )}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">500+</h3>
            <p className="text-muted-foreground">Eventos organizados</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">4.9/5</h3>
            <p className="text-muted-foreground">Calificación Promedio</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">98%</h3>
            <p className="text-muted-foreground">Satisfacción del Cliente</p>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;