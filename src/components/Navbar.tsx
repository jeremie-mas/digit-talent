import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  const servicesItems = [
    { path: '/services-informatiques', label: 'Services Informatiques' },
    { path: '/consulting-rh', label: 'Consulting Ressources Humaines' },
  ];

  const isServicesActive = location.pathname === '/services-informatiques' || location.pathname === '/consulting-rh';
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || !isHomePage 
        ? 'bg-white shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div>
              <img src="/images/logo_dt.png" alt="Digit & Talent" className="h-16 w-auto" />
            </div>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link
              to="/"
              className={`text-base font-bold transition-all duration-300 relative group ${
                location.pathname === '/'
                  ? (isScrolled || !isHomePage ? 'text-blue-600' : 'text-white')
                  : (isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
              }`}
            >
              Accueil
              <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage ? 'bg-blue-600' : 'bg-white'
              } ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`text-base font-bold transition-all duration-300 relative group flex items-center space-x-1 ${
                  isServicesActive
                    ? (isScrolled || !isHomePage ? 'text-blue-600' : 'text-white')
                    : (isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
                }`}
              >
                <span>Nos services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  isScrolled || !isHomePage ? 'bg-blue-600' : 'bg-white'
                } ${
                  isServicesActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}>
                {servicesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                      location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/realisations"
              className={`text-base font-bold transition-all duration-300 relative group ${
                location.pathname === '/realisations'
                  ? (isScrolled || !isHomePage ? 'text-blue-600' : 'text-white')
                  : (isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
              }`}
            >
              Nos réalisations
              <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage ? 'bg-blue-600' : 'bg-white'
              } ${
                location.pathname === '/realisations' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            
            <Link
              to="/a-propos"
              className={`text-base font-bold transition-all duration-300 relative group ${
                location.pathname === '/a-propos'
                  ? (isScrolled || !isHomePage ? 'text-blue-600' : 'text-white')
                  : (isScrolled || !isHomePage ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
              }`}
            >
              À propos
              <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage ? 'bg-blue-600' : 'bg-white'
              } ${
                location.pathname === '/a-propos' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          </div>

          {/* Contact Button - Right */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className={`px-8 py-3 rounded-full text-base font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-blue-600'
              }`}
            >
              Contactez-nous
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHomePage
                ? 'hover:bg-gray-100 text-gray-700'
                : 'hover:bg-white/20 text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-bold transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Accueil
            </Link>
            
            {/* Mobile Services Menu */}
            <div className="space-y-2">
              <div className="text-base font-bold text-gray-900 px-2">Nos services</div>
              {servicesItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-semibold transition-colors duration-200 pl-4 ${
                    location.pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <Link
              to="/realisations"
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-bold transition-colors duration-200 ${
                location.pathname === '/realisations'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Nos réalisations
            </Link>
            
            <Link
              to="/a-propos"
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-bold transition-colors duration-200 ${
                location.pathname === '/a-propos'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              À propos
            </Link>
            
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-lg transition-all duration-200"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;