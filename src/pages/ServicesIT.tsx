import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code, Shield, Users, Wrench, ShoppingCart, Target,
  ArrowRight, CheckCircle
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const itServices = [
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Développement Informatique',
    description: 'Solutions digitales mobiles et web sur mesure pour tous secteurs d\'activités',
    features: [
      'Analyse approfondie de vos besoins',
      'Intégration de solutions digitales mobiles',
      'Développement web frontend et backend',
      'Solutions adaptées à votre secteur',
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Sécurité Informatique',
    description: 'Protection complète de vos systèmes d\'information et données',
    features: [
      'Évaluation de la sécurité du SI',
      'Audit sécurité et correction de vulnérabilités',
      'Mise en place de stratégies sécurité SI',
      'Protection contre les cybermenaces',
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Formation & Coaching',
    description: 'Formations certifiantes et accompagnement personnalisé',
    features: [
      'Formations gestion de projets (CAPM, PMP, PRINCE2)',
      'Formations bureautique avancée (Excel, PowerPoint)',
      'Outils de gestion pour PME/PMI (SAGE SAARI)',
      'Coaching informatique personnalisé',
    ],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Réseaux & Maintenance',
    description: 'Solutions réseau complètes et maintenance de parc informatique',
    features: [
      'Mise en place de réseaux d\'entreprise',
      'Maintenance du parc informatique',
      'Assistance technique aux utilisateurs',
      'Support technique 24/7',
    ],
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'Vente de Matériel',
    description: 'Équipements informatiques et solutions bureautiques de qualité',
    features: [
      'Accompagnement au dimensionnement technique',
      'Vente de matériels informatiques',
      'Solutions bureautiques (imprimantes, scanners)',
      'Équipements professionnels (vidéoprojecteurs)',
    ],
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Conseil Digital',
    description: 'Stratégie digitale adaptée à votre business',
    features: [
      'Mise en place de stratégie digitale sur mesure',
      'Investissements adaptés à vos besoins',
      'Identification des profils IT appropriés',
      'Roadmap structurée et efficace',
    ],
  },
];

const process = [
  { step: '01', title: 'Analyse & Diagnostic', description: 'Nous analysons vos besoins et réalisons un diagnostic complet de votre infrastructure IT.' },
  { step: '02', title: 'Conception sur mesure', description: 'Développement de solutions techniques adaptées spécifiquement à vos objectifs.' },
  { step: '03', title: 'Implémentation', description: 'Mise en œuvre des solutions avec un accompagnement technique personnalisé.' },
  { step: '04', title: 'Suivi & Maintenance', description: 'Support continu et maintenance pour garantir la performance de vos systèmes.' },
];

const ServicesIT = () => {
  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-stone-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-enter text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            Services
          </div>
          <h1 className="hero-enter-1 text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Services<br />Informatiques
          </h1>
          <p className="hero-enter-2 text-base text-stone-400 max-w-2xl leading-relaxed">
            Des solutions digitales complètes pour accompagner votre transformation numérique
            et sécuriser vos systèmes d'information.
          </p>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" className="mb-8">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              Nos domaines
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Notre expertise IT</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {itServices.map((service, i) => (
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
            <h2 className="text-4xl font-bold text-gray-900">Notre méthodologie</h2>
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

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-14 bg-green-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à digitaliser votre entreprise ?
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-xl mx-auto">
            Contactez-nous pour une consultation technique personnalisée et découvrir comment
            nos solutions IT peuvent transformer votre activité.
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
              to="/consulting-rh"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Voir nos services RH
            </Link>
          </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default ServicesIT;
