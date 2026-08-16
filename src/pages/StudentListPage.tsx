import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import { Student } from '../types';
import {
  GraduationCap,
  Search,
  Filter,
  Printer,
  IdCard,
  Eye,
  EyeOff,
  User,
  MapPin,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export const StudentListPage: React.FC = () => {
  const { students, institution } = useSchoolData();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSensitiveData, setShowSensitiveData] = useState<boolean>(true);
  const [activeModalStudent, setActiveModalStudent] = useState<Student | null>(null);
  const [modalType, setModalType] = useState<'idcard' | 'admit' | null>(null);

  const classes = ['all', '৬ষ্ঠ শ্রেণি', '৭ম শ্রেণি', '৮ম শ্রেণি', '৯ম শ্রেণি', '১০ম শ্রেণি'];

  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === 'all' || s.className === selectedClass;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toString().includes(searchTerm) ||
      s.village.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesClass && matchesSearch;
  });

  const openCardModal = (student: Student, type: 'idcard' | 'admit') => {
    setActiveModalStudent(student);
    setModalType(type);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              শিক্ষার্থী কর্নার
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
              শ্রেণিভিত্তিক শিক্ষার্থী ডিরেক্টরি
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              সকল শ্রেণির ভর্তি ও নিয়মিত শিক্ষার্থীদের পূর্ণাঙ্গ তালিকা ও আইডি কার্ড সিস্টেম
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              title="অভিভাবক ও ঠিকানার তথ্য প্রদর্শন/লুকান"
            >
              {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showSensitiveData ? 'অভিভাবক তথ্য লুকান' : 'অভিভাবক তথ্য দেখান'}</span>
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

        {/* Filter Badges & Search */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 space-y-3 no-print">
          {/* Class Select Buttons */}
          <div className="flex flex-wrap gap-2">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedClass === cls
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cls === 'all' ? 'সকল শ্রেণি' : cls}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="শিক্ষার্থীর নাম, আইডি, রোল নম্বর অথবা গ্রাম দিয়ে সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3 flex items-center justify-between">
            <h2 className="font-bold text-sm sm:text-base font-tiro flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              শিক্ষার্থী তালিকা ({toBengaliNumber(filteredStudents.length)} জন)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 whitespace-nowrap">
                <tr>
                  <th className="p-2.5 border-r border-slate-200 text-center w-12">রোল</th>
                  <th className="p-2.5 border-r border-slate-200">ছবি ও নাম</th>
                  <th className="p-2.5 border-r border-slate-200">আইডি</th>
                  <th className="p-2.5 border-r border-slate-200">শ্রেণি ও শাখা</th>
                  {showSensitiveData && (
                    <>
                      <th className="p-2.5 border-r border-slate-200">পিতার নাম</th>
                      <th className="p-2.5 border-r border-slate-200">মাতার নাম</th>
                      <th className="p-2.5 border-r border-slate-200">গ্রাম</th>
                    </>
                  )}
                  <th className="p-2.5 text-center no-print">কার্ড প্রিন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={showSensitiveData ? 8 : 5} className="p-6 text-center text-slate-400">
                      কোনো শিক্ষার্থী পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-900 bg-slate-50/50 font-english text-sm">
                        {toBengaliNumber(s.roll)}
                      </td>
                      <td className="p-2.5 border-r border-slate-200">
                        <div className="flex items-center gap-2">
                          <img
                            src={s.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={s.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <strong className="text-slate-900 font-tiro text-sm block">{s.name}</strong>
                            <span className="text-[10px] text-slate-500 font-medium">লিঙ্গ: {s.gender}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 border-r border-slate-200 font-english font-bold text-emerald-800 text-[11px]">
                        {s.studentId}
                      </td>
                      <td className="p-2.5 border-r border-slate-200">
                        <span className="font-bold text-slate-800 block">{s.className}</span>
                        <span className="text-[10px] text-slate-500">{s.section} শাখা {s.group && `(${s.group})`}</span>
                      </td>
                      {showSensitiveData && (
                        <>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700">{s.fatherName}</td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700">{s.motherName}</td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700">{s.village}</td>
                        </>
                      )}
                      <td className="p-2.5 text-center no-print whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openCardModal(s, 'idcard')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            title="আইডি কার্ড"
                          >
                            <IdCard className="w-3 h-3" />
                            <span>ID Card</span>
                          </button>
                          <button
                            onClick={() => openCardModal(s, 'admit')}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            title="এডমিট কার্ড"
                          >
                            <FileCheck className="w-3 h-3" />
                            <span>Admit</span>
                          </button>
                        </div>
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

      {/* ID Card / Admit Card Modal */}
      {activeModalStudent && modalType && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between no-print">
              <span className="text-xs font-bold uppercase tracking-wider">
                {modalType === 'idcard' ? 'Student Identity Card' : 'Examination Admit Card'}
              </span>
              <button
                onClick={() => { setActiveModalStudent(null); setModalType(null); }}
                className="text-white/80 hover:text-white font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printable ID Card Template */}
            <div className="p-6">
              {modalType === 'idcard' ? (
                <div className="border-2 border-emerald-700 rounded-xl p-4 bg-gradient-to-b from-emerald-50/50 to-white text-center relative overflow-hidden shadow-sm">
                  <div className="border-b-2 border-emerald-700 pb-2 mb-3">
                    <h3 className="font-bold text-base text-emerald-950 font-tiro">{institution.nameBn}</h3>
                    <p className="text-[10px] text-slate-600 font-english uppercase font-semibold">{institution.nameEn}</p>
                    <p className="text-[9px] text-slate-500">EIIN: {institution.eiin} | নাঙ্গলকোট, কুমিল্লা</p>
                    <div className="mt-1 bg-emerald-800 text-white text-[10px] font-bold py-0.5 rounded-full inline-block px-3">
                      STUDENT ID CARD
                    </div>
                  </div>

                  <img
                    src={activeModalStudent.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                    alt={activeModalStudent.name}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-emerald-600 mx-auto mb-2 shadow-xs"
                    referrerPolicy="no-referrer"
                  />

                  <h4 className="font-bold text-slate-900 text-sm font-tiro">{activeModalStudent.name}</h4>
                  <div className="text-[11px] text-slate-700 space-y-0.5 mt-2 bg-white/80 p-2 rounded border border-emerald-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">আইডি (ID):</span>
                      <strong className="font-english text-emerald-900">{activeModalStudent.studentId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">শ্রেণি ও রোল:</span>
                      <strong>{activeModalStudent.className} | রোল: {toBengaliNumber(activeModalStudent.roll)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">গ্রুপ ও শাখা:</span>
                      <span>{activeModalStudent.group || 'সাধারণ'} | শাখা: {activeModalStudent.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">পিতা:</span>
                      <span>{activeModalStudent.fatherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">জরুরি যোগাযোগ:</span>
                      <span className="font-english">{toBengaliNumber(activeModalStudent.mobile || institution.phone)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-dashed border-slate-300 flex justify-between items-end text-[9px] text-slate-500">
                    <div>ইস্যুর তারিখ: ০১/০১/২০২৬</div>
                    <div className="text-center">
                      <span className="block font-tiro font-bold text-slate-800">গোপাল চন্দ্র দাস</span>
                      <span>প্রধান শিক্ষক স্বাক্ষর</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Admit Card Format */
                <div className="border-2 border-blue-700 rounded-xl p-4 bg-gradient-to-b from-blue-50/40 to-white text-left relative overflow-hidden shadow-sm">
                  <div className="border-b-2 border-blue-700 pb-2 mb-3 text-center">
                    <h3 className="font-bold text-base text-blue-950 font-tiro">{institution.nameBn}</h3>
                    <p className="text-[10px] text-slate-600 font-english uppercase font-semibold">নাঙ্গলকোট, কুমিল্লা • EIIN: {institution.eiin}</p>
                    <div className="mt-1 bg-blue-800 text-white text-[10px] font-bold py-0.5 rounded px-4 inline-block uppercase">
                      বার্ষিক পরীক্ষা - ২০২৬ প্রবেশপত্র (Admit Card)
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] mb-3">
                    <div className="col-span-2 space-y-1">
                      <div>শিক্ষার্থীর নাম: <strong className="font-tiro text-slate-900">{activeModalStudent.name}</strong></div>
                      <div>শ্রেণি: <strong>{activeModalStudent.className}</strong> | শাখা: <strong>{activeModalStudent.section}</strong></div>
                      <div>রোল নম্বর: <strong className="font-english text-blue-900 text-xs">{toBengaliNumber(activeModalStudent.roll)}</strong></div>
                      <div>আইডি: <strong className="font-english">{activeModalStudent.studentId}</strong></div>
                    </div>
                    <div className="col-span-1 text-right">
                      <img
                        src={activeModalStudent.photo}
                        alt={activeModalStudent.name}
                        className="w-16 h-16 rounded object-cover border border-blue-300 ml-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="border border-slate-300 rounded p-2 bg-white text-[10px] text-slate-600 mb-4">
                    <strong>নির্দেশনা:</strong> পরীক্ষা শুরুর ১৫ মিনিট পূর্বে আসন গ্রহণ করতে হবে। প্রবেশপত্র প্রদর্শন ব্যতিরেকে পরীক্ষায় অংশগ্রহণ করা যাবে না।
                  </div>

                  <div className="flex justify-between items-end text-[9px] text-slate-600 pt-2 border-t border-slate-200">
                    <div>শ্রেণি শিক্ষক</div>
                    <div>পরীক্ষা নিয়ন্ত্রক</div>
                    <div className="text-right font-bold text-slate-900">প্রধান শিক্ষক</div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4 no-print">
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => { setActiveModalStudent(null); setModalType(null); }}
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
