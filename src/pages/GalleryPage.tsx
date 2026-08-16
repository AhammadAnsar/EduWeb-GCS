import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Eye,
  ChevronRight,
  Filter
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useSchoolData();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['all', 'ক্যাম্পাস', 'সহশিক্ষা', 'পুরস্কার', 'জাতীয় দিবস', 'ল্যাবরেটরি'];

  const filtered = gallery.filter((item) => {
    return selectedCat === 'all' || item.category === selectedCat;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            ফটো ও ভিডিও অ্যালবাম
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
            বিদ্যালয় ক্যাম্পাস ও কার্যক্রমের চিত্রশালা
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            শিক্ষা, ক্রীড়া, সাংস্কৃতিক ও প্রাতিষ্ঠানিক বিভিন্ন উৎসবের আলোকচিত্র
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCat === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'সকল ছবি' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-700 font-tiro">
                  {item.title}
                </h3>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{toBengaliNumber(item.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <QuickInfoSidebar />
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 text-white">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">{activeItem.category}</span>
              <button
                onClick={() => setActiveItem(null)}
                className="text-white/80 hover:text-white font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activeItem.mediaUrl}
                alt={activeItem.title}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-slate-900">
              <h3 className="font-bold text-base font-tiro text-white">{activeItem.title}</h3>
              {activeItem.description && (
                <p className="text-xs text-slate-300 mt-1">{activeItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
