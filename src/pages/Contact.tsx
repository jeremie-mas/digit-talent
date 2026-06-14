import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  Users, Code, Shield, Wrench, Scale, Briefcase, FileText, ArrowRight
} from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimations';

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Adresse',
    content: 'BP: 601, Lomé Togo\nADIDOGOMÉ, SAGBADO\nNon loin de la station VAT & COO',
    href: null,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Téléphone',
    content: '+228 91 98 20 23',
    href: 'tel:+22891982023',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Email',
    content: 'contact@digit-talent.com',
    href: 'mailto:contact@digit-talent.com',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Horaires',
    content: 'Lun - Ven : 8h00 - 18h00\nSam : 9h00 - 13h00',
    href: null,
  },
];

const services = [
  'Développement Informatique', 'Sécurité Informatique', 'Formation & Coaching',
  'Réseaux & Maintenance', 'Vente de Matériel', 'Conseil Digital',
  'Expertise Juridique RH', 'Organisation RH', 'Recrutement',
  'Externalisation RH', 'Gestion de Paie', 'Formation RH',
];

const faqs = [
  { q: 'Quel est le délai moyen pour un projet ?', a: 'La durée varie selon la complexité : audit (1-2 semaines), développement (4-12 semaines), transformation RH (2-6 mois). Nous établissons un calendrier précis ensemble.' },
  { q: 'Proposez-vous des audits gratuits ?', a: 'Oui, nous proposons un diagnostic initial gratuit pour comprendre vos besoins et vous proposer une solution adaptée.' },
  { q: 'Travaillez-vous avec des entreprises de toutes tailles ?', a: 'Absolument ! Nous accompagnons des startups, PME, grandes entreprises et institutions publiques en adaptant nos services.' },
  { q: 'Êtes-vous disponibles pour des interventions urgentes ?', a: 'Oui, nous proposons un service d\'urgence pour les problèmes critiques (sécurité, panne système, crise RH).' },
  { q: 'Proposez-vous un suivi post-projet ?', a: 'Tous nos projets incluent une période de garantie et un suivi post-livraison. Nous proposons également des contrats de maintenance et support.' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputClass =
    'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-stone-50 focus:bg-white focus:ring-2 focus:ring-green-600 focus:border-transparent hover:border-gray-300 transition-all duration-200 outline-none';

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-stone-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="hero-enter text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            Contact
          </div>
          <h1 className="hero-enter-1 text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Parlons de votre<br />projet
          </h1>
          <p className="hero-enter-2 text-base text-stone-400 max-w-2xl leading-relaxed">
            Vous avez un projet de transformation digitale ou besoin d'expertise RH ?
            Notre équipe est là pour vous accompagner.
          </p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <ScrollAnimation animation="slideInLeft">
            <div className="bg-stone-50 rounded-3xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Démarrons votre projet</h2>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-500 text-sm">Nous vous recontactons sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text" name="name" required
                        value={formData.name} onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Email *
                      </label>
                      <input
                        type="email" name="email" required
                        value={formData.email} onChange={handleInputChange}
                        className={inputClass}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel" name="phone" required
                        value={formData.phone} onChange={handleInputChange}
                        className={inputClass}
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text" name="company"
                        value={formData.company} onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Service souhaité *
                    </label>
                    <select
                      name="service" required
                      value={formData.service} onChange={handleInputChange}
                      className={inputClass}
                    >
                      <option value="">Sélectionnez un service</option>
                      <optgroup label="Services Informatiques">
                        {services.slice(0, 6).map(s => <option key={s} value={s}>{s}</option>)}
                      </optgroup>
                      <optgroup label="Services Ressources Humaines">
                        {services.slice(6).map(s => <option key={s} value={s}>{s}</option>)}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      Description de votre besoin *
                    </label>
                    <textarea
                      name="message" required rows={5}
                      value={formData.message} onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Décrivez-nous votre projet, vos objectifs, vos contraintes..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3.5 px-8 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors"
                  >
                    Envoyer le message
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-gray-400 text-center">* Champs obligatoires</p>
                </form>
              )}
            </div>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation animation="slideInRight">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 bg-stone-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center text-green-700 flex-shrink-0 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                          {info.title}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-gray-700 hover:text-green-700 transition-colors whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-700 whitespace-pre-line">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-stone-100 rounded-2xl h-52 flex flex-col items-center justify-center border border-gray-100 hover:border-green-200 transition-colors group">
                <MapPin className="w-10 h-10 text-gray-300 group-hover:text-green-500 mb-2 transition-colors" />
                <p className="text-gray-500 text-sm font-medium">Carte interactive</p>
                <p className="text-gray-400 text-xs">Adidogomé, Sagbado — Lomé, Togo</p>
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-7">
            <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">
              FAQ
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Questions fréquentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollAnimation key={i} animation="fadeInUp" delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Vous avez d'autres questions ?</p>
            <a
              href="mailto:contact@digit-talent.com"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-green-800 transition-colors"
            >
              Contactez-nous par email
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
