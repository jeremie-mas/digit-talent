import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Shield, RefreshCw, Users, GraduationCap, CheckCircle } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Home = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { elementRef: whyRef, isVisible: whyVisible } = useScrollAnimation();

  const expertiseAreas = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Expertise Digitale",
      description: "Nous accompagnons les organisations dans leur stratégie de digitalisation : diagnostic, choix d'outils, déploiement de solutions numériques et accompagnement au changement.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Expertise Cybersécurité",
      description: "Face à la multiplication des menaces numériques, nous aidons votre organisation à évaluer ses risques, sécuriser ses systèmes d'information et instaurer une culture de cybersécurité durable.",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Transformation Organisationnelle",
      description: "Nous accompagnons les entreprises dans la refonte de leurs structures, processus et modes de fonctionnement pour gagner en agilité et en performance globale.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Change Management — PROSCI ADKAR",
      description: "Certifiés sur la méthodologie PROSCI ADKAR, nous aidons vos équipes à traverser le changement avec succès, en mettant les personnes au cœur de chaque transformation.",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Formations Management de Projet",
      description: "Nos formations certifiantes préparent vos collaborateurs aux certifications internationales (CAPM, PMP) et aux meilleures pratiques de gestion du changement.",
    },
  ];

  const stats = [
    { number: "2012", label: "Année de création" },
    { number: "10+", label: "Années d'expérience" },
    { number: "10", label: "Consultants certifiés" },
    { number: "150+", label: "Clients accompagnés" },
  ];

  const whyChooseUs = [
    "Plus de 10 ans d'expérience au service des entreprises africaines",
    "Une équipe de consultants certifiés (PMP, PMI-PMOCP)",
    "Une approche intégrée IT + RH, unique sur le marché",
    "Une présence de proximité, basée à Lomé, à l'écoute des réalités locales",
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center -mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary-900/60 to-black/50 animate-pulse-slow"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-700/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-accent-600/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white animate-slide-in-left">
                  <span className="bg-gradient-to-r from-primary-300 to-accent-400 bg-clip-text text-transparent animate-gradient-x">
                    DIGIT & TALENT
                  </span>
                </h1>
                <p className="text-xl text-accent-400 font-semibold tracking-wide animate-slide-in-right animation-delay-300">
                  Fueling Dreams, Forging Success
                </p>
                <p className="text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto animate-fade-in animation-delay-600">
                  La convergence du digital et des talents au service de votre croissance.
                </p>
                <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in animation-delay-900">
                  Cabinet de conseil basé à Lomé, Togo, DIGIT & TALENT accompagne les entreprises africaines dans leur transformation digitale et le développement de leur capital humain. Depuis 2012, nous conjuguons expertise technologique et excellence en gestion des ressources humaines pour faire de chaque organisation une entreprise performante, agile et résiliente.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-1000">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-primary-700 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-primary-700/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 flex items-center justify-center group mx-auto sm:mx-0 animate-pulse-button"
                >
                  Découvrir nos services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white/80 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-700 hover:shadow-xl hover:border-white transition-all duration-500 text-center mx-auto sm:mx-0 backdrop-blur-sm transform hover:-translate-y-1 hover:scale-105"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-primary-700/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-accent-600/5 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">proposition de valeur</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              À la croisée du digital, de la cybersécurité, de la transformation organisationnelle et de la formation en management de projet, DIGIT & TALENT propose une approche intégrée et sur-mesure, pensée pour répondre aux réalités des entreprises et institutions africaines.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {stats.map((stat, index) => (
              <ScrollAnimation
                key={index}
                animation="scaleIn"
                delay={index * 200}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent mb-2 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={servicesRef} className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-700/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">domaines d'expertise</span>
            </h2>
          </ScrollAnimation>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {expertiseAreas.map((service, index) => (
              <ScrollAnimation
                key={index}
                animation={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
                delay={index * 150}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transform hover:-translate-y-4 hover:scale-105 transition-all duration-500 group"
              >
                <div className="text-primary-700 group-hover:text-accent-600 group-hover:scale-110 transition-all duration-500 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="scaleIn" delay={800} className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-primary-700 to-accent-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-primary-700/25 transform hover:-translate-y-3 hover:scale-110 transition-all duration-500 group animate-pulse-button"
            >
              Découvrir nos services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-3 group-hover:scale-125 transition-transform duration-500" />
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyRef} className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-40 h-40 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slideInLeft" className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Pourquoi choisir <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">DIGIT & TALENT</span> ?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Une approche unique qui combine expertise IT et excellence RH pour un accompagnement global de votre transformation.
              </p>
            </ScrollAnimation>

            <div className={`space-y-4 transition-all duration-1000 ${
              whyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              {whyChooseUs.map((item, index) => (
                <ScrollAnimation
                  key={index}
                  animation="slideInRight"
                  delay={index * 150}
                  className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-700 to-accent-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-accent-600 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp" className="mb-6">
            <h2 className="text-4xl font-bold text-white animate-glow">
              Prêt à transformer votre organisation ?
            </h2>
          </ScrollAnimation>
          <ScrollAnimation animation="slideInLeft" delay={300} className="mb-8">
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discutons de vos projets et construisons ensemble des solutions adaptées à vos enjeux.
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="scaleIn" delay={600}>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:bg-gray-50 transform hover:-translate-y-3 hover:scale-110 transition-all duration-500 group"
            >
              Contactez notre équipe
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-3 group-hover:scale-125 transition-transform duration-500" />
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;
