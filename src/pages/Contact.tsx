import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
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
        service: formData.subject,
        message: formData.message,
      });

    setIsLoading(false);

    if (insertError) {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      return;
    }

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      content: "96, Rue Gbotobare, Quartier Todman Casablanca, Lomé, Togo"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      content: "+228 91 98 20 23\n+228 99 90 08 21"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "contact@digit-talent.com"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Site web",
      content: "www.digit-talent.com"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires",
      content: "7h30 - 18h00 (GMT / UTC+00)"
    }
  ];

  const subjects = [
    { value: "expertise-digitale", label: "Expertise Digitale" },
    { value: "cybersecurite", label: "Cybersécurité" },
    { value: "transformation-org", label: "Transformation Organisationnelle" },
    { value: "change-management", label: "Change Management" },
    { value: "formations-pm", label: "Formations Management de Projet" },
    { value: "autre", label: "Autre" }
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
              <span className="text-white animate-glow">Contactez-nous</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-slide-in-up animation-delay-300">
              Vous avez un projet de digitalisation, de transformation organisationnelle ou de formation ? Notre équipe est à votre écoute pour échanger sur vos besoins et construire ensemble la solution la plus adaptée.
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
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Envoyez-nous un message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 mb-6">
                    Merci pour votre message. Notre équipe vous recontactera dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-gradient-to-r from-primary-700 to-accent-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Entreprise
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
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={inputClass}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Décrivez-nous votre projet, vos objectifs..."
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
                        Envoyer
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">* Champs obligatoires</p>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Nos coordonnées
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="text-primary-700 flex-shrink-0 group-hover:scale-110 group-hover:text-accent-600 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-300" />
                  <p className="text-gray-500 font-medium">Lomé, Togo</p>
                  <p className="text-sm text-gray-400">Quartier Todman Casablanca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
