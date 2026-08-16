import React from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { useRouter } from '../context/RouterContext';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  GraduationCap,
  Users,
  Award,
  ShieldCheck,
  Printer,
  ArrowRight,
  TrendingUp,
  PieChart
} from 'lucide-react';

export const StudentOverviewPage: React.FC = () => {
  const { studentClassOverviews } = useSchoolData();
  const { navigate } = useRouter();

  // Compute grand totals
  const totalBoys = studentClassOverviews.reduce((acc, c) => acc + c.maleCount, 0);
  const totalGirls = studentClassOverviews.reduce((acc, c) => acc + c.femaleCount, 0);
  const totalStudents = studentClassOverviews.reduce((acc, c) => acc + c.totalCount, 0);

  const totalBoysStipend = studentClassOverviews.reduce((acc, c) => acc + c.maleStipend, 0);
  const totalGirlsStipend = studentClassOverviews.reduce((acc, c) => acc + c.femaleStipend, 0);
  const totalStipend = totalBoysStipend + totalGirlsStipend;

  const totalTransferIn = studentClassOverviews.reduce((acc, c) => acc + c.transferIn, 0);
  const totalTransferOut = studentClassOverviews.reduce((acc, c) => acc + c.transferOut, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              শিক্ষার্থী পরিসংখ্যান
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              শ্রেণিভিত্তিক শিক্ষার্থী তথ্য ও উপবৃত্তি পরিসংখ্যান
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              বর্তমান শিক্ষাবর্ষের ৬ষ্ঠ হতে ১০ম শ্রেণি পর্যন্ত পূর্ণাঙ্গ শিক্ষার্থী ডাটাবেজ
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => navigate('/students/list')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>শিক্ষার্থী তালিকা দেখুন</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* 1. Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
            <span className="text-xs text-emerald-800 font-semibold block mb-1">সর্বমোট শিক্ষার্থী</span>
            <strong className="text-2xl font-bold text-emerald-950 font-english">
              {toBengaliNumber(totalStudents)} জন
            </strong>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
            <span className="text-xs text-blue-800 font-semibold block mb-1">মোট ছাত্র</span>
            <strong className="text-2xl font-bold text-blue-950 font-english">
              {toBengaliNumber(totalBoys)} জন
            </strong>
          </div>
          <div className="bg-pink-50 border border-pink-200 p-4 rounded-xl text-center">
            <span className="text-xs text-pink-800 font-semibold block mb-1">মোট ছাত্রী</span>
            <strong className="text-2xl font-bold text-pink-950 font-english">
              {toBengaliNumber(totalGirls)} জন
            </strong>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center">
            <span className="text-xs text-purple-800 font-semibold block mb-1">উপবৃত্তিপ্রাপ্ত</span>
            <strong className="text-2xl font-bold text-purple-950 font-english">
              {toBengaliNumber(totalStipend)} জন
            </strong>
          </div>
        </div>

        {/* 2. Official Student Overview Table (Matching Official Ministry Formats) */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-emerald-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-300" />
              Student Information Overviews (শ্রেণি ও গ্রুপভিত্তিক শিক্ষার্থী পরিসংখ্যান)
            </h2>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead className="bg-emerald-50 text-emerald-950 font-bold text-center">
                <tr>
                  <th rowSpan={2} className="p-2 border border-slate-300">শ্রেণি</th>
                  <th rowSpan={2} className="p-2 border border-slate-300">গ্রুপ</th>
                  <th colSpan={3} className="p-2 border border-slate-300 bg-emerald-100/60">শিক্ষার্থী সংখ্যা</th>
                  <th colSpan={2} className="p-2 border border-slate-300 bg-purple-100/60">উপবৃত্তি প্রাপ্ত</th>
                  <th colSpan={2} className="p-2 border border-slate-300">রিপিটার</th>
                  <th colSpan={2} className="p-2 border border-slate-300">স্কলারশিপ</th>
                  <th rowSpan={2} className="p-2 border border-slate-300">ট্রান্সফার ইন</th>
                  <th rowSpan={2} className="p-2 border border-slate-300">ট্রান্সফার আউট</th>
                </tr>
                <tr>
                  {/* শিক্ষার্থী সংখ্যা */}
                  <th className="p-1.5 border border-slate-300 text-blue-900">ছাত্র</th>
                  <th className="p-1.5 border border-slate-300 text-pink-900">ছাত্রী</th>
                  <th className="p-1.5 border border-slate-300 bg-emerald-200/60 font-bold text-emerald-950">মোট</th>
                  {/* উপবৃত্তি প্রাপ্ত */}
                  <th className="p-1.5 border border-slate-300 text-blue-900">ছাত্র</th>
                  <th className="p-1.5 border border-slate-300 text-pink-900">ছাত্রী</th>
                  {/* রিপিটার */}
                  <th className="p-1.5 border border-slate-300">ছাত্র</th>
                  <th className="p-1.5 border border-slate-300">ছাত্রী</th>
                  {/* স্কলারশিপ */}
                  <th className="p-1.5 border border-slate-300">ছাত্র</th>
                  <th className="p-1.5 border border-slate-300">ছাত্রী</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-center font-english">
                {studentClassOverviews.map((ov) => (
                  <tr key={ov.id} className="hover:bg-emerald-50/30">
                    <td className="p-2 border border-slate-200 font-bold text-slate-900 text-left font-tiro">
                      {ov.className}
                    </td>
                    <td className="p-2 border border-slate-200 font-medium text-slate-700 text-left">
                      {ov.group || '-'}
                    </td>
                    <td className="p-2 border border-slate-200 font-semibold text-blue-800">
                      {toBengaliNumber(ov.maleCount)}
                    </td>
                    <td className="p-2 border border-slate-200 font-semibold text-pink-800">
                      {toBengaliNumber(ov.femaleCount)}
                    </td>
                    <td className="p-2 border border-slate-200 font-bold text-emerald-950 bg-emerald-50/60">
                      {toBengaliNumber(ov.totalCount)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-700">
                      {toBengaliNumber(ov.maleStipend)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-700">
                      {toBengaliNumber(ov.femaleStipend)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-500">
                      {toBengaliNumber(ov.maleRepeater)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-500">
                      {toBengaliNumber(ov.femaleRepeater)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-500">
                      {toBengaliNumber(ov.maleScholarship)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-500">
                      {toBengaliNumber(ov.femaleScholarship)}
                    </td>
                    <td className="p-2 border border-slate-200 font-semibold text-slate-700">
                      {toBengaliNumber(ov.transferIn)}
                    </td>
                    <td className="p-2 border border-slate-200 text-slate-500">
                      {toBengaliNumber(ov.transferOut)}
                    </td>
                  </tr>
                ))}

                {/* Grand Total Row */}
                <tr className="bg-emerald-100/70 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-2.5 border border-slate-300 text-left font-tiro text-sm">
                    সর্বমোট (Total)
                  </td>
                  <td className="p-2.5 border border-slate-300 text-left">-</td>
                  <td className="p-2.5 border border-slate-300 text-blue-900 font-bold">{toBengaliNumber(totalBoys)}</td>
                  <td className="p-2.5 border border-slate-300 text-pink-900 font-bold">{toBengaliNumber(totalGirls)}</td>
                  <td className="p-2.5 border border-slate-300 text-emerald-950 font-bold bg-emerald-200/80 text-sm">{toBengaliNumber(totalStudents)}</td>
                  <td className="p-2.5 border border-slate-300 text-purple-900">{toBengaliNumber(totalBoysStipend)}</td>
                  <td className="p-2.5 border border-slate-300 text-purple-900">{toBengaliNumber(totalGirlsStipend)}</td>
                  <td className="p-2.5 border border-slate-300">০</td>
                  <td className="p-2.5 border border-slate-300">০</td>
                  <td className="p-2.5 border border-slate-300">০</td>
                  <td className="p-2.5 border border-slate-300">০</td>
                  <td className="p-2.5 border border-slate-300 font-bold">{toBengaliNumber(totalTransferIn)}</td>
                  <td className="p-2.5 border border-slate-300">{toBengaliNumber(totalTransferOut)}</td>
                </tr>
              </tbody>
            </table>
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
