import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useSchoolData } from '../../hooks/useSchoolData';
import { toBengaliNumber, getTodayBengaliDate } from '../../utils/bengaliUtils';
import { Phone, Mail, UserCheck, Shield, BookOpen } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { institution, settings } = useSchoolData();
  const { navigate } = useRouter();

  return (
    <header className="bg-white border-b border-emerald-100">
      {/* Top micro-bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3 divide-x divide-emerald-700">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {getTodayBengaliDate()}
            </span>
            <span className="pl-3 hidden md:inline-flex items-center gap-1">
              ইআইআইএন (EIIN): <strong className="font-english tracking-wider text-emerald-200">{toBengaliNumber(institution.eiin)}</strong>
            </span>
            <span className="pl-3 hidden lg:inline-flex items-center gap-1">
              এমপিও কোড: <strong className="font-english text-emerald-200">{toBengaliNumber(institution.mpoCode)}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${institution.phone}`}
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{toBengaliNumber(institution.phone)}</span>
            </a>
            <span className="text-emerald-700">|</span>
            <button
              onClick={() => navigate('/teacher/portal')}
              className="flex items-center gap-1 text-emerald-200 hover:text-white bg-emerald-800/80 hover:bg-emerald-800 px-2 py-0.5 rounded transition cursor-pointer"
            >
              <UserCheck className="w-3 h-3" />
              <span>শিক্ষক পোর্টাল</span>
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-2.5 py-0.5 rounded transition cursor-pointer shadow-xs"
            >
              <Shield className="w-3 h-3" />
              <span>অ্যাডমিন প্যানেল</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Monogram Header */}
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & School Name */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3.5 cursor-pointer group text-center md:text-left"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md border-2 border-emerald-600 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
              <div className="flex flex-col items-center justify-center p-1 text-center">
                <BookOpen className="w-8 h-8 text-emerald-300 mb-0.5" />
                <span className="text-[9px] font-bold tracking-tight text-emerald-100">স্থাপিত: {toBengaliNumber('1984')}</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-tiro tracking-tight group-hover:text-emerald-700 transition-colors">
                {institution.nameBn}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-slate-600 font-english uppercase tracking-wider">
                {institution.nameEn}
              </p>
              <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-0.5">
                ডাকঘর: {institution.postOffice}, উপজেলা: {institution.upazila}, জেলা: {institution.district}
              </p>
            </div>
          </div>

          {/* National & Educational Emblems Badge */}
          <div className="hidden lg:flex items-center gap-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
            <div className="text-right">
              <span className="block text-[11px] font-semibold text-emerald-900">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত</span>
              <span className="block text-xs text-slate-600 font-medium">কুমিল্লা শিক্ষা বোর্ড অধিভুক্ত</span>
              <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                স্বীকৃতি স্তর: {institution.recognitionLevel}
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              Govt.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
