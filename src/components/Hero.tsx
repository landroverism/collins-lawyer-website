import { useLanguage } from "./LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-blue via-deep-blue-light to-deep-blue-dark text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b85a1e' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-warm-orange opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-warm-orange opacity-20 rounded-full animate-pulse delay-1000"></div>

      <div className="relative z-10 container-custom text-center fade-in">
        <div className="max-w-5xl mx-auto">
          {/* Professional Photo */}
          <div className="mb-12 slide-up">
            <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-2xl scale-hover border-4 border-warm-orange">
              <img 
                src="/collins-profile.jpg" 
                alt="Collins K. Sang - Advocate of the High Court of Kenya"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="slide-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="heading-xl mb-6 bg-gradient-to-r from-white to-warm-orange-light bg-clip-text text-transparent">
              Collins K. Sang
            </h1>
          </div>
          
          <div className="slide-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-2xl md:text-3xl mb-4 text-warm-orange-light font-medium">
              Advocate of the High Court of Kenya
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Dedicated Legal Professional with Proven Expertise
            </p>
          </div>
          
          <div className="slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="body-lg mb-16 text-gray-300 max-w-4xl mx-auto">
              As an Advocate of the High Court of Kenya, I bring comprehensive legal expertise spanning litigation, legal research, document drafting, and client relations. With a proven track record in judicial environments and commercial legal practice, I am committed to delivering exceptional legal services through meticulous attention to detail and ethical advocacy.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="slide-up flex flex-col sm:flex-row gap-6 justify-center items-center mb-20" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={scrollToContact}
              className="btn-primary shadow-2xl"
            >
              {t("bookConsultation")}
            </button>
            <button
              onClick={scrollToContact}
              className="btn-outline"
            >
              {t("contactNow")}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="slide-up grid grid-cols-1 md:grid-cols-3 gap-8 text-center" style={{ animationDelay: '1s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20">
              <div className="text-5xl font-special text-warm-orange mb-4">⚖️</div>
              <div className="text-gray-300 font-medium">Advocate of the High Court</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20">
              <div className="text-5xl font-special text-warm-orange mb-4">🎓</div>
              <div className="text-gray-300 font-medium">Post-Graduate Diploma in Law</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20">
              <div className="text-5xl font-special text-warm-orange mb-4">🏢</div>
              <div className="text-gray-300 font-medium">Head of Legal Research & Drafting</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-warm-orange rounded-full flex justify-center">
          <div className="w-1 h-3 bg-warm-orange rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
