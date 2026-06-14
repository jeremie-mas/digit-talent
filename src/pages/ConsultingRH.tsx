import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scale, PieChart, Search, Briefcase, FileText, GraduationCap,
  ArrowRight, CheckCircle
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const hrServices = [
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'Expertise Juridique',
    description: 'Gestion administrative et conformité légale complète',
    features: [
      'Rédaction et gestion des contrats et conventions',
      'Relations avec l\'administration du travail (ANPE, CNSS, DGT)',
      'Organisation des élections sociales',
      'Gestion de la sécurité santé au travail',
    ],
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: 'Organisation RH',
    description: 'Optimisation de la gestion des ressources humaines',
    features: [
      'Mise en place d\'outils de gestion RH',
      'Élaboration de référentiels de compétences',
      'Systèmes d\'évaluation des performances',
      'Bilans de compétences et évaluations',
    ],
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Recrutement',
    description: 'Recherche et sélection des meilleurs talents',
    features: [
      'Définition de profils recherchés',
      'Recherche et présélection de candidats',
      'Entretiens et short list des meilleurs profils',
      'Suivi de l\'intégration des collaborateurs',
    ],
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Externalisation RH',
    description: 'Solutions d\'externalisation partielle ou totale',
    features: [
      'Externalisation de la gestion du personnel',
      'Traitement externe des salaires',
      'Conseil en ressources humaines et fiscalité',
      'Gestion administrative complète',
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Gestion de Paie',
    description: 'Traitement professionnel de la paie et déclarations',
    features: [
      'Constitution des dossiers de salaire',
      'Production des bulletins de paie',
      'Traitement complet des salaires',
      'Déclarations sociales et fiscales',
    ],
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Formation RH',
    description: 'Développement des compétences et renforcement des capacités',
    features: [
      'Formations en entreprise certifiantes',
      'Formations individuelles spécialisées',
      'Plans de développement des compétences',
      'Accompagnement stratégique',
    ],
  },
];

const process = [
  { step: '01', title: 'Audit RH', description: 'Diagnostic complet de votre organisation et de vos processus RH existants.' },
  { step: '02', title: 'Stratégie RH', description: 'Élaboration d\'une stratégie RH alignée sur vos objectifs business.' },
  { step: '03', title: 'Mise en œuvre', description: 'Déploiement des solutions RH avec accompagnement personnalisé.' },
  { step: '04', title: 'Suivi & Optimisation', description: 'Suivi des performances et optimisation continue de vos processus RH.' },
];

const whyUs = [
  'Expertise juridique et conformité RGPD',
  'Digitalisation des processus RH',
  'Accompagnement personnalisé',
  'Solutions adaptées au contexte africain',
];

const ConsultingRH = () => {
  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-stone-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-enter text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            Services
          </div>
          <h1 className="hero-enter-1 text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Consulting<br />Ressources Humaines
          </h1>
          <p className="hero-enter-2 text-base text-stone-400 max-w-2xl leading-relaxed">
            Expertise en gestion du capital humain, recrutement, formation et digitalisation
            des processus RH pour optimiser votre performance organisationnelle.
          </p>
        </div>
      </section>

      {/* ── HR Services Grid ─────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" className="mb-8">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              Nos domaines
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Notre expertise RH</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hrServices.map((service, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 80}>
              <div
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-5 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-green-700 text-sm font-medium border border-green-200 px-5 py-2.5 rounded-full hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors self-start"
                >
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              Comment ça marche
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Notre approche</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 100}>
              <div className="relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-0 h-px bg-gray-200" />
                )}
                <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold mb-5">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-4">
                Pourquoi nous choisir
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                Une expertise RH<br />reconnue
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Avec plus de 10 ans d'expérience en ressources humaines et une expertise
                reconnue en conformité et éthique, nous vous accompagnons dans tous vos défis RH.
              </p>
              <div className="space-y-3">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Expertise RH"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-400 rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-amber-900 mb-0.5">10+</div>
                <div className="text-amber-800 text-sm font-medium">Années d'expertise RH</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-14 bg-green-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Optimisez votre capital humain
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-xl mx-auto">
            Contactez-nous pour une consultation RH personnalisée et découvrir comment nos
            solutions peuvent transformer votre gestion des ressources humaines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services-informatiques"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Voir nos services IT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingRH;
