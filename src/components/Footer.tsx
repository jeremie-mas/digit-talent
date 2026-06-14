import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services-informatiques', label: 'Services IT' },
  { to: '/consulting-rh', label: 'Consulting RH' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const socialIcons = [Facebook, Twitter, Instagram, Linkedin];

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-5">
              <img src="/images/logo_dt.png" alt="Digit & Talent" className="h-10 w-auto" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              Cabinet de conseil expert en transformation digitale et gestion des ressources humaines.
              Nous accompagnons les entreprises africaines vers l'excellence.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-stone-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Réseau social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-5">
              Navigation
            </div>
            <ul className="space-y-3">
              {navLinks.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-stone-400 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-5">
              Contact
            </div>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-2.5 text-stone-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>BP: 601, Lomé Togo<br />ADIDOGOMÉ, SAGBADO</span>
                </div>
              </li>
              <li>
                <a
                  href="tel:+22891982023"
                  className="flex items-center gap-2.5 text-stone-400 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +228 91 98 20 23
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@digit-talent.com"
                  className="flex items-center gap-2.5 text-stone-400 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  contact@digit-talent.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">© 2025 Digit & Talent. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="text-stone-500 text-sm hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-stone-500 text-sm hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
