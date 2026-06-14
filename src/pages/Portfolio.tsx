import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const filters = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'digital', label: 'Transformation Digitale' },
  { id: 'security', label: 'Sécurité Informatique' },
  { id: 'rh', label: 'Ressources Humaines' },
  { id: 'training', label: 'Formation' },
  { id: 'infrastructure', label: 'Infrastructure IT' },
];

const categoryMeta: Record<string, { color: string; dot: string; label: string }> = {
  digital:        { color: 'text-green-600',  dot: 'bg-green-500',  label: 'Digital' },
  security:       { color: 'text-red-500',    dot: 'bg-red-500',    label: 'Sécurité' },
  rh:             { color: 'text-amber-600',  dot: 'bg-amber-500',  label: 'RH' },
  training:       { color: 'text-blue-500',   dot: 'bg-blue-500',   label: 'Formation' },
  infrastructure: { color: 'text-stone-500',  dot: 'bg-stone-400',  label: 'Infrastructure' },
};

const projects = [
  {
    id: 1,
    title: 'Transformation Digitale — PAGE Togo',
    category: 'digital',
    client: "Projet d'Appui à la Gouvernance Economique",
    year: '2023',
    description:
      'Mise en place de la stratégie digitale et déploiement de solutions cloud pour la modernisation des processus gouvernementaux.',
    image: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Stratégie Digitale', 'Cloud Computing', 'Gouvernance'],
  },
  {
    id: 2,
    title: "Sécurité SI — Institut National d'Assurance Maladie",
    category: 'security',
    client: 'INAM Togo',
    year: '2022',
    description:
      "Audit complet de sécurité et mise en place de politiques de sécurité pour le système d'information national de santé.",
    image:
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Audit Sécurité', 'PSSI', 'Santé'],
  },
  {
    id: 3,
    title: 'SAP ECC6 / HANA Implementation',
    category: 'digital',
    client: 'Entreprise Privée',
    year: '2023',
    description:
      'Déploiement de solution SAP avec migration des données et formation des utilisateurs.',
    image:
      'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['ERP SAP', 'Migration', 'Formation'],
  },
  {
    id: 4,
    title: 'Reengineering RH — COECEPT Microfinance',
    category: 'rh',
    client: 'COECEPT Microfinance',
    year: '2022',
    description:
      'Restructuration complète du département RH avec digitalisation des processus et mise en place de SIRH.',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Digitalisation RH', 'SIRH', 'Optimisation'],
  },
  {
    id: 5,
    title: 'Formation PMP / CAPM Certification',
    category: 'training',
    client: 'Multiples Entreprises',
    year: '2023',
    description:
      'Programme de formation certifiante en gestion de projets pour 50+ professionnels togolais.',
    image:
      'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Certification', 'Gestion Projets'],
  },
  {
    id: 6,
    title: 'Infrastructure Cloud Oracle',
    category: 'infrastructure',
    client: 'Organisation Internationale',
    year: '2021',
    description:
      "Déploiement d'infrastructure Cloud IaaS avec services Compute, Storage et réseau virtuel.",
    image:
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Cloud Oracle', 'IaaS', 'Infrastructure'],
  },
  {
    id: 7,
    title: 'Externalisation Paie — Groupe Industriel',
    category: 'rh',
    client: 'Groupe Industriel Ouest-Africain',
    year: '2023',
    description:
      'Externalisation complète de la gestion de paie pour 500+ employés avec traitement mensuel.',
    image:
      'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Externalisation', 'Gestion Paie'],
  },
  {
    id: 8,
    title: 'Mise en conformité RGPD',
    category: 'security',
    client: 'Institution Financière',
    year: '2022',
    description:
      'Mise en conformité RGPD et protection des données personnelles des clients.',
    image:
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['RGPD', 'Conformité', 'Données'],
  },
  {
    id: 9,
    title: 'Application Mobile AgroTech',
    category: 'digital',
    client: 'Startup AgroTech',
    year: '2023',
    description:
      "Conception et développement d'une application mobile pour la gestion agricole en milieu rural.",
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Mobile', 'Développement', 'AgroTech'],
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-28 pb-16 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="hero-enter text-xs font-semibold text-green-400 uppercase tracking-widest mb-4">
                Réalisations
              </div>
              <h1 className="hero-enter-1 text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
                Nos projets
              </h1>
              <p className="hero-enter-2 text-base text-stone-400 max-w-xl leading-relaxed">
                Découvrez nos projets les plus significatifs et comment nous accompagnons
                nos clients dans leur transformation digitale et RH.
              </p>
            </div>
            <div className="hero-enter-3 flex gap-6 lg:gap-10 lg:pb-2">
              <div>
                <div className="text-4xl font-bold text-white">300+</div>
                <div className="text-xs text-stone-500 mt-1">Projets livrés</div>
              </div>
              <div className="w-px bg-stone-700" />
              <div>
                <div className="text-4xl font-bold text-amber-400">98%</div>
                <div className="text-xs text-stone-500 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-0 scrollbar-none">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative flex-shrink-0 px-5 py-4 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'text-green-700'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────── */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4 text-sm">Aucun projet dans cette catégorie.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-green-700 text-sm font-medium hover:underline"
              >
                Voir tous les projets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden">
              {filtered.map((project, i) => {
                const meta = categoryMeta[project.category];
                return (
                  <ScrollAnimation key={project.id} animation="fadeInUp" delay={i * 60}>
                  <div className="group bg-white hover:bg-stone-50 transition-colors duration-300 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${meta?.dot}`} />
                        <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {meta?.label}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <ArrowUpRight className="w-4 h-4 text-green-700" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-400 font-medium">{project.year}</span>
                        <span className="text-xs text-gray-400 truncate max-w-[160px] text-right">{project.client}</span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                        {project.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-800">
            {[
              { number: '300+', label: 'Projets réalisés', accent: false },
              { number: '150+', label: 'Clients satisfaits', accent: false },
              { number: '98%',  label: 'Taux de satisfaction', accent: true },
              { number: '10+',  label: "Années d'expertise", accent: false },
            ].map((s, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 80}>
              <div className="text-center px-6 py-12">
                <div className={`text-4xl font-bold mb-2 ${s.accent ? 'text-amber-400' : 'text-white'}`}>
                  {s.number}
                </div>
                <div className="text-sm text-stone-500">{s.label}</div>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 bg-green-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
          <p className="text-green-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Prochaine étape
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Votre projet sera<br />le prochain.
          </h2>
          <p className="text-green-200 mb-10 max-w-lg mx-auto">
            Rejoignez nos clients satisfaits et transformons ensemble vos défis en réussites concrètes.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Démarrer un projet
            <ArrowRight className="w-4 h-4" />
          </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
