import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div>
                <img src="/images/logo_dt.png" alt="Digit & Talent" className="h-10 w-auto" />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Cabinet de conseil expert en transformation digitale et gestion des ressources humaines. 
              Nous accompagnons les entreprises africaines dans leur développement avec des solutions innovantes et sur mesure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/services-informatiques" className="text-gray-400 hover:text-white transition-colors">Services IT</Link></li>
              <li><Link to="/consulting-rh" className="text-gray-400 hover:text-white transition-colors">Consulting RH</Link></li>
              <li><Link to="/realisations" className="text-gray-400 hover:text-white transition-colors">Réalisations</Link></li>
              <li><Link to="/a-propos" className="text-gray-400 hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>BP: 601, Lomé Togo<br />ADIDOGOMÉ, SAGBADO</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+228 91 98 20 23</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contact@digit-talent.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Digit & Talent. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;