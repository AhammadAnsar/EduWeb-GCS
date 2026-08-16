import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { TeacherStaff } from '../types';
import {
  IdCard,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Lock,
  LogOut,
  Save,
  CheckCircle,
  FileSpreadsheet,
  Award,
  BookOpen,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';

export const TeacherPortalPage: React.FC = () => {
  const { teachers, updateTeacher, institution } = useSchoolData();
  const [pdsInput, setPdsInput] = useState('');
  const [loggedInTeacher, setLoggedInTeacher] = useState<TeacherStaff | null>(null);
  const [editBio, setEditBio] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = pdsInput.trim();
    const found = teachers.find(
      (t) => t.pdsId.toLowerCase() === cleanId.toLowerCase() || t.indexNo.toLowerCase() === cleanId.toLowerCase()
    );

    if (found) {
      setLoggedInTeacher(found);
      setEditBio(found.bio || '');
      setEditMobile(found.mobile || '');
      setEditEmail(found.email || '');
      setErrorMessage('');
    } else {
      setErrorMessage('প্রদত্ত PDS ID অথবা Index নম্বরটি পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি দিন (উদাঃ C1003642, N1065809, C440637)।');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInTeacher) return;

    const updated = {
      ...loggedInTeacher,
      bio: editBio,
      mobile: editMobile,
      email: editEmail
    };

    updateTeacher(updated);
    setLoggedInTeacher(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Portal Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-6 rounded-2xl shadow-md border border-emerald-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold bg-emerald-700 text-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            শিক্ষক ও কর্মচারী সেলফ সার্ভিস পোর্টাল
          </span>
          <h1 className="text-2xl font-bold font-tiro mt-2 text-white">
            {institution.nameBn} - শিক্ষক ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-emerald-200 mt-0.5">
            পিডিএস (PDS) আইডি দিয়ে লগইন করে ব্যক্তিগত সার্ভিস রেকর্ড ও বায়োডাটা হালনাগাদ করুন
          </p>
        </div>

        {loggedInTeacher && (
          <button
            onClick={() => setLoggedInTeacher(null)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        )}
      </div>

      {!loggedInTeacher ? (
        /* Login Screen */
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <IdCard className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-tiro">শিক্ষক লগইন</h2>
            <p className="text-xs text-slate-500 mt-1">আপনার সরকারি PDS ID বা Index নম্বর প্রদান করুন</p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg mb-4 leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                PDS ID বা Index নম্বর *
              </label>
              <input
                type="text"
                required
                placeholder="উদাঃ C1003642, N1065809, C440637"
                value={pdsInput}
                onChange={(e) => setPdsInput(e.target.value)}
                className="w-full text-sm font-english p-3 border border-slate-300 rounded-xl focus:outline-emerald-600 uppercase"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                ডেমো আইডি: <strong>C1003642</strong> (প্রধান শিক্ষক), <strong>N1065809</strong> (সহকারী প্রধান), <strong>C440637</strong> (সিনিয়র শিক্ষক)
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <UserCheck className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>
          </form>
        </div>
      ) : (
        /* Teacher Dashboard View */
        <div className="space-y-6">
          {/* 1. Teacher Digital Service Record Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={loggedInTeacher.photo}
                  alt={loggedInTeacher.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-bold font-tiro text-white">{loggedInTeacher.name}</h2>
                  <p className="text-xs text-emerald-300 font-semibold">{loggedInTeacher.designation} {loggedInTeacher.subject && `(${loggedInTeacher.subject})`}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{loggedInTeacher.category} • {loggedInTeacher.postCategory}</p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="bg-emerald-800 text-white font-bold px-3 py-1 rounded-full font-english inline-block">
                  PDS ID: {loggedInTeacher.pdsId}
                </span>
                <span className="block text-slate-400 mt-1 font-english">
                  Index No: {loggedInTeacher.indexNo}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-bold text-slate-900 font-tiro mb-3 border-b border-slate-100 pb-2">
                ব্যক্তিগত ও প্রাতিষ্ঠানিক সার্ভিস প্রোফাইল (Service Record)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">নিয়োগের ধরন ও ব্যাচ:</span>
                  <strong className="text-slate-800">{loggedInTeacher.recruitmentType} {loggedInTeacher.batchNo && `(${loggedInTeacher.batchNo})`}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">প্রথম এমপিও তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(loggedInTeacher.firstMpoDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">প্রথম যোগদানের তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(loggedInTeacher.firstJoinDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">বর্তমান প্রতিষ্ঠানে যোগদান:</span>
                  <strong className="text-slate-800">{toBengaliNumber(loggedInTeacher.currentJoinDate)}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">জন্ম তারিখ:</span>
                  <strong className="text-slate-800">{toBengaliNumber(loggedInTeacher.dob)}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">নিজ জেলা ও উপজেলা:</span>
                  <strong className="text-slate-800">{loggedInTeacher.districtUpazila}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">জাতীয় পরিচয়পত্র (NID):</span>
                  <strong className="text-slate-800 font-english">{loggedInTeacher.nid}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">শিক্ষাগত যোগ্যতা:</span>
                  <strong className="text-slate-800">{loggedInTeacher.education}</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">সার্ভিস স্ট্যাটাস:</span>
                  <strong className="text-emerald-700 font-bold">সক্রিয় ও কর্মরত (Active)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Self-service editable fields */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 font-tiro mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-700" />
              ব্যক্তিগত তথ্য ও পরিচিতি হালনাগাদ
            </h3>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-lg text-xs font-semibold mb-4 flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>আপনার তথ্যাবলি সফলভাবে সংরক্ষিত ও ওয়েবসাইটে হালনাগাদ করা হয়েছে!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">পরিচিতি / দায়িত্বের বিবরণ (Bio)</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
                  placeholder="বিদ্যালয়ে আপনার বিশেষ দায়িত্ব বা পরিচিতি..."
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>তথ্য সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
