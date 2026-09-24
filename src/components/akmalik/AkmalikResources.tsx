import React, { useState } from 'react';
import { ARTICLES } from '../../data/akmalikData';
import { ArticleItem } from '../../types/akmalik';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

interface AkmalikResourcesProps {
  onSelectArticle: (article: ArticleItem) => void;
  onOpenNewsletter: () => void;
}

export const AkmalikResources: React.FC<AkmalikResourcesProps> = ({
  onSelectArticle,
  onOpenNewsletter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Finance', 'Legal', 'Practice', 'Entrepreneurship'];

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <section id="resources" className="py-16 sm:py-24 bg-[#F8F6F0] border-t border-[#09543D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F5EF] text-[#09543D] text-xs font-bold uppercase tracking-wider">
              <span>Let the Care Shine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] tracking-tight">
              A Community of <span className="text-[#09543D]">Pharmacy Leaders</span>
            </h2>
            <p className="text-base text-neutral-600 font-normal leading-relaxed">
              We share field-tested insights and regulatory breakdowns because you deserve to know more, much earlier, to make the right moves.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#09543D] text-[#FFFDF7] shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-300 hover:border-[#09543D]'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="cursor-pointer group rounded-3xl bg-white border border-[#09543D]/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image & Category */}
              <div className="relative h-48 overflow-hidden bg-neutral-900">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#09543D] text-[#FFFDF7] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-medium">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#1E1E1E] group-hover:text-[#09543D] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#09543D]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
