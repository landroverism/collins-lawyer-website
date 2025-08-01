import { useLanguage } from "./LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/collins-mic.jpeg')`
        }}
      ></div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-deep-blue/85"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">{t("heroTitle")}</span>
            <br />
            <span className="text-warm-orange">{t("heroSubtitle")}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("heroDescription")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-primary text-lg px-8 py-4">
              {t("bookConsultation")}
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              {t("contactUs")}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20 hover:bg-white/20 hover:border-warm-orange/40 hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out group">
              <div className="text-5xl font-special text-warm-orange mb-4 group-hover:scale-110 transition-transform duration-300">⚖️</div>
              <div className="text-deep-blue font-medium group-hover:text-deep-blue-dark transition-colors duration-300">Advocate of the High Court</div>
              <div className="w-full h-1 bg-gradient-to-r from-warm-orange to-warm-orange-light mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20 hover:bg-white/20 hover:border-warm-orange/40 hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out group">
              <div className="text-5xl font-special text-warm-orange mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
              <div className="text-deep-blue font-medium group-hover:text-deep-blue-dark transition-colors duration-300">Post-Graduate Diploma in Law</div>
              <div className="w-full h-1 bg-gradient-to-r from-warm-orange to-warm-orange-light mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-light border border-warm-orange/20 hover:bg-white/20 hover:border-warm-orange/40 hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out group">
              <div className="text-5xl font-special text-warm-orange mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
              <div className="text-deep-blue font-medium group-hover:text-deep-blue-dark transition-colors duration-300">Head of Legal Research & Drafting</div>
              <div className="w-full h-1 bg-gradient-to-r from-warm-orange to-warm-orange-light mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
