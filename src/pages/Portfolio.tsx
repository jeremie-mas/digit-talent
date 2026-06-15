import React, { useState } from 'react';
import { ExternalLink, Calendar, Tag, Users, Code, Shield, Wrench, FileText } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'digital', label: 'Transformation Digitale' },
    { id: 'security', label: 'Sécurité Informatique' },
    { id: 'rh', label: 'Ressources Humaines' },
    { id: 'training', label: 'Formation' },
    { id: 'infrastructure', label: 'Infrastructure IT' }
  ];

  const projects = [
    {
      id: 1,
      title: "Transformation Digitale - PAGE Togo",
      category: "digital",
      client: "Projet d'Appui à la Gouvernance Economique",
      year: "2023",
      description: "Mise en place de la stratégie digitale et déploiement de solutions cloud pour la modernisation des processus gouvernementaux.",
      image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Stratégie Digitale", "Cloud Computing", "Gouvernance"]
    },
    {
      id: 2,
      title: "Sécurité SI - Institut National d'Assurance Maladie",
      category: "security",
      client: "INAM Togo",
      year: "2022",
      description: "Audit complet de sécurité et mise en place de politiques de sécurité pour le système d'information national de santé.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Audit Sécurité", "PSSI", "Sécurité Santé"]
    },
    {
      id: 3,
      title: "SAP ECC6/HANA Implementation",
      category: "digital",
      client: "Entreprise Privée",
      year: "2023",
      description: "Déploiement de solution SAP avec migration des données et formation des utilisateurs.",
      image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["ERP SAP", "Migration", "Formation"]
    },
    {
      id: 4,
      title: "Reengineering RH - COECEPI Microfinance",
      category: "rh",
      client: "COECEPI Microfinance",
      year: "2022",
      description: "Restructuration complète du département RH avec digitalisation des processus et mise en place de SIRH.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Digitalisation RH", "SIRH", "Optimisation"]
    },
    {
      id: 5,
      title: "Formation PMP/CAPM Certification",
      category: "training",
      client: "Multiples Entreprises",
      year: "2023",
      description: "Programme de formation certifiante en gestion de projets pour 50+ professionnels togolais.",
      image: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Formation", "Certification", "Gestion Projets"]
    },
    {
      id: 6,
      title: "Infrastructure Cloud Oracle",
      category: "infrastructure",
      client: "Organisation Internationale",
      year: "2021",
      description: "Déploiement d'infrastructure Cloud IaaS avec services Compute, Storage et réseau virtuel.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Cloud Oracle", "IaaS", "Infrastructure"]
    },
    {
      id: 7,
      title: "Externalisation Paie - Groupe Industriel",
      category: "rh",
      client: "Groupe Industriel Ouest-Africain",
      year: "2023",
      description: "Externalisation complète de la gestion de paie pour 500+ employés avec traitement mensuel.",
      image: "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Externalisation", "Gestion Paie", "RH"]
    },
    {
      id: 8,
      title: "Sécurisation Données RGPD",
      category: "security",
      client: "Institution Financière",
      year: "2022",
      description: "Mise en conformité RGPD et protection des données personnelles des clients.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["RGPD", "Conformité", "Protection Données"]
    },
    {
      id: 9,
      title: "Développement Application Mobile",
      category: "digital",
      client: "Startup AgroTech",
      year: "2023",
      description: "Conception et développement d'une application mobile pour la gestion agricole.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mobile App", "Développement", "AgroTech"]
    }
  ];

  const categoryBadgeClass: Record<string, string> = {
    digital: 'bg-primary-700',
    security: 'bg-accent-600',
    rh: 'bg-primary-600',
    training: 'bg-accent-700',
    infrastructure: 'bg-primary-800',
  };

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-primary-900/70 to-accent-800/60 animate-gradient-shift"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary-700/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-12 w-28 h-28 bg-accent-600/10 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-down">
              Nos <span className="text-white animate-glow">réalisations</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-slide-in-up animation-delay-300">
              Découvrez nos projets les plus significatifs et comment nous accompagnons nos clients dans leur transformation digitale et RH.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 animate-slide-in-up animation-delay-300">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary-700 to-accent-600 text-white shadow-lg animate-pulse-button'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-40 h-40 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-32 h-32 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="text-2xl text-gray-500 mb-4">Aucun projet trouvé dans cette catégorie</div>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-gradient-to-r from-primary-700 to-accent-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Voir tous les projets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-300">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 group animate-slide-in-up animation-delay-600"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        categoryBadgeClass[project.category] ?? 'bg-primary-700'
                      }`}>
                        {filters.find((f) => f.id === project.category)?.label}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-4">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-700 hover:bg-primary-700 hover:text-white hover:scale-110 transition-all duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{project.year}</span>
                      <span className="mx-2">•</span>
                      <span className="truncate">{project.client}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 hover:bg-primary-200 hover:scale-105 transition-all duration-300"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-28 h-28 bg-primary-700/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-accent-600/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Notre impact en{' '}
              <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">
                chiffres
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-300">
              Des résultats concrets qui témoignent de notre expertise et de notre engagement envers nos clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in animation-delay-600">
            {[
              { number: "300+", label: "Projets réalisés", gradient: "from-primary-700 to-accent-600" },
              { number: "150+", label: "Clients satisfaits", gradient: "from-accent-600 to-primary-700" },
              { number: "98%", label: "Taux de satisfaction", gradient: "from-primary-600 to-accent-500" },
              { number: "10+", label: "Années d'expertise", gradient: "from-accent-700 to-primary-800" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group animate-slide-in-up ${
                  index === 0 ? 'animation-delay-300' :
                  index === 1 ? 'animation-delay-600' :
                  index === 2 ? 'animation-delay-1000' :
                  'animation-delay-1500'
                }`}
              >
                <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-accent-600 relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-slide-in-down animate-glow">
            Votre projet sera le prochain
          </h2>
          <p className="text-xl text-primary-100 mb-8 animate-slide-in-up animation-delay-300">
            Rejoignez nos clients satisfaits et transformons ensemble vos défis en réussites.
          </p>
          <button className="bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-600">
            Démarrer un projet
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
