import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown, ArrowRight, CheckCircle2, Phone, Mail, Send } from 'lucide-react';

interface AkmalikContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  initialMode?: 'buy' | 'sell' | 'general';
}

export const AkmalikContactDrawer: React.FC<AkmalikContactDrawerProps> = ({
  isOpen,
  onClose,
  onToggle,
  initialMode = 'general',
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>(
    initialMode === 'sell' ? 'sell' : 'buy'
  );
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    regionOrDept: '',
    budgetOrTurnover: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      // auto reset after 4s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          regionOrDept: '',
          budgetOrTurnover: '',
          notes: '',
        });
      }, 3500);
    }, 500);
  };

  return (
    <>
      {/* Pinned Bottom Sticky Widget Bar (Always visible) */}
      <div className="fixed bottom-4 right-4 sm:right-8 z-40">
        <button
          type="button"
          onClick={onToggle}
          className="btn-bounce flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 rounded-full bg-[#09543D] text-[#FFFDF7] shadow-2xl border-2 border-white/20 hover:bg-[#04261C] transition-all group"
        >
          {/* Hand Icon */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="/images/akmalik/hands-shaka.svg"
              alt="Shaka hand"
              className="w-6 h-6 filter invert object-contain"
            />
          </div>

          <div className="text-left">
            <span className="block text-[10px] sm:text-xs text-white/70 uppercase tracking-wider font-semibold">
              So about your project,
            </span>
            <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#FFA9E9]">
              Shall we talk?
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-[#FFA9E9] text-[#09543D] flex items-center justify-center shrink-0 transition-transform duration-300">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>
      </div>

      {/* Expanded Modal / Popin Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-xl bg-[#FFFDF7] rounded-t-[2rem] sm:rounded-3xl shadow-2xl border border-[#09543D]/20 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Popin Header */}
            <div className="bg-[#09543D] text-[#FFFDF7] p-5 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <img
                    src="/images/akmalik/hands-shaka.svg"
                    alt="Hand"
                    className="w-5 h-5 filter invert"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                    Let's Talk About Your Pharmacy Project
                  </h3>
                  <p className="text-xs text-white/70">
                    Free, confidential response from an advisor within 24h
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#E6F5EF] text-[#09543D] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-[#09543D]">
                    Thank You, {formData.fullName}!
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Your request has been routed to our regional lead advisor. We will contact you confidentially via phone or email within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  {/* Two Main Choice Cards (Buyer / Seller) */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('buy')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        activeTab === 'buy'
                          ? 'bg-[#09543D] text-[#FFFDF7] border-[#09543D] shadow-sm'
                          : 'bg-[#F8F6F0] text-neutral-800 border-neutral-200 hover:border-[#09543D]'
                      }`}
                    >
                      <span className="block text-[11px] opacity-75 font-semibold">I wish to</span>
                      <span className="block text-sm font-extrabold uppercase tracking-wide">
                        Buy a Pharmacy
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('sell')}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        activeTab === 'sell'
                          ? 'bg-[#461E10] text-[#FFFDF7] border-[#461E10] shadow-sm'
                          : 'bg-[#F8F6F0] text-neutral-800 border-neutral-200 hover:border-[#461E10]'
                      }`}
                    >
                      <span className="block text-[11px] opacity-75 font-semibold">I wish to</span>
                      <span className="block text-sm font-extrabold uppercase tracking-wide">
                        Sell My Pharmacy
                      </span>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="Dr. Jean Dupont"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+33 6 12 34 56 78"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="jean.dupont@pharmacie.fr"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          Department / Region
                        </label>
                        <input
                          type="text"
                          value={formData.regionOrDept}
                          onChange={(e) =>
                            setFormData({ ...formData, regionOrDept: e.target.value })
                          }
                          placeholder="e.g. 06, 69, or Côte d'Azur"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          {activeTab === 'buy' ? 'Target Budget / Equity' : 'Estimated Turnover (CA)'}
                        </label>
                        <input
                          type="text"
                          value={formData.budgetOrTurnover}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              budgetOrTurnover: e.target.value,
                            })
                          }
                          placeholder="e.g. €2.5M or €300k equity"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Tell us more about your timeline & wishes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Project stage, location preferences, timeframe..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-bounce py-3.5 rounded-xl bg-[#09543D] hover:bg-[#04261C] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Confidential Request</span>
                    </button>

                    <p className="text-[11px] text-neutral-400 text-center">
                      🔒 Strictly confidential. Your information is protected under professional non-disclosure agreements.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
