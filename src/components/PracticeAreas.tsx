import { useLanguage } from "./LanguageContext";
import { useEffect, useState } from "react";

export function PracticeAreas() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("Litigation");

  // Persist selected tab across sessions
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("practiceActiveTab") : null;
    if (saved) setActiveTab(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("practiceActiveTab", activeTab);
    }
  }, [activeTab]);

  const practiceAreas = [
    {
      icon: "⚖️",
      title: "Civil Litigation",
      description: "Comprehensive representation in civil disputes, contract matters, tort claims, property disputes, and debt recovery cases.",
      services: ["Commercial Disputes", "Contract Disputes", "Tort Claims", "Property Disputes", "Debt Recovery"],
      category: "Litigation"
    },
    {
      icon: "🔒",
      title: "Criminal Law",
      description: "Expert criminal defense, bail applications, appeals & reviews, and representation in white collar crimes.",
      services: ["Criminal Defense", "Bail Applications", "Appeals & Reviews", "White Collar Crimes", "Legal Representation"],
      category: "Criminal"
    },
    {
      icon: "🏢",
      title: "Corporate & Commercial Law",
      description: "Full-service corporate legal support including company formation, governance, mergers & acquisitions, and regulatory compliance.",
      services: ["Company Formation", "Corporate Governance", "Mergers & Acquisitions", "Commercial Contracts", "Regulatory Compliance"],
      category: "Corporate"
    },
    {
      icon: "🏠",
      title: "Property & Conveyancing",
      description: "Complete property law services from transactions and title searches to lease agreements and land disputes.",
      services: ["Property Transactions", "Title Searches", "Lease Agreements", "Property Due Diligence", "Land Disputes"],
      category: "Property"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Law",
      description: "Sensitive handling of family matters including divorce, child custody, matrimonial property, and adoption.",
      services: ["Divorce & Separation", "Child Custody", "Matrimonial Property", "Adoption Matters", "Succession Planning"],
      category: "Family"
    },
    {
      icon: "💼",
      title: "Employment & Labor Law",
      description: "Employment law expertise covering contracts, wrongful termination, labor disputes, and workplace policies.",
      services: ["Employment Contracts", "Wrongful Termination", "Labor Disputes", "Workplace Policies", "Industrial Relations"],
      category: "Employment"
    },
    {
      icon: "📜",
      title: "Constitutional & Administrative Law",
      description: "Specialized constitutional law practice including petitions, judicial review, and human rights cases.",
      services: ["Constitutional Petitions", "Judicial Review", "Human Rights Cases", "Public Interest Litigation", "Administrative Appeals"],
      category: "Public Law"
    },
    {
      icon: "🤝",
      title: "Alternative Dispute Resolution",
      description: "Professional mediation, arbitration, and negotiation services for efficient dispute resolution.",
      services: ["Mediation Services", "Arbitration", "Negotiation", "Settlement Agreements", "Dispute Prevention"],
      category: "ADR"
    },
    {
      icon: "📋",
      title: "Legal Research & Advisory",
      description: "Comprehensive legal research, opinions, policy analysis, and regulatory advice for clients.",
      services: ["Legal Opinions", "Policy Analysis", "Regulatory Advice", "Legal Memoranda", "Due Diligence Reports"],
      category: "Advisory"
    }
  ];

  const categories: Array<string> = [
    "Litigation",
    "Criminal",
    "Corporate",
    "Property",
    "Family",
    "Employment",
    "Public Law",
    "ADR",
    "Advisory"
  ];

  const filteredAreas = activeTab === "All" ? practiceAreas : practiceAreas.filter(a => a.category === activeTab);

  return (
    <section id="practice" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="section-divider"></div>
          <h2 className="heading-lg mb-6">Practice Areas</h2>
          <p className="body-lg max-w-3xl mx-auto">
            Comprehensive Legal Services Across Multiple Disciplines
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 -mx-2 overflow-x-auto">
          <div className="flex gap-2 px-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-sm rounded-full border ${activeTab === cat ? "bg-warm-orange text-white border-warm-orange" : "bg-white text-deep-blue border-light-gray"}`}
              >
                {cat}
              </button>
            ))}
            {/* View all for desktop/tablet */}
            <div className="ml-auto hidden md:block">
              <button
                onClick={() => setActiveTab("All")}
                className={`px-4 py-2 text-sm rounded-full border ${activeTab === "All" ? "bg-warm-orange text-white border-warm-orange" : "bg-white text-deep-blue border-light-gray"}`}
              >
                View all
              </button>
            </div>
          </div>
        </div>

        {/* Compact cards grid (2-up on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredAreas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-light-gray hover:shadow-lg hover:border-warm-orange/30 transition-all duration-300 ease-in-out"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                  {area.icon}
                </div>
                <h3 className="font-semibold text-deep-blue mb-2 text-sm md:text-base">
                  {area.title}
                </h3>
                <p className="text-xs md:text-sm text-medium-gray mb-3 md:mb-4 line-clamp-3">{area.description}</p>
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-secondary w-full"
                >
                  {t("consultNow")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20">
          <div className="bg-light-gray rounded-2xl p-12">
            <div className="text-center">
              <h3 className="heading-md mb-6 text-deep-blue">
                Need Legal Assistance?
              </h3>
              <p className="body-lg text-medium-gray mb-8 max-w-2xl mx-auto">
                Whether you need legal advice, representation, or consultation, I'm here to help. 
                Contact me today for a confidential discussion about your legal needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-primary"
                >
                  {t("scheduleConsultation")}
                </button>
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-secondary"
                >
                  {t("contactNow")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
