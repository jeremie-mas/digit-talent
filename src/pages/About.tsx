import React from 'react';
import { 
  Users, Award, Heart, Target, Lightbulb, Zap, 
  Star, ArrowRight, Briefcase, BookOpen, MapPin, Phone, Mail 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: "Christine Mama VOVIC-AMOUZOU",
      role: "Directrice Capital Humain, Conformité et Éthique",
      description: "Experte en Ressources Humaines et Conseils Juridiques avec 10 ans d'expérience. Capacité managériale avérée pour dynamiser vos équipes avec des politiques innovantes.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+228 91 98 20 23 / 99 900 821",
      email: "amouzouchristine@gmail.com"
    },
    {
      name: "Kokou Bleo Amouzou",
      role: "Expert Senior en Transformation Digitale",
      description: "Leader technologique visionnaire et stratégique, Fulbright Alumnus. Grande expérience en direction d'équipes informatiques et transformation digitale.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+228 90 03 95 15 / 96 84 04 14",
      email: "contact@digit-talent.com"
    }
  ];

  const values = [
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovation",
      description: "Nous cultivons l'innovation technologique et organisationnelle pour créer des solutions uniques et adaptées."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Passion",
      description: "Notre passion pour l'excellence technique et humaine nous pousse à donner le meilleur de nous-mêmes."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque mission pour livrer des résultats qui dépassent les attentes."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Collaboration",
      description: "Nous croyons en la force du travail d'équipe et en une relation de confiance avec nos clients."
    }
  ];

  const certifications = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "PMP Certified",
      year: "2021",
      number: "3154913"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "RGPD & Protection des données",
      year: "2021",
      number: "Conformité Togo"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Fulbright Hubert Humphrey Fellowship",
      year: "2015-2016",
      number: "Syracuse University, NY"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform hover:scale-105 transition-transform duration-[3000ms]"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-gray-900/70 to-purple-900/60 animate-gradient-shift"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-400/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-purple-400/10 rounded-full animate-float-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              À propos de <span className="text-white animate-glow">Digit & Talent</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-slide-in-up animation-delay-300">
              Cabinet de conseil expert en transformation digitale et gestion des ressources humaines, 
              accompagnant les entreprises africaines dans leur développement depuis plusieurs années.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-16 w-36 h-36 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-16 w-28 h-28 bg-purple-500/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-4xl font-bold text-gray-900 animate-slide-in-down">
                Notre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">histoire</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-in-up animation-delay-300">
                Digit & Talent est né de la vision commune des experts complémentaires : 
                l'un en transformation digitale et l'autre en ressources humaines. Notre constat était simple : 
                les entreprises africaines ont besoin d'un accompagnement intégré pour réussir leur transformation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed animate-slide-in-up animation-delay-600">
                Nous avons uni nos expertises pour offrir une approche holistique qui combine l'excellence 
                technologique et l'optimisation du capital humain. Aujourd'hui, nous accompagnons des entreprises 
                de toutes tailles dans leur développement stratégique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in animation-delay-1000">
                <div className="bg-blue-50 p-6 rounded-2xl flex-1 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">150+</div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl flex-1 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">300+</div>
                  <div className="text-gray-600">Projets réalisés</div>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl flex-1 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
                  <div className="text-gray-600">Années d'expertise</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right animation-delay-300">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:rotate-2 hover:scale-105 transition-all duration-500 group">
                <img
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="L'équipe Digit & Talent"
                  className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Une équipe dédiée à votre réussite</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-purple-500/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">experts</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              Des professionnels passionnés et expérimentés, unis par la même vision de l'excellence technique et humaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in animation-delay-600">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 group animate-slide-in-up ${
                  index === 0 ? 'animation-delay-300' : 'animation-delay-600'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-lg font-semibold mb-1">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500/5 rounded-full animate-float"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Nos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              Ces valeurs fondamentales guident chacune de nos interventions et définissent notre approche unique du conseil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in animation-delay-600">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 text-center group border border-gray-100 animate-slide-in-up ${
                  index === 0 ? 'animation-delay-300' :
                  index === 1 ? 'animation-delay-600' :
                  index === 2 ? 'animation-delay-1000' :
                  'animation-delay-1500'
                }`}
              >
                <div className="text-blue-600 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-500 mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden animate-gradient-shift">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 text-white mx-auto mb-8 animate-pulse-slow" />
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-down animate-glow">
            Notre mission
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-slide-in-up animation-delay-300">
            Accompagner les entreprises africaines dans leur processus de transformation digitale 
            et d'optimisation de leur capital humain pour une croissance durable et compétitive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in animation-delay-600">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group animate-slide-in-up animation-delay-300">
              <Target className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Expertise</h3>
              <p className="text-blue-100 text-sm">Compétences techniques et humaines de haut niveau</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group animate-slide-in-up animation-delay-600">
              <Users className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Accompagnement</h3>
              <p className="text-blue-100 text-sm">Suivi personnalisé tout au long de votre projet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group animate-slide-in-up animation-delay-1000">
              <Star className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
              <p className="text-blue-100 text-sm">Solutions avant-gardistes adaptées au contexte africain</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-24 h-24 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
            Discutons de votre projet
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-slide-in-up animation-delay-300">
            Vous avez un projet de transformation digitale ou d'optimisation RH ? 
            Contactez-nous pour une consultation personnalisée.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group animate-fade-in-up animation-delay-600"
          >
            Contactez-nous
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;