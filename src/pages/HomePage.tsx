import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Bell,
  Calendar,
  FileText,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Download
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { institution, currentCommittee, activeTeachers, studentClassOverviews, notices, publicExamResults, gallery } = useSchoolData();
  const { navigate } = useRouter();

  // Compute stats
  const totalStudents = studentClassOverviews.reduce((acc, curr) => acc + curr.totalCount, 0);
  const totalBoys = studentClassOverviews.reduce((acc, curr) => acc + curr.maleCount, 0);
  const totalGirls = studentClassOverviews.reduce((acc, curr) => acc + curr.femaleCount, 0);
  const totalStipend = studentClassOverviews.reduce((acc, curr) => acc + (curr.maleStipend + curr.femaleStipend), 0);
  const latestPublicResult = publicExamResults[0];

  return (
    <div className="space-y-8">
      {/* 1. Hero Banner & Carousel Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-lg border border-emerald-800/30 bg-slate-900 text-white">
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full">
          <img
            src={institution.heroBannerUrl}
            alt={institution.nameBn}
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="max-w-3xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center gap-2 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>প্রতিষ্ঠিত ১৯৮৪ খ্রিঃ • মাধ্যমিক স্তরের শ্রেষ্ঠ বিদ্যাপীঠ</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-tiro text-white drop-shadow-md">
                স্বাগত জানাই {institution.nameBn}-এ
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 leading-relaxed">
                কুমিল্লা জেলার নাঙ্গলকোট উপজেলার বক্সগঞ্জ ইউনিয়নের ঐতিহ্যবাহী আজিয়ারা গ্রামে অবস্থিত একটি আদর্শ ও আধুনিক শিক্ষাপ্রতিষ্ঠান।
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => navigate('/about')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>প্রতিষ্ঠান পরিচিতি</span>
                </button>
                <button
                  onClick={() => navigate('/students/list')}
                  className="bg-white/90 hover:bg-white text-slate-900 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-800" />
                  <span>শিক্ষার্থী ডিরেক্টরি</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Statistics Highlights Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-emerald-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-english">
              {toBengaliNumber(totalStudents)} জন
            </div>
            <div className="text-xs text-slate-500 font-medium">
              মোট শিক্ষার্থী (ছাত্র: {toBengaliNumber(totalBoys)}, ছাত্রী: {toBengaliNumber(totalGirls)})
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-blue-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-english">
              {toBengaliNumber(activeTeachers.length)} জন
            </div>
            <div className="text-xs text-slate-500 font-medium">
              কর্মরত শিক্ষক ও কর্মচারী
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-amber-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-english">
              ১০০%
            </div>
            <div className="text-xs text-slate-500 font-medium">
              সর্বশেষ এসএসসি পাশের হার
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-purple-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 font-english">
              {toBengaliNumber(totalStipend)} জন
            </div>
            <div className="text-xs text-slate-500 font-medium">
              সরকারি উপবৃত্তিপ্রাপ্ত শিক্ষার্থী
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Layout Grid: Left Content (2 Cols) + Right Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Latest Notice Board Box */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-emerald-800 text-white px-5 py-3.5 flex items-center justify-between">
              <h2 className="font-bold text-base font-tiro flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-300" />
                সর্বশেষ নোটিশ ও সার্কুলার
              </h2>
              <button
                onClick={() => navigate('/notices')}
                className="text-xs text-emerald-100 hover:text-white underline font-semibold cursor-pointer"
              >
                সব নোটিশ দেখুন →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {notices.slice(0, 4).map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 hover:bg-emerald-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {toBengaliNumber(notice.publishDate)}
                      </span>
                      {notice.isPinned && (
                        <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                          জরুরি
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => navigate(`/notices`)}
                      className="text-sm font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                    >
                      {notice.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => navigate('/notices')}
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>বিস্তারিত</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Information Summary Table */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-5 py-3.5 flex items-center justify-between">
              <h2 className="font-bold text-base font-tiro flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                এক নজরে প্রতিষ্ঠান পরিচিতি
              </h2>
              <button
                onClick={() => navigate('/about')}
                className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
              >
                পূর্ণাঙ্গ বিবরণী →
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">প্রতিষ্ঠানের নাম (বাংলা):</span>
                  <p className="font-bold text-slate-900 text-sm">{institution.nameBn}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">Name (Block Letter):</span>
                  <p className="font-bold text-slate-900 text-sm font-english">{institution.nameEn}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">ইআইআইএন (EIIN):</span>
                  <p className="font-bold text-emerald-800 text-sm font-english">{toBengaliNumber(institution.eiin)}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">এমপিও কোড:</span>
                  <p className="font-bold text-emerald-800 text-sm font-english">{toBengaliNumber(institution.mpoCode)}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">প্রতিষ্ঠার তারিখ:</span>
                  <p className="font-bold text-slate-900 text-sm">{toBengaliNumber(institution.estDate)}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">স্বীকৃতি মেয়াদ:</span>
                  <p className="font-bold text-amber-700 text-sm">{toBengaliNumber(institution.lastRecognitionExpiry)} পর্যন্ত</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 md:col-span-2">
                  <span className="text-slate-500 font-medium">অবস্থান ও ঠিকানা:</span>
                  <p className="font-semibold text-slate-900">
                    মৌজা: {institution.mouzaName} (দাগ নং: {institution.dagNo}), গ্রাম: {institution.village}, ইউনিয়ন: {institution.union}, ডাকঘর: {institution.postOffice}, উপজেলা: {institution.upazila}, জেলা: {institution.district}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Exam Results Highlight */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-emerald-900 text-white px-5 py-3.5 flex items-center justify-between">
              <h2 className="font-bold text-base font-tiro flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                সর্বশেষ পাবলিক পরীক্ষার (SSC) সাফল্য
              </h2>
              <button
                onClick={() => navigate('/results')}
                className="text-xs text-emerald-200 hover:text-white underline cursor-pointer"
              >
                সকল ফলাফল দেখুন →
              </button>
            </div>

            <div className="p-5">
              {latestPublicResult && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                      <span className="text-xs text-emerald-800 font-semibold block">রেজিস্ট্রেশনকৃত শিক্ষার্থী</span>
                      <strong className="text-xl font-bold text-emerald-950 font-english">
                        {toBengaliNumber(latestPublicResult.registeredMale + latestPublicResult.registeredFemale)} জন
                      </strong>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                      <span className="text-xs text-emerald-800 font-semibold block">কৃতকার্য পরীক্ষার্থী</span>
                      <strong className="text-xl font-bold text-emerald-950 font-english">
                        {toBengaliNumber(latestPublicResult.totalPassMale + latestPublicResult.totalPassFemale)} জন
                      </strong>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                      <span className="text-xs text-amber-800 font-semibold block">জিপিএ ৫.০০ (A+)</span>
                      <strong className="text-xl font-bold text-amber-950 font-english">
                        {toBengaliNumber(latestPublicResult.gpa5)} জন
                      </strong>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
                      <span className="text-xs text-blue-800 font-semibold block">পাশের শতকরা হার</span>
                      <strong className="text-xl font-bold text-blue-950 font-english">
                        ১০০%
                      </strong>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border border-slate-200 rounded-lg">
                      <thead className="bg-slate-100 text-slate-700">
                        <tr>
                          <th className="p-2 border">পরীক্ষার বছর</th>
                          <th className="p-2 border text-center">A+</th>
                          <th className="p-2 border text-center">A (৪-৫)</th>
                          <th className="p-2 border text-center">A- (৩.৫-৪)</th>
                          <th className="p-2 border text-center">B (৩-৩.৫)</th>
                          <th className="p-2 border text-center">পাসকৃত ছাত্র</th>
                          <th className="p-2 border text-center">পাসকৃত ছাত্রী</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2 border font-bold text-emerald-900">{toBengaliNumber(latestPublicResult.year)}</td>
                          <td className="p-2 border text-center font-semibold text-amber-700">{toBengaliNumber(latestPublicResult.gpa5)}</td>
                          <td className="p-2 border text-center font-semibold">{toBengaliNumber(latestPublicResult.gpa4_5)}</td>
                          <td className="p-2 border text-center font-semibold">{toBengaliNumber(latestPublicResult.gpa3_5_4)}</td>
                          <td className="p-2 border text-center font-semibold">{toBengaliNumber(latestPublicResult.gpa3_3_5)}</td>
                          <td className="p-2 border text-center font-semibold text-emerald-700">{toBengaliNumber(latestPublicResult.totalPassMale)}</td>
                          <td className="p-2 border text-center font-semibold text-emerald-700">{toBengaliNumber(latestPublicResult.totalPassFemale)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Photo Gallery Teaser */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 text-white px-5 py-3.5 flex items-center justify-between">
              <h2 className="font-bold text-base font-tiro flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                ক্যাম্পাস ও সহশিক্ষা কার্যক্রমের চিত্রশালা
              </h2>
              <button
                onClick={() => navigate('/gallery')}
                className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
              >
                সব ছবি দেখুন →
              </button>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/gallery')}
                  className="group relative rounded-lg overflow-hidden cursor-pointer shadow-xs aspect-4/3"
                >
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                    <span className="text-[11px] text-white font-medium line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-1">
          <QuickInfoSidebar />
        </div>
      </div>
    </div>
  );
};
