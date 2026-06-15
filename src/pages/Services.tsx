import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Shield, RefreshCw, Users, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: "digitale",
      icon: <Monitor className="w-12 h-12" />,
      title: "Expertise Digitale",
      subtitle: "Consulting en digitalisation des organisations",
      description: "La digitalisation n'est plus une option, c'est une nécessité pour rester compétitif. Nous accompagnons votre organisation à chaque étape.",
      features: [
        "Diagnostic de maturité digitale",
        "Définition de votre feuille de route de transformation numérique",
        "Sélection et déploiement d'outils et de solutions adaptés à votre contexte",
        "Optimisation et digitalisation de vos processus métiers",
        "Accompagnement au changement lié aux nouveaux outils"
      ],
      target: "PME, PMI, institutions et organisations souhaitant moderniser leur fonctionnement et gagner en efficacité opérationnelle."
    },
    {
      id: "cybersecurite",
      icon: <Shield className="w-12 h-12" />,
      title: "Expertise Cybersécurité",
      subtitle: "Protection de votre organisation",
      description: "Protéger votre organisation, c'est protéger votre activité, vos données et la confiance de vos clients.",
      features: [
        "Audit et évaluation des risques de sécurité informatique",
        "Recommandations et mise en place de mesures de protection adaptées",
        "Sensibilisation et formation des équipes aux bonnes pratiques de cybersécurité",
        "Accompagnement à la mise en conformité avec les exigences en matière de protection des données"
      ],
      target: "Toute organisation manipulant des données sensibles ou souhaitant sécuriser durablement son infrastructure numérique."
    },
    {
      id: "transformation",
      icon: <RefreshCw className="w-12 h-12" />,
      title: "Transformation Organisationnelle",
      subtitle: "Refonte des structures et processus",
      description: "Une transformation réussie repose sur une organisation pensée pour ses objectifs.",
      features: [
        "Diagnostic organisationnel et analyse des processus existants",
        "Conception de nouvelles structures, organigrammes et modes de fonctionnement",
        "Optimisation des processus internes",
        "Accompagnement à la mise en œuvre des changements organisationnels"
      ],
      target: "Entreprises en croissance, en restructuration, ou souhaitant améliorer leur performance globale."
    },
    {
      id: "change",
      icon: <Users className="w-12 h-12" />,
      title: "Change Management — PROSCI ADKAR",
      subtitle: "Accompagnement du changement",
      description: "Le changement ne réussit que s'il est porté par les personnes. Forts de notre certification PROSCI ADKAR, nous vous accompagnons.",
      features: [
        "Évaluation de la préparation au changement (readiness assessment)",
        "Élaboration de plans de gestion du changement personnalisés",
        "Accompagnement des managers et équipes tout au long du processus",
        "Mesure de l'adoption et ajustement des plans d'action"
      ],
      target: "Toute organisation engagée dans un projet de transformation (digital, organisationnel, RH, fusion, etc.) nécessitant l'adhésion des équipes."
    },
    {
      id: "formations",
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Formations en Management de Projet",
      subtitle: "CAPM, PMP, Change Management",
      description: "Investir dans les compétences de vos équipes, c'est investir dans la performance durable de votre organisation.",
      features: [
        "CAPM (Certified Associate in Project Management) — pour les professionnels souhaitant débuter une carrière en gestion de projet",
        "PMP (Project Management Professional) — la certification de référence mondiale pour les chefs de projet expérimentés",
        "Change Management — formation aux méthodologies et outils de gestion du changement, dont PROSCI ADKAR",
        "Préparation aux examens de certification internationale"
      ],
      target: "Chefs de projet, managers, consultants, et toute personne souhaitant structurer et certifier ses compétences en gestion de projet et du changement."
    }
  ];

  const approach = [
    {
      step: "01",
      title: "Écoute",
      description: "Chaque mission débute par une écoute attentive de vos besoins et de votre contexte."
    },
    {
      step: "02",
      title: "Co-construction",
      description: "Nous construisons avec vous des solutions sur-mesure, adaptées à vos réalités."
    },
    {
      step: "03",
      title: "Expertise",
      description: "Nos consultants IT et RH mobilisent leurs expertises complémentaires."
    },
    {
      step: "04",
      title: "Accompagnement",
      description: "Un suivi personnalisé pour garantir la réussite de votre transformation."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/70 to-accent-700/60 animate-gradient-shift"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-10 w-24 h-24 bg-primary-300/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-16 w-16 h-16 bg-accent-400/10 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-down">
              Nos <span className="text-white animate-glow">expertises</span>
            </h1>
            <p className="text-xl text-primary-100 mb-4 animate-slide-in-up animation-delay-300">
              Vos leviers de croissance
            </p>
            <p className="text-lg text-gray-200 animate-fade-in animation-delay-600">
              DIGIT & TALENT propose une gamme complète de services conçus pour accompagner les entreprises africaines à chaque étape de leur transformation digitale et organisationnelle.
            </p>
            <p className="text-base text-white font-medium mt-6 animate-fade-in animation-delay-900">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-40 h-40 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} animate-slide-in-left`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-700 to-accent-600 rounded-2xl text-white mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-lg text-accent-600 font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} animate-slide-in-right`}>
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 border border-primary-100">
                    <h3 className="font-semibold text-gray-900 mb-3">Pour qui ?</h3>
                    <p className="text-gray-600 leading-relaxed">{service.target}</p>
                    <Link
                      to="/contact"
                      className="mt-6 inline-flex items-center bg-gradient-to-r from-primary-700 to-accent-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-700/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 group"
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-28 h-28 bg-primary-700/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-accent-600/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">approche</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque mission débute par une écoute attentive de vos besoins. Nous co-construisons avec vous des solutions sur-mesure, en mobilisant les expertises complémentaires de nos consultants IT et RH, pour un accompagnement global et cohérent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((step, index) => (
              <div
                key={index}
                className="text-center group animate-slide-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-accent-600 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-glow">
            Prêt à démarrer votre transformation ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Demandez un devis ou échangez avec l'un de nos consultants pour construire ensemble la solution adaptée à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
            >
              Demander un devis
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
            >
              Échanger avec un consultant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
