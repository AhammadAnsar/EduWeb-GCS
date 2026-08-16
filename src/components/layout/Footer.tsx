import React from 'react';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useRouter } from '../../context/RouterContext';
import { toBengaliNumber } from '../../utils/bengaliUtils';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Heart,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { institution } = useSchoolData();
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm mt-12 border-t-4 border-emerald-600 no-print">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: School Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg font-tiro border-b border-slate-700 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {institution.nameBn}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-english">
              {institution.nameEn}
            </p>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>গ্রাম: {institution.village}, ইউনিয়ন: {institution.union}, ডাকঘর: {institution.postOffice}, উপজেলা: {institution.upazila}, জেলা: {institution.district}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toBengaliNumber(institution.phone)}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-english">{institution.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-english">{institution.website}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base font-tiro border-b border-slate-700 pb-2">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  প্রতিষ্ঠান পরিচিতি ও ইতিহাস
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/committee')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  বর্তমান ও সাবেক পরিচালনা পরিষদ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/teachers')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  শিক্ষক ও কর্মচারী ডিরেক্টরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/students/overview')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  শ্রেণিভিত্তিক শিক্ষার্থী পরিসংখ্যান
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/results')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  পাবলিক পরীক্ষার ফলাফল
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/routine')}
                  className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  ক্লাস রুটিন ও ক্যালেন্ডার
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Identifiers */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base font-tiro border-b border-slate-700 pb-2">
              প্রাতিষ্ঠানিক সনাক্তকরণ
            </h3>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-2">
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">ইআইআইএন (EIIN):</span>
                <span className="font-bold text-emerald-400 font-english">{toBengaliNumber(institution.eiin)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">এমপিও কোড:</span>
                <span className="font-bold text-emerald-400 font-english">{toBengaliNumber(institution.mpoCode)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">প্রতিষ্ঠার তারিখ:</span>
                <span className="font-medium text-slate-200">{toBengaliNumber(institution.estDate)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">স্বীকৃতি মেয়াদ:</span>
                <span className="font-medium text-amber-400">{toBengaliNumber(institution.lastRecognitionExpiry)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">শিক্ষা বোর্ড:</span>
                <span className="font-medium text-slate-200">কুমিল্লা</span>
              </div>
            </div>
          </div>

          {/* Column 4: System Architecture & Free School CMS */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base font-tiro border-b border-slate-700 pb-2">
              সফটডোজ এডুওয়েব জিসিএস
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              দেশের অনগ্রসর ও গ্রাম্য শিক্ষাপ্রতিষ্ঠানসমূহের জন্য আজীবন জিরো-হোস্টিং খরচে পরিচালিত স্বয়ংসম্পূর্ণ স্কুল ম্যানেজমেন্ট ও ডায়নামিক সিএমএস ওয়েবসাইট।
            </p>
            <div className="bg-emerald-950/80 border border-emerald-800 p-2.5 rounded-lg text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Govt. Standard Compliance</span>
              </div>
              <p className="text-[11px] text-emerald-200">
                শিক্ষা মন্ত্রণালয় ও ব্যানবেইস নির্দেশিত ডাটাবেজ স্ট্রাকচার অনুযায়ী তৈরিকৃত।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-slate-950 text-slate-500 text-xs py-4 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p>
            © {toBengaliNumber(new Date().getFullYear())} {institution.nameBn}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="flex items-center justify-center gap-1 text-slate-400">
            কারিগরি সহায়তায়: <span className="font-bold text-emerald-400 font-english">SoftDows EduWeb GCS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
