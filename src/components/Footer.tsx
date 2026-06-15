import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const socialClass =
    'w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent-600 transition-all duration-300';

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Nos services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="bg-white rounded-xl px-3 py-2 inline-block">
                <img
                  src="/images/digit_and_talent_fullcolor_300px.png"
                  alt="DIGIT & TALENT"
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-2 max-w-md">
              Cabinet de conseil basé à Lomé, Togo. DIGIT & TALENT accompagne les entreprises africaines dans leur transformation digitale et le développement de leur capital humain.
            </p>
            <p className="text-accent-400 font-semibold mb-6">
              Fueling Dreams, Forging Success
            </p>
            <div className="flex space-x-4">
              <a href="#" className={socialClass} aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className={socialClass} aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-accent-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>96, Rue Gbotobare, Quartier Todman Casablanca, Lomé, Togo</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+228 91 98 20 23</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+228 99 90 08 21</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@digit-talent.com" className="hover:text-accent-400 transition-colors">
                  contact@digit-talent.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DIGIT & TALENT. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Mentions légales</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
