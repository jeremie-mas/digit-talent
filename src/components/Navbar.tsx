import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'À propos' },
  ];

  const navLinkClass = (path: string) =>
    `text-base font-bold transition-all duration-300 relative group ${
      location.pathname === path
        ? isScrolled || !isHomePage
          ? 'text-primary-700'
          : 'text-white'
        : isScrolled || !isHomePage
        ? 'text-gray-700 hover:text-primary-700'
        : 'text-white/90 hover:text-white'
    }`;

  const underlineClass = (path: string) =>
    `absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
      isScrolled || !isHomePage ? 'bg-primary-700' : 'bg-white'
    } ${location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/images/digit_and_talent_fullcolor_300px.png"
              alt="DIGIT & TALENT"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={navLinkClass(link.path)}>
                {link.label}
                <span className={underlineClass(link.path)} />
              </Link>
            ))}
          </div>

          {/* Contact Button - Right */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className={`px-8 py-3 rounded-full text-base font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-gradient-to-r from-primary-700 to-accent-600 text-white'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-primary-700'
              }`}
            >
              Contact
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-bold transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-700'
                    : 'text-gray-700 hover:text-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-gradient-to-r from-primary-700 to-accent-600 text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
