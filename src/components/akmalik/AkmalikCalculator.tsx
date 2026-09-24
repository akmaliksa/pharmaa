import React, { useState, useMemo } from 'react';
import { Calculator, Euro, TrendingUp, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface AkmalikCalculatorProps {
  onOpenConsultation: () => void;
}

export const AkmalikCalculator: React.FC<AkmalikCalculatorProps> = ({
  onOpenConsultation,
}) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(2200000);
  const [equityPercent, setEquityPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(12);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [estimatedEbitdaPercent, setEstimatedEbitdaPercent] = useState<number>(14);

  // Calculations
  const equityAmount = useMemo(() => {
    return (purchasePrice * equityPercent) / 100;
  }, [purchasePrice, equityPercent]);

  const loanAmount = useMemo(() => {
    return purchasePrice - equityAmount;
  }, [purchasePrice, equityAmount]);

  const monthlyPayment = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanYears * 12;
    if (monthlyRate === 0) return loanAmount / numPayments;
    return (
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  }, [loanAmount, interestRate, loanYears]);

  const annualDebtService = monthlyPayment * 12;
  const estimatedEbitda = (purchasePrice * estimatedEbitdaPercent) / 100;
  const netResidualCashflow = Math.max(0, estimatedEbitda - annualDebtService);

  const formatEuro = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#F8F6F0] border-t border-[#09543D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#09543D] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
            Pharmacy Loan & ROI Simulator
          </h2>
          <p className="text-base text-neutral-600 font-normal leading-relaxed">
            Estimate your monthly repayments, required equity injection (apport personnel), and annual post-debt cash flow.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFDF7] rounded-3xl p-6 sm:p-9 border border-[#09543D]/15 shadow-sm space-y-6">
            
            {/* Purchase Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#1E1E1E]">
                  Target Purchase Price / Business Asset Value
                </label>
                <span className="text-base font-extrabold text-[#09543D]">
                  {formatEuro(purchasePrice)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="6000000"
                step="50000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full accent-[#09543D] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>€500k</span>
                <span>€3.0M</span>
                <span>€6.0M</span>
              </div>
            </div>

            {/* Equity Contribution (Apport) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#1E1E1E]">
                  Personal Equity Contribution (Apport)
                </label>
                <span className="text-base font-extrabold text-[#09543D]">
                  {equityPercent}% ({formatEuro(equityAmount)})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={equityPercent}
                onChange={(e) => setEquityPercent(Number(e.target.value))}
                className="w-full accent-[#09543D] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>10% (Minimum)</span>
                <span>20% (Standard)</span>
                <span>40% (Comfortable)</span>
              </div>
            </div>

            {/* Grid of Duration & Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                  Loan Duration (Years)
                </label>
                <select
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm font-semibold text-[#1E1E1E] focus:outline-none focus:border-[#09543D]"
                >
                  <option value={7}>7 Years (84 months)</option>
                  <option value={10}>10 Years (120 months)</option>
                  <option value={12}>12 Years (144 months - Standard)</option>
                  <option value={15}>15 Years (180 months)</option>
                </select>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                  Estimated Bank Interest Rate (%)
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm font-semibold text-[#1E1E1E] focus:outline-none focus:border-[#09543D]"
                >
                  <option value={2.8}>2.8% (Prime Tier-1)</option>
                  <option value={3.2}>3.2% (Very Good)</option>
                  <option value={3.5}>3.5% (Average 2026)</option>
                  <option value={4.0}>4.0% (Conservative)</option>
                </select>
              </div>
            </div>

            {/* Note */}
            <div className="p-4 rounded-xl bg-[#E6F5EF]/60 border border-[#09543D]/10 flex items-start gap-3 text-xs text-[#09543D] leading-relaxed">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#09543D]" />
              <span>
                <strong>akmalik Advisory Tip:</strong> French healthcare lenders (Interfimo, BPI, BNP, LCL) typically demand 15% to 20% equity for first-time pharmacy acquisitions. We assist in structuring subordinated loans (prêt d'honneur) to complete your equity.
              </span>
            </div>

          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#09543D] text-[#FFFDF7] rounded-3xl p-6 sm:p-9 shadow-xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[#FFA9E9] text-xs font-bold uppercase tracking-wider">
              Financing Synthesis
            </span>

            {/* Big Monthly Repayment Card */}
            <div className="p-5 rounded-2xl bg-[#04261C] border border-white/10 space-y-1">
              <span className="text-xs uppercase font-medium tracking-wider text-white/70">
                Estimated Monthly Loan Payment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#FFA9E9] tracking-tight">
                {formatEuro(monthlyPayment)}
                <span className="text-xs font-normal text-white/70"> / month</span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/75">Principal Loan Required:</span>
                <span className="font-bold text-white">{formatEuro(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/75">Cash Equity Contribution:</span>
                <span className="font-bold text-[#FFA9E9]">{formatEuro(equityAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/75">Annual Total Debt Service:</span>
                <span className="font-bold text-white">{formatEuro(annualDebtService)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/75">Est. Annual EBITDA Capacity:</span>
                <span className="font-bold text-white">{formatEuro(estimatedEbitda)}</span>
              </div>
              <div className="flex justify-between py-2 bg-white/10 px-3 rounded-lg">
                <span className="font-bold text-white">Estimated Net Free Cash Flow:</span>
                <span className="font-extrabold text-[#FFA9E9]">
                  {formatEuro(netResidualCashflow)} / yr
                </span>
              </div>
            </div>

            {/* CTA in box */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full btn-bounce py-3.5 px-6 rounded-full bg-[#FFA9E9] hover:bg-white text-[#09543D] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Validate with a Bank Specialist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
