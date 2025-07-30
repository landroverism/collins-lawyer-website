import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";

export function Testimonials() {
  const { language, t } = useLanguage();
  const testimonials = useQuery(api.testimonials.getApprovedTestimonials, { 
    featured: true, 
    language 
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-warm-orange' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-light-gray dark:bg-dark-gray">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">{t("testimonialsTitle")}</h2>
          <p className="body-lg max-w-3xl mx-auto">
            {t("testimonialsDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div 
              key={testimonial._id} 
              className="card group slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="body-md italic text-center mb-8 relative">
                <span className="text-6xl text-warm-orange opacity-20 absolute -top-4 -left-2">"</span>
                {testimonial.content}
                <span className="text-6xl text-warm-orange opacity-20 absolute -bottom-8 -right-2">"</span>
              </blockquote>

              {/* Client Info */}
              <div className="text-center border-t border-light-gray dark:border-medium-gray pt-6">
                <h4 className="font-bold text-deep-blue dark:text-white mb-2">
                  {testimonial.clientName}
                </h4>
                <p className="text-sm text-medium-gray dark:text-medium-gray-light">
                  {testimonial.caseType}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-6 right-6 w-8 h-8 border-2 border-warm-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Add testimonial CTA */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-white dark:bg-deep-blue rounded-2xl p-12 border-2 border-warm-orange/20">
            <h3 className="heading-md mb-6">{t("shareExperience")}</h3>
            <p className="body-lg mb-8 max-w-2xl mx-auto">
              {t("shareExperienceDescription")}
            </p>
            <button className="btn-secondary">
              {t("writeTestimonial")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
