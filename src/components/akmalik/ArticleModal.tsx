import React from 'react';
import { ArticleItem } from '../../types/akmalik';
import { X, Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#FFFDF7] rounded-3xl shadow-2xl border border-[#09543D]/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-60 sm:h-72 bg-neutral-900 shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#09543D] text-[#FFFDF7] text-[10px] font-extrabold uppercase tracking-wider">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/80">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-[#1E1E1E]">
          <p className="text-base sm:text-lg font-medium text-neutral-800 leading-relaxed italic border-l-4 border-[#09543D] pl-4">
            {article.excerpt}
          </p>

          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#09543D] hover:text-[#04261C]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Knowledge Hub</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
