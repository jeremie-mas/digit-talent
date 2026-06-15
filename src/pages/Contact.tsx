import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        service: formData.service,
        message: formData.message,
      });

    setIsLoading(false);

    if (insertError) {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      return;
    }

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "BP: 601, Lomé Togo\nADIDOGOMÉ, SAGBADO\nNon loin de la station VAT & COO"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+228 91 98 20 23"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "contact@digit-talent.com"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      content: "Lun - Ven: 8h00 - 18h00\nSam: 9h00 - 13h00"
    }
  ];

  const itServices = [
    "Développement Informatique",
    "Sécurité Informatique",
    "Formation & Coaching",
    "Réseaux & Maintenance",
    "Vente de Matériel",
    "Conseil Digital",
  ];

  const rhServices = [
    "Expertise Juridique RH",
    "Organisation RH",
    "Recrutement",
    "Externalisation RH",
    "Gestion de Paie",
    "Formation RH",
  ];

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-gray-400 transition-all duration-300";

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/70 to-accent-700/60 animate-gradient-shift"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-twinkle"></div>
          <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-primary-300/30 rounded-full animate-twinkle animation-delay-1500"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-accent-400/30 rounded-full animate-twinkle animation-delay-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-down">
              Contactez <span className="text-white animate-glow">Digit & Talent</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-slide-in-up animation-delay-300">
              Vous avez un projet de transformation digitale ou besoin d'expertise RH ? Notre équipe est là pour vous accompagner.
            </p>
            <p className="text-lg text-white font-medium animate-fade-in animation-delay-600">
              Fueling Dreams, Forging Success
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-40 h-40 bg-primary-700/5 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-32 h-32 bg-accent-600/5 rounded-full animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in-up">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 animate-slide-in-down">
                Démarrons votre projet
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-in-up">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse-slow" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-6">
                    Nous vous recontactons sous 24h pour discuter de votre projet.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gradient-to-r from-primary-700 to-accent-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animation-delay-300">
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                        Entreprise/Organisation
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service souhaité *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className={inputClass}
                    >
                      <option value="">Sélectionnez un service</option>
                      <optgroup label="Services Informatiques">
                        {itServices.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Services Ressources Humaines">
                        {rhServices.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description de votre besoin *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Décrivez-nous votre projet, vos objectifs, vos contraintes..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-700 to-accent-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-700/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">* Champs obligatoires</p>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-right animation-delay-300">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 animate-slide-in-down">
                  Nos coordonnées
                </h2>
                <div className="space-y-6 animate-fade-in animation-delay-600">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group animate-slide-in-up ${
                        index === 0 ? 'animation-delay-300' :
                        index === 1 ? 'animation-delay-600' :
                        index === 2 ? 'animation-delay-1000' :
                        'animation-delay-1500'
                      }`}
                    >
                      <div className="text-primary-700 flex-shrink-0 group-hover:scale-110 group-hover:text-accent-600 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line group-hover:text-gray-700 transition-colors duration-300">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group animate-fade-in animation-delay-1000">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300" />
                  <p className="text-gray-500">Carte interactive</p>
                  <p className="text-sm text-gray-400">Adidogome, Sagbado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-28 h-28 bg-primary-700/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-accent-600/5 rounded-full animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Questions <span className="bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">fréquentes</span>
            </h2>
          </div>

          <div className="space-y-6 animate-fade-in animation-delay-300">
            {[
              {
                question: "Quel est le délai moyen pour un projet ?",
                answer: "La durée varie selon la complexité : audit (1-2 semaines), développement (4-12 semaines), transformation RH (2-6 mois). Nous établissons un calendrier précis ensemble."
              },
              {
                question: "Proposez-vous des audits gratuits ?",
                answer: "Oui, nous proposons un diagnostic initial gratuit pour comprendre vos besoins et vous proposer une solution adaptée."
              },
              {
                question: "Travaillez-vous avec des entreprises de toutes tailles ?",
                answer: "Absolument ! Nous accompagnons des startups, PME, grandes entreprises et institutions publiques en adaptant nos services."
              },
              {
                question: "Êtes-vous disponibles pour des interventions urgentes ?",
                answer: "Oui, nous proposons un service d'urgence pour les problèmes critiques (sécurité, panne système, crise RH)."
              },
              {
                question: "Proposez-vous un suivi post-projet ?",
                answer: "Tous nos projets incluent une période de garantie et un suivi post-livraison. Nous proposons également des contrats de maintenance et support."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-slide-in-up ${
                  index === 0 ? 'animation-delay-300' :
                  index === 1 ? 'animation-delay-600' :
                  index === 2 ? 'animation-delay-1000' :
                  index === 3 ? 'animation-delay-1500' :
                  'animation-delay-2000'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {faq.question}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
