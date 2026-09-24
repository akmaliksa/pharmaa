import React, { useState } from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface AkmalikAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AkmalikAlertModal: React.FC<AkmalikAlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetRegions: '',
    minTurnover: '€1,500,000',
    maxTurnover: '€3,500,000',
    preferredLocation: 'Seaside / Coastal',
    maxEquity: '€300,000',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDF7] rounded-3xl shadow-2xl border border-[#09543D]/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#09543D] text-[#FFFDF7] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FFA9E9]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Off-Market Pharmacy Alert
              </h3>
              <p className="text-xs text-white/70">
                Be notified of confidential listings before they hit the open market
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E6F5EF] text-[#09543D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-[#09543D]">
                Alert Successfully Created!
              </h4>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you, Dr. {formData.name}. As soon as a matching pharmacy dossier enters our discrete pipeline, you will receive an advance notification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Dr. Thomas Martin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="thomas@pharmacie.fr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+33 6 00 00 00 00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Target Departments / Regions
                  </label>
                  <input
                    type="text"
                    value={formData.targetRegions}
                    onChange={(e) =>
                      setFormData({ ...formData, targetRegions: e.target.value })
                    }
                    placeholder="e.g. 06, 83, 69, or Paris"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Preferred Location Type
                  </label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredLocation: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#09543D]"
                  >
                    <option value="Any Location">Any Location</option>
                    <option value="Seaside / Coastal">Seaside / Coastal</option>
                    <option value="City Center / Dynamic">City Center / Dynamic</option>
                    <option value="Town / Borough">Town / Borough</option>
                    <option value="Mountain / Ski Resort">Mountain / Ski Resort</option>
                    <option value="Rural / Monopoly">Rural / Monopoly</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-bounce py-3.5 rounded-xl bg-[#09543D] hover:bg-[#04261C] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Activate Off-Market Alert</span>
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
