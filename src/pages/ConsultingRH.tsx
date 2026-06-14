import React from 'react';
import { 
  Scale, PieChart, Search, Briefcase, FileText, GraduationCap,
  ArrowRight, CheckCircle, Phone, Mail, MapPin, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultingRH = () => {
  const hrServices = [
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Expertise Juridique",
      description: "Gestion administrative et conformité légale complète",
      features: [
        "Rédaction et gestion des contrats et conventions",
        "Relations avec l'administration du travail (ANPE, CNSS, DGT)",
        "Organisation des élections sociales",
        "Gestion de la sécurité santé au travail"
      ]
    },
    {
      icon: <PieChart className="w-12 h-12" />,
      title: "Organisation RH",
      description: "Optimisation de la gestion des ressources humaines",
      features: [
        "Mise en place d'outils de gestion RH",
        "Élaboration de référentiels de compétences",
        "Systèmes d'évaluation des performances",
        "Bilans de compétences et évaluations"
      ]
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Recrutement",
      description: "Recherche et sélection des meilleurs talents",
      features: [
        "Définition de profils recherchés",
        "Recherche et présélection de candidats",
        "Entretiens et short list des meilleurs profils",
        "Suivi de l'intégration des nouveaux collaborateurs"
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Externalisation RH",
      description: "Solutions d'externalisation partielle ou totale",
      features: [
        "Externalisation de la gestion du personnel",
        "Traitement externe des salaires",
        "Conseil en ressources humaines et fiscalité",
        "Gestion administrative complète"
      ]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Gestion de Paie",
      description: "Traitement professionnel de la paie et déclarations",
      features: [
        "Constitution des dossiers de salaire",
        "Production des bulletins de paie",
        "Traitement complet des salaires",
        "Déclarations sociales et fiscales"
      ]
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Formation RH",
      description: "Développement des compétences et renforcement des capacités",
      features: [
        "Formations en entreprise certifiantes",
        "Formations individuelles spécialisées",
        "Plans de développement des compétences",
        "Accompagnement stratégique"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Audit RH",
      description: "Diagnostic complet de votre organisation et de vos processus RH existants."
    },
    {
      step: "02",
      title: "Stratégie RH",
      description: "Élaboration d'une stratégie RH alignée sur vos objectifs business."
    },
    {
      step: "03",
      title: "Mise en œuvre",
      description: "Déploiement des solutions RH avec accompagnement personnalisé."
    },
    {
      step: "04",
      title: "Suivi & Optimisation",
      description: "Suivi des performances et optimisation continue de vos processus RH."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[3000ms]"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-pink-800/60 animate-gradient-shift"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-10 w-24 h-24 bg-purple-400/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-16 w-16 h-16 bg-pink-400/10 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Consulting <span className="text-white animate-glow">Ressources Humaines</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 animate-slide-in-up animation-delay-300">
              Expertise en gestion du capital humain, recrutement, formation et digitalisation 
              des processus RH pour optimiser votre performance organisationnelle.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* HR Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-16 w-36 h-36 bg-purple-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-16 w-28 h-28 bg-pink-500/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Notre <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">expertise RH</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              De la stratégie RH à la gestion opérationnelle, nous accompagnons votre entreprise 
              dans l'optimisation de son capital humain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-600">
            {hrServices.map((service, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-8 hover:shadow-2xl hover:border-purple-200 hover:-translate-y-4 hover:rotate-1 transition-all duration-500 group animate-slide-in-up ${
                  index % 3 === 0 ? 'animation-delay-300' :
                  index % 3 === 1 ? 'animation-delay-600' :
                  'animation-delay-1000'
                }`}
              >
                <div className="text-purple-600 group-hover:text-pink-600 group-hover:scale-110 transition-all duration-500 mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
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
                
                <div className="border-t border-purple-200 pt-6">
                  <Link
                    to="/contact"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 flex items-center justify-center group/btn"
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
          <div className="absolute top-20 left-1/4 w-28 h-28 bg-purple-500/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-pink-500/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Notre <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">approche</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              Une méthodologie éprouvée pour transformer votre gestion RH et développer 
              le potentiel de vos équipes.
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
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
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

      {/* Expertise Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-500/5 rounded-full animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl font-bold text-gray-900 animate-slide-in-down">
                Pourquoi choisir notre <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">expertise RH</span> ?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-in-up animation-delay-300">
                Avec plus de 10 ans d'expérience en ressources humaines et une expertise reconnue 
                en conformité et éthique, nous vous accompagnons dans tous vos défis RH.
              </p>
              <div className="space-y-4 animate-fade-in animation-delay-600">
                {[
                  "Expertise juridique et conformité RGPD",
                  "Digitalisation des processus RH",
                  "Accompagnement personnalisé",
                  "Solutions adaptées au contexte africain"
                ].map((item, index) => (
                  <div key={index} className={`flex items-center space-x-3 group animate-slide-in-right ${
                    index === 0 ? 'animation-delay-300' :
                    index === 1 ? 'animation-delay-600' :
                    index === 2 ? 'animation-delay-1000' :
                    'animation-delay-1500'
                  }`}>
                    <CheckCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right animation-delay-300">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:rotate-2 hover:scale-105 transition-all duration-500 group">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Expertise RH"
                  className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Une expertise RH reconnue</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl transform rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden animate-gradient-shift">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-down animate-glow">
            Optimisez votre capital humain
          </h2>
          <p className="text-xl text-purple-100 mb-8 animate-slide-in-up animation-delay-300">
            Contactez-nous pour une consultation RH personnalisée et découvrir comment 
            nos solutions peuvent transformer votre gestion des ressources humaines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Link
              to="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500"
            >
              Demander un devis
            </Link>
            <Link
              to="/services-informatiques"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-500"
            >
              Découvrir nos services IT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingRH;