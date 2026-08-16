import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  Award,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  Calendar,
  Sparkles,
  CheckCircle,
  Filter,
  BarChart3
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { publicExamResults, internalExamResults } = useSchoolData();
  const [activeTab, setActiveTab] = useState<'public' | 'internal'>('public');
  const [selectedInternalClass, setSelectedInternalClass] = useState('all');

  const filteredInternal = internalExamResults.filter((res) => {
    return selectedInternalClass === 'all' || res.className === selectedInternalClass;
  });

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
              একাডেমিক সাফল্য
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              পরীক্ষার ফলাফল ও পরিসংখ্যান
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              এসএসসি (পাবলিক) পরীক্ষা এবং অর্ধবার্ষিক ও বার্ষিক অভ্যন্তরীণ পরীক্ষার ফলাফল
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="no-print bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট</span>
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 no-print">
          <button
            onClick={() => setActiveTab('public')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'public'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>পাবলিক পরীক্ষা (SSC) ফলাফল</span>
          </button>
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'internal'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>অভ্যন্তরীণ পরীক্ষার ফলাফল</span>
          </button>
        </div>

        {/* 1. Public SSC Exam Results Table */}
        {activeTab === 'public' && (
          <div id="public-history" className="space-y-6">
            {/* Highlights Bar */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-5 rounded-xl shadow-md border border-emerald-700">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base font-tiro text-emerald-100">
                  বিগত বছরগুলোতে শতভাগ পাসের গৌরবময় সাফল্য
                </h3>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                কুমিল্লা শিক্ষা বোর্ডের অধীনে অনুষ্ঠিত মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষায় শিক্ষার্থীদের নিয়মিত অনুশীলন ও শিক্ষকদের নিবিড় পাঠদানের ফলে প্রতি বছর শতভাগ শিক্ষার্থী পাস করে বিদ্যালয়ের সম্মান অক্ষুণ্ণ রাখছে।
              </p>
            </div>

            {/* Official Public Exam Results Table */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
                <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  সালভিত্তিক পাবলিক পরীক্ষার (SSC) ফলাফল পরিসংখ্যান
                </h2>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead className="bg-emerald-50 text-emerald-950 font-bold text-center">
                    <tr>
                      <th rowSpan={2} className="p-2 border border-slate-300">সাল</th>
                      <th colSpan={2} className="p-2 border border-slate-300 bg-blue-50/80">রেজিস্ট্রেশনকৃত শিক্ষার্থী</th>
                      <th colSpan={2} className="p-2 border border-slate-300">নিয়মিত শিক্ষার্থী</th>
                      <th colSpan={6} className="p-2 border border-slate-300 bg-amber-100/60">গ্রেড ও জিপিএভিত্তিক উত্তীর্ণ সংখ্যা</th>
                      <th colSpan={2} className="p-2 border border-slate-300 bg-emerald-100/60">মোট পাসকৃত</th>
                      <th rowSpan={2} className="p-2 border border-slate-300 bg-emerald-800 text-white">পাশের হার</th>
                    </tr>
                    <tr>
                      {/* Registration */}
                      <th className="p-1.5 border border-slate-300 text-blue-900">ছাত্র</th>
                      <th className="p-1.5 border border-slate-300 text-pink-900">ছাত্রী</th>
                      {/* Regular */}
                      <th className="p-1.5 border border-slate-300">ছাত্র</th>
                      <th className="p-1.5 border border-slate-300">ছাত্রী</th>
                      {/* CGPA */}
                      <th className="p-1.5 border border-slate-300 font-bold text-amber-900 bg-amber-50">A+ (৫.০)</th>
                      <th className="p-1.5 border border-slate-300">A (৪-৫)</th>
                      <th className="p-1.5 border border-slate-300">A- (৩.৫-৪)</th>
                      <th className="p-1.5 border border-slate-300">B (৩-৩.৫)</th>
                      <th className="p-1.5 border border-slate-300">C (২-৩)</th>
                      <th className="p-1.5 border border-slate-300">D (১-২)</th>
                      {/* Total Pass */}
                      <th className="p-1.5 border border-slate-300 text-blue-900 font-semibold">ছাত্র</th>
                      <th className="p-1.5 border border-slate-300 text-pink-900 font-semibold">ছাত্রী</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-center font-english">
                    {publicExamResults.map((res) => (
                      <tr key={res.id} className="hover:bg-emerald-50/30">
                        <td className="p-2.5 border border-slate-200 font-bold text-slate-900 text-base font-english">
                          {toBengaliNumber(res.year)}
                        </td>
                        <td className="p-2.5 border border-slate-200 font-medium text-blue-800">{toBengaliNumber(res.registeredMale)}</td>
                        <td className="p-2.5 border border-slate-200 font-medium text-pink-800">{toBengaliNumber(res.registeredFemale)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-700">{toBengaliNumber(res.regularMale)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-700">{toBengaliNumber(res.regularFemale)}</td>
                        {/* Grades */}
                        <td className="p-2.5 border border-slate-200 font-bold text-amber-800 bg-amber-50/60">{toBengaliNumber(res.gpa5)}</td>
                        <td className="p-2.5 border border-slate-200 font-semibold">{toBengaliNumber(res.gpa4_5)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-700">{toBengaliNumber(res.gpa3_5_4)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-700">{toBengaliNumber(res.gpa3_3_5)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-500">{toBengaliNumber(res.gpa2_3)}</td>
                        <td className="p-2.5 border border-slate-200 text-slate-500">{toBengaliNumber(res.gpa1_2)}</td>
                        {/* Total Pass */}
                        <td className="p-2.5 border border-slate-200 font-bold text-blue-900">{toBengaliNumber(res.totalPassMale)}</td>
                        <td className="p-2.5 border border-slate-200 font-bold text-pink-900">{toBengaliNumber(res.totalPassFemale)}</td>
                        <td className="p-2.5 border border-slate-200 font-bold text-emerald-800 bg-emerald-50 text-sm">
                          {toBengaliNumber((((res.totalPassMale + res.totalPassFemale) / (res.registeredMale + res.registeredFemale)) * 100).toFixed(1))}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Internal School Exam Results */}
        {activeTab === 'internal' && (
          <div id="internal" className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 no-print">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">শ্রেণি ফিল্টার:</span>
                <select
                  value={selectedInternalClass}
                  onChange={(e) => setSelectedInternalClass(e.target.value)}
                  className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50"
                >
                  <option value="all">সকল শ্রেণি</option>
                  <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                  <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                  <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                  <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                  <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
                <h2 className="font-bold text-sm font-tiro flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  অভ্যন্তরীণ পরীক্ষার মেধা তালিকা ও ফলাফল শিট
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 border-r border-slate-200">শিক্ষাবর্ষ ও পরীক্ষার নাম</th>
                      <th className="p-3 border-r border-slate-200">শ্রেণি ও শাখা</th>
                      <th className="p-3 border-r border-slate-200 text-center">মোট পরীক্ষার্থী</th>
                      <th className="p-3 border-r border-slate-200 text-center">পাসকৃত</th>
                      <th className="p-3 border-r border-slate-200 text-center">A+ প্রাপ্ত</th>
                      <th className="p-3 border-r border-slate-200 text-center">পাশের হার</th>
                      <th className="p-3 text-center no-print">ফলাফল শিট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredInternal.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50">
                        <td className="p-3 border-r border-slate-200">
                          <strong className="text-slate-900 font-tiro text-sm block">{res.examName}</strong>
                          <span className="text-[10px] text-slate-500 font-english">বছর: {toBengaliNumber(res.year)}</span>
                        </td>
                        <td className="p-3 border-r border-slate-200 font-semibold text-slate-800">
                          {res.className}
                        </td>
                        <td className="p-3 border-r border-slate-200 text-center font-english">{toBengaliNumber(res.totalStudents)} জন</td>
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-emerald-800 font-english">{toBengaliNumber(res.passedStudents)} জন</td>
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-amber-700 font-english">{toBengaliNumber(res.highestGpa.toFixed(2))}</td>
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-emerald-900 font-english">
                          {toBengaliNumber(((res.passedStudents / res.totalStudents) * 100).toFixed(1))}%
                        </td>
                        <td className="p-3 text-center no-print">
                          <button
                            onClick={() => alert(`ফলাফল শিট ডাউনলোড: ${res.examName} - ${res.className}`)}
                            className="text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded font-semibold cursor-pointer"
                          >
                            ফলাফল শিট (PDF)
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <QuickInfoSidebar />
      </div>
    </div>
  );
};
