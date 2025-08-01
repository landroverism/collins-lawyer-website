import { useLanguage } from "./LanguageContext";
import { useState } from "react";

interface FooterProps {
  onSetAdminAccess?: (admin: boolean) => void;
}

export function Footer({ onSetAdminAccess }: FooterProps) {
  const { t } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyrightClick = () => {
    const now = Date.now();
    
    // Reset click count if more than 3 seconds have passed
    if (now - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    setLastClickTime(now);

    // Secret admin access: 5 clicks within 3 seconds
    if (clickCount >= 4) { // 5th click (0-indexed, so 4)
      onSetAdminAccess?.(true);
      setClickCount(0);
    }
  };

  return (
    <footer className="bg-deep-blue text-white">
      {/* Main Footer */}
      <div className="section-padding-sm">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">
                Collins K. Sang & Associates
              </h3>
              <p className="body-md text-gray-300 mb-6 max-w-md">
                Providing expert legal services with integrity, professionalism, and dedication to justice. As an Advocate of the High Court of Kenya, I bring comprehensive legal expertise spanning litigation, legal research, document drafting, and client relations.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:xangcollins@gmail.com" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="https://wa.me/254718076309" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/collins-sang-38a97924a" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://x.com/mawecollins?t=zaiMiQ1jf89L_Hyz5ktNPg&s=09" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">{t("quickLinks")}</h4>
              <ul className="space-y-3">
                {[
                  { key: "home", id: "home" },
                  { key: "about", id: "about" },
                  { key: "practice", id: "practice" },
                  { key: "testimonials", id: "testimonials" },
                  { key: "blog", id: "blog" },
                  { key: "contact", id: "contact" }
                ].map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-300 hover:text-warm-orange transition-colors duration-300 hover:underline"
                    >
                      {t(item.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">{t("contactInfo")}</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-warm-orange text-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Eldoret, Kenya<br />
                      Office Location
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </span>
                  <a href="https://wa.me/254718076309" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warm-orange transition-colors duration-300 text-sm">
                    +254 718 076 309
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <a href="mailto:xangcollins@gmail.com" className="text-gray-300 hover:text-warm-orange transition-colors duration-300 text-sm">
                    xangcollins@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="text-gray-300 text-sm">
                    Mon-Fri: 8:00 AM - 6:00 PM<br />
                    Sat-Sun: By Appointment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-deep-blue-light">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <button
              onClick={handleCopyrightClick}
              className="text-gray-400 text-sm hover:text-warm-orange transition-colors duration-300 cursor-pointer"
            >
              © {new Date().getFullYear()} Collins K. Sang & Associates. {t("allRightsReserved")}
            </button>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-warm-orange transition-colors duration-300 text-sm">
                {t("privacyPolicy")}
              </a>
              <a href="#" className="text-gray-400 hover:text-warm-orange transition-colors duration-300 text-sm">
                {t("termsOfService")}
              </a>
              <a href="#" className="text-gray-400 hover:text-warm-orange transition-colors duration-300 text-sm">
                {t("disclaimer")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
