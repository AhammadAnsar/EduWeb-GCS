import React from 'react';
import { useSchoolData } from '../../hooks/useSchoolData';
import { useRouter } from '../../context/RouterContext';
import { toBengaliNumber } from '../../utils/bengaliUtils';
import {
  ExternalLink,
  PhoneCall,
  User,
  Award,
  BookOpen,
  Calendar,
  FileCheck,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export const QuickInfoSidebar: React.FC = () => {
  const { institution, currentCommittee } = useSchoolData();
  const { navigate } = useRouter();

  const president = currentCommittee.find(m => m.roleCategory === 'president') || {
    name: institution.presidentName,
    designation: 'সভাপতি, গভর্নিং বডি',
    photo: institution.presidentPhoto
  };

  const importantLinks = [
    { title: 'শিক্ষা মন্ত্রণালয় (MoE)', url: 'https://moedu.gov.bd' },
    { title: 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE)', url: 'http://www.dshe.gov.bd' },
    { title: 'মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, কুমিল্লা', url: 'https://comillaboard.portal.gov.bd' },
    { title: 'বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ (NTRCA)', url: 'http://www.ntrca.gov.bd' },
    { title: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)', url: 'http://www.nctb.gov.bd' },
    { title: 'বাংলাদেশ শিক্ষাতথ্য ও পরিসংখ্যান ব্যুরো (BANBEIS)', url: 'http://www.banbeis.gov.bd' },
    { title: 'প্রধানমন্ত্রী শিক্ষা সহায়তা ট্রাস্ট', url: 'http://www.pmeat.gov.bd' }
  ];

  const emergencyHelplines = [
    { name: 'জাতীয় জরুরি সেবা', number: '৯৯৯', color: 'bg-red-500 text-white' },
    { name: 'সরকারি তথ্য ও সেবা', number: '৩৩৩', color: 'bg-emerald-600 text-white' },
    { name: 'নারী ও শিশু নির্যাতন প্রতিরোধ', number: '১০৯', color: 'bg-purple-600 text-white' },
    { name: 'শিশু সহায়তা হেল্পলাইন', number: '১০৯৮', color: 'bg-blue-600 text-white' },
    { name: 'দুদক অভিযোগ কেন্দ্র', number: '১০৬', color: 'bg-amber-600 text-white' }
  ];

  return (
    <aside className="space-y-5">
      {/* 1. Headmaster Message Widget */}
      <div className="bg-white rounded-xl shadow-xs border border-emerald-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white px-4 py-2.5 flex items-center justify-between">
          <h3 className="font-bold text-sm font-tiro flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-300" />
            প্রধান শিক্ষকের বাণী
          </h3>
        </div>
        <div className="p-4 text-center">
          <div className="relative inline-block mx-auto mb-3">
            <img
              src={institution.headmasterPhoto}
              alt={institution.headmasterName}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100 shadow-sm mx-auto"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1 rounded-full text-xs shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <h4 className="font-bold text-slate-900 text-base font-tiro">
            {institution.headmasterName}
          </h4>
          <p className="text-xs text-emerald-800 font-semibold mb-2.5">
            প্রধান শিক্ষক, {institution.nameBn}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-4 mb-3 italic">
            "{institution.headmasterMessage}"
          </p>
          <button
            onClick={() => navigate('/about')}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline inline-flex items-center gap-1 cursor-pointer"
          >
            সম্পূর্ণ বাণী পড়ুন →
          </button>
        </div>
      </div>

      {/* 2. President Message Widget */}
      <div className="bg-white rounded-xl shadow-xs border border-emerald-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-emerald-900 text-white px-4 py-2.5 flex items-center justify-between">
          <h3 className="font-bold text-sm font-tiro flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            সভাপতির বাণী
          </h3>
        </div>
        <div className="p-4 text-center">
          <div className="relative inline-block mx-auto mb-3">
            <img
              src={president.photo || institution.presidentPhoto}
              alt={president.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-100 shadow-sm mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <h4 className="font-bold text-slate-900 text-base font-tiro">
            {president.name}
          </h4>
          <p className="text-xs text-emerald-800 font-semibold mb-2.5">
            সভাপতি, ম্যানেজিং কমিটি
          </p>
          <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-4 mb-3 italic">
            "{institution.presidentMessage}"
          </p>
          <button
            onClick={() => navigate('/committee')}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline inline-flex items-center gap-1 cursor-pointer"
          >
            কমিটি ও বাণী দেখুন →
          </button>
        </div>
      </div>

      {/* 3. Mujib Corner & National Pride */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-950 text-white rounded-xl p-4 shadow-sm border border-emerald-700">
        <div className="flex items-center gap-2 mb-2">
          <HeartHandshake className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-sm font-tiro text-amber-300">মুজিব কর্নার ও জাতীয় ঐতিহ্য</h3>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed mb-3">
          "সোনার বাংলা গড়তে হলে সোনার মানুষ চাই। আর সোনার মানুষ তৈরি করে আমাদের শিক্ষক সমাজ।"
        </p>
        <div className="text-[11px] bg-emerald-800/80 p-2 rounded border border-emerald-600 text-emerald-200">
          📍 জাতীয় শিক্ষা সপ্তাহ ও সাহিত্য-সাংস্কৃতিক কার্যক্রমে নিয়মিত অংশগ্রহণ।
        </div>
      </div>

      {/* 4. Quick Links Widget */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5">
          <h3 className="font-bold text-sm text-slate-800 font-tiro flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            গুরুত্বপূর্ণ সরকারি ওয়েবসাইট
          </h3>
        </div>
        <ul className="divide-y divide-slate-100 text-xs">
          {importantLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 flex items-center justify-between text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors"
              >
                <span>{link.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. National Emergency Helplines */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-rose-50 border-b border-rose-100 px-4 py-2.5">
          <h3 className="font-bold text-sm text-rose-900 font-tiro flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            জরুরি হেল্পলাইন নম্বর
          </h3>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          {emergencyHelplines.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
            >
              <span className="text-xs font-medium text-slate-700">{item.name}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.color}`}>
                {item.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
