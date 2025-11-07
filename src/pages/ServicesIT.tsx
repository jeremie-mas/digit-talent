import React from 'react';
import { 
  Code, Shield, Users, Wrench, ShoppingCart, Target, 
  ArrowRight, CheckCircle, Phone, Mail, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesIT = () => {
  const itServices = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Développement Informatique",
      description: "Solutions digitales mobiles et web sur mesure pour tous secteurs d'activités",
      features: [
        "Analyse approfondie de vos besoins",
        "Intégration de solutions digitales mobiles",
        "Développement web frontend et backend",
        "Solutions adaptées à votre secteur d'activité"
      ]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Sécurité Informatique",
      description: "Protection complète de vos systèmes d'information et données",
      features: [
        "Évaluation de la sécurité du système d'information",
        "Audit sécurité et correction de vulnérabilités",
        "Mise en place de stratégies et procédures sécurité SI",
        "Protection contre les cybermenaces"
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Formation & Coaching",
      description: "Formations certifiantes et accompagnement personnalisé",
      features: [
        "Formations gestion de projets (CAPM, PMP, PRINCE2, SCRUM)",
        "Formations bureautique avancée (Excel, PowerPoint)",
        "Outils de gestion pour PME/PMI (SAGE SAARI)",
        "Coaching informatique personnalisé"
      ]
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Réseaux & Maintenance",
      description: "Solutions réseau complètes et maintenance de parc informatique",
      features: [
        "Mise en place de réseaux d'entreprise flexibles",
        "Maintenance du parc informatique complet",
        "Assistance technique aux utilisateurs",
        "Support technique 24/7"
      ]
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "Vente de Matériel",
      description: "Équipements informatiques et solutions bureautiques de qualité",
      features: [
        "Accompagnement au dimensionnement technique",
        "Vente de matériels informatiques (laptops, desktops)",
        "Solutions bureautiques (imprimantes, copieurs, scanners)",
        "Équipements professionnels (vidéoprojecteurs, caméras)"
      ]
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Conseil Digital",
      description: "Stratégie digitale adaptée à votre business",
      features: [
        "Mise en place de stratégie digitale sur mesure",
        "Investissements adaptés à vos besoins",
        "Identification des profils IT appropriés",
        "Roadmap structurée et efficace"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Analyse & Diagnostic",
      description: "Nous analysons vos besoins et réalisons un diagnostic complet de votre infrastructure IT."
    },
    {
      step: "02",
      title: "Conception sur mesure",
      description: "Développement de solutions techniques adaptées spécifiquement à vos objectifs."
    },
    {
      step: "03",
      title: "Implémentation",
      description: "Mise en œuvre des solutions avec un accompagnement technique personnalisé."
    },
    {
      step: "04",
      title: "Suivi & Maintenance",
      description: "Support continu et maintenance pour garantir la performance de vos systèmes."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[3000ms]"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-red-800/60 animate-gradient-shift"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-twinkle"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-twinkle animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-400/40 rounded-full animate-twinkle animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Services <span className="text-white animate-glow">Informatiques</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-slide-in-up animation-delay-300">
              Des solutions digitales complètes pour accompagner votre transformation numérique 
              et sécuriser vos systèmes d'information.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* IT Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-40 h-40 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-red-500/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Notre <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              De la conception à la maintenance, nous maîtrisons tous les aspects de l'informatique 
              pour propulser votre entreprise vers le succès digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-600">
            {itServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-4 hover:rotate-1 transition-all duration-500 group animate-slide-in-up ${
                  index % 3 === 0 ? 'animation-delay-300' :
                  index % 3 === 1 ? 'animation-delay-600' :
                  'animation-delay-1000'
                }`}
              >
                <div className="text-blue-600 group-hover:text-red-600 group-hover:scale-110 transition-all duration-500 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3 group/item">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-6">
                  <Link
                    to="/contact"
                    className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 flex items-center justify-center group/btn"
                  >
                    Demander un devis
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 group-hover/btn:scale-110 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-24 h-24 bg-blue-500/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-red-500/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Notre <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">méthodologie</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              Une approche structurée et éprouvée pour garantir la réussite de chaque projet informatique, 
              de l'analyse initiale au support post-déploiement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in animation-delay-600">
            {process.map((step, index) => (
              <div key={index} className={`text-center group animate-slide-in-up ${
                index === 0 ? 'animation-delay-300' :
                index === 1 ? 'animation-delay-600' :
                index === 2 ? 'animation-delay-1000' :
                'animation-delay-1500'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-red-600 relative overflow-hidden animate-gradient-shift">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-down animate-glow">
            Prêt à digitaliser votre entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-slide-in-up animation-delay-300">
            Contactez-nous dès aujourd'hui pour une consultation technique personnalisée et découvrir 
            comment nos solutions IT peuvent transformer votre activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
            >
              Demander un devis
            </Link>
            <Link
              to="/consulting-rh"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
            >
              Découvrir nos services RH
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesIT;