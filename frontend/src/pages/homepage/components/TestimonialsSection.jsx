import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "María Elena & Carlos Rodriguez",
    event: "Wedding Celebration",
    date: "October 2024",
    rating: 5,
    content: `Monte Verde exceeded every expectation we had for our dream wedding. The natural beauty of the venue provided the perfect backdrop for our celebration, and the staff's attention to detail was incredible. Our guests are still talking about the magical atmosphere and how seamlessly everything flowed. It truly felt like a fairy tale come to life.`,
    image: "https://images.unsplash.com/photo-1723052371142-6a6a424520bb",
    imageAlt: "Happy newlywed couple María Elena in elegant white wedding dress and Carlos in classic black tuxedo embracing and smiling in natural outdoor setting with soft lighting",
    eventImage: "https://images.unsplash.com/photo-1566231900271-8b6bcb8baea8",
    eventImageAlt: "Beautiful outdoor wedding ceremony setup at Monte Verde with white chairs arranged in perfect rows facing floral arch under mature trees with natural lighting"
  },
  {
    id: 2,
    name: "Ana Patricia Mendoza",
    event: "Quinceañera Celebration",
    date: "September 2024",
    rating: 5,
    content: `My daughter's quinceañera at Monte Verde was absolutely perfect. The venue's natural elegance complemented our traditional celebration beautifully. The team helped us create a magical evening that honored our family traditions while providing a sophisticated setting. Every detail was handled with care and professionalism.`,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb7551b-1763293899118.png",
    imageAlt: "Elegant Hispanic woman Ana Patricia in formal evening dress with warm smile standing in beautifully decorated venue with soft ambient lighting",
    eventImage: "https://images.unsplash.com/photo-1702342457383-e0e35559d261",
    eventImageAlt: "Festive quinceañera celebration with guests dancing under string lights in outdoor venue decorated with colorful flowers and traditional elements"
  },
  {
    id: 3,
    name: "Roberto Silva - Tech Solutions Inc.",
    event: "Corporate Retreat",
    date: "November 2024",
    rating: 5,
    content: `We've hosted corporate events at many venues, but Monte Verde stands out for its unique combination of professionalism and natural tranquility. Our team retreat was incredibly productive, and the setting helped foster genuine connections among our staff. The facilities are top-notch, and the service was impeccable throughout our three-day event.`,
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
            Stories of Celebration
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from families who have created lasting memories at Monte Verde, where every celebration becomes a cherished story.
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
            <p className="text-muted-foreground">Celebrations Hosted</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">4.9/5</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">98%</h3>
            <p className="text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;