import React, { useState } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { QuickInfoSidebar } from '../components/layout/QuickInfoSidebar';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { institution } = useSchoolData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            যোগাযোগ ও অনুসন্ধান
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-tiro mt-1.5">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            বিদ্যালয় সংক্রান্ত যেকোনো তথ্য, ভর্তি বা অ্যাকাডেমিক জিজ্ঞাসার জন্য সরাসরি যোগাযোগ করুন
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-slate-900 block font-tiro">বিদ্যালয়ের অবস্থান:</strong>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                গ্রাম: {institution.village}, ইউনিয়ন: {institution.union}<br />
                ডাকঘর: {institution.postOffice}, উপজেলা: {institution.upazila}, জেলা: {institution.district}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-slate-900 block font-tiro">অফিসিয়াল ফোন নম্বর:</strong>
              <p className="text-xs text-slate-600 mt-1 font-english">
                মোবাইল: <strong className="text-emerald-800">{toBengaliNumber(institution.phone)}</strong><br />
                জরুরি হটলাইন: {toBengaliNumber(institution.phone)}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-slate-900 block font-tiro">ইমেইল ঠিকানা:</strong>
              <p className="text-xs text-slate-600 mt-1 font-english">
                অফিস: {institution.email}<br />
                ওয়েব: {institution.website}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-slate-900 block font-tiro">অফিস সময়সূচি:</strong>
              <p className="text-xs text-slate-600 mt-1">
                রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৪:৩০<br />
                (শুক্রবার ও শনিবার সাপ্তাহিক ছুটি)
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-5 py-3.5">
            <h2 className="font-bold text-base font-tiro flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              অনলাইন বার্তা / অভিযোগ ও মতামত প্রেরণ
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {submitted && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আপনার বার্তাটি সফলভাবে প্রধান শিক্ষক মহোদয়ের দপ্তরে পাঠানো হয়েছে। দ্রুত আপনার সাথে যোগাযোগ করা হবে।</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="উদাঃ মোঃ রফিকুল ইসলাম"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="উদাঃ 01700000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 bg-slate-50"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700">বিষয় *</label>
              <input
                type="text"
                required
                placeholder="বার্তা বা অনুসন্ধানের বিষয়"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 bg-slate-50"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700">আপনার বার্তা বিস্তারিত লিখুন *</label>
              <textarea
                rows={4}
                required
                placeholder="এখানে বিস্তারিত লিখুন..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>বার্তা পাঠান</span>
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <QuickInfoSidebar />
      </div>
    </div>
  );
};
