import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import { Notice } from '../types';
import {
  Bell,
  Search,
  Calendar,
  Download,
  FileText,
  Pin,
  Clock,
  Printer
} from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { notices, institution } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const categories = ['all', 'ভর্তি', 'পরীক্ষা', 'ছুটি', 'একাডেমিক', 'প্রশাসনিক'];

  const filteredNotices = notices.filter((n) => {
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.description && n.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              নোটিশ বোর্ড
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              সকল নোটিশ ও বিজ্ঞপ্তি
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              ভর্তি, পরীক্ষা, ছুটি ও প্রশাসনিক গুরুত্বপূর্ণ নির্দেশনাসমূহ
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="no-print bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3 no-print">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'সকল নোটিশ' : cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="নোটিশের শিরোনাম বা বিষয়বস্তু দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-3">
          {filteredNotices.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-xl border border-slate-200 text-slate-400">
              কোনো নোটিশ পাওয়া যায়নি
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-white rounded-xl shadow-xs border transition-all p-5 hover:border-emerald-500 ${
                  notice.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded flex items-center gap-1">
                        <Pin className="w-3 h-3 text-amber-700" />
                        জরুরি নোটিশ
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>প্রকাশের তারিখ: {toBengaliNumber(notice.publishDate)}</span>
                  </div>
                </div>

                <h3
                  onClick={() => setSelectedNotice(notice)}
                  className="text-base font-bold text-slate-900 hover:text-emerald-700 font-tiro cursor-pointer mb-2"
                >
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                  {notice.description || 'নোটিশের বিস্তারিত দেখতে সম্পূর্ণ নোটিশ বাটনে ক্লিক করুন।'}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    আদেশক্রমে: {institution.headmasterName || 'প্রধান শিক্ষক'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>সম্পূর্ণ নোটিশ</span>
                    </button>
                    {notice.fileUrl && (
                      <a
                        href={notice.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <QuickInfoSidebar />
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider">প্রাতিষ্ঠানিক নোটিশ বিবরণী</span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-white/80 hover:text-white font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedNotice.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-tiro mt-2">
                  {selectedNotice.title}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>প্রকাশের তারিখ: {toBengaliNumber(selectedNotice.publishDate)}</span>
                </div>
              </div>

              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedNotice.description || selectedNotice.title}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-600">
                <span>আদেশক্রমে: <strong className="text-slate-900">{institution.headmasterName || 'প্রধান শিক্ষক'}</strong></span>
                <div className="flex items-center gap-2 no-print">
                  <button
                    onClick={() => window.print()}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>প্রিন্ট</span>
                  </button>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
