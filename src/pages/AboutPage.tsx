import React from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  Building2,
  FileCheck2,
  Calendar,
  CheckCircle,
  Award,
  BookOpen,
  MapPin,
  Compass,
  Phone,
  Mail,
  Layers,
  Printer
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { institution } = useSchoolData();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content (2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              প্রতিষ্ঠান পরিচিতি ও প্রোফাইল
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              {institution.nameBn}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 font-english uppercase">
              {institution.nameEn}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="no-print bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট করুন</span>
          </button>
        </div>

        {/* 1. Official Profile Table (As specified in Ministry Data Formats) */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-emerald-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-300" />
              প্রতিষ্ঠানের মৌলিক ও প্রশাসনিক তথ্যাবলি (Ministry Data)
            </h2>
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <tbody>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 w-1/3 border-r border-slate-200">
                    প্রতিষ্ঠানের নাম (বাংলায়)
                  </th>
                  <td className="p-2.5 font-bold text-slate-900 text-sm">
                    {institution.nameBn}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    ইংরেজীতে নাম (ব্লক লেটার)
                  </th>
                  <td className="p-2.5 font-bold text-slate-800 font-english">
                    {institution.nameEn}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    ইআইআইএন (EIIN)
                  </th>
                  <td className="p-2.5 font-bold text-emerald-800 font-english text-sm">
                    {toBengaliNumber(institution.eiin)} ({institution.eiin})
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    এমপিও কোড (MPO Code)
                  </th>
                  <td className="p-2.5 font-bold text-emerald-800 font-english text-sm">
                    {toBengaliNumber(institution.mpoCode)} ({institution.mpoCode})
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    প্রতিষ্ঠার তারিখ
                  </th>
                  <td className="p-2.5 font-semibold text-slate-800">
                    {toBengaliNumber(institution.estDate)}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    প্রতিষ্ঠানের প্রকার ও ধরন
                  </th>
                  <td className="p-2.5 font-medium text-slate-800">
                    {institution.instituteType} / {institution.typeCategory}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    অনুমোদিত বিভাগ/গ্রুপ
                  </th>
                  <td className="p-2.5 font-medium text-slate-800">
                    {institution.groups.join(', ')}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    কাদের জন্য ও শিফট
                  </th>
                  <td className="p-2.5 font-medium text-slate-800">
                    {institution.genderType} | {institution.shiftCount}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    ব্যবস্থাপনার ধরন
                  </th>
                  <td className="p-2.5 font-medium text-slate-800">
                    {institution.management}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    ঠিকানা ও মৌজা সংক্রান্ত তথ্য
                  </th>
                  <td className="p-2.5 text-slate-800">
                    গ্রাম: <strong>{institution.village}</strong>, ইউনিয়ন: <strong>{institution.union}</strong><br />
                    মৌজার নাম: <strong>{institution.mouzaName}</strong>, মূল ভবনের দাগ নম্বর: <strong>{institution.dagNo}</strong><br />
                    ডাকঘর: <strong>{institution.postOffice}</strong>, উপজেলা: <strong>{institution.upazila}</strong>, জেলা: <strong>{institution.district}</strong>, অঞ্চল: <strong>{institution.region}</strong>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 bg-slate-100 font-semibold text-slate-700 border-r border-slate-200">
                    যোগাযোগ নম্বর ও ইমেইল
                  </th>
                  <td className="p-2.5 text-slate-800">
                    ফোন: <strong className="font-english">{toBengaliNumber(institution.phone)}</strong> | ইমেইল: <strong className="font-english">{institution.email}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Recognition & MPO Details Table */}
        <div id="mpo" className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              স্বীকৃতি ও এমপিও সংক্রান্ত তথ্যাবলি (Recognition & MPO)
            </h2>
          </div>

          <div className="p-5 overflow-x-auto space-y-4">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead className="bg-emerald-50 text-emerald-950 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200">স্বীকৃতিপ্রাপ্ত স্তর</th>
                  <th className="p-2.5 border border-slate-200">প্রথম স্বীকৃতির তারিখ</th>
                  <th className="p-2.5 border border-slate-200">স্বীকৃতির (সর্বশেষ) মেয়াদ শেষ হওয়ার তারিখ</th>
                  <th className="p-2.5 border border-slate-200">এমপিও স্ট্যাটাস</th>
                  <th className="p-2.5 border border-slate-200">কারিগরি শাখা এমপিও</th>
                  <th className="p-2.5 border border-slate-200">এমপিওভুক্তির তারিখ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 border border-slate-200 font-bold text-slate-900">{institution.recognitionLevel}</td>
                  <td className="p-2.5 border border-slate-200 font-semibold">{toBengaliNumber(institution.firstRecognitionDate)}</td>
                  <td className="p-2.5 border border-slate-200 font-bold text-amber-700 bg-amber-50/50">{toBengaliNumber(institution.lastRecognitionExpiry)}</td>
                  <td className="p-2.5 border border-slate-200 font-bold text-emerald-700">{institution.isMpo}</td>
                  <td className="p-2.5 border border-slate-200 text-slate-600">{institution.isVocationalMpo}</td>
                  <td className="p-2.5 border border-slate-200 font-bold text-emerald-800">{toBengaliNumber(institution.mpoDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. History Section */}
        <div id="history" className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2 border-b border-slate-100 pb-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            প্রতিষ্ঠানের ইতিহাস ও পটভূমি
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed text-justify whitespace-pre-line">
            {institution.historyText}
          </p>
        </div>

        {/* 4. Mission & Vision */}
        <div id="mission" className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2 border-b border-slate-100 pb-2">
            <Compass className="w-5 h-5 text-emerald-700" />
            লক্ষ্য ও উদ্দেশ্য (Mission & Vision)
          </h2>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
            {institution.missionVision}
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
