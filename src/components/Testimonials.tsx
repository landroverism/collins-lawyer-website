import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";

export function Testimonials() {
  const { language, t } = useLanguage();
  const testimonials = useQuery(api.testimonials.getApprovedTestimonials, { 
    language,
    featured: false 
  }) || [];

  return (
    <section id="testimonials" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">{t("testimonialsTitle")}</h2>
          <p className="body-lg text-medium-gray max-w-2xl mx-auto">
            {t("testimonialsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="card text-center">
              <div className="text-4xl text-warm-orange mb-4">⭐</div>
              <blockquote className="body-md text-medium-gray mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              <div className="text-center border-t border-light-gray pt-6">
                <h4 className="font-bold text-deep-blue mb-2">
                  {testimonial.clientName}
                </h4>
                <p className="text-sm text-medium-gray">
                  {testimonial.caseType}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <div className="bg-white rounded-2xl p-12 border-2 border-warm-orange/20">
              <div className="text-center">
                <div className="text-6xl text-warm-orange mb-6">💬</div>
                <blockquote className="body-lg text-medium-gray mb-8 italic max-w-4xl mx-auto">
                  "{testimonials[0].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-warm-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonials[0].clientName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-deep-blue">{testimonials[0].clientName}</h4>
                    <p className="text-sm text-medium-gray">{testimonials[0].caseType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No testimonials message */}
        {testimonials.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="heading-md mb-4 text-deep-blue">
              No Testimonials Yet
            </h3>
            <p className="body-lg text-medium-gray max-w-2xl mx-auto">
              Collins K. Sang is building a reputation for excellence. 
              Check back soon for client testimonials and reviews.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
