import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import { FileText, Printer, Calendar, ShieldCheck } from 'lucide-react';

interface Props {
  slug: string;
}

export const CustomDynamicPage: React.FC<Props> = ({ slug }) => {
  const { customPages, institution } = useSchoolData();

  const page = customPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-12 rounded-xl shadow-xs border border-slate-200 text-center space-y-4">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800 font-tiro">পৃষ্ঠাটি পাওয়া যায়নি (404)</h2>
          <p className="text-xs text-slate-500">অনুরোধকৃত পাতাটি এখনও তৈরি করা হয়নি অথবা সরিয়ে নেওয়া হয়েছে।</p>
        </div>
        <div className="lg:col-span-1">
          <QuickInfoSidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              নাগরিক সেবা ও তথ্য
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              {page.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>সর্বশেষ হালনাগাদ: {toBengaliNumber(page.updatedAt)}</span>
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

        {/* Content Box */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
          <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line text-justify font-normal">
            {page.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              {institution.nameBn} কর্তৃক অনুমোদিত
            </span>
            <span>EIIN: {toBengaliNumber(institution.eiin)}</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <QuickInfoSidebar />
      </div>
    </div>
  );
};
