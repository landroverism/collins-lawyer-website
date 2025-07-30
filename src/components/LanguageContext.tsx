import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    practice: "Practice Areas",
    testimonials: "Testimonials",
    blog: "Blog",
    contact: "Contact",
    admin: "Admin",
    
    // Hero Section
    heroTitle: "Collins Kipkemoi Sang",
    heroSubtitle: "Advocate of the High Court of Kenya",
    heroDescription: "Providing expert legal services with integrity, professionalism, and dedication to justice. Serving clients across Kenya with comprehensive legal solutions.",
    bookConsultation: "Book Free Consultation",
    contactNow: "Contact Us Now",
    
    // About Section
    aboutTitle: "About Collins Kipkemoi Sang",
    aboutDescription1: "With extensive experience in Kenyan law and a commitment to excellence, Collins Kipkemoi Sang provides trusted legal counsel across multiple practice areas.",
    aboutDescription2: "Admitted to the High Court of Kenya, he brings deep understanding of constitutional law, civil litigation, and alternative dispute resolution.",
    aboutDescription3: "His approach combines traditional legal expertise with modern client service, ensuring every case receives personalized attention and strategic thinking.",
    education: "Education & Qualifications",
    educationDetails: "Bachelor of Laws (LL.B), University of Nairobi. Admitted to the High Court of Kenya. Member of the Law Society of Kenya.",
    experience: "Professional Experience",
    experienceDetails: "Over 15 years of practice in constitutional law, civil litigation, family law, and corporate legal services.",
    scheduleConsultation: "Schedule Consultation",
    awardWinning: "Award Winning",
    clientFocused: "Client Focused",
    yearsExperience: "Years of Experience",
    casesHandled: "Cases Successfully Handled",
    clientSatisfaction: "Client Satisfaction Rate",
    
    // Practice Areas
    practiceAreasTitle: "Practice Areas",
    practiceAreasDescription: "Comprehensive legal services tailored to meet your specific needs across multiple areas of law.",
    learnMore: "Learn More",
    needLegalHelp: "Need Legal Help?",
    needLegalHelpDescription: "Contact us today for a consultation and let us help you navigate your legal challenges with confidence.",
    getStarted: "Get Started",
    
    // Testimonials
    testimonialsTitle: "What Our Clients Say",
    testimonialsDescription: "Trusted by clients across Kenya for exceptional legal representation and personalized service.",
    shareExperience: "Share Your Experience",
    shareExperienceDescription: "We value your feedback. Share your experience working with our legal team.",
    writeTestimonial: "Write a Testimonial",
    
    // Blog
    blogTitle: "Legal Insights & Updates",
    blogDescription: "Stay informed with the latest legal developments, case studies, and expert analysis from our legal team.",
    readMore: "Read More",
    viewAllPosts: "View All Posts",
    
    // Contact
    contactTitle: "Get In Touch",
    contactDescription: "Schedule your consultation today and take the first step towards resolving your legal matters.",
    officeAddress: "Office Address",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    sendMessage: "Send Message",
    fullName: "Full Name",
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email address",
    enterPhone: "Enter your phone number",
    subject: "Subject",
    selectSubject: "Select a subject",
    message: "Message",
    enterMessage: "Enter your message",
    officeHours: "Office Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    legalConsultation: "Legal Consultation",
    familyLaw: "Family Law",
    corporateLaw: "Corporate Law",
    propertyLaw: "Property Law",
    other: "Other",
    sending: "Sending...",
    contactSuccess: "Message sent successfully! We'll get back to you soon.",
    contactError: "Failed to send message. Please try again.",
    
    // Footer
    footerDescription: "Providing expert legal services with integrity, professionalism, and dedication to justice across Kenya.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Information",
    allRightsReserved: "All rights reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    disclaimer: "Disclaimer",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
  sw: {
    // Navigation
    home: "Nyumbani",
    about: "Kuhusu",
    practice: "Maeneo ya Utaalamu",
    testimonials: "Ushuhuda",
    blog: "Blogu",
    contact: "Wasiliana",
    admin: "Msimamizi",
    
    // Hero Section
    heroTitle: "Collins Kipkemoi Sang",
    heroSubtitle: "Mtetezi wa Mahakama Kuu ya Kenya",
    heroDescription: "Kutoa huduma za kisheria za kitaalamu kwa uongozi, utaalamu, na kujitolea kwa haki. Kutumikia wateja kote Kenya kwa suluhisho kamili za kisheria.",
    bookConsultation: "Panga Ushauri wa Bure",
    contactNow: "Wasiliana Sasa",
    
    // About Section
    aboutTitle: "Kuhusu Collins Kipkemoi Sang",
    aboutDescription1: "Kwa uzoefu mkubwa katika sheria za Kenya na kujitolea kwa ubora, Collins Kipkemoi Sang anatoa ushauri wa kisheria wa kuaminika katika maeneo mengi ya utaalamu.",
    aboutDescription2: "Amekubaliwa katika Mahakama Kuu ya Kenya, analeta uelewa wa kina wa sheria ya katiba, mashtaka ya kiraia, na utatuzi mbadala wa migogoro.",
    aboutDescription3: "Mbinu yake inachanganya utaalamu wa kisheria wa jadi na huduma ya kisasa ya wateja, kuhakikisha kila kesi inapokea umakini wa kibinafsi na mawazo ya kimkakati.",
    education: "Elimu na Sifa",
    educationDetails: "Shahada ya Sheria (LL.B), Chuo Kikuu cha Nairobi. Amekubaliwa katika Mahakama Kuu ya Kenya. Mwanachama wa Chama cha Mawakili wa Kenya.",
    experience: "Uzoefu wa Kitaalamu",
    experienceDetails: "Zaidi ya miaka 15 ya mazoezi katika sheria ya katiba, mashtaka ya kiraia, sheria ya familia, na huduma za kisheria za makampuni.",
    scheduleConsultation: "Panga Ushauri",
    awardWinning: "Mshindi wa Tuzo",
    clientFocused: "Anayelenga Mteja",
    yearsExperience: "Miaka ya Uzoefu",
    casesHandled: "Kesi Zilizoshughulikiwa Kwa Mafanikio",
    clientSatisfaction: "Kiwango cha Kuridhika kwa Wateja",
    
    // Practice Areas
    practiceAreasTitle: "Maeneo ya Utaalamu",
    practiceAreasDescription: "Huduma kamili za kisheria zilizobinafsishwa kukidhi mahitaji yako maalum katika maeneo mengi ya sheria.",
    learnMore: "Jifunze Zaidi",
    needLegalHelp: "Unahitaji Msaada wa Kisheria?",
    needLegalHelpDescription: "Wasiliana nasi leo kwa ushauri na tuache tukusaidie kupita changamoto zako za kisheria kwa ujasiri.",
    getStarted: "Anza",
    
    // Testimonials
    testimonialsTitle: "Wateja Wetu Wanasema Nini",
    testimonialsDescription: "Tunaaminika na wateja kote Kenya kwa uwakilishi wa hali ya juu wa kisheria na huduma ya kibinafsi.",
    shareExperience: "Shiriki Uzoefu Wako",
    shareExperienceDescription: "Tunathamini maoni yako. Shiriki uzoefu wako wa kufanya kazi na timu yetu ya kisheria.",
    writeTestimonial: "Andika Ushuhuda",
    

    
    // Blog
    blogTitle: "Maarifa ya Kisheria na Masasisho",
    blogDescription: "Baki ukijua maendeleo ya hivi karibuni ya kisheria, mifano ya kesi, na uchambuzi wa kitaalamu kutoka kwa timu yetu ya kisheria.",
    readMore: "Soma Zaidi",
    viewAllPosts: "Ona Machapisho Yote",
    
    // Contact
    contactTitle: "Wasiliana Nasi",
    contactSubtitle: "Panga ushauri wako leo",
    name: "Jina Kamili",
    email: "Anwani ya Barua Pepe",
    phone: "Nambari ya Simu",
    subject: "Mada",
    message: "Ujumbe",
    send: "Tuma Ujumbe",
    officeHours: "Masaa ya Ofisi",
    mondayFriday: "Jumatatu - Ijumaa: 8:00 AM - 6:00 PM",
    saturdayAppointment: "Jumamosi - Jumapili: Kwa Miadi",
    
    // Footer
    footerDescription: "Kutoa huduma za kisheria za kitaalamu kwa uongozi, utaalamu, na kujitolea kwa haki kote Kenya.",
    quickLinks: "Viungo vya Haraka",
    contactInfo: "Maelezo ya Mawasiliano",
    allRightsReserved: "Haki zote zimehifadhiwa",
    privacyPolicy: "Sera ya Faragha",
    termsOfService: "Masharti ya Huduma",
    disclaimer: "Kanusho",
    
    // Theme
    lightMode: "Hali ya Mwanga",
    darkMode: "Hali ya Giza",
  },
  fr: {
    // Navigation
    home: "Accueil",
    about: "À Propos",
    practice: "Domaines de Pratique",
    testimonials: "Témoignages",
    blog: "Blog",
    contact: "Contact",
    admin: "Admin",
    
    // Hero Section
    heroTitle: "Collins Kipkemoi Sang",
    heroSubtitle: "Avocat de la Haute Cour du Kenya",
    heroDescription: "Fournir des services juridiques experts avec intégrité, professionnalisme et dévouement à la justice. Au service des clients à travers le Kenya avec des solutions juridiques complètes.",
    bookConsultation: "Réserver une Consultation Gratuite",
    contactNow: "Contactez-nous Maintenant",
    
    // About Section
    aboutTitle: "À Propos de Collins Kipkemoi Sang",
    aboutDescription1: "Avec une vaste expérience en droit kenyan et un engagement envers l'excellence, Collins Kipkemoi Sang fournit des conseils juridiques de confiance dans plusieurs domaines de pratique.",
    aboutDescription2: "Admis à la Haute Cour du Kenya, il apporte une compréhension approfondie du droit constitutionnel, des litiges civils et de la résolution alternative des conflits.",
    aboutDescription3: "Son approche combine l'expertise juridique traditionnelle avec un service client moderne, garantissant que chaque affaire reçoit une attention personnalisée et une réflexion stratégique.",
    education: "Éducation et Qualifications",
    educationDetails: "Licence en Droit (LL.B), Université de Nairobi. Admis à la Haute Cour du Kenya. Membre du Barreau du Kenya.",
    experience: "Expérience Professionnelle",
    experienceDetails: "Plus de 15 ans de pratique en droit constitutionnel, litiges civils, droit de la famille et services juridiques d'entreprise.",
    scheduleConsultation: "Planifier une Consultation",
    awardWinning: "Primé",
    clientFocused: "Axé sur le Client",
    yearsExperience: "Années d'Expérience",
    casesHandled: "Affaires Traitées avec Succès",
    clientSatisfaction: "Taux de Satisfaction Client",
    
    // Practice Areas
    practiceAreasTitle: "Domaines de Pratique",
    practiceAreasDescription: "Services juridiques complets adaptés à vos besoins spécifiques dans plusieurs domaines du droit.",
    learnMore: "En Savoir Plus",
    needLegalHelp: "Besoin d'Aide Juridique?",
    needLegalHelpDescription: "Contactez-nous aujourd'hui pour une consultation et laissez-nous vous aider à naviguer vos défis juridiques avec confiance.",
    getStarted: "Commencer",
    
    // Testimonials
    testimonialsTitle: "Ce Que Disent Nos Clients",
    testimonialsDescription: "Fait confiance par les clients à travers le Kenya pour une représentation juridique exceptionnelle et un service personnalisé.",
    shareExperience: "Partagez Votre Expérience",
    shareExperienceDescription: "Nous apprécions vos commentaires. Partagez votre expérience de travail avec notre équipe juridique.",
    writeTestimonial: "Écrire un Témoignage",
    
    // Blog
    blogTitle: "Perspectives et Mises à Jour Juridiques",
    blogDescription: "Restez informé des derniers développements juridiques, études de cas et analyses d'experts de notre équipe juridique.",
    readMore: "Lire Plus",
    viewAllPosts: "Voir Tous les Articles",
    
    // Contact
    contactTitle: "Entrer en Contact",
    contactDescription: "Planifiez votre consultation aujourd'hui et faites le premier pas vers la résolution de vos affaires juridiques.",
    officeAddress: "Adresse du Bureau",
    phoneNumber: "Numéro de Téléphone",
    emailAddress: "Adresse E-mail",
    sendMessage: "Envoyer le Message",
    fullName: "Nom Complet",
    enterFullName: "Entrez votre nom complet",
    enterEmail: "Entrez votre adresse e-mail",
    enterPhone: "Entrez votre numéro de téléphone",
    subject: "Sujet",
    selectSubject: "Sélectionnez un sujet",
    message: "Message",
    enterMessage: "Entrez votre message",
    officeHours: "Heures de Bureau",
    mondayFriday: "Lundi - Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
    closed: "Fermé",
    legalConsultation: "Consultation Juridique",
    familyLaw: "Droit de la Famille",
    corporateLaw: "Droit des Sociétés",
    propertyLaw: "Droit Immobilier",
    other: "Autre",
    sending: "Envoi...",
    contactSuccess: "Message envoyé avec succès! Nous vous répondrons bientôt.",
    contactError: "Échec de l'envoi du message. Veuillez réessayer.",
    
    // Footer
    footerDescription: "Fournir des services juridiques experts avec intégrité, professionnalisme et dévouement à la justice à travers le Kenya.",
    quickLinks: "Liens Rapides",
    contactInfo: "Informations de Contact",
    allRightsReserved: "Tous droits réservés",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions de Service",
    disclaimer: "Avis de Non-responsabilité",
    
    // Theme
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
  },
  de: {
    // Navigation
    home: "Startseite",
    about: "Über Uns",
    practice: "Praxisbereiche",
    testimonials: "Referenzen",
    blog: "Blog",
    contact: "Kontakt",
    admin: "Admin",
    
    // Hero Section
    heroTitle: "Collins Kipkemoi Sang",
    heroSubtitle: "Anwalt des High Court of Kenya",
    heroDescription: "Bereitstellung von fachkundigen Rechtsdienstleistungen mit Integrität, Professionalität und Hingabe zur Gerechtigkeit. Betreuung von Kunden in ganz Kenia mit umfassenden Rechtslösungen.",
    bookConsultation: "Kostenlose Beratung Buchen",
    contactNow: "Jetzt Kontaktieren",
    
    // About Section
    aboutTitle: "Über Collins Kipkemoi Sang",
    aboutDescription1: "Mit umfangreicher Erfahrung im kenianischen Recht und einem Engagement für Exzellenz bietet Collins Kipkemoi Sang vertrauenswürdige Rechtsberatung in mehreren Praxisbereichen.",
    aboutDescription2: "Zugelassen am High Court of Kenya, bringt er tiefes Verständnis für Verfassungsrecht, Zivilprozesse und alternative Streitbeilegung mit.",
    aboutDescription3: "Sein Ansatz kombiniert traditionelle Rechtsexpertise mit modernem Kundenservice und stellt sicher, dass jeder Fall persönliche Aufmerksamkeit und strategisches Denken erhält.",
    education: "Bildung & Qualifikationen",
    educationDetails: "Bachelor of Laws (LL.B), Universität Nairobi. Zugelassen am High Court of Kenya. Mitglied der Law Society of Kenya.",
    experience: "Berufserfahrung",
    experienceDetails: "Über 15 Jahre Praxis in Verfassungsrecht, Zivilprozessen, Familienrecht und Unternehmensrechtsdienstleistungen.",
    scheduleConsultation: "Beratung Vereinbaren",
    awardWinning: "Preisgekrönt",
    clientFocused: "Kundenorientiert",
    yearsExperience: "Jahre Erfahrung",
    casesHandled: "Erfolgreich Bearbeitete Fälle",
    clientSatisfaction: "Kundenzufriedenheitsrate",
    
    // Practice Areas
    practiceTitle: "Praxisbereiche",
    practiceSubtitle: "Umfassende Rechtsdienstleistungen",
    
    // Testimonials
    testimonialsTitle: "Was Unsere Kunden Sagen",
    testimonialsSubtitle: "Vertraut von Kunden in ganz Kenia",
    
    // Blog
    blogTitle: "Rechtliche Einblicke & Updates",
    blogSubtitle: "Bleiben Sie über die neuesten rechtlichen Entwicklungen informiert",
    readMore: "Mehr Lesen",
    
    // Contact
    contactTitle: "Kontakt Aufnehmen",
    contactSubtitle: "Vereinbaren Sie heute Ihre Beratung",
    name: "Vollständiger Name",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    subject: "Betreff",
    message: "Nachricht",
    send: "Nachricht Senden",
    officeHours: "Bürozeiten",
    mondayFriday: "Montag - Freitag: 8:00 - 18:00",
    saturdayAppointment: "Samstag - Sonntag: Nach Vereinbarung",
    
    // Footer
    quickLinks: "Schnelle Links",
    legalServices: "Rechtsdienstleistungen",
    followUs: "Folgen Sie Uns",
    allRightsReserved: "Alle Rechte vorbehalten",
    
    // Theme
    lightMode: "Heller Modus",
    darkMode: "Dunkler Modus",
  },
  es: {
    // Navigation
    home: "Inicio",
    about: "Acerca de",
    practice: "Áreas de Práctica",
    testimonials: "Testimonios",
    blog: "Blog",
    contact: "Contacto",
    admin: "Admin",
    
    // Hero Section
    heroTitle: "Collins Kipkemoi Sang",
    heroSubtitle: "Abogado del Tribunal Superior de Kenia",
    heroDescription: "Proporcionando servicios legales expertos con integridad, profesionalismo y dedicación a la justicia. Sirviendo a clientes en todo Kenia con soluciones legales integrales.",
    bookConsultation: "Reservar Consulta Gratuita",
    contactNow: "Contáctanos Ahora",
    
    // About Section
    aboutTitle: "Acerca de Collins Kipkemoi Sang",
    aboutDescription: "Con amplia experiencia en derecho keniano y un compromiso con la excelencia, Collins Kipkemoi Sang proporciona asesoramiento legal confiable en múltiples áreas de práctica. Admitido en el Tribunal Superior de Kenia, aporta un profundo entendimiento del derecho constitucional, litigios civiles y resolución alternativa de disputas.",
    yearsExperience: "Años de Experiencia",
    casesHandled: "Casos Manejados Exitosamente",
    clientSatisfaction: "Tasa de Satisfacción del Cliente",
    
    // Practice Areas
    practiceTitle: "Áreas de Práctica",
    practiceSubtitle: "Servicios Legales Integrales",
    
    // Testimonials
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    testimonialsSubtitle: "Confiado por clientes en todo Kenia",
    
    // Blog
    blogTitle: "Perspectivas y Actualizaciones Legales",
    blogSubtitle: "Manténgase informado con los últimos desarrollos legales",
    readMore: "Leer Más",
    
    // Contact
    contactTitle: "Ponerse en Contacto",
    contactSubtitle: "Programe su consulta hoy",
    name: "Nombre Completo",
    email: "Dirección de Correo Electrónico",
    phone: "Número de Teléfono",
    subject: "Asunto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    officeHours: "Horario de Oficina",
    mondayFriday: "Lunes - Viernes: 8:00 AM - 6:00 PM",
    saturdayAppointment: "Sábado - Domingo: Con Cita",
    
    // Footer
    quickLinks: "Enlaces Rápidos",
    legalServices: "Servicios Legales",
    followUs: "Síguenos",
    allRightsReserved: "Todos los derechos reservados",
    
    // Theme
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en");

  const t = (key: string): string => {
    const currentLang = translations[language as keyof typeof translations];
    const fallbackLang = translations.en;
    return (currentLang as any)?.[key] || (fallbackLang as any)?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
