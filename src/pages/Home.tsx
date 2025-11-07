import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, Award, TrendingUp, GraduationCap, Shield } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

const Home = () => {
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const parallaxRef = useParallax(0.3);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Transformation Digitale",
      description: "Solutions digitales complètes : développement web/mobile, sécurité informatique et infrastructure IT",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting RH",
      description: "Expertise juridique, recrutement, formation, gestion de paie et optimisation du capital humain",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Formation & Certification",
      description: "Formations certifiantes en gestion de projets (PMP, CAPM), bureautique et outils de gestion",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité & Conformité",
      description: "Audit sécurité, protection des données, conformité RGPD et mise en place de politiques sécurisées",
    },
  ];

  const stats = [
    { number: "150+", label: "Clients satisfaits" },
    { number: "300+", label: "Projets réalisés" },
    { number: "5", label: "Années d'expérience" },
    { number: "98%", label: "Taux de satisfaction" },
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-blue-900/30 animate-pulse-slow"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-red-500/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white animate-slide-in-left">
                  <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent animate-gradient-x">Digit & Talent</span>
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-slide-in-right animation-delay-300">
                  Cabinet de conseil expert en transformation digitale et gestion des ressources humaines. 
                  Nous accompagnons les entreprises africaines dans leur développement avec des solutions innovantes et sur mesure.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 flex items-center justify-center group mx-auto sm:mx-0 animate-pulse-button"
                >
                  Démarrer un projet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link
                  to="/realisations"
                  className="border-2 border-white/80 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:shadow-xl hover:border-white transition-all duration-500 text-center mx-auto sm:mx-0 backdrop-blur-sm transform hover:-translate-y-1 hover:scale-105"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white relative overflow-hidden">
        {/* Parallax background elements */}
        <div ref={parallaxRef} className="absolute inset-0 pointer-events-none parallax-element">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-red-500/5 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
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
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500">
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

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none parallax-element">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-500/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Nos <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">domaines d'expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              De la transformation digitale à l'optimisation RH, nous maîtrisons tous les aspects du développement d'entreprise pour propulser votre organisation vers le succès.
            </p>
          </ScrollAnimation>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {services.map((service, index) => (
              <ScrollAnimation
                key={index}
                animation={index % 2 === 0 ? 'slideInLeft' : 'slideInRight'}
                delay={index * 150}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-6 hover:rotate-2 hover:scale-105 transition-all duration-500 group"
              >
                <div className="text-blue-600 group-hover:text-red-600 group-hover:scale-110 transition-all duration-500 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
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
              to="/services-informatiques"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-3 hover:scale-110 transition-all duration-500 group animate-pulse-button"
            >
              Découvrir nos services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-3 group-hover:scale-125 transition-transform duration-500" />
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-red-600 relative overflow-hidden animate-gradient-shift">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none parallax-element">
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp" className="mb-6">
            <h2 className="text-4xl font-bold text-white animate-glow">
            Prêt à donner vie à vos idées ?
          </h2>
          </ScrollAnimation>
          <ScrollAnimation animation="slideInLeft" delay={300} className="mb-8">
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis personnalisé et gratuit. Notre équipe créative est impatiente de travailler avec vous.
          </p>
          </ScrollAnimation>
          <ScrollAnimation animation="scaleIn" delay={600}>
            <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:bg-gray-50 transform hover:-translate-y-3 hover:scale-110 transition-all duration-500 group"
          >
            Obtenir un devis gratuit
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-3 group-hover:scale-125 transition-transform duration-500" />
          </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;