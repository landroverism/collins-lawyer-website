import { useLanguage } from "./LanguageContext";

export function PracticeAreas() {
  const { t } = useLanguage();

  const practiceAreas = [
    {
      icon: "⚖️",
      title: "Civil Litigation",
      description: "Comprehensive representation in civil disputes, contract matters, tort claims, property disputes, and debt recovery cases.",
      services: ["Commercial Disputes", "Contract Disputes", "Tort Claims", "Property Disputes", "Debt Recovery"]
    },
    {
      icon: "🔒",
      title: "Criminal Law",
      description: "Expert criminal defense, bail applications, appeals & reviews, and representation in white collar crimes.",
      services: ["Criminal Defense", "Bail Applications", "Appeals & Reviews", "White Collar Crimes", "Legal Representation"]
    },
    {
      icon: "🏢",
      title: "Corporate & Commercial Law",
      description: "Full-service corporate legal support including company formation, governance, mergers & acquisitions, and regulatory compliance.",
      services: ["Company Formation", "Corporate Governance", "Mergers & Acquisitions", "Commercial Contracts", "Regulatory Compliance"]
    },
    {
      icon: "🏠",
      title: "Property & Conveyancing",
      description: "Complete property law services from transactions and title searches to lease agreements and land disputes.",
      services: ["Property Transactions", "Title Searches", "Lease Agreements", "Property Due Diligence", "Land Disputes"]
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Law",
      description: "Sensitive handling of family matters including divorce, child custody, matrimonial property, and adoption.",
      services: ["Divorce & Separation", "Child Custody", "Matrimonial Property", "Adoption Matters", "Succession Planning"]
    },
    {
      icon: "💼",
      title: "Employment & Labor Law",
      description: "Employment law expertise covering contracts, wrongful termination, labor disputes, and workplace policies.",
      services: ["Employment Contracts", "Wrongful Termination", "Labor Disputes", "Workplace Policies", "Industrial Relations"]
    },
    {
      icon: "📜",
      title: "Constitutional & Administrative Law",
      description: "Specialized constitutional law practice including petitions, judicial review, and human rights cases.",
      services: ["Constitutional Petitions", "Judicial Review", "Human Rights Cases", "Public Interest Litigation", "Administrative Appeals"]
    },
    {
      icon: "🤝",
      title: "Alternative Dispute Resolution",
      description: "Professional mediation, arbitration, and negotiation services for efficient dispute resolution.",
      services: ["Mediation Services", "Arbitration", "Negotiation", "Settlement Agreements", "Dispute Prevention"]
    },
    {
      icon: "📋",
      title: "Legal Research & Advisory",
      description: "Comprehensive legal research, opinions, policy analysis, and regulatory advice for clients.",
      services: ["Legal Opinions", "Policy Analysis", "Regulatory Advice", "Legal Memoranda", "Due Diligence Reports"]
    }
  ];

  return (
    <section id="practice" className="section-padding bg-white dark:bg-deep-blue">
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">Practice Areas</h2>
          <p className="body-lg max-w-3xl mx-auto">
            Comprehensive Legal Services Across Multiple Disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <div 
              key={index} 
              className="card group slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-5xl mb-6 scale-hover group-hover:text-warm-orange transition-colors duration-300">
                  {area.icon}
                </div>
                <h3 className="heading-sm mb-4 group-hover:text-warm-orange transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="body-md mb-6">
                  {area.description}
                </p>
                
                {/* Services List */}
                <div className="text-left mb-6">
                  <h4 className="font-semibold text-deep-blue dark:text-white mb-3 text-sm">Services Include:</h4>
                  <ul className="space-y-1">
                    {area.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="text-sm text-medium-gray dark:text-medium-gray-light flex items-center">
                        <span className="text-warm-orange mr-2">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="link-primary font-semibold">
                  {t("learnMore")} →
                </button>
              </div>
              
              {/* Decorative border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-warm-orange transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-light-gray dark:bg-medium-gray rounded-2xl p-12">
            <h3 className="heading-md mb-6">{t("needLegalHelp")}</h3>
            <p className="body-lg mb-8 max-w-2xl mx-auto">
              {t("needLegalHelpDescription")}
            </p>
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              {t("getStarted")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
