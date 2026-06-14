import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Lightbulb, Heart, Target, Users,
  Award, BookOpen, Briefcase, CheckCircle, Phone, Mail
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const team = [
  {
    name: 'Christine Mama VOVIC-AMOUZOU',
    role: 'Directrice Capital Humain, Conformité et Éthique',
    description:
      'Experte en Ressources Humaines et Conseils Juridiques avec 10 ans d\'expérience. Capacité managériale avérée pour dynamiser vos équipes avec des politiques innovantes.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+228 91 98 20 23 / 99 900 821',
    email: 'amouzouchristine@gmail.com',
  },
  {
    name: 'Kokou Bleo Amouzou',
    role: 'Expert Senior en Transformation Digitale',
    description:
      'Leader technologique visionnaire et stratégique, Fulbright Alumnus. Grande expérience en direction d\'équipes informatiques et transformation digitale.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    phone: '+228 90 03 95 15 / 96 84 04 14',
    email: 'contact@digit-talent.com',
  },
];

const values = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Innovation',
    description:
      'Nous cultivons l\'innovation technologique et organisationnelle pour créer des solutions uniques.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Passion',
    description:
      'Notre passion pour l\'excellence technique et humaine nous pousse à donner le meilleur.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Excellence',
    description:
      'Nous visons l\'excellence dans chaque mission pour livrer des résultats qui dépassent les attentes.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Collaboration',
    description:
      'Nous croyons en la force du travail d\'équipe et en une relation de confiance avec nos clients.',
  },
];

const certifications = [
  {
    icon: <Award className="w-5 h-5" />,
    title: 'PMP Certified',
    detail: '2021 — N° 3154913',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'RGPD & Protection des données',
    detail: '2021 — Conformité Togo',
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Fulbright Hubert Humphrey Fellowship',
    detail: '2015-2016 — Syracuse University, NY',
  },
];

const About = () => {
  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-stone-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-enter text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            À propos
          </div>
          <h1 className="hero-enter-1 text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Digit &amp; Talent
          </h1>
          <p className="hero-enter-2 text-base text-stone-400 max-w-2xl leading-relaxed">
            Cabinet de conseil expert en transformation digitale et gestion des ressources
            humaines, accompagnant les entreprises africaines dans leur développement.
          </p>
          <p className="hero-enter-3 mt-3 text-sm font-semibold text-green-400 tracking-wide">
            Fueling Dreams, Forging Success
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slideInLeft">
            <div className="space-y-6">
              <div className="text-xs font-semibold text-green-700 uppercase tracking-widest">
                Notre histoire
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Deux expertises,<br />une vision commune
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Digit &amp; Talent est né de la vision commune de deux experts complémentaires :
                l'un en transformation digitale et l'autre en ressources humaines. Notre constat
                était simple : les entreprises africaines ont besoin d'un accompagnement intégré
                pour réussir leur transformation.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Nous avons uni nos expertises pour offrir une approche holistique qui combine
                l'excellence technologique et l'optimisation du capital humain. Aujourd'hui, nous
                accompagnons des entreprises de toutes tailles dans leur développement stratégique.
              </p>

              {/* Certifications */}
              <div className="pt-4 space-y-3">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-gray-100"
                  >
                    <div className="text-green-700 mt-0.5 flex-shrink-0">{cert.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{cert.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{cert.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideInRight">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="L'équipe Digit & Talent"
                className="w-full h-[480px] object-cover rounded-3xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-700 text-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold mb-1">150+</div>
                <div className="text-green-200 text-sm">Entreprises accompagnées</div>
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              L'équipe
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Nos experts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 150}>
              <div
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-7">
                  <div className="inline-block text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full mb-3">
                    {member.role}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{member.description}</p>
                  <div className="space-y-2 border-t border-gray-100 pt-5">
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-green-700 transition-colors"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      {member.phone}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2.5 text-gray-500 text-sm hover:text-green-700 transition-colors"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              Ce qui nous guide
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Nos valeurs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 100}>
              <div
                key={i}
                className="group bg-stone-50 hover:bg-green-700 rounded-2xl p-7 border border-gray-100 hover:border-green-700 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-white group-hover:bg-white/20 rounded-xl flex items-center justify-center text-green-700 group-hover:text-white mb-5 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                  {v.title}
                </h3>
                <p className="text-gray-500 group-hover:text-green-100 text-sm leading-relaxed transition-colors">
                  {v.description}
                </p>
              </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="py-14 bg-green-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-semibold text-green-300 uppercase tracking-widest mb-4">
                Notre mission
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Accompagner l'Afrique<br />vers l'excellence
              </h2>
              <p className="text-green-200 leading-relaxed mb-8">
                Accompagner les entreprises africaines dans leur processus de transformation
                digitale et d'optimisation de leur capital humain pour une croissance durable
                et compétitive.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
              >
                Discutons de votre projet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <Target className="w-5 h-5" />, title: 'Expertise', desc: 'Compétences techniques et humaines de haut niveau' },
                { icon: <Users className="w-5 h-5" />, title: 'Accompagnement', desc: 'Suivi personnalisé tout au long de votre projet' },
                { icon: <Lightbulb className="w-5 h-5" />, title: 'Innovation', desc: 'Solutions avant-gardistes adaptées au contexte africain' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-5 transition-colors"
                >
                  <div className="text-green-300 mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-white font-semibold mb-1">{item.title}</div>
                    <div className="text-green-200 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
