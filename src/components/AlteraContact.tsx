import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface AlteraContactProps {
  language: Language;
}

export const AlteraContact: React.FC<AlteraContactProps> = ({ language }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying or Investing',
    message: '',
  });

  const content = {
    en: {
      eyebrow: 'GET IN TOUCH',
      title: 'Contact Akaber Development',
      subtitle: 'Schedule a consultation with our development team, inquire about upcoming architectural projects, or submit land opportunities for acquisition.',
      office: 'Headquarters & Architecture Studio',
      address: 'Levent Financial District & Bebek, Istanbul, Turkey',
      phone: '+90 212 555 0190',
      email: 'contact@akaber-realestate.com',
      hours: 'Mon – Fri: 09:00 – 18:00 (Sat by appointment)',
      formTitle: 'Direct Inquiry Form',
      labels: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone / WhatsApp',
        interest: 'Topic of Interest',
        message: 'Your Message / Property Details',
        submit: 'Send Inquiry',
        submitting: 'Transmitting...',
      },
      options: [
        'Buying / Investing in Current Projects',
        'Selling Land / Property to Akaber for Development',
        'Commercial Real Estate Leasing',
        'Turkish Citizenship Advisory',
      ],
      successMsg: 'Thank you. Your message has been received by our architectural and investment advisory team. We will respond within 24 hours.',
    },
    tr: {
      eyebrow: 'İLETİŞİM VE DANIŞMANLIK',
      title: 'Akaber Development İle İletişime Geçin',
      subtitle: 'Geliştirme ekibimizle randevu oluşturun, güncel mimari projelerimiz hakkında bilgi alın veya geliştirilmeye uygun arsa tekliflerinizi iletin.',
      office: 'Merkez Ofis ve Mimarlık Stüdyosu',
      address: 'Levent Finans Merkezi & Bebek, İstanbul, Türkiye',
      phone: '+90 212 555 0190',
      email: 'contact@akaber-realestate.com',
      hours: 'Pzt – Cum: 09:00 – 18:00 (Cmt randevuyla)',
      formTitle: 'Doğrudan İletişim Formu',
      labels: {
        name: 'Adınız Soyadınız',
        email: 'E-Posta Adresiniz',
        phone: 'Telefon / WhatsApp',
        interest: 'Konu',
        message: 'Mesajınız / Gayrimenkul Bilgileri',
        submit: 'Talebi İletin',
        submitting: 'Gönderiliyor...',
      },
      options: [
        'Projelerden Mülk Satın Alma / Yatırım',
        'Akaber’e Arsa / Geliştirilecek Mülk Teklifi',
        'Ticari Mülk Kiralama Talebi',
        'Yatırım Yoluyla Türk Vatandaşlığı',
      ],
      successMsg: 'Teşekkür ederiz. Mesajınız mimari ve yatırım ekibimize ulaşmıştır. En geç 24 saat içinde tarafınıza dönüş yapılacaktır.',
    },
    ar: {
      eyebrow: 'التواصل والاستشارات العقارية',
      title: 'تواصل مع إدارة التطوير في شركة أكابر',
      subtitle: 'احجز موعد استشارة مع مهندسينا، أو استفسر عن المشاريع الحالية، أو اعرض أراضيك وعقاراتك للشراء والتطوير.',
      office: 'المقر الرئيسي واستوديو الهندسة المعمارية',
      address: 'مركز ليفنت المالي وبيبيك، إسطنبول، تركيا',
      phone: '+90 212 555 0190',
      email: 'contact@akaber-realestate.com',
      hours: 'الاثنين – الجمعة: 09:00 – 18:00 (السبت بموعد مسبق)',
      formTitle: 'نموذج التواصل المباشر',
      labels: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف / واتساب',
        interest: 'الموضوع',
        message: 'تفاصيل رسالتك أو استفسارك',
        submit: 'إرسال الطلب',
        submitting: 'جارٍ الإرسال...',
      },
      options: [
        'الشراء والاستثمار في المشاريع القائمة',
        'عرض أرض أو عقار على أكابر للشراء والتطوير',
        'استئجار عقارات تجارية ومكاتب',
        'استشارات برنامج الجنسية التركية الاستثماري',
      ],
      successMsg: 'شكراً لتواصلك. تم استلام رسالتك من قبل فريق التطوير والاستثمار وسنعاود الاتصال بك خلال 24 ساعة.',
    },
  }[language] || {
    eyebrow: 'GET IN TOUCH',
    title: 'Contact Akaber Development',
    subtitle: 'Schedule a consultation with our development team, inquire about upcoming architectural projects, or submit land opportunities for acquisition.',
    office: 'Headquarters & Architecture Studio',
    address: 'Levent Financial District & Bebek, Istanbul, Turkey',
    phone: '+90 212 555 0190',
    email: 'contact@akaber-realestate.com',
    hours: 'Mon – Fri: 09:00 – 18:00 (Sat by appointment)',
    formTitle: 'Direct Inquiry Form',
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone / WhatsApp',
      interest: 'Topic of Interest',
      message: 'Your Message / Property Details',
      submit: 'Send Inquiry',
      submitting: 'Transmitting...',
    },
    options: [
      'Buying / Investing in Current Projects',
      'Selling Land / Property to Akaber for Development',
      'Commercial Real Estate Leasing',
      'Turkish Citizenship Advisory',
    ],
    successMsg: 'Thank you. Your message has been received by our architectural and investment advisory team. We will respond within 24 hours.',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact info & Studio address in Altera layout */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#008080] block mb-2">
                {content.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#111625] tracking-tight font-sans">
                {content.title}
              </h2>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-5 bg-[#FAFAFA] border border-neutral-200 rounded flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] shrink-0">
                  <MapPin className="w-5 h-5 text-[#008080]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                    {content.office}
                  </span>
                  <p className="text-sm font-semibold text-[#111625] mt-0.5">
                    {content.address}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-neutral-200 rounded flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] shrink-0">
                  <Phone className="w-5 h-5 text-[#008080]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                    Direct Line
                  </span>
                  <a href={`tel:${content.phone}`} className="text-sm font-semibold text-[#111625] hover:text-[#008080] transition-colors mt-0.5 block">
                    {content.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-neutral-200 rounded flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] shrink-0">
                  <Mail className="w-5 h-5 text-[#008080]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                    Official Inquiries
                  </span>
                  <a href={`mailto:${content.email}`} className="text-sm font-semibold text-[#111625] hover:text-[#008080] transition-colors mt-0.5 block">
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-neutral-200 rounded flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white border border-neutral-200 flex items-center justify-center text-[#111625] shrink-0">
                  <Clock className="w-5 h-5 text-[#008080]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                    Consultation Hours
                  </span>
                  <p className="text-sm font-semibold text-[#111625] mt-0.5">
                    {content.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Altera Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] border border-neutral-200 p-8 sm:p-10 rounded shadow-xs">
              <h3 className="text-xl font-bold text-[#111625] mb-2">
                {content.formTitle}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Fill out the specifications below. Our architectural desk will respond promptly.
              </p>

              {submitted ? (
                <div className="p-6 bg-white border border-emerald-300 rounded text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-[#111625]">Inquiry Submitted Successfully</h4>
                  <p className="text-sm text-neutral-600">
                    {content.successMsg}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-[#111625] text-white text-xs font-semibold rounded uppercase tracking-wider hover:bg-[#008080] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {content.labels.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded text-sm text-[#111625] focus:outline-hidden focus:border-[#008080]"
                      placeholder="e.g. John Doe / Alexander Weber"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        {content.labels.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded text-sm text-[#111625] focus:outline-hidden focus:border-[#008080]"
                        placeholder="name@domain.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        {content.labels.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 rounded text-sm text-[#111625] focus:outline-hidden focus:border-[#008080]"
                        placeholder="+90 5xx xxx xx xx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {content.labels.interest}
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded text-sm text-[#111625] focus:outline-hidden focus:border-[#008080] cursor-pointer"
                    >
                      {content.options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      {content.labels.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded text-sm text-[#111625] focus:outline-hidden focus:border-[#008080]"
                      placeholder="Please specify location preferences, budget, or details about the land/property you wish to develop with Akaber..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111625] hover:bg-[#008080] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{content.labels.submit}</span>
                    <Send className="w-3.5 h-3.5" />
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
