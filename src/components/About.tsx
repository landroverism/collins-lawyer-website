import { useLanguage } from "./LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-light-gray">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="fade-in">
            <div className="section-divider-left"></div>
            <h2 className="heading-lg mb-8 text-deep-blue">{t("aboutTitle")}</h2>
            <div className="space-y-6">
              <p className="body-lg text-deep-blue">
                COLLINS KIPKEMOI SANG & COMPANY ADVOCATES is a Nairobi-based law firm providing full-service legal representation to individuals, corporates, and institutions. We deliver practical, business-aware solutions rooted in integrity, professionalism, and a relentless commitment to our clients’ objectives.
              </p>
              <p className="body-md text-deep-blue">
                Our practice spans Civil and Commercial Litigation, Corporate & Commercial Advisory, Property & Conveyancing, Family Law, Employment & Labour, Constitutional & Administrative Law, and Alternative Dispute Resolution, among others.
              </p>
              <p className="body-md text-deep-blue">
                We combine deep legal expertise with modern client service—responsive communication, clear fee structures, and proactive case management—to achieve efficient and effective outcomes.
              </p>
            </div>

            {/* Firm Highlights */}
            <div className="mt-12">
              <h3 className="heading-md mb-6 text-deep-blue">Firm Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">🗂️</div>
                  <h4 className="font-semibold text-deep-blue mb-2">Multi-Disciplinary Practice</h4>
                  <p className="text-sm text-deep-blue">End-to-end support across key practice areas.</p>
                </div>
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">🤝</div>
                  <h4 className="font-semibold text-deep-blue mb-2">Client-Centric Service</h4>
                  <p className="text-sm text-deep-blue">Responsive, transparent, and outcome-driven.</p>
                </div>
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">⚖️</div>
                  <h4 className="font-semibold text-deep-blue mb-2">Litigation & ADR Strength</h4>
                  <p className="text-sm text-deep-blue">Strategic dispute resolution in courts and tribunals.</p>
                </div>
              </div>
            </div>

            {/* Key Experience */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-light">
                <div className="text-3xl text-warm-orange mb-4">🏢</div>
                <h3 className="heading-sm mb-3 text-deep-blue">Head of Legal Research & Drafting</h3>
                <p className="body-sm text-deep-blue">
                  Led legal research and document drafting at Owuondo and Obinchu Company Advocates, providing comprehensive legal support and strategic guidance.
                </p>
              </div>
              <div className="card-light">
                <div className="text-3xl text-warm-orange mb-4">⚖️</div>
                <h3 className="heading-sm mb-3 text-deep-blue">Court of Appeal Internship</h3>
                <p className="body-sm text-deep-blue">
                  Completed intensive internship at the Court of Appeal, gaining invaluable experience in appellate procedures and judicial processes.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12">
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                {t("scheduleConsultation")}
              </button>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="slide-up">
            <div className="relative">
              {/* Professional photo */}
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl scale-hover-sm">
                <img 
                  src="/images/gavel-ham.png" 
                  alt="Collins Kipkemoi Sang & Company Advocates"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-warm-orange rounded-full opacity-30"></div>
            </div>

            {/* Achievement badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="text-2xl text-warm-orange mb-2">🏆</div>
                <p className="font-semibold text-deep-blue">{t("awardWinning")}</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl text-warm-orange mb-2">🤝</div>
                <p className="font-semibold text-deep-blue">{t("clientFocused")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
