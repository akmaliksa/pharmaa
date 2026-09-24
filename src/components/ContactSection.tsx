import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactSectionProps {
  language?: Language;
  translations?: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language = 'en', translations }) => {
  const [formType, setFormType] = useState<'invest' | 'sell_to_us'>('invest');
  const [submitted, setSubmitted] = useState(false);
  const t = translations || TRANSLATIONS[language] || TRANSLATIONS.en;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: 'Buying Luxury Residence',
    budgetOrDetails: '',
    locationPreference: 'Istanbul'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#070D1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Partnership */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1E3D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.contact.tag}</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.contact.heading}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              {t.contact.subheading}
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B152E] border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#0F1E3D] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs text-[#C5A059] uppercase font-semibold">{t.contact.hq}</h4>
                  <p className="text-sm text-white font-medium">{t.contact.hqVal}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B152E] border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#0F1E3D] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs text-[#C5A059] uppercase font-semibold">{t.contact.phoneLabel}</h4>
                  <p className="text-sm text-white font-medium">{t.contact.phoneVal}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B152E] border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#0F1E3D] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs text-[#C5A059] uppercase font-semibold">{t.contact.emailLabel}</h4>
                  <p className="text-sm text-white font-medium">{t.contact.emailVal}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F1E3D]/50 border border-[#D4AF37]/20 flex items-center gap-3 text-xs text-slate-300">
              <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{t.contact.nda}</span>
            </div>
          </div>

          {/* Right: Dual Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B152E] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
              
              {/* Form Mode Selector */}
              <div className="flex rounded-xl bg-[#070D1E] p-1 border border-slate-800 mb-6">
                <button
                  type="button"
                  onClick={() => setFormType('invest')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    formType === 'invest'
                      ? 'bg-[#D4AF37] text-[#070D1E] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.contact.formTabInvest}
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('sell_to_us')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    formType === 'sell_to_us'
                      ? 'bg-[#D4AF37] text-[#070D1E] shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.contact.formTabSell}
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold text-white">
                    {t.contact.submittedTitle}
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
                    {t.contact.submittedDesc}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-lg bg-[#0F1E3D] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#16274e] border border-[#D4AF37]/30"
                  >
                    {t.contact.resetBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'ar' ? 'محمد العبدالله' : language === 'tr' ? 'Ahmet Yılmaz' : 'Alexander Wright'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#070D1E] border border-slate-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.contact.phoneInputLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+90 532 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#070D1E] border border-slate-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {t.contact.emailInputLabel}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="investor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#070D1E] border border-slate-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        {formType === 'invest' ? (language === 'ar' ? 'الهدف الرئيسي' : language === 'tr' ? 'Öncelikli Amaç' : 'Primary Objective') : (language === 'ar' ? 'نوع العقار المملوك' : language === 'tr' ? 'Sahip Olduğunuz Mülk Türü' : 'Property Type You Own')}
                      </label>
                      <select
                        value={formData.propertyInterest}
                        onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                        className="w-full bg-[#070D1E] border border-slate-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-hidden"
                      >
                        {formType === 'invest' ? (
                          <>
                            <option value="Luxury Villa / Residence">{language === 'ar' ? 'فيلا فاخرة / إطلالة البوسفور' : language === 'tr' ? 'Lüks Villa / Boğaz Rezidansı' : 'Luxury Villa / Bosphorus Residence'}</option>
                            <option value="Commercial Rental Yield">{language === 'ar' ? 'محلات تجارية / عائد إيجاري مرتفع' : language === 'tr' ? 'Ticari Dükkan / Yüksek Kira Getirisi' : 'Commercial Shops / High Rental Yield'}</option>
                            <option value="Subdivided Land Plot">{language === 'ar' ? 'قطع أراضٍ مفرزة (صبنجة / بودروم)' : language === 'tr' ? 'Parsellenmiş Arsa (Sapanca / Bodrum)' : 'Subdivided Land Parcels (Sapanca / Bodrum)'}</option>
                            <option value="Turkish Citizenship Portfolio">{language === 'ar' ? 'محفظة الجنسية التركية ($400,000+)' : language === 'tr' ? 'Türk Vatandaşlığı Portföyü ($400,000+)' : 'Turkish Citizenship Portfolio ($400,000+)'}</option>
                          </>
                        ) : (
                          <>
                            <option value="Large Acreage Land Plot">{language === 'ar' ? 'مساحة أرض شاسعة (للتقسيم والفرز)' : language === 'tr' ? 'Geniş Arazi (Parselleme & Geliştirme İçin)' : 'Large Acreage Land Plot (For Subdivision)'}</option>
                            <option value="Apartment / Villa for Renovation">{language === 'ar' ? 'شقة / فيلا (للترميم وإعادة البيع)' : language === 'tr' ? 'Daire / Villa (Renovasyon & Satış)' : 'Apartment / Villa (For Renovation & Resale)'}</option>
                            <option value="Commercial Shop / Market">{language === 'ar' ? 'محل تجاري / سوبرماركت / مجمع' : language === 'tr' ? 'Ticari Mağaza / Market / Plaza' : 'Commercial Shop / Market / Plaza'}</option>
                            <option value="Distressed Residential Asset">{language === 'ar' ? 'أصول سكنية بأسعار منافسة' : language === 'tr' ? 'Fırsat Konut Portföyü' : 'Distressed / Below-Market Portfolio'}</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {formType === 'invest' ? t.contact.notesInvest : t.contact.notesSell}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        formType === 'invest'
                          ? (language === 'ar' ? 'حدد ميزانيتك، الهدف الاستثماري (عائد إيجاري، الجنسية التركية، أو سكن فاخر)...' : language === 'tr' ? 'Bütçenizi, yatırım amacınızı (kira geliri, vatandaşlık, lüks konut) belirtin...' : 'Specify your target budget, desired ROI, or specific Turkish locations...')
                          : (language === 'ar' ? 'اذكر موقع الأرض أو العقار، المساحة بالمتر المربع، ورقم القطعة...' : language === 'tr' ? 'Arsa veya mülkünüzün konumunu, parsel numarasını ve talep edilen fiyatı yazın...' : 'Provide details about your land size in sq.m, zoning status, municipal district, and current asking price...')
                      }
                      value={formData.budgetOrDetails}
                      onChange={(e) => setFormData({ ...formData, budgetOrDetails: e.target.value })}
                      className="w-full bg-[#070D1E] border border-slate-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#070D1E] bg-gradient-to-r from-[#F9F1D6] via-[#D4AF37] to-[#C5A059] hover:from-white hover:to-[#E6CA65] shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 text-[#070D1E]" />
                    <span>{formType === 'invest' ? t.contact.submitBtnInvest : t.contact.submitBtnSell}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
