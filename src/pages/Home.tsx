import { Link } from 'react-router-dom';
import { ArrowRight, Code, Users, GraduationCap, Shield, ArrowUpRight } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const Home = () => {
  const services = [
    {
      number: '01',
      icon: <Code className="w-5 h-5" />,
      title: 'Transformation Digitale',
      description: 'Solutions digitales complètes : développement web/mobile, sécurité informatique et infrastructure IT.',
      link: '/services-informatiques',
    },
    {
      number: '02',
      icon: <Users className="w-5 h-5" />,
      title: 'Consulting RH',
      description: 'Expertise juridique, recrutement, formation, gestion de paie et optimisation du capital humain.',
      link: '/consulting-rh',
    },
    {
      number: '03',
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Formation & Certification',
      description: 'Formations certifiantes en gestion de projets (PMP, CAPM), bureautique et outils de gestion.',
      link: '/services-informatiques',
    },
    {
      number: '04',
      icon: <Shield className="w-5 h-5" />,
      title: 'Sécurité & Conformité',
      description: 'Audit sécurité, protection des données, conformité RGPD et mise en place de politiques sécurisées.',
      link: '/services-informatiques',
    },
  ];

  const stats = [
    { number: '150+', label: 'Clients satisfaits' },
    { number: '300+', label: 'Projets réalisés' },
    { number: '5 ans', label: "D'expérience" },
    { number: '98%', label: 'Satisfaction client' },
  ];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-green-900/60" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 pt-28 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="hero-enter inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Cabinet de conseil — Lomé, Togo
            </div>

            <h1 className="hero-enter-1 text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              Digit &amp; <span className="text-green-400">Talent</span>
            </h1>

            <p className="hero-enter-2 text-lg text-white/70 leading-relaxed">
              Cabinet expert en transformation digitale et gestion des ressources humaines.
              Nous accompagnons les entreprises africaines vers l'excellence.
            </p>

            <div className="hero-enter-3 flex flex-col sm:flex-row items-start gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-green-500 transition-colors"
              >
                Démarrer un projet
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/realisations"
                className="inline-flex items-center gap-2 text-white border border-white/30 px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:flex gap-4">
          <div className="hero-enter-2 bg-white rounded-2xl p-4 shadow-xl">
            <div className="text-2xl font-bold text-green-700">300+</div>
            <div className="text-xs text-gray-500">Projets livrés</div>
          </div>
          <div className="hero-enter-3 bg-amber-400 rounded-2xl p-4 shadow-xl">
            <div className="text-2xl font-bold text-amber-900">98%</div>
            <div className="text-xs text-amber-800">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-green-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-green-600">
            {stats.map((stat, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 80} className="text-center px-6 py-8">
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-green-200">{stat.label}</div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollAnimation animation="fadeInUp" className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">
                Nos expertises
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Ce que nous faisons pour vous
              </h2>
            </div>
            <Link
              to="/services-informatiques"
              className="inline-flex items-center gap-2 text-green-700 text-sm font-medium hover:gap-3 transition-all"
            >
              Tous nos services <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 100}>
                <Link
                  to={service.link}
                  className="group block bg-stone-50 hover:bg-green-50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-white group-hover:bg-green-100 rounded-xl flex items-center justify-center text-green-700 transition-colors shadow-sm">
                      {service.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-green-500 transition-colors">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{service.description}</p>
                  <div className="flex items-center gap-1 text-green-700 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slideInLeft">
              <div className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
                Notre mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
                Fueling Dreams,<br />
                <span className="text-green-400">Forging Success</span>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-6 text-sm">
                Nous croyons que chaque entreprise africaine mérite des outils digitaux et un capital
                humain de classe mondiale. Notre équipe accompagne votre transformation avec passion et rigueur.
              </p>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 border border-green-600 text-green-400 px-6 py-3 rounded-full text-sm font-medium hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors"
              >
                Découvrir notre équipe
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollAnimation>

            <ScrollAnimation animation="slideInRight">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-700 rounded-2xl p-5">
                  <div className="text-4xl font-bold text-white mb-1">150+</div>
                  <div className="text-green-200 text-xs">Entreprises accompagnées</div>
                </div>
                <div className="bg-stone-800 rounded-2xl p-5 mt-6">
                  <div className="text-4xl font-bold text-white mb-1">5+</div>
                  <div className="text-stone-400 text-xs">Années d'expertise</div>
                </div>
                <div className="bg-amber-400 rounded-2xl p-5 -mt-3">
                  <div className="text-4xl font-bold text-amber-900 mb-1">98%</div>
                  <div className="text-amber-800 text-xs">Clients satisfaits</div>
                </div>
                <div className="bg-stone-700 rounded-2xl p-5">
                  <div className="text-4xl font-bold text-white mb-1">2</div>
                  <div className="text-stone-400 text-xs">Pôles d'expertise</div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 bg-green-700">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-green-200 mb-8 max-w-xl mx-auto text-sm">
              Contactez-nous pour un diagnostic gratuit et découvrez comment nous pouvons vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-colors"
              >
                Obtenir un devis gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                En savoir plus sur nous
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;
