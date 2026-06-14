import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const servicesItems = [
    { path: '/services-informatiques', label: 'Services Informatiques' },
    { path: '/consulting-rh', label: 'Consulting Ressources Humaines' },
  ];

  const isServicesActive = servicesItems.some(item => location.pathname === item.path);

  const linkClass = (path: string) =>
    `text-sm transition-colors duration-200 ${
      location.pathname === path
        ? 'text-green-700 font-semibold'
        : isScrolled || !isHomePage
          ? 'text-gray-600 hover:text-green-700'
          : 'text-white/80 hover:text-white'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-100'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo_dt.png" alt="Digit & Talent" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={linkClass('/')}>Accueil</Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                  isServicesActive
                    ? 'text-green-700 font-semibold'
                    : isScrolled || !isHomePage
                      ? 'text-gray-600 hover:text-green-700'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
              }`}>
                {servicesItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-5 py-3 text-sm transition-colors hover:bg-green-50 hover:text-green-700 ${
                      location.pathname === item.path
                        ? 'text-green-700 bg-green-50 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/realisations" className={linkClass('/realisations')}>Réalisations</Link>
            <Link to="/a-propos" className={linkClass('/a-propos')}>À propos</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-800 transition-colors duration-200"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHomePage
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-6 space-y-1">
          <Link
            to="/"
            className={`block py-2.5 text-sm font-medium ${
              location.pathname === '/' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
            }`}
          >
            Accueil
          </Link>

          <div className="py-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Services
            </div>
            {servicesItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 pl-3 text-sm border-l-2 mb-1 transition-colors ${
                  location.pathname === item.path
                    ? 'border-green-600 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/realisations"
            className={`block py-2.5 text-sm font-medium ${
              location.pathname === '/realisations' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
            }`}
          >
            Réalisations
          </Link>
          <Link
            to="/a-propos"
            className={`block py-2.5 text-sm font-medium ${
              location.pathname === '/a-propos' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
            }`}
          >
            À propos
          </Link>

          <div className="pt-4">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full bg-green-700 text-white py-3 rounded-full text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
