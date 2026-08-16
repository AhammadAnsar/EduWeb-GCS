import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { useRouter } from '../context/RouterContext';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  GraduationCap,
  Briefcase,
  History,
  Printer,
  Search,
  Filter
} from 'lucide-react';

export const CommitteePage: React.FC = () => {
  const { committeeOverview, currentCommittee } = useSchoolData();
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredMembers = currentCommittee.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);

    const matchesRole = roleFilter === 'all' || member.roleCategory === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Page Title & Actions */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              পরিচালনা পরিষদ
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              বর্তমান ম্যানেজিং কমিটি ও সদস্যবৃন্দ
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              বিদ্যালয় পরিচালনা ও সার্বিক নীতি-নির্ধারণী কমিটি
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => navigate('/committee/former')}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <History className="w-4 h-4" />
              <span>সাবেক কমিটি তালিকা</span>
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

        {/* 1. Committee Information Overview Widget (Top Smart Section) */}
        <div className="bg-gradient-to-r from-emerald-850 via-emerald-800 to-emerald-900 text-white rounded-xl shadow-md p-5 sm:p-6 border border-emerald-700">
          <div className="flex items-center justify-between border-b border-emerald-700/80 pb-3 mb-4">
            <h2 className="font-bold text-lg font-tiro flex items-center gap-2 text-emerald-100">
              <Users className="w-5 h-5 text-amber-300" />
              কমিটি সংক্রান্ত ওভারভিউ (Committee Overview)
            </h2>
            <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              সক্রিয় কমিটি
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-200 block mb-1">কমিটির ধরন</span>
              <strong className="text-sm sm:text-base font-bold text-amber-300 font-tiro">
                {committeeOverview.committeeType}
              </strong>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-200 block mb-1">সদস্য সংখ্যা</span>
              <strong className="text-lg sm:text-xl font-bold text-white font-english">
                {toBengaliNumber(currentCommittee.length)} জন
              </strong>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-200 block mb-1">অনুমোদন তারিখ</span>
              <strong className="text-xs sm:text-sm font-semibold text-emerald-100">
                {toBengaliNumber(committeeOverview.approvalDate)}
              </strong>
            </div>

            <div className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-700/50">
              <span className="text-[11px] text-emerald-200 block mb-1">মেয়াদ শেষের তারিখ</span>
              <strong className="text-xs sm:text-sm font-bold text-amber-300">
                {toBengaliNumber(committeeOverview.expiryDate)}
              </strong>
            </div>
          </div>
        </div>

        {/* 2. Filter & Search Controls */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="নাম, পদবি বা মোবাইল নম্বর দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-emerald-600 w-full sm:w-auto"
            >
              <option value="all">সকল পদবি</option>
              <option value="president">সভাপতি</option>
              <option value="founder">প্রতিষ্ঠাতা সদস্য</option>
              <option value="donor">দাতা সদস্য</option>
              <option value="guardian">অভিভাবক সদস্য</option>
              <option value="teacher_rep">শিক্ষক প্রতিনিধি</option>
              <option value="secretary">সদস্য সচিব</option>
            </select>
          </div>
        </div>

        {/* 3. Current Committee Table */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold text-sm font-tiro flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              বর্তমান কমিটির সদস্যগণের পূর্ণাঙ্গ তালিকা ({toBengaliNumber(filteredMembers.length)} জন)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-emerald-50 text-emerald-950 font-bold border-b border-emerald-200">
                <tr>
                  <th className="p-3 border-r border-slate-200 text-center w-12">ক্রম</th>
                  <th className="p-3 border-r border-slate-200">পদবি</th>
                  <th className="p-3 border-r border-slate-200">ছবি ও নাম</th>
                  <th className="p-3 border-r border-slate-200">পেশা</th>
                  <th className="p-3 border-r border-slate-200">শিক্ষাগত যোগ্যতা</th>
                  <th className="p-3 border-r border-slate-200">ফোন / মোবাইল</th>
                  <th className="p-3 text-center">মেয়াদ (হইতে - পর্যন্ত)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMembers.map((member, index) => (
                  <tr key={member.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50/50">
                      {toBengaliNumber(member.serialNo || index + 1)}
                    </td>
                    <td className="p-3 border-r border-slate-200 font-bold text-emerald-900 font-tiro">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                        member.designation.includes('সভাপতি') ? 'bg-amber-100 text-amber-900 border border-amber-200 font-bold' :
                        member.designation.includes('সচিব') ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                        member.designation.includes('শিক্ষক') ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {member.designation}
                      </span>
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={member.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-slate-900 text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-3 border-r border-slate-200 text-slate-700">
                      {member.profession || '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 text-slate-700 font-medium">
                      {member.qualification || '-'}
                    </td>
                    <td className="p-3 border-r border-slate-200 font-english text-emerald-800 font-semibold">
                      <a href={`tel:${member.phone}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {toBengaliNumber(member.phone)}
                      </a>
                    </td>
                    <td className="p-3 text-center text-slate-700 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-slate-800">
                        {toBengaliNumber(member.startDate)} হতে {toBengaliNumber(member.endDate)}
                      </span>
                    </td>
                  </tr>
                ))}
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
