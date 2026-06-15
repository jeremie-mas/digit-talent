import React from 'react';
import {
  Users, Heart, Target, Lightbulb, Zap, Shield, Award,
  Star, ArrowRight, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: <Star className="w-10 h-10" />,
      title: "Excellence",
      description: "Viser la qualité et la rigueur dans chaque mission, qu'elle soit technique ou humaine."
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Innovation",
      description: "Proposer des solutions digitales et RH modernes, adaptées aux réalités des PME/PMI africaines."
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Intégrité",
      description: "Agir avec transparence, éthique et confidentialité dans la gestion des données et des relations clients."
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Synergie",
      description: "Mettre en commun les expertises de nos consultants (IT et RH) au service de la réussite globale de l'entreprise."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Proximité",
      description: "Accompagner chaque client avec écoute et réactivité, en construisant des relations de confiance durables."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Développement des talents",
      description: "Croire que chaque organisation grandit par le potentiel de ses femmes et de ses hommes."
    }
  ];

  const certifications = [
    { code: "CAPM", name: "Certified Associate in Project Management" },
    { code: "PMP", name: "Project Management Professional" },
    { code: "PMI-ACP", name: "Agile Certified Practitioner PMI-ACP" },
    { code: "PMI-PMOCP", name: "PMI Project Management Office Certified Practitioner" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-gray-900/70 to-accent-800/60 animate-gradient-shift"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-primary-300/10 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-down">
              Qui <span className="text-white animate-glow">sommes-nous</span> ?
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-slide-in-up animation-delay-300">
              Fondé le 4 octobre 2012 à Lomé, au Togo, DIGIT & TALENT est un cabinet de conseil spécialisé dans la convergence entre le digital et les talents. Depuis plus de dix ans, nous accompagnons les entreprises africaines dans leur transformation digitale et le développement de leur capital humain.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Notre équipe de <span className="font-bold text-primary-700">10 consultants</span> réunit des expertises complémentaires en informatique, en cybersécurité, en ressources humaines et en management de projet.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gray-50 px-4 py-2 rounded-full border border-gray-200 flex items-center space-x-2 hover:bg-primary-50 hover:border-primary-200 transition-colors duration-300"
              >
                <Award className="w-4 h-4 text-primary-700" />
                <span className="font-semibold text-gray-900">{cert.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-16 w-36 h-36 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-16 w-28 h-28 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-left">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-accent-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Devenir le cabinet de référence en Afrique dans la convergence entre digital et talents, reconnu pour sa capacité à faire du capital humain et du numérique des leviers durables de croissance pour les entreprises.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-right">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Accompagner les entreprises africaines dans leur transformation digitale et le développement de leur capital humain, en proposant des solutions intégrées en formation, en informatique et en ressources humaines, pour renforcer leur performance et leur compétitivité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-32 h-32 bg-primary-700/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent-600/5 rounded-full animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces valeurs fondamentales guident chacune de nos interventions et définissent notre approche unique du conseil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-primary-700 group-hover:text-accent-600 group-hover:scale-110 transition-all duration-300 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-primary-700/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-accent-600/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Christine Yovo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary-700 to-accent-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2012</div>
                    <div className="text-xs">Fondation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Fondatrice & Managing Director
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Christine Yovo
              </h2>
              <p className="text-accent-600 font-medium mb-6">Managing Director</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Fondatrice de DIGIT & TALENT depuis 2012, Christine Yovo porte la vision d'un cabinet capable de réunir les expertises digitales et humaines au service de la croissance des entreprises africaines. Sous sa direction, DIGIT & TALENT s'est construit une expertise reconnue, certifiée PMP et PMI-PMOCP, au service de ses clients.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">PMP</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">PMI-PMOCP</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-24 h-24 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des certifications internationales qui témoignent de notre engagement envers l'excellence et les meilleures pratiques du métier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-1">{cert.code}</h3>
                <p className="text-sm text-gray-600">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-accent-600 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-glow">
            Discutons de votre projet
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Vous avez un projet de transformation digitale ou d'optimisation RH ?<br />
            Contactez-nous pour une consultation personnalisée.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group"
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
