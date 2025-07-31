import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import { SignInForm } from "../SignInForm";
import { SignOutButton } from "../SignOutButton";

interface HeaderProps {
  isAdmin: boolean;
  onAdminAccess?: () => void;
}

export function Header({ isAdmin, onAdminAccess }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-deep-blue/95 backdrop-blur-sm border-b border-gray-200 dark:border-medium-gray shadow-sm transition-all duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-bold text-deep-blue dark:text-white transition-colors duration-300 font-handwriting" style={{ fontFamily: "'Playfair Display', serif" }}>
              Collins K. Sang
            </h1>
            <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-handwriting" style={{ fontFamily: "'Playfair Display', serif" }}>
              Advocate of the High Court
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {[
              { key: "home", id: "home" },
              { key: "about", id: "about" },
              { key: "practice", id: "practice" },
              { key: "testimonials", id: "testimonials" },
              { key: "blog", id: "blog" },
              { key: "contact", id: "contact" }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-medium-gray-light hover:text-warm-orange dark:hover:text-warm-orange transition-all duration-300 font-medium relative group text-sm xl:text-base px-2 py-1"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-warm-orange transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white dark:bg-transparent border-2 border-gray-300 dark:border-medium-gray rounded-full px-3 py-2 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-warm-orange transition-all duration-300 text-gray-700 dark:text-medium-gray-light"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white dark:bg-deep-blue text-gray-700 dark:text-white">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-8 w-16 lg:h-10 lg:w-20 items-center rounded-full bg-gray-200 dark:bg-medium-gray transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange scale-hover-sm"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <span
                className={`inline-block h-6 w-6 lg:h-8 lg:w-8 transform rounded-full bg-white dark:bg-deep-blue transition-all duration-300 flex items-center justify-center shadow-lg ${
                  theme === "dark" ? "translate-x-9 lg:translate-x-11" : "translate-x-1"
                }`}
              >
                {theme === "light" ? (
                  <span className="text-warm-orange text-sm lg:text-lg">☀</span>
                ) : (
                  <span className="text-warm-orange text-sm lg:text-lg">☾</span>
                )}
              </span>
            </button>

            {/* Admin Access */}
            {isAdmin ? (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <button
                  onClick={onAdminAccess}
                  className="px-3 py-2 lg:px-6 lg:py-2 bg-deep-blue text-white rounded-full hover:bg-gray-100 hover:border-2 hover:border-deep-blue hover:text-deep-blue dark:hover:bg-transparent transition-all duration-300 font-medium text-xs lg:text-sm"
                >
                  {t("admin")}
                </button>
                <SignOutButton />
              </div>
            ) : (
              <button
                onClick={() => setShowSignIn(true)}
                className="px-3 py-2 lg:px-6 lg:py-2 bg-deep-blue text-white rounded-full hover:bg-gray-100 hover:border-2 hover:border-deep-blue hover:text-deep-blue dark:hover:bg-transparent transition-all duration-300 font-medium text-xs lg:text-sm"
              >
                Admin
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-medium-gray transition-all duration-300 scale-hover-sm"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-medium-gray-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden py-6 border-t border-gray-200 dark:border-medium-gray fade-in bg-white dark:bg-deep-blue">
            <div className="space-y-4">
              {/* Mobile Language Selector */}
              <div className="mb-6">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white dark:bg-transparent border-2 border-gray-300 dark:border-medium-gray rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-warm-orange transition-all duration-300 text-gray-700 dark:text-medium-gray-light"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white dark:bg-deep-blue text-gray-700 dark:text-white">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "home", id: "home" },
                  { key: "about", id: "about" },
                  { key: "practice", id: "practice" },
                  { key: "testimonials", id: "testimonials" },
                  { key: "blog", id: "blog" },
                  { key: "contact", id: "contact" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-4 py-3 text-gray-700 dark:text-medium-gray-light hover:text-warm-orange dark:hover:text-warm-orange hover:bg-gray-100 dark:hover:bg-medium-gray transition-all duration-300 font-medium rounded-lg text-sm"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
          <div className="bg-white dark:bg-deep-blue p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-deep-blue dark:text-white">Admin Sign In</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-medium-gray hover:text-warm-orange transition-colors duration-300 text-2xl scale-hover-sm"
              >
                ✕
              </button>
            </div>
            <SignInForm />
          </div>
        </div>
      )}
    </header>
  );
}