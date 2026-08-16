import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { useRouter } from '../context/RouterContext';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  History,
  Users,
  ChevronLeft,
  Printer,
  Search,
  Filter,
  Phone
} from 'lucide-react';

export const FormerTeachersPage: React.FC = () => {
  const { formerTeachers } = useSchoolData();
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = formerTeachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.subject && t.subject.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'retired':
        return <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-bold">অবসরপ্রাপ্ত (Retired)</span>;
      case 'transferred':
        return <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded text-[11px] font-bold">বদলিকৃত (Transferred)</span>;
      case 'resigned':
        return <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded text-[11px] font-bold">পদত্যাগকৃত (Resigned)</span>;
      case 'deceased':
        return <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-bold">প্রয়াত (Deceased)</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">সাবেক</span>;
    }
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
                onClick={() => navigate('/teachers')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer no-print"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>কর্মরত শিক্ষক তালিকা</span>
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                সাবেক তালিকা
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              সাবেক শিক্ষক ও কর্মচারীবৃন্দের তালিকা
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              অবসরপ্রাপ্ত, বদলিকৃত ও প্রাক্তন শ্রদ্ধেয় শিক্ষক ও কর্মকর্তা-কর্মচারীদের তথ্যপঞ্জি
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

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="নাম বা পদবি দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-emerald-600 w-full sm:w-auto"
            >
              <option value="all">সকল সাবেক ধরন</option>
              <option value="retired">অবসরপ্রাপ্ত</option>
              <option value="transferred">বদলিকৃত</option>
              <option value="resigned">পদত্যাগকৃত</option>
              <option value="deceased">প্রয়াত</option>
            </select>
          </div>
        </div>

        {/* Former Teachers Table */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-300" />
              সাবেক শিক্ষক/কর্মচারী তালিকা ({toBengaliNumber(filtered.length)} জন)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 border-r border-slate-200 text-center w-12">ক্রম</th>
                  <th className="p-3 border-r border-slate-200">নাম ও ছবি</th>
                  <th className="p-3 border-r border-slate-200">সর্বশেষ পদবি ও বিষয়</th>
                  <th className="p-3 border-r border-slate-200 text-center">স্ট্যাটাস</th>
                  <th className="p-3 border-r border-slate-200">কার্যকাল / অবসর তারিখ</th>
                  <th className="p-3">অবসর/বদলি সংক্রান্ত কারণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">কোনো সাবেক শিক্ষক/কর্মচারী তথ্য পাওয়া যায়নি</td>
                  </tr>
                ) : (
                  filtered.map((teacher, idx) => (
                    <tr key={teacher.id} className="hover:bg-slate-50">
                      <td className="p-3 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50/50">
                        {toBengaliNumber(idx + 1)}
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={teacher.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                            alt={teacher.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <strong className="text-slate-900 font-tiro text-sm block">{teacher.name}</strong>
                            <span className="text-[10px] text-slate-500 font-english">PDS: {teacher.pdsId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 border-r border-slate-200">
                        <span className="font-bold text-slate-800 block">{teacher.designation}</span>
                        {teacher.subject && <span className="text-[11px] text-slate-600">বিষয়: {teacher.subject}</span>}
                      </td>
                      <td className="p-3 border-r border-slate-200 text-center">
                        {getStatusBadge(teacher.status)}
                      </td>
                      <td className="p-3 border-r border-slate-200 text-slate-700">
                        <div>প্রথম যোগদান: <strong>{toBengaliNumber(teacher.firstJoinDate)}</strong></div>
                        {teacher.departureDate && <div>অবসর/প্রস্থান: <strong className="text-amber-800">{toBengaliNumber(teacher.departureDate)}</strong></div>}
                      </td>
                      <td className="p-3 text-slate-700">
                        {teacher.departureReason || 'নিয়মিত অবসর'}
                      </td>
                    </tr>
                  ))
                )}
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
