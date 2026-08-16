import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  Calendar,
  Clock,
  Download,
  Printer,
  FileSpreadsheet,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export const RoutinePage: React.FC = () => {
  const { routines, institution } = useSchoolData();
  const [selectedClass, setSelectedClass] = useState<string>('১০ম শ্রেণি');

  const classRoutines = routines.filter((r) => r.type === 'ক্লাস রুটিন' && (!r.className || r.className === selectedClass));
  const examRoutines = routines.filter((r) => r.type === 'পরীক্ষার রুটিন');

  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার'];

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
              একাডেমিক সূচি
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              ক্লাস ও পরীক্ষার রুটিন
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              সাপ্তাহিক ক্লাস শিডিউল, সাময়িক ও বার্ষিক পরীক্ষার সময়সূচি
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="no-print bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট রুটিন</span>
          </button>
        </div>

        {/* 1. Class Routine Section */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-emerald-800 text-white px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-300" />
              দৈনিক ও সাপ্তাহিক ক্লাস রুটিন
            </h2>

            {/* Class Selector */}
            <div className="flex items-center gap-2 no-print">
              <span className="text-xs text-emerald-100 font-medium">শ্রেণি নির্বাচন:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="text-xs bg-emerald-950 text-white border border-emerald-600 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead className="bg-emerald-50 text-emerald-950 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-300 text-center w-24">বার / দিন</th>
                  <th className="p-2.5 border border-slate-300 text-center">১ম পিরিয়ড<br /><span className="text-[10px] font-normal text-slate-600">১০:০০ - ১০:৪৫</span></th>
                  <th className="p-2.5 border border-slate-300 text-center">২য় পিরিয়ড<br /><span className="text-[10px] font-normal text-slate-600">১০:৪৫ - ১১:৩০</span></th>
                  <th className="p-2.5 border border-slate-300 text-center">৩য় পিরিয়ড<br /><span className="text-[10px] font-normal text-slate-600">১১:৩০ - ১২:১৫</span></th>
                  <th className="p-2.5 border border-slate-300 text-center bg-amber-50">বিরতি<br /><span className="text-[10px] font-normal text-slate-600">১২:১৫-০১:০০</span></th>
                  <th className="p-2.5 border border-slate-300 text-center">৪র্থ পিরিয়ড<br /><span className="text-[10px] font-normal text-slate-600">০১:০০ - ০১:৪৫</span></th>
                  <th className="p-2.5 border border-slate-300 text-center">৫ম পিরিয়ড<br /><span className="text-[10px] font-normal text-slate-600">০১:৪৫ - ০২:৩০</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-center">
                {days.map((day, idx) => (
                  <tr key={day} className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-300 font-bold text-slate-900 bg-slate-100 font-tiro text-left">
                      {day}
                    </td>
                    <td className="p-2.5 border border-slate-200">
                      <strong className="text-slate-850 block">বাংলা</strong>
                      <span className="text-[10px] text-slate-500">মোঃ মাহবুবুল হক</span>
                    </td>
                    <td className="p-2.5 border border-slate-200">
                      <strong className="text-slate-850 block">ইংরেজি</strong>
                      <span className="text-[10px] text-slate-500">মাহবুবুর রহমান</span>
                    </td>
                    <td className="p-2.5 border border-slate-200">
                      <strong className="text-slate-850 block">গণিত</strong>
                      <span className="text-[10px] text-slate-500">মোঃ কামরুজ্জামান</span>
                    </td>
                    <td className="p-2.5 border border-slate-300 bg-amber-50/60 font-bold text-amber-900 text-[11px]">
                      নামাজ ও টিফিন
                    </td>
                    <td className="p-2.5 border border-slate-200">
                      <strong className="text-slate-850 block">বিজ্ঞান</strong>
                      <span className="text-[10px] text-slate-500">আবু সালেহ মোঃ নিজামউদ্দিন</span>
                    </td>
                    <td className="p-2.5 border border-slate-200">
                      <strong className="text-slate-850 block">আইসিটি / সমাজ</strong>
                      <span className="text-[10px] text-slate-500">মোসাঃ জোসনা আক্তার</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Academic Calendar & Holidays Section */}
        <div id="calendar" className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-base font-tiro text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              একাডেমিক ক্যালেন্ডার ও প্রধান ছুটির তালিকা - ২০২৬
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
              শিক্ষা মন্ত্রণালয় অনুমোদিত
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">পবিত্র ঈদুল ফিতর ও গ্রীষ্মকালীন ছুটি:</strong>
                <span className="text-slate-600">১৬ মার্চ হতে ০৩ এপ্রিল ২০২৬</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">অর্ধবার্ষিক মূল্যায়ন ও পরীক্ষা:</strong>
                <span className="text-slate-600">০১ জুন হতে ১৫ জুন ২০২৬</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">পবিত্র ঈদুল আযহা ছুটি:</strong>
                <span className="text-slate-600">২৫ মে হতে ০৬ জুন ২০২৬</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">বার্ষিক পরীক্ষা ও ফলাফল প্রকাশ:</strong>
                <span className="text-slate-600">১৫ নভেম্বর হতে ১০ ডিসেম্বর ২০২৬</span>
              </div>
            </div>
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
