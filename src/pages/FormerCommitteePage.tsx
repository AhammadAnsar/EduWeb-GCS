import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { useRouter } from '../context/RouterContext';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  History,
  Award,
  Users,
  Printer,
  ChevronLeft,
  Filter,
  UserCheck
} from 'lucide-react';

export const FormerCommitteePage: React.FC = () => {
  const { formerCommittee } = useSchoolData();
  const { navigate } = useRouter();
  const [selectedRole, setSelectedRole] = useState<'all' | 'president' | 'founder' | 'donor' | 'guardian' | 'teacher_rep'>('all');

  const formerPresidents = formerCommittee.filter((m) => m.roleCategory === 'president');
  const formerFounders = formerCommittee.filter((m) => m.roleCategory === 'founder');
  const formerDonors = formerCommittee.filter((m) => m.roleCategory === 'donor');
  const formerOthers = formerCommittee.filter((m) => !['president', 'founder', 'donor'].includes(m.roleCategory));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/committee')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer no-print"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>বর্তমান কমিটি</span>
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                ঐতিহ্য ও অবদান
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              সাবেক পরিচালনা পরিষদ সদস্যবৃন্দের তালিকা
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              বিদ্যালয়ের অগ্রগতি ও অবকাঠামোগত উন্নয়নে যাদের অবদান চিরস্মরণীয়
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

        {/* Tab / Role Filter Badges */}
        <div className="flex flex-wrap gap-2 no-print">
          <button
            onClick={() => setSelectedRole('all')}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              selectedRole === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            সকল সাবেক সদস্য ({toBengaliNumber(formerCommittee.length)})
          </button>
          <button
            onClick={() => setSelectedRole('president')}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              selectedRole === 'president'
                ? 'bg-emerald-800 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            সাবেক সভাপতি মহোদয়গণ ({toBengaliNumber(formerPresidents.length)})
          </button>
          <button
            onClick={() => setSelectedRole('founder')}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
              selectedRole === 'founder'
                ? 'bg-amber-700 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            সাবেক প্রতিষ্ঠাতা সদস্যগণ ({toBengaliNumber(formerFounders.length)})
          </button>
        </div>

        {/* 1. সাবেক সভাপতি মহোদয়গণের তালিকা */}
        {(selectedRole === 'all' || selectedRole === 'president') && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-emerald-900 text-white px-5 py-3 flex items-center justify-between">
              <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-300" />
                সাবেক সভাপতি মহোদয়গণের তালিকা
              </h2>
              <span className="text-xs bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded">
                মোট: {toBengaliNumber(formerPresidents.length)} জন
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 border-r border-slate-200 text-center w-12">ক্রম</th>
                    <th className="p-3 border-r border-slate-200">সভাপতি মহোদয়ের নাম</th>
                    <th className="p-3 border-r border-slate-200 text-center">ছবি</th>
                    <th className="p-3 border-r border-slate-200 text-center">মেয়াদ (হইতে)</th>
                    <th className="p-3 text-center">মেয়াদ (পর্যন্ত)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {formerPresidents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400">কোনো তথ্য পাওয়া যায়নি</td>
                    </tr>
                  ) : (
                    formerPresidents.map((pres, idx) => (
                      <tr key={pres.id} className="hover:bg-slate-50">
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-slate-700">
                          {toBengaliNumber(pres.serialNo || idx + 1)}
                        </td>
                        <td className="p-3 border-r border-slate-200">
                          <strong className="text-slate-900 font-tiro text-sm block">{pres.name}</strong>
                          <span className="text-slate-500 text-[11px]">{pres.profession || 'শিক্ষানুরাগী ও সমাজসেবক'}</span>
                        </td>
                        <td className="p-3 border-r border-slate-200 text-center">
                          <img
                            src={pres.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                            alt={pres.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 mx-auto"
                            referrerPolicy="no-referrer"
                          />
                        </td>
                        <td className="p-3 border-r border-slate-200 text-center font-semibold text-slate-700">
                          {toBengaliNumber(pres.startDate)}
                        </td>
                        <td className="p-3 text-center font-semibold text-slate-700">
                          {toBengaliNumber(pres.endDate)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. সাবেক প্রতিষ্ঠাতা সদস্য মহোদয়গণের তালিকা */}
        {(selectedRole === 'all' || selectedRole === 'founder') && (
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-amber-850 bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
              <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-300" />
                সাবেক প্রতিষ্ঠাতা সদস্য মহোদয়গণের তালিকা
              </h2>
              <span className="text-xs bg-slate-700 text-slate-200 px-2 py-0.5 rounded">
                মোট: {toBengaliNumber(formerFounders.length)} জন
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 border-r border-slate-200 text-center w-12">ক্রম</th>
                    <th className="p-3 border-r border-slate-200">প্রতিষ্ঠাতা সদস্যের নাম</th>
                    <th className="p-3 border-r border-slate-200 text-center">ছবি</th>
                    <th className="p-3 border-r border-slate-200 text-center">মেয়াদ (হইতে)</th>
                    <th className="p-3 text-center">মেয়াদ (পর্যন্ত)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {formerFounders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400">কোনো তথ্য পাওয়া যায়নি</td>
                    </tr>
                  ) : (
                    formerFounders.map((founder, idx) => (
                      <tr key={founder.id} className="hover:bg-slate-50">
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-slate-700">
                          {toBengaliNumber(founder.serialNo || idx + 1)}
                        </td>
                        <td className="p-3 border-r border-slate-200">
                          <strong className="text-slate-900 font-tiro text-sm block">{founder.name}</strong>
                          <span className="text-slate-500 text-[11px]">{founder.profession || 'প্রতিষ্ঠাতা সদস্য ও জমিদাতা'}</span>
                        </td>
                        <td className="p-3 border-r border-slate-200 text-center">
                          <img
                            src={founder.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'}
                            alt={founder.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 mx-auto"
                            referrerPolicy="no-referrer"
                          />
                        </td>
                        <td className="p-3 border-r border-slate-200 text-center font-semibold text-slate-700">
                          {toBengaliNumber(founder.startDate)}
                        </td>
                        <td className="p-3 text-center font-semibold text-slate-700">
                          {toBengaliNumber(founder.endDate)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
