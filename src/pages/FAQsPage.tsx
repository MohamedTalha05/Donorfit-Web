import React, { useState } from 'react';
import { useModal } from '../context/ModalContext.tsx';
import { useT, useTx, normalizeForSearch } from '../i18n/index.tsx';

const CATEGORY_KEYS = ['all', 'general', 'security', 'payments', 'implementation', 'pricing'] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];

interface FAQEntry {
  question: string;
  answer: string;
  /** Translated display label */
  category: string;
  /** Stable, language-neutral key used for filtering */
  categoryKey: Exclude<CategoryKey, 'all'>;
}
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageSquare } from 'lucide-react';

export default function FAQsPage() {
  const { openBookDemo, navigateTo } = useModal();
  const t = useT('faqs');
  const tx = useTx('faqs');
  const faqs = tx<FAQEntry[]>('items') ?? [];
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = CATEGORY_KEYS;

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.categoryKey === selectedCategory;
    const matchesSearch = 
      normalizeForSearch(faq.question).includes(normalizeForSearch(searchQuery)) ||
      normalizeForSearch(faq.answer).includes(normalizeForSearch(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-24 sm:space-y-32 lg:space-y-36 pb-24">
      
      {/* Hero */}
      <section className="pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('page.kicker')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
            {t('page.title')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            {t('page.intro')}
          </p>
        </div>

        {/* Filter & Search */}
        <div className="pt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>

          <div className="relative min-w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('page.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden bg-white"
            />
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-sm bg-white rounded-2xl border border-neutral-200">
            {t('page.empty')}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="rounded-xl border border-neutral-200/90 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-neutral-900 font-display flex items-center justify-between gap-4 hover:bg-neutral-50/50 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      <div className="text-[11px] tabular-nums text-emerald-700 font-semibold mb-2 uppercase tracking-wider">
                        {t('page.categoryLabel', { category: faq.category })}
                      </div>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 p-8 rounded-2xl bg-neutral-100 border border-neutral-200 text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-neutral-900 font-display">{t('page.cta.title')}</h3>
          <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
            {t('page.cta.text')}
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t('page.cta.button')}
          </button>
        </div>
      </section>

    </div>
  );
}
