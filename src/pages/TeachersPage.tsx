import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { useRouter } from '../context/RouterContext';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Printer,
  UserCheck,
  Building,
  GraduationCap,
  FileSpreadsheet,
  IdCard,
  Briefcase,
  History,
  Eye
} from 'lucide-react';
import { TeacherStaff } from '../types';

export const TeachersPage: React.FC = () => {
  const { teacherPostSummary, activeTeachers } = useSchoolData();
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTeacherModal, setSelectedTeacherModal] = useState<TeacherStaff | null>(null);

  // Compute totals for summary table
  const totalApproved = teacherPostSummary.reduce((acc, c) => acc + c.approved, 0);
  const totalWorking = teacherPostSummary.reduce((acc, c) => acc + c.working, 0);
  const totalMpo = teacherPostSummary.reduce((acc, c) => acc + c.mpo, 0);
  const totalExtra = teacherPostSummary.reduce((acc, c) => acc + c.extra, 0);

  const filteredTeachers = activeTeachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.pdsId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.subject && t.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.mobile.includes(searchTerm);

    const matchesCat =
      categoryFilter === 'all' ||
      (categoryFilter === 'teacher' && (t.category === 'শিক্ষক' || t.category === 'প্রশাসনিক' || t.category === 'অতিরিক্ত শিক্ষক/কর্মচারী')) ||
      (categoryFilter === 'staff' && (t.category === '৩য় শ্রেণীর কর্মচারী' || t.category === '৪র্থ শ্রেণীর কর্মচারী'));

    return matchesSearch && matchesCat;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Page Title Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              শিক্ষক ও স্টাফ ডিরেক্টরি
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              শিক্ষক ও কর্মচারীবৃন্দের তথ্য ও পরিসংখ্যান
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              শিক্ষা মন্ত্রণালয় ও ব্যানবেইস প্যাটার্নভুক্ত ও অতিরিক্ত শিক্ষক/কর্মচারী ডেটা
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => navigate('/teachers/former')}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <History className="w-4 h-4" />
              <span>সাবেক শিক্ষক ও স্টাফ</span>
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

        {/* 1. Teacher & Employee Posts Overview Table (Top Smart Summary Section) */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-emerald-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-300" />
              শিক্ষক ও কর্মচারী পদ সংক্রান্ত ওভারভিউ (Posts Overview)
            </h2>
            <span className="text-xs bg-emerald-700 text-emerald-100 px-2.5 py-0.5 rounded font-semibold">
              মোট কর্মরত: {toBengaliNumber(totalWorking)} জন
            </span>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead className="bg-emerald-50/70 text-emerald-950 font-bold">
                <tr>
                  <th className="p-2.5 border border-slate-200">পদের ধরণ</th>
                  <th className="p-2.5 border border-slate-200 text-center">মোট অনুমোদিত</th>
                  <th className="p-2.5 border border-slate-200 text-center">মোট কর্মরত</th>
                  <th className="p-2.5 border border-slate-200 text-center">মোট এমপিওভুক্ত</th>
                  <th className="p-2.5 border border-slate-200 text-center">অতিরিক্ত</th>
                  <th className="p-2.5 border border-slate-200 text-center">খন্ডকালীন</th>
                  <th className="p-2.5 border border-slate-200 text-center">চুক্তি ভিত্তিক</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {teacherPostSummary.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-200 font-bold text-slate-800 font-tiro">
                      {post.postType}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-semibold font-english">
                      {toBengaliNumber(post.approved)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold text-emerald-800 font-english bg-emerald-50/30">
                      {toBengaliNumber(post.working)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-semibold text-emerald-700 font-english">
                      {toBengaliNumber(post.mpo)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-english text-slate-600">
                      {toBengaliNumber(post.extra)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-english text-slate-600">
                      {toBengaliNumber(post.partTime)}
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-english text-slate-600">
                      {toBengaliNumber(post.contractual)}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-2.5 border border-slate-300">সর্বমোট (Total)</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english">{toBengaliNumber(totalApproved)}</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english text-emerald-900 bg-emerald-100/60">{toBengaliNumber(totalWorking)}</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english text-emerald-800">{toBengaliNumber(totalMpo)}</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english">{toBengaliNumber(totalExtra)}</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english">০</td>
                  <td className="p-2.5 border border-slate-300 text-center font-english">০</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Filter & Search Controls */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="শিক্ষকের নাম, পিডিএস আইডি, বিষয় দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-emerald-600 w-full sm:w-auto"
            >
              <option value="all">সকল শিক্ষক ও কর্মচারী ({toBengaliNumber(activeTeachers.length)})</option>
              <option value="teacher">শিক্ষক ও প্রশাসনিক কর্মকর্তাবৃন্দ</option>
              <option value="staff">অফিস ও সহায়ক কর্মচারী (৩য় ও ৪র্থ শ্রেণী)</option>
            </select>
          </div>
        </div>

        {/* 3. Detailed Patterned Teachers & Staff List (Official Dataset Format) */}
        <div id="active" className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              প্যাটার্নভিত্তিক কর্মরত শিক্ষক ও কর্মচারী তালিকা ({toBengaliNumber(filteredTeachers.length)} জন)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 whitespace-nowrap">
                <tr>
                  <th className="p-2.5 border-r border-slate-200 text-center w-10">ক্রম</th>
                  <th className="p-2.5 border-r border-slate-200">ছবি ও নাম</th>
                  <th className="p-2.5 border-r border-slate-200">পদবি ও বিষয়</th>
                  <th className="p-2.5 border-r border-slate-200">ক্যাটাগরি</th>
                  <th className="p-2.5 border-r border-slate-200">পিডিএস ও ইনডেক্স</th>
                  <th className="p-2.5 border-r border-slate-200">নিয়োগ ও ব্যাচ</th>
                  <th className="p-2.5 border-r border-slate-200">প্রথম এমপিও ও যোগদান</th>
                  <th className="p-2.5 border-r border-slate-200">মোবাইল নম্বর</th>
                  <th className="p-2.5 text-center no-print">প্রোফাইল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTeachers.map((staff, idx) => (
                  <tr key={staff.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50/50">
                      {toBengaliNumber(idx + 1)}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 min-w-[170px]">
                      <div className="flex items-center gap-2">
                        <img
                          src={staff.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                          alt={staff.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <strong className="text-slate-900 font-tiro text-sm block">
                            {staff.name}
                          </strong>
                          <span className="text-[10px] text-slate-500 font-medium">
                            লিঙ্গ: {staff.gender} | জেলা: {staff.districtUpazila}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 min-w-[140px]">
                      <span className="font-bold text-slate-900 block">{staff.designation}</span>
                      {staff.subject && (
                        <span className="inline-block text-[11px] bg-emerald-100 text-emerald-900 font-semibold px-1.5 py-0.5 rounded mt-0.5">
                          বিষয়: {staff.subject}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-slate-700 block">{staff.category}</span>
                      <span className="text-[10px] text-slate-500">({staff.postCategory})</span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-english whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="block font-bold text-emerald-800 bg-emerald-50 px-1 rounded text-[11px]">
                          PDS: {staff.pdsId}
                        </span>
                        <span className="block text-[10px] text-slate-600">
                          Index: {staff.indexNo}
                        </span>
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 min-w-[130px]">
                      <span className="text-[11px] font-medium text-slate-800 block">{staff.recruitmentType}</span>
                      {staff.batchNo && staff.batchNo !== '-' && (
                        <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-1 rounded">
                          {staff.batchNo}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 whitespace-nowrap text-[11px] text-slate-700">
                      <div>এমপিও: <strong>{toBengaliNumber(staff.firstMpoDate)}</strong></div>
                      <div>যোগদান: {toBengaliNumber(staff.firstJoinDate)}</div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-english text-emerald-800 font-semibold whitespace-nowrap">
                      <a href={`tel:${staff.mobile}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        {toBengaliNumber(staff.mobile)}
                      </a>
                    </td>
                    <td className="p-2.5 text-center no-print">
                      <button
                        onClick={() => setSelectedTeacherModal(staff)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 p-1.5 rounded transition cursor-pointer"
                        title="সম্পূর্ণ প্রোফাইল ও PDS কার্ড দেখুন"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
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

      {/* Teacher Profile / PDS Card Modal */}
      {selectedTeacherModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="bg-emerald-850 bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IdCard className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base font-tiro">শিক্ষক/কর্মচারী PDS পরিচিতি কার্ড</h3>
              </div>
              <button
                onClick={() => setSelectedTeacherModal(null)}
                className="text-white/80 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <img
                  src={selectedTeacherModal.photo}
                  alt={selectedTeacherModal.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-tiro">{selectedTeacherModal.name}</h4>
                  <p className="text-xs font-bold text-emerald-800">{selectedTeacherModal.designation} {selectedTeacherModal.subject && `(${selectedTeacherModal.subject})`}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedTeacherModal.education || 'শিক্ষাগত বিবরণী'}</p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                    PDS ID: {selectedTeacherModal.pdsId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">ইনডেক্স নম্বর:</span>
                  <strong className="text-slate-800 font-english">{selectedTeacherModal.indexNo}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">জাতীয় পরিচয়পত্র (NID):</span>
                  <strong className="text-slate-800 font-english">{selectedTeacherModal.nid}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">প্রথম এমপিও তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(selectedTeacherModal.firstMpoDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">প্রথম যোগদানের তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(selectedTeacherModal.firstJoinDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">বর্তমান প্রতিষ্ঠানে যোগদান:</span>
                  <strong className="text-slate-800">{toBengaliNumber(selectedTeacherModal.currentJoinDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">জন্ম তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(selectedTeacherModal.dob)}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">নিজ জেলা ও উপজেলা:</span>
                  <strong className="text-slate-800">{selectedTeacherModal.districtUpazila}</strong>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 block text-[10px]">মোবাইল নম্বর:</span>
                  <strong className="text-emerald-800 font-english">{toBengaliNumber(selectedTeacherModal.mobile)}</strong>
                </div>
              </div>

              {selectedTeacherModal.bio && (
                <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100 text-xs text-slate-700">
                  <span className="font-bold text-emerald-900 block mb-0.5">পরিচিতি ও দায়িত্ব:</span>
                  {selectedTeacherModal.bio}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedTeacherModal(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
