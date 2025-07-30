import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";
import { toast } from "sonner";

export function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContactForm = useMutation(api.contact.submitContactForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm({
        ...formData,
        language
      });
      
      toast.success(t("contactSuccess"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error(t("contactError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-light-gray dark:bg-dark-gray">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">{t("contactTitle")}</h2>
          <p className="body-lg max-w-3xl mx-auto">
            {t("contactDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="slide-up">
            <div className="space-y-8">
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white text-xl scale-hover-sm">
                    📍
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">{t("officeAddress")}</h3>
                    <p className="body-md">
                      Collins K. Sang & Associates<br />
                      Eldoret, Kenya<br />
                      Office Location
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white text-xl scale-hover-sm">
                    📞
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">{t("phoneNumber")}</h3>
                    <p className="body-md">
                      <a href="tel:+254718076309" className="link-primary">
                        +254 718 076 309
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white text-xl scale-hover-sm">
                    ✉️
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">{t("emailAddress")}</h3>
                    <p className="body-md">
                      <a href="mailto:xangcollins@gmail.com" className="link-primary">
                        xangcollins@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white text-xl scale-hover-sm">
                    🔗
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">LinkedIn</h3>
                    <p className="body-md">
                      <a href="https://linkedin.com/in/collins-sang-38a97924a" target="_blank" rel="noopener noreferrer" className="link-primary">
                        linkedin.com/in/collins-sang-38a97924a
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white text-xl scale-hover-sm">
                    🕒
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">{t("officeHours")}</h3>
                    <p className="body-md">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday - Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card">
              <h3 className="heading-md mb-8 text-center">{t("sendMessage")}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                      {t("fullName")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                      placeholder={t("enterFullName")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                      {t("emailAddress")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                      placeholder={t("enterEmail")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                      {t("phoneNumber")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                      placeholder={t("enterPhone")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                      {t("subject")} *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white"
                    >
                      <option value="">{t("selectSubject")}</option>
                      <option value="consultation">{t("legalConsultation")}</option>
                      <option value="family">{t("familyLaw")}</option>
                      <option value="corporate">{t("corporateLaw")}</option>
                      <option value="property">{t("propertyLaw")}</option>
                      <option value="other">{t("other")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-blue dark:text-white mb-2">
                    {t("message")} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-light-gray dark:border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 bg-white dark:bg-deep-blue text-deep-blue dark:text-white resize-none"
                    placeholder={t("enterMessage")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("sending") : t("sendMessage")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
