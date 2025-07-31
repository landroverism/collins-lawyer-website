import { useLanguage } from "./LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-light-gray dark:bg-dark-gray">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="fade-in">
            <div className="section-divider-left"></div>
            <h2 className="heading-lg mb-8">{t("aboutTitle")}</h2>
            <div className="space-y-6">
              <p className="body-lg">
                As an Advocate of the High Court of Kenya, I bring comprehensive legal expertise spanning litigation, legal research, document drafting, and client relations. With a proven track record in judicial environments and commercial legal practice, I am committed to delivering exceptional legal services through meticulous attention to detail and ethical advocacy.
              </p>
              <p className="body-md">
                My experience includes serving as Head of Legal Research and Drafting at Owuondo and Obinchu Company Advocates, completing an intensive internship at the Court of Appeal, and actively litigating matters in court post-admission. I have developed strong expertise across multiple areas of law through my Advocates Training Programme.
              </p>
              <p className="body-md">
                My approach combines traditional legal expertise with modern client service, ensuring every case receives personalized attention and strategic thinking. I am dedicated to providing trusted legal counsel across multiple practice areas with integrity, professionalism, and dedication to justice.
              </p>
            </div>

            {/* Professional Qualifications */}
            <div className="mt-12">
              <h3 className="heading-md mb-6 text-deep-blue dark:text-white">Professional Qualifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">⚖️</div>
                  <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Advocate</h4>
                  <p className="text-sm text-medium-gray dark:text-medium-gray-light">High Court of Kenya</p>
                </div>
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">🎓</div>
                  <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Post-Graduate Diploma</h4>
                  <p className="text-sm text-medium-gray dark:text-medium-gray-light">Kenya School of Law</p>
                </div>
                <div className="card-light text-center">
                  <div className="text-2xl text-warm-orange mb-3">📚</div>
                  <h4 className="font-semibold text-deep-blue dark:text-white mb-2">Bachelor of Laws</h4>
                  <p className="text-sm text-medium-gray dark:text-medium-gray-light">Moi University</p>
                </div>
              </div>
            </div>

            {/* Key Experience */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-light">
                <div className="text-3xl text-warm-orange mb-4">🏢</div>
                <h3 className="heading-sm mb-3">Head of Legal Research & Drafting</h3>
                <p className="body-sm">
                  Led legal research and document drafting at Owuondo and Obinchu Company Advocates, providing comprehensive legal support and strategic guidance.
                </p>
              </div>
              <div className="card-light">
                <div className="text-3xl text-warm-orange mb-4">⚖️</div>
                <h3 className="heading-sm mb-3">Court of Appeal Internship</h3>
                <p className="body-sm">
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
                  src="/attached_assets/collins-pic_1753989356768.jpeg" 
                  alt="Collins K. Sang - Advocate of the High Court of Kenya"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 via-transparent to-transparent flex items-end">
                  <div className="text-center w-full p-6 text-white">
                    <p className="text-xl font-medium">Collins K. Sang</p>
                    <p className="text-lg opacity-90">Advocate of the High Court of Kenya</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-orange rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-warm-orange rounded-full opacity-30"></div>
            </div>

            {/* Achievement badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="text-2xl text-warm-orange mb-2">🏆</div>
                <p className="font-semibold text-deep-blue dark:text-white">{t("awardWinning")}</p>
              </div>
              <div className="card text-center">
                <div className="text-2xl text-warm-orange mb-2">🤝</div>
                <p className="font-semibold text-deep-blue dark:text-white">{t("clientFocused")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
