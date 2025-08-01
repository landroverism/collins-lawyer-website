import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useLanguage } from "./LanguageContext";

export function Contact() {
  const { language, t } = useLanguage();
  const submitContactForm = useMutation(api.contact.submitContactForm);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const practiceAreas = [
    {
      value: "civil-litigation",
      label: "Civil Litigation",
      description: "Comprehensive representation in civil disputes, contract matters, tort claims, property disputes, and debt recovery cases."
    },
    {
      value: "criminal-law",
      label: "Criminal Law",
      description: "Expert criminal defense, bail applications, appeals & reviews, and representation in white collar crimes."
    },
    {
      value: "corporate-commercial",
      label: "Corporate & Commercial Law",
      description: "Full-service corporate legal support including company formation, governance, mergers & acquisitions, and regulatory compliance."
    },
    {
      value: "property-conveyancing",
      label: "Property & Conveyancing",
      description: "Complete property law services from transactions and title searches to lease agreements and land disputes."
    },
    {
      value: "family-law",
      label: "Family Law",
      description: "Sensitive handling of family matters including divorce, child custody, matrimonial property, and adoption."
    },
    {
      value: "employment-labor",
      label: "Employment & Labor Law",
      description: "Employment law expertise covering contracts, wrongful termination, labor disputes, and workplace policies."
    },
    {
      value: "constitutional-administrative",
      label: "Constitutional & Administrative Law",
      description: "Specialized constitutional law practice including petitions, judicial review, and human rights cases."
    },
    {
      value: "alternative-dispute-resolution",
      label: "Alternative Dispute Resolution",
      description: "Professional mediation, arbitration, and negotiation services for efficient dispute resolution."
    },
    {
      value: "legal-research-advisory",
      label: "Legal Research & Advisory",
      description: "Comprehensive legal research, opinions, policy analysis, and regulatory advice for clients."
    },
    {
      value: "general-inquiry",
      label: "General Inquiry",
      description: "General legal consultation and advice on various legal matters."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Submit to Convex database
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        language
      });

      // Send WhatsApp notification
      const whatsappMessage = `New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${practiceAreas.find(area => area.value === formData.subject)?.label || formData.subject}
Message: ${formData.message}`;

      const whatsappUrl = `https://wa.me/254718076309?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Send email notification
      const emailSubject = `New Contact Form: ${practiceAreas.find(area => area.value === formData.subject)?.label || formData.subject}`;
      const emailBody = `New contact form submission received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${practiceAreas.find(area => area.value === formData.subject)?.label || formData.subject}
Message: ${formData.message}

This message was sent from your website contact form.`;
      
      const emailUrl = `mailto:xangcollins@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(emailUrl);
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
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
    <section id="contact" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">{t("contactTitle")}</h2>
          <p className="body-lg text-medium-gray max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="heading-md mb-6 text-deep-blue">{t("getInTouch")}</h3>
              <p className="body-md text-medium-gray mb-8">
                {t("contactDescription")}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-1">{t("email")}</h4>
                  <a href="mailto:xangcollins@gmail.com" className="text-medium-gray hover:text-warm-orange transition-colors">
                    xangcollins@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-1">WhatsApp</h4>
                  <a href="https://wa.me/254718076309" target="_blank" rel="noopener noreferrer" className="text-medium-gray hover:text-warm-orange transition-colors">
                    +254 718 076 309
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-1">{t("address")}</h4>
                  <p className="text-medium-gray">
                    Eldoret, Kenya<br />
                    {t("officeHours")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-1">LinkedIn</h4>
                  <a href="https://linkedin.com/in/collins-sang-38a97924a" target="_blank" rel="noopener noreferrer" className="text-medium-gray hover:text-warm-orange transition-colors">
                    linkedin.com/in/collins-sang-38a97924a
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-1">X (Twitter)</h4>
                  <a href="https://x.com/mawecollins?t=zaiMiQ1jf89L_Hyz5ktNPg&s=09" target="_blank" rel="noopener noreferrer" className="text-medium-gray hover:text-warm-orange transition-colors">
                    @mawecollins
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold text-deep-blue mb-4">{t("officeHours")}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-medium-gray">{t("mondayFriday")}</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium-gray">{t("saturday")}</span>
                  <span className="font-medium">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium-gray">{t("sunday")}</span>
                  <span className="font-medium">{t("closed")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="heading-md mb-6 text-deep-blue">{t("sendMessage")}</h3>
            
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">Message sent successfully! You will be contacted shortly.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">There was an error sending your message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-deep-blue mb-2">
                    {t("fullName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300"
                    placeholder={t("enterFullName")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-deep-blue mb-2">
                    {t("email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300"
                    placeholder={t("enterEmail")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-deep-blue mb-2">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300"
                    placeholder={t("enterPhone")}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-deep-blue mb-2">
                    Practice Area *
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Select a Practice Area</option>
                      {practiceAreas.map((area) => (
                        <option key={area.value} value={area.value}>
                          {area.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-medium-gray" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {formData.subject && (
                    <div className="mt-2 p-3 bg-light-gray rounded-lg">
                      <p className="text-sm text-medium-gray">
                        {practiceAreas.find(area => area.value === formData.subject)?.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-deep-blue mb-2">
                  {t("message")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 resize-none"
                  placeholder={t("enterMessage")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
