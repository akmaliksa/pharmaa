/**
 * Dynamic Element Renderer
 * Renders any Page Builder element with responsive styling, multilingual text,
 * entrance animations, and interactive handlers.
 */

import React, { useState } from 'react';
import { BuilderElement, DeviceView } from '../../types';
import { useCms } from '../../context/CmsContext';
import {
  ArrowRight,
  Building,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  Instagram,
  Linkedin,
  MapPin,
  Play,
  Send,
  Star,
  Twitter,
  Youtube,
} from 'lucide-react';

interface ElementRendererProps {
  element: BuilderElement;
  deviceView?: DeviceView;
  isEditing?: boolean;
  onSelectElement?: (el: BuilderElement) => void;
  isSelected?: boolean;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  deviceView = 'desktop',
  isEditing = false,
  onSelectElement,
  isSelected = false,
}) => {
  const { t, isRtl, projects, setSelectedProject, submitInquiry } = useCms();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [accordionOpen, setAccordionOpen] = useState<Record<number, boolean>>({});
  const [beforeAfterPos, setBeforeAfterPos] = useState<number>(50);

  // Form local state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectName: '',
    message: '',
  });

  const { type, content, styles, animation } = element;

  // Extract responsive styles
  const resolveResponsive = <T,>(val?: { desktop: T; tablet?: T; mobile?: T }, fallback?: T): T | undefined => {
    if (!val) return fallback;
    if (deviceView === 'mobile' && val.mobile !== undefined) return val.mobile;
    if (deviceView === 'tablet' && val.tablet !== undefined) return val.tablet;
    return val.desktop !== undefined ? val.desktop : fallback;
  };

  const fontSize = resolveResponsive(styles?.fontSize);
  const textAlign = (resolveResponsive(styles?.textAlign, 'left') as string) || 'left';
  const padding: any = resolveResponsive(styles?.padding);
  const margin: any = resolveResponsive(styles?.margin);

  const inlineStyles: React.CSSProperties = {
    fontFamily: isRtl ? 'Cairo, sans-serif' : styles?.fontFamily,
    fontSize: (fontSize as any) || undefined,
    fontWeight: styles?.fontWeight || undefined,
    color: styles?.color || undefined,
    letterSpacing: styles?.letterSpacing || undefined,
    lineHeight: styles?.lineHeight || undefined,
    textAlign: textAlign as any,
    backgroundColor: styles?.backgroundColor || undefined,
    boxShadow: styles?.boxShadow || undefined,
    maxWidth: styles?.maxWidth || undefined,
    paddingTop: padding?.top !== undefined ? `${padding.top}px` : undefined,
    paddingBottom: padding?.bottom !== undefined ? `${padding.bottom}px` : undefined,
    paddingLeft: padding?.left !== undefined ? `${padding.left}px` : undefined,
    paddingRight: padding?.right !== undefined ? `${padding.right}px` : undefined,
    marginTop: margin?.top !== undefined ? `${margin.top}px` : undefined,
    marginBottom: margin?.bottom !== undefined ? `${margin.bottom}px` : undefined,
    marginLeft: margin?.left !== undefined ? `${margin.left}px` : undefined,
    marginRight: margin?.right !== undefined ? `${margin.right}px` : undefined,
    borderWidth: styles?.border?.width || undefined,
    borderStyle: styles?.border?.style !== 'none' ? styles?.border?.style : undefined,
    borderColor: styles?.border?.color || undefined,
    borderRadius: styles?.border?.radius || undefined,
  };

  // Hover effect classes
  const hoverClass =
    animation?.hoverEffect === 'lift'
      ? 'hover:-translate-y-1.5 transition-transform duration-300'
      : animation?.hoverEffect === 'glow'
      ? 'hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] transition-shadow duration-300'
      : animation?.hoverEffect === 'scale'
      ? 'hover:scale-[1.02] transition-transform duration-300'
      : animation?.hoverEffect === 'gold-border'
      ? 'hover:border-[#C5A880] transition-colors duration-300'
      : '';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    submitInquiry({
      formType: 'project-inquiry',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectName: formData.projectName || 'General Advisory',
      message: formData.message,
    });
    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '', projectName: '', message: '' });
  };

  // Render by Element Type
  const renderContent = () => {
    switch (type) {
      case 'heading': {
        const text = t(content.text, 'Add Heading');
        return (
          <h2 style={inlineStyles} className={`tracking-tight font-serif ${hoverClass}`}>
            {text}
          </h2>
        );
      }

      case 'text': {
        const text = t(content.text, 'Add Description');
        return (
          <p style={inlineStyles} className={`leading-relaxed ${hoverClass}`}>
            {text}
          </p>
        );
      }

      case 'rich-text': {
        const text = t(content.html || content.text, '<p>Add Content</p>');
        return (
          <div
            style={inlineStyles}
            className={`prose prose-invert max-w-none ${hoverClass}`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );
      }

      case 'image': {
        const url = content.url || '/src/assets/images/akaber_hero_architecture_1790230991956.jpg';
        const alt = t(content.alt, 'Akaber Real Estate Asset');
        return (
          <div style={inlineStyles} className={`relative overflow-hidden group ${hoverClass}`}>
            <img
              src={url}
              alt={alt}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {content.caption && (
              <p className="mt-2 text-xs text-neutral-400 italic text-center">
                {t(content.caption)}
              </p>
            )}
          </div>
        );
      }

      case 'video': {
        const videoUrl = content.url || '';
        const isEmbed = videoUrl.includes('youtube.com') || videoUrl.includes('vimeo.com');
        return (
          <div style={inlineStyles} className={`relative overflow-hidden aspect-video bg-black/40 rounded-lg ${hoverClass}`}>
            {isEmbed ? (
              <iframe
                src={videoUrl}
                title="Video Showcase"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoUrl ? (
              <video
                src={videoUrl}
                controls={content.controls ?? true}
                autoPlay={content.autoPlay ?? false}
                muted={content.muted ?? true}
                loop={content.loop ?? false}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 bg-neutral-900 border border-neutral-800 p-6 text-center">
                <Play className="w-12 h-12 text-[#C5A880] mb-2" />
                <span className="text-sm font-medium">Add Video URL in Inspector</span>
              </div>
            )}
          </div>
        );
      }

      case 'button': {
        const text = t(content.text, 'Add Content');
        const secondaryText = content.secondaryText ? t(content.secondaryText) : null;
        return (
          <div
            style={inlineStyles}
            className={`flex flex-wrap items-center gap-4 ${
              textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <a
              href={content.url || '#contact'}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3 text-xs tracking-wider uppercase font-semibold text-black bg-[#C5A880] hover:bg-[#D4AF37] transition-all rounded-sm shadow-md ${hoverClass}`}
            >
              <span>{text}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </a>
            {secondaryText && (
              <a
                href={content.secondaryUrl || '#about'}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs tracking-wider uppercase font-medium text-white border border-[#333333] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors rounded-sm"
              >
                <span>{secondaryText}</span>
              </a>
            )}
          </div>
        );
      }

      case 'divider': {
        return (
          <div style={inlineStyles} className="w-full py-4 flex items-center justify-center">
            <div className="w-full border-t border-[#262626]" />
          </div>
        );
      }

      case 'spacer': {
        const height = resolveResponsive(styles?.height, '40px');
        return <div style={{ height }} className="w-full pointer-events-none" />;
      }

      case 'counter': {
        const items = content.items || [
          { label: { en: 'Bespoke Villas', ar: 'فلل فاخرة' }, value: 'Add Value' },
          { label: { en: 'Architectural Standards', ar: 'معايير معمارية' }, value: 'Add Value' },
        ];
        return (
          <div
            style={inlineStyles}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-[#262626]"
          >
            {items.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#C5A880] tracking-tight tabular-nums">
                  {item.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
                  {t(item.label)}
                </span>
              </div>
            ))}
          </div>
        );
      }

      case 'projects-grid': {
        const publishedProjects = projects.filter((p) => p.published);
        const filtered =
          activeCategory === 'all'
            ? publishedProjects
            : publishedProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

        return (
          <div style={inlineStyles} className="w-full space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#262626] pb-4">
              {['all', 'Residential', 'Commercial', 'Masterplan'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    activeCategory === cat
                      ? 'text-[#C5A880] border-b-2 border-[#C5A880]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? (isRtl ? 'جميع المشاريع' : 'All Developments') : cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="group relative bg-[#121212] border border-[#222222] hover:border-[#C5A880]/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                    <img
                      src={proj.mainImage || '/src/assets/images/akaber_hero_architecture_1790230991956.jpg'}
                      alt={t(proj.name)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#C5A880] font-medium border border-[#333333]">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{t(proj.location)}</span>
                        <span>·</span>
                        <span>{proj.category}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-white group-hover:text-[#C5A880] transition-colors">
                        {t(proj.name)}
                      </h3>
                      <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                        {t(proj.shortDesc)}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#222222] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#C5A880]">{proj.specs.area}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-300 group-hover:text-[#C5A880] transition-colors">
                        <span>{isRtl ? 'عرض التفاصيل' : 'View Dossier'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'before-after': {
        const beforeImg = content.beforeImage || '/src/assets/images/akaber_project_facade_1790231002730.jpg';
        const afterImg = content.afterImage || '/src/assets/images/akaber_hero_architecture_1790230991956.jpg';
        return (
          <div style={inlineStyles} className="w-full max-w-4xl mx-auto space-y-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-[#262626] select-none">
              <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" />
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${beforeAfterPos}%` }}
              >
                <img
                  src={beforeImg}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div
                className="absolute inset-y-0 w-0.5 bg-[#C5A880] cursor-ew-resize"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#C5A880] flex items-center justify-center text-xs text-[#C5A880] shadow-lg">
                  ↔
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={beforeAfterPos}
              onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
              className="w-full accent-[#C5A880]"
            />
            <div className="flex justify-between text-xs text-neutral-400">
              <span>{isRtl ? 'المخطط الأولي' : 'Architectural Blueprint'}</span>
              <span>{isRtl ? 'المشروع المنفذ' : 'Built Landmark'}</span>
            </div>
          </div>
        );
      }

      case 'inquiry-form':
      case 'contact-form': {
        return (
          <div style={inlineStyles} className="w-full">
            {formSubmitted ? (
              <div className="p-8 text-center bg-[#181818] border border-[#C5A880]/30 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#C5A880]/10 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-semibold text-white">
                  {isRtl ? 'تم استلام طلبكم بنجاح' : 'Advisory Request Received'}
                </h4>
                <p className="mt-2 text-xs text-neutral-400 max-w-sm mx-auto">
                  {isRtl
                    ? 'سيقوم مستشار التطوير العقاري بالتواصل معكم بسرية تامة.'
                    : 'Our private client executive will connect with you under strict discretion.'}
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-5 text-xs text-[#C5A880] underline hover:text-white"
                >
                  {isRtl ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      {isRtl ? 'الاسم الكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'أدخل الاسم' : 'Enter your name'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#282828] focus:border-[#C5A880] rounded text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      {isRtl ? 'البريد الإلكتروني' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={isRtl ? 'example@domain.sa' : 'name@company.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#282828] focus:border-[#C5A880] rounded text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      {isRtl ? 'رقم الهاتف' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+966 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#282828] focus:border-[#C5A880] rounded text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      {isRtl ? 'المشروع المستهدف' : 'Project of Interest'}
                    </label>
                    <select
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#282828] focus:border-[#C5A880] rounded text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="">{isRtl ? 'استفسار عام عن المشاريع' : 'General Development Inquiries'}</option>
                      {projects.map((p) => (
                        <option key={p.id} value={t(p.name)}>
                          {t(p.name)} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    {isRtl ? 'الرسالة أو متطلبات الاستثمار' : 'Message / Investment Criteria'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Provide details regarding your acquisition or development requirements...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#282828] focus:border-[#C5A880] rounded text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRtl ? 'إرسال طلب الاستشارة' : 'Submit Private Advisory Request'}</span>
                </button>
              </form>
            )}
          </div>
        );
      }

      case 'faq':
      case 'accordion': {
        const items = content.items || [
          {
            question: { en: 'What defines the Akaber development process?', ar: 'ما الذي يميز منهجية تطوير أكابر؟' },
            answer: {
              en: 'We harmonize uncompromising architectural precision, sustainable materials, and prime strategic locations.',
              ar: 'نجمع بين الدقة المعمارية التي لا تهاود، المواد المستدامة، والمواقع الاستراتيجية الرائدة.',
            },
          },
          {
            question: { en: 'How are client acquisitions managed?', ar: 'كيف تتم إدارة صفقات الاستحواذ والتطوير؟' },
            answer: {
              en: 'Every acquisition is managed through our private client advisory team with complete confidentiality.',
              ar: 'تدار جميع عمليات الاستحواذ عبر فريق استشارات العملاء المتميز بسرية وشفافية مطلقة.',
            },
          },
        ];

        return (
          <div style={inlineStyles} className="w-full space-y-3">
            {items.map((item: any, idx: number) => {
              const isOpen = accordionOpen[idx] || false;
              return (
                <div
                  key={idx}
                  className="border border-[#222222] bg-[#121212] rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setAccordionOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-medium text-white hover:text-[#C5A880] transition-colors"
                  >
                    <span>{t(item.question)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A880] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-[#1C1C1C] pt-3">
                      {t(item.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      case 'testimonials': {
        const items = content.items || [
          {
            name: { en: 'Add Client Name', ar: 'أضف اسم العميل' },
            role: { en: 'Add Title / Organization', ar: 'أضف المنصب / المؤسسة' },
            quote: {
              en: 'Add Description - Client advisory and testimonial remarks can be customized here.',
              ar: 'أضف الوصف - يمكن تخصيص آراء واستشارات العميل هنا.',
            },
            rating: 5,
          },
        ];

        return (
          <div style={inlineStyles} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-6 bg-[#131313] border border-[#262626] rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-[#C5A880] mb-3">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic leading-relaxed">
                    "{t(item.quote)}"
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#222222]">
                  <h4 className="text-xs font-semibold text-white">{t(item.name)}</h4>
                  <p className="text-[11px] text-neutral-400">{t(item.role)}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }

      case 'html-embed': {
        return (
          <div
            style={inlineStyles}
            dangerouslySetInnerHTML={{ __html: content.html || '<!-- Add HTML Embed -->' }}
          />
        );
      }

      default:
        return (
          <div style={inlineStyles} className="p-4 border border-dashed border-neutral-700 rounded text-center text-xs text-neutral-400">
            Element: {type}
          </div>
        );
    }
  };

  // If in edit mode, wrap with selectable boundary
  if (isEditing) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement?.(element);
        }}
        className={`relative group transition-all duration-150 ${
          isSelected
            ? 'outline-2 outline-[#C5A880] bg-[#C5A880]/5'
            : 'hover:outline-1 hover:outline-dashed hover:outline-neutral-500'
        }`}
      >
        {isSelected && (
          <div className="absolute -top-6 left-0 bg-[#C5A880] text-black text-[10px] font-bold px-2 py-0.5 rounded-t uppercase tracking-wider flex items-center gap-1 z-30 pointer-events-none">
            <span>{type}</span>
          </div>
        )}
        {renderContent()}
      </div>
    );
  }

  return renderContent();
};
