import React, { useState } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface AkmalikValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AkmalikValuationModal: React.FC<AkmalikValuationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    department: '',
    approxTurnover: '1.5M - 2.5M €',
    approxEbitda: '12% - 15%',
    staffCount: '3 - 5',
    timeline: '6 to 12 months',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.email || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FFFDF7] rounded-3xl shadow-2xl border border-[#09543D]/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#461E10] text-[#FFFDF7] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FFA9E9]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Confidential 48h Pharmacy Valuation
              </h3>
              <p className="text-xs text-white/70">
                100% Free, multi-criteria assessment backed by local transaction benchmarks
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E6F5EF] text-[#09543D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-[#09543D]">
                Valuation Request Received!
              </h4>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you, Dr. {formData.ownerName}. Your dedicated regional director will contact you directly within 48 hours with a discrete preliminary valuation report.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#E6F5EF]/60 border border-[#09543D]/10 flex items-start gap-2.5 text-xs text-[#09543D]">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#09543D]" />
                <span>
                  <strong>Strict Privacy Guarantee:</strong> No public listings are made. Your staff, customers, and suppliers will never know you are exploring a sale.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Titular Pharmacist Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    placeholder="Dr. Sophie Bernard"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+33 6 98 76 54 32"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Private Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="sophie.bernard@perso.fr"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Pharmacy Department / City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="e.g. 69002 Lyon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Annual Turnover (CA HT)
                  </label>
                  <select
                    value={formData.approxTurnover}
                    onChange={(e) =>
                      setFormData({ ...formData, approxTurnover: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  >
                    <option value="Under 1.2M €">Under 1.2M €</option>
                    <option value="1.2M - 1.8M €">1.2M - 1.8M €</option>
                    <option value="1.8M - 2.8M €">1.8M - 2.8M €</option>
                    <option value="2.8M - 4.5M €">2.8M - 4.5M €</option>
                    <option value="Above 4.5M €">Above 4.5M €</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Expected Transfer Timeframe
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                >
                  <option value="Immediate (1 to 3 months)">Immediate (1 to 3 months)</option>
                  <option value="Within 6 to 12 months">Within 6 to 12 months</option>
                  <option value="Within 1 to 2 years">Within 1 to 2 years (Retirement prep)</option>
                  <option value="Just curious / exploratory">Just curious / exploratory benchmark</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-bounce py-3.5 rounded-xl bg-[#461E10] hover:bg-[#1C0C07] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Free Confidential Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
