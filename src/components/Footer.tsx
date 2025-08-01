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
                  📧
                </a>
                <a href="tel:+254718076309" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  📱
                </a>
                <a href="https://linkedin.com/in/collins-sang-38a97924a" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white hover:bg-warm-orange-light transition-all duration-300 scale-hover-sm">
                  💼
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
                  <span className="text-warm-orange text-lg">📍</span>
                  <div>
                    <p className="text-gray-300 text-sm">
                      Eldoret, Kenya<br />
                      Office Location
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">📞</span>
                  <a href="tel:+254718076309" className="text-gray-300 hover:text-warm-orange transition-colors duration-300 text-sm">
                    +254 718 076 309
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">✉️</span>
                  <a href="mailto:xangcollins@gmail.com" className="text-gray-300 hover:text-warm-orange transition-colors duration-300 text-sm">
                    xangcollins@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-warm-orange text-lg">🕒</span>
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
