import React, { useState } from 'react';
import { useSchoolData } from '../../hooks/useSchoolData';
import { toBengaliNumber } from '../../utils/bengaliUtils';
import { useRouter } from '../../context/RouterContext';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  Bell,
  Image as ImageIcon,
  FileText,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  Sliders,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import {
  InstitutionInfo,
  CommitteeMember,
  TeacherStaff,
  Notice,
  PublicExamResult,
  Student,
  StudentClassOverview,
  GalleryItem,
  CustomPage
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    institution,
    updateInstitution,
    committee,
    addCommitteeMember,
    updateCommitteeMember,
    deleteCommitteeMember,
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    teacherPostSummary,
    updateTeacherPostSummary,
    students,
    addStudent,
    deleteStudent,
    studentClassOverviews,
    updateStudentClassOverview,
    publicExamResults,
    updatePublicExamResult,
    notices,
    addNotice,
    updateNotice,
    deleteNotice,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    customPages,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    settings,
    updateSettings,
    exportDataJson,
    importDataJson,
    resetToDefault
  } = useSchoolData();

  const { navigate } = useRouter();

  // Admin active tab
  const [activeTab, setActiveTab] = useState<
    'institution' | 'committee' | 'teachers' | 'students' | 'results' | 'notices' | 'gallery' | 'pages' | 'settings'
  >('institution');

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Institution form state
  const [instForm, setInstForm] = useState<InstitutionInfo>({ ...institution });

  // 2. Notice form state
  const [newNotice, setNewNotice] = useState<{
    title: string;
    category: 'একাডেমিক' | 'প্রশাসনিক' | 'পরীক্ষা' | 'ভর্তি' | 'ছুটি' | 'অন্যান্য';
    publishDate: string;
    description: string;
    fileUrl?: string;
    isPinned: boolean;
  }>({
    title: '',
    category: 'একাডেমিক',
    publishDate: new Date().toISOString().split('T')[0],
    description: '',
    isPinned: false
  });

  // 3. Committee member modal/state
  const [isAddingCommittee, setIsAddingCommittee] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<CommitteeMember | null>(null);
  const [committeeForm, setCommitteeForm] = useState<{
    name: string;
    designation: string;
    roleCategory: 'president' | 'founder' | 'donor' | 'guardian' | 'teacher_rep' | 'secretary' | 'member';
    isCurrent: boolean;
    startDate: string;
    endDate: string;
    phone: string;
    profession: string;
    qualification: string;
    photo: string;
    serialNo: number;
    committeeType: 'Regular' | 'Adhoc' | 'Special' | 'Interim';
  }>({
    name: '',
    designation: 'অভিভাবক সদস্য',
    roleCategory: 'guardian',
    isCurrent: true,
    startDate: '০১.০১.২০২৬',
    endDate: '৩১.১২.২০২৮',
    phone: '০১৭০০০০০০০০',
    profession: 'ব্যবসায়',
    qualification: 'এইচএসসি',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    serialNo: 1,
    committeeType: 'Regular'
  });

  // 4. Teacher form modal/state
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherStaff | null>(null);
  const [teacherForm, setTeacherForm] = useState<Partial<TeacherStaff>>({
    name: '',
    designation: 'সহকারী শিক্ষক',
    subject: 'সাধারণ',
    category: 'শিক্ষক',
    postCategory: 'প্যাটার্নভুক্ত পদ',
    pdsId: 'N' + Math.floor(1000000 + Math.random() * 9000000),
    indexNo: Math.floor(1000000 + Math.random() * 9000000).toString(),
    gender: 'পুরুষ',
    recruitmentType: 'NTRCA কর্তৃক সুপারিশপ্রাপ্ত',
    batchNo: '১৮তম',
    firstMpoDate: '০১/০১/২০২৩',
    firstJoinDate: '০১/০১/২০২৩',
    currentJoinDate: '০১/০১/২০২৩',
    dob: '০১/০১/১৯৯০',
    districtUpazila: 'নাঙ্গলকোট, কুমিল্লা',
    nid: '1990192837465',
    mobile: '01700000000',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  });

  // 5. Student form state
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    className: '৬ষ্ঠ শ্রেণি',
    roll: 1,
    studentId: 'ST-2026-001',
    gender: 'ছাত্র',
    fatherName: '',
    motherName: '',
    village: 'আজিয়ারা',
    section: 'ক',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  });

  // 6. Gallery form state
  const [newGallery, setNewGallery] = useState<{
    title: string;
    category: 'ক্যাম্পাস' | 'ক্রীড়া ও সাংস্কৃতিক' | 'পুরস্কার বিতরণ' | 'শ্রেণিকক্ষ ও ল্যাব' | 'জাতীয় দিবস';
    mediaUrl: string;
    mediaType: 'image' | 'video';
    date: string;
    description?: string;
  }>({
    title: '',
    category: 'ক্যাম্পাস',
    mediaUrl: '',
    mediaType: 'image',
    date: '০১/০১/২০২৬',
    description: ''
  });

  // 7. Custom Page state
  const [newPage, setNewPage] = useState<{
    title: string;
    slug: string;
    content: string;
    isPublished: boolean;
  }>({
    title: '',
    slug: '',
    content: '',
    isPublished: true
  });

  const handleSaveInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    updateInstitution(instForm);
    showNotification('প্রতিষ্ঠানের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!');
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.description) return;

    addNotice({
      id: 'not-' + Date.now(),
      noticeNo: 'নোটিশ-' + Math.floor(100 + Math.random() * 900),
      title: newNotice.title,
      category: newNotice.category,
      publishDate: newNotice.publishDate || new Date().toLocaleDateString('bn-BD'),
      expiryDate: '২০২৬-১২-৩১',
      description: newNotice.description,
      fileUrl: newNotice.fileUrl,
      isPinned: !!newNotice.isPinned
    });

    setNewNotice({
      title: '',
      category: 'একাডেমিক',
      publishDate: new Date().toISOString().split('T')[0],
      description: '',
      isPinned: false
    });
    showNotification('নতুন নোটিশ প্রকাশিত হয়েছে!');
  };

  const handleSaveCommitteeMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!committeeForm.name || !committeeForm.designation) return;

    if (editingCommittee) {
      updateCommitteeMember({
        ...editingCommittee,
        ...committeeForm
      });
      showNotification('কমিটি সদস্যের তথ্য হালনাগাদ হয়েছে!');
    } else {
      addCommitteeMember({
        id: 'cm-' + Date.now(),
        ...committeeForm
      });
      showNotification('নতুন কমিটি সদস্য যুক্ত হয়েছে!');
    }

    setIsAddingCommittee(false);
    setEditingCommittee(null);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.pdsId) return;

    if (editingTeacher) {
      updateTeacher({
        ...editingTeacher,
        ...teacherForm
      } as TeacherStaff);
      showNotification('শিক্ষক/কর্মচারীর তথ্য হালনাগাদ হয়েছে!');
    } else {
      addTeacher({
        id: 'ts-' + Date.now(),
        ...teacherForm
      } as TeacherStaff);
      showNotification('নতুন শিক্ষক/কর্মচারী যুক্ত হয়েছে!');
    }

    setIsAddingTeacher(false);
    setEditingTeacher(null);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.studentId) return;

    addStudent({
      id: 'st-' + Date.now(),
      ...newStudent
    } as Student);

    setNewStudent({
      name: '',
      className: '৬ষ্ঠ শ্রেণি',
      roll: (newStudent.roll || 0) + 1,
      studentId: 'ST-2026-' + Math.floor(100 + Math.random() * 900),
      gender: 'ছাত্র',
      fatherName: '',
      motherName: '',
      village: 'আজিয়ারা',
      section: 'ক',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    });
    showNotification('নতুন শিক্ষার্থী ডাটাবেজে যুক্ত হয়েছে!');
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.mediaUrl) return;

    addGalleryItem({
      id: 'gal-' + Date.now(),
      title: newGallery.title,
      category: newGallery.category || 'ক্যাম্পাস',
      mediaUrl: newGallery.mediaUrl,
      mediaType: newGallery.mediaType || 'image',
      date: newGallery.date || '০১/০১/২০২৬',
      description: newGallery.description
    });

    setNewGallery({ title: '', category: 'ক্যাম্পাস', mediaUrl: '', mediaType: 'image', date: '০১/০১/২০২৬', description: '' });
    showNotification('নতুন ছবি গ্যালারিতে যুক্ত হয়েছে!');
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;

    addCustomPage({
      id: 'cp-' + Date.now(),
      title: newPage.title,
      slug: newPage.slug.toLowerCase().replace(/\s+/g, '-'),
      content: newPage.content || '',
      updatedAt: new Date().toLocaleDateString('bn-BD'),
      isPublished: newPage.isPublished
    });

    setNewPage({ title: '', slug: '', content: '', isPublished: true });
    showNotification('নতুন কাস্টম পেজ তৈরি হয়েছে!');
  };

  return (
    <div className="space-y-6">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SoftDows EduWeb GCS • Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-tiro mt-2 text-white">
            {institution.nameBn} - সিএমএস ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            প্রতিষ্ঠান, শিক্ষক, কমিটি, শিক্ষার্থী, ফলাফল, নোটিশ ও গ্যালারি সম্পূর্ণ ডায়নামিক নিয়ন্ত্রণ প্যানেল
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>ওয়েবসাইট দেখুন</span>
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="bg-emerald-800 text-white p-3 rounded-xl shadow-lg border border-emerald-600 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation Submenu Tabs */}
      <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex flex-wrap gap-1.5 overflow-x-auto">
        {[
          { id: 'institution', title: 'প্রতিষ্ঠান পরিচিতি', icon: <Building2 className="w-4 h-4" /> },
          { id: 'committee', title: `পরিচালনা পরিষদ (${toBengaliNumber(committee.length)})`, icon: <Users className="w-4 h-4" /> },
          { id: 'teachers', title: `শিক্ষক ও কর্মচারী (${toBengaliNumber(teachers.length)})`, icon: <Users className="w-4 h-4" /> },
          { id: 'students', title: `শিক্ষার্থী (${toBengaliNumber(students.length)})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'results', title: 'ফলাফল ও পরীক্ষা', icon: <Award className="w-4 h-4" /> },
          { id: 'notices', title: `নোটিশ বোর্ড (${toBengaliNumber(notices.length)})`, icon: <Bell className="w-4 h-4" /> },
          { id: 'gallery', title: `গ্যালারি (${toBengaliNumber(gallery.length)})`, icon: <ImageIcon className="w-4 h-4" /> },
          { id: 'pages', title: `কাস্টম পেজ (${toBengaliNumber(customPages.length)})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'settings', title: 'ডাটাবেজ ও সেটিংস', icon: <Settings className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* 1. INSTITUTION TAB */}
      {activeTab === 'institution' && (
        <form onSubmit={handleSaveInstitution} className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              প্রতিষ্ঠানের মৌলিক ও প্রশাসনিক তথ্য হালনাগাদ
            </h2>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">প্রতিষ্ঠানের নাম (বাংলা) *</label>
              <input
                type="text"
                required
                value={instForm.nameBn}
                onChange={(e) => setInstForm({ ...instForm, nameBn: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-tiro font-bold text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Name (English Block Letter) *</label>
              <input
                type="text"
                required
                value={instForm.nameEn}
                onChange={(e) => setInstForm({ ...instForm, nameEn: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english uppercase font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">ইআইআইএন (EIIN) *</label>
              <input
                type="text"
                required
                value={instForm.eiin}
                onChange={(e) => setInstForm({ ...instForm, eiin: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">এমপিও কোড (MPO Code) *</label>
              <input
                type="text"
                required
                value={instForm.mpoCode}
                onChange={(e) => setInstForm({ ...instForm, mpoCode: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">প্রতিষ্ঠার তারিখ *</label>
              <input
                type="text"
                value={instForm.estDate}
                onChange={(e) => setInstForm({ ...instForm, estDate: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">প্রতিষ্ঠানের ধরন</label>
              <input
                type="text"
                value={instForm.instituteType}
                onChange={(e) => setInstForm({ ...instForm, instituteType: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">গ্রাম/রোড</label>
              <input
                type="text"
                value={instForm.village}
                onChange={(e) => setInstForm({ ...instForm, village: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">ইউনিয়ন</label>
              <input
                type="text"
                value={instForm.union}
                onChange={(e) => setInstForm({ ...instForm, union: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">মৌজার নাম</label>
              <input
                type="text"
                value={instForm.mouzaName}
                onChange={(e) => setInstForm({ ...instForm, mouzaName: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">দাগ নম্বর</label>
              <input
                type="text"
                value={instForm.dagNo}
                onChange={(e) => setInstForm({ ...instForm, dagNo: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">ডাকঘর</label>
              <input
                type="text"
                value={instForm.postOffice}
                onChange={(e) => setInstForm({ ...instForm, postOffice: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">উপজেলা / থানা</label>
              <input
                type="text"
                value={instForm.upazila}
                onChange={(e) => setInstForm({ ...instForm, upazila: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">জেলা</label>
              <input
                type="text"
                value={instForm.district}
                onChange={(e) => setInstForm({ ...instForm, district: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">অফিসিয়াল ফোন / মোবাইল</label>
              <input
                type="text"
                value={instForm.phone}
                onChange={(e) => setInstForm({ ...instForm, phone: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">অফিসিয়াল ইমেইল</label>
              <input
                type="email"
                value={instForm.email}
                onChange={(e) => setInstForm({ ...instForm, email: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-emerald-600 font-english"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 font-tiro">প্রধান শিক্ষক ও সভাপতি মহোদয়ের বাণী</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <label className="font-semibold text-slate-700">প্রধান শিক্ষকের নাম ও বাণী</label>
                <input
                  type="text"
                  value={instForm.headmasterName}
                  onChange={(e) => setInstForm({ ...instForm, headmasterName: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg mb-1"
                />
                <textarea
                  rows={3}
                  value={instForm.headmasterMessage}
                  onChange={(e) => setInstForm({ ...instForm, headmasterMessage: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700">সভাপতির নাম ও বাণী</label>
                <input
                  type="text"
                  value={instForm.presidentName}
                  onChange={(e) => setInstForm({ ...instForm, presidentName: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg mb-1"
                />
                <textarea
                  rows={3}
                  value={instForm.presidentMessage}
                  onChange={(e) => setInstForm({ ...instForm, presidentMessage: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>সমস্ত তথ্য সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. COMMITTEE TAB */}
      {activeTab === 'committee' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                পরিচালনা পরিষদ (ম্যানেজিং কমিটি) ব্যবস্থাপনা
              </h2>
              <p className="text-xs text-slate-500">বর্তমান ও সাবেক পরিচালনা পরিষদ সদস্যদের তথ্য যুক্ত ও সম্পাদনা করুন</p>
            </div>

            <button
              onClick={() => {
                setEditingCommittee(null);
                setCommitteeForm({
                  name: '',
                  designation: 'অভিভাবক সদস্য',
                  roleCategory: 'guardian',
                  status: 'active',
                  startDate: '০১.০১.২০২৬',
                  endDate: '৩১.১২.২০২৮',
                  phone: '০১৭০০০০০০০০',
                  profession: 'ব্যবসায়',
                  qualification: 'এইচএসসি',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                });
                setIsAddingCommittee(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সদস্য যুক্ত করুন</span>
            </button>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200 text-center w-10">ক্রম</th>
                  <th className="p-2.5 border-r border-slate-200">ছবি ও নাম</th>
                  <th className="p-2.5 border-r border-slate-200">পদবি</th>
                  <th className="p-2.5 border-r border-slate-200">মোবাইল ও পেশা</th>
                  <th className="p-2.5 border-r border-slate-200 text-center">স্ট্যাটাস</th>
                  <th className="p-2.5 border-r border-slate-200 text-center">মেয়াদ</th>
                  <th className="p-2.5 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {committee.map((m, idx) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700">{toBengaliNumber(idx + 1)}</td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <img src={m.photo} alt={m.name} className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
                        <strong className="text-slate-900 font-tiro">{m.name}</strong>
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-bold text-emerald-900">{m.designation}</td>
                    <td className="p-2.5 border-r border-slate-200 font-english">
                      <div>{toBengaliNumber(m.phone)}</div>
                      <span className="text-[10px] text-slate-500">{m.profession}</span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.isCurrent ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {m.isCurrent ? 'বর্তমান' : 'সাবেক'}
                      </span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center text-[10px]">
                      {toBengaliNumber(m.startDate)} - {toBengaliNumber(m.endDate)}
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCommittee(m);
                            setCommitteeForm({ ...m });
                            setIsAddingCommittee(true);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`আপনি কি "${m.name}" কে মুছে ফেলতে চান?`)) {
                              deleteCommitteeMember(m.id);
                              showNotification('সদস্য মুছে ফেলা হয়েছে!');
                            }
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TEACHERS TAB */}
      {activeTab === 'teachers' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-700" />
                শিক্ষক ও কর্মকর্তা-কর্মচারী ডাটাবেজ
              </h2>
              <p className="text-xs text-slate-500">সরকারি PDS ID, ইনডেক্স নম্বর ও নিয়োগের বিবরণীসহ শিক্ষক তালিকা</p>
            </div>

            <button
              onClick={() => {
                setEditingTeacher(null);
                setTeacherForm({
                  name: '',
                  designation: 'সহকারী শিক্ষক',
                  subject: 'বাংলা',
                  category: 'শিক্ষক',
                  postCategory: 'প্যাটার্নভুক্ত',
                  pdsId: 'N' + Math.floor(1000000 + Math.random() * 9000000),
                  indexNo: Math.floor(1000000 + Math.random() * 9000000).toString(),
                  gender: 'পুরুষ',
                  recruitmentType: 'এনটিআরসিএ (NTRCA)',
                  batchNo: '১৮তম',
                  firstMpoDate: '০১/০১/২০২৩',
                  firstJoinDate: '০১/০১/২০২৩',
                  currentJoinDate: '০১/০১/২০২৩',
                  dob: '০১/০১/১৯৯০',
                  districtUpazila: 'নাঙ্গলকোট, কুমিল্লা',
                  nid: '1990192837465',
                  mobile: '01700000000',
                  status: 'active',
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
                });
                setIsAddingTeacher(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন শিক্ষক/স্টাফ যুক্ত করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200 text-center w-10">ক্রম</th>
                  <th className="p-2.5 border-r border-slate-200">ছবি ও নাম</th>
                  <th className="p-2.5 border-r border-slate-200">পদবি ও বিষয়</th>
                  <th className="p-2.5 border-r border-slate-200">PDS ও Index</th>
                  <th className="p-2.5 border-r border-slate-200">ক্যাটাগরি</th>
                  <th className="p-2.5 border-r border-slate-200 text-center">স্ট্যাটাস</th>
                  <th className="p-2.5 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {teachers.map((t, idx) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700">{toBengaliNumber(idx + 1)}</td>
                    <td className="p-2.5 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
                        <div>
                          <strong className="text-slate-900 font-tiro block">{t.name}</strong>
                          <span className="text-[10px] text-slate-500 font-english">{toBengaliNumber(t.mobile)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <strong className="text-slate-900 block">{t.designation}</strong>
                      {t.subject && <span className="text-[10px] text-emerald-800 font-semibold">({t.subject})</span>}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-english font-bold text-emerald-900">
                      <div>PDS: {t.pdsId}</div>
                      <div className="text-[10px] text-slate-500 font-normal">Index: {t.indexNo}</div>
                    </td>
                    <td className="p-2.5 border-r border-slate-200">
                      <span>{t.category}</span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {t.status === 'active' ? 'কর্মরত' : 'সাবেক'}
                      </span>
                    </td>
                    <td className="p-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingTeacher(t);
                            setTeacherForm({ ...t });
                            setIsAddingTeacher(true);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`আপনি কি "${t.name}" কে মুছে ফেলতে চান?`)) {
                              deleteTeacher(t.id);
                              showNotification('শিক্ষক মুছে ফেলা হয়েছে!');
                            }
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. STUDENTS TAB */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              শিক্ষার্থী ডাটাবেজ ও নতুন শিক্ষার্থী এন্ট্রি
            </h2>
          </div>

          <form onSubmit={handleSaveStudent} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-xs text-slate-800">নতুন শিক্ষার্থী যুক্ত করুন:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">শিক্ষার্থীর নাম *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">শ্রেণি *</label>
                <select
                  value={newStudent.className}
                  onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="৬ষ্ঠ শ্রেণি">৬ষ্ঠ শ্রেণি</option>
                  <option value="৭ম শ্রেণি">৭ম শ্রেণি</option>
                  <option value="৮ম শ্রেণি">৮ম শ্রেণি</option>
                  <option value="৯ম শ্রেণি">৯ম শ্রেণি</option>
                  <option value="১০ম শ্রেণি">১০ম শ্রেণি</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">রোল নম্বর *</label>
                <input
                  type="number"
                  required
                  value={newStudent.roll}
                  onChange={(e) => setNewStudent({ ...newStudent, roll: parseInt(e.target.value) || 1 })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-english"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">আইডি (Student ID) *</label>
                <input
                  type="text"
                  required
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-english"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">পিতার নাম</label>
                <input
                  type="text"
                  value={newStudent.fatherName}
                  onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">মাতার নাম</label>
                <input
                  type="text"
                  value={newStudent.motherName}
                  onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">গ্রাম</label>
                <input
                  type="text"
                  value={newStudent.village}
                  onChange={(e) => setNewStudent({ ...newStudent, village: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </div>
          </form>

          {/* Student List View */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 border-r border-slate-200 text-center w-12">রোল</th>
                  <th className="p-2 border-r border-slate-200">নাম ও আইডি</th>
                  <th className="p-2 border-r border-slate-200">শ্রেণি ও শাখা</th>
                  <th className="p-2 border-r border-slate-200">পিতা ও গ্রাম</th>
                  <th className="p-2 text-center">মুছুন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-900 font-english">{toBengaliNumber(s.roll)}</td>
                    <td className="p-2 border-r border-slate-200">
                      <strong className="text-slate-900 font-tiro block">{s.name}</strong>
                      <span className="text-[10px] text-emerald-800 font-english">{s.studentId}</span>
                    </td>
                    <td className="p-2 border-r border-slate-200">{s.className} ({s.section})</td>
                    <td className="p-2 border-r border-slate-200">{s.fatherName}, {s.village}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি "${s.name}" কে মুছে ফেলতে চান?`)) {
                            deleteStudent(s.id);
                            showNotification('শিক্ষার্থী মুছে ফেলা হয়েছে!');
                          }
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. NOTICES TAB */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              নোটিশ ও সার্কুলার ব্যবস্থাপনা
            </h2>
          </div>

          <form onSubmit={handleSaveNotice} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">নতুন নোটিশ প্রকাশ করুন:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="উদাঃ ২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ শ্রেণিতে ভর্তি বিজ্ঞপ্তি"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-tiro font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">ক্যাটাগরি</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="ভর্তি">ভর্তি</option>
                  <option value="পরীক্ষা">পরীক্ষা</option>
                  <option value="ছুটি">ছুটি</option>
                  <option value="একাডেমিক">একাডেমিক</option>
                  <option value="প্রশাসনিক">প্রশাসনিক</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">নোটিশের বিস্তারিত বিষয়বস্তু *</label>
              <textarea
                rows={3}
                required
                placeholder="এখানে বিস্তারিত নোটিশ লিখুন..."
                value={newNotice.description}
                onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newNotice.isPinned}
                  onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-slate-700">জরুরি নোটিশ হিসেবে পিন করুন</span>
              </label>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>নোটিশ প্রকাশ করুন</span>
              </button>
            </div>
          </form>

          {/* Notices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200">তারিখ</th>
                  <th className="p-2.5 border-r border-slate-200">ক্যাটাগরি</th>
                  <th className="p-2.5 border-r border-slate-200">শিরোনাম</th>
                  <th className="p-2.5 text-center">মুছুন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-200 text-slate-600 whitespace-nowrap">{toBengaliNumber(n.publishDate)}</td>
                    <td className="p-2.5 border-r border-slate-200">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {n.category}
                      </span>
                    </td>
                    <td className="p-2.5 border-r border-slate-200 font-semibold text-slate-900 font-tiro">{n.title}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি "${n.title}" নোটিশটি মুছে ফেলতে চান?`)) {
                            deleteNotice(n.id);
                            showNotification('নোটিশ মুছে ফেলা হয়েছে!');
                          }
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. SETTINGS & ZERO-COST CLOUD BACKUP TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-tiro flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-700" />
              ডাটাবেজ ম্যানেজমেন্ট ও জিরো-হোস্টিং সিঙ্ক (Zero-Cost Sync)
            </h2>
            <p className="text-xs text-slate-500">
              SoftDows EduWeb GCS আর্কিটেকচার অনুযায়ী সম্পূর্ণ স্কুলের ডাটাবেজ এক ক্লিকে JSON এক্সপোর্ট/ইমপোর্ট ও ব্যাকআপ করুন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Download className="w-5 h-5 text-emerald-700" />
                <span>সম্পূর্ণ ওয়েবসাইট ডাটাবেজ ব্যাকআপ (JSON Export)</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                প্রতিষ্ঠান, শিক্ষক, কমিটি, শিক্ষার্থী, ফলাফল এবং নোটিশসহ সমস্ত তথ্যের একটি কমপ্লিট ব্যাকআপ ফাইল নামিয়ে সংরক্ষণ করুন।
              </p>
              <button
                onClick={() => {
                  const dataStr = exportDataJson();
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `azhs-eduweb-backup-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                  showNotification('ডাটাবেজ ব্যাকআপ সফলভাবে ডাউনলোড হয়েছে!');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>ডাটাবেজ ডাউনলোড করুন (Export JSON)</span>
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <RefreshCw className="w-5 h-5 text-slate-700" />
                <span>ডিফল্ট ডাটা রিসেট (Restore Default Data)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রদত্ত সরকারি ও স্কুল ডাটাবেজের মূল নমুনা তথ্যে ফিরে যেতে এই বাটনে ক্লিক করুন।
              </p>
              <button
                onClick={() => {
                  if (confirm('আপনি কি নিশ্চিত যে সকল ডাটা রিসেট করে ডিফল্ট ডাটাবেজে ফিরে যেতে চান?')) {
                    resetToDefault();
                    showNotification('ডাটাবেজ সফলভাবে ডিফল্ট সেটিংসে রিসেট হয়েছে!');
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>ডিফল্ট তথ্যে রিসেট করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMMITTEE MODAL */}
      {isAddingCommittee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm font-tiro">
                {editingCommittee ? 'কমিটি সদস্য সম্পাদনা' : 'নতুন কমিটি সদস্য যোগ করুন'}
              </h3>
              <button onClick={() => setIsAddingCommittee(false)} className="text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleSaveCommitteeMember} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">সদস্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={committeeForm.name}
                  onChange={(e) => setCommitteeForm({ ...committeeForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">পদবি *</label>
                  <input
                    type="text"
                    required
                    value={committeeForm.designation}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, designation: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">পদ ক্যাটাগরি *</label>
                  <select
                    value={committeeForm.roleCategory}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, roleCategory: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="president">সভাপতি</option>
                    <option value="founder">প্রতিষ্ঠাতা সদস্য</option>
                    <option value="donor">দাতা সদস্য</option>
                    <option value="guardian">অভিভাবক সদস্য</option>
                    <option value="teacher_rep">শিক্ষক প্রতিনিধি</option>
                    <option value="secretary">সদস্য সচিব</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">কমিটি পদবি স্ট্যাটাস *</label>
                  <select
                    value={committeeForm.isCurrent ? 'true' : 'false'}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, isCurrent: e.target.value === 'true' })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="true">বর্তমান সক্রিয় কমিটি</option>
                    <option value="false">সাবেক সদস্য</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    value={committeeForm.phone}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-english"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">মেয়াদ শুরু</label>
                  <input
                    type="text"
                    value={committeeForm.startDate}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, startDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">মেয়াদ শেষ</label>
                  <input
                    type="text"
                    value={committeeForm.endDate}
                    onChange={(e) => setCommitteeForm({ ...committeeForm, endDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingCommittee(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-lg"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEACHER MODAL */}
      {isAddingTeacher && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm font-tiro">
                {editingTeacher ? 'শিক্ষক/কর্মচারী তথ্য সম্পাদনা' : 'নতুন শিক্ষক/কর্মচারী যোগ করুন'}
              </h3>
              <button onClick={() => setIsAddingTeacher(false)} className="text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleSaveTeacher} className="p-5 space-y-3 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">শিক্ষক/কর্মচারীর নাম *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">পদবি *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.designation}
                    onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">বিষয়</label>
                  <input
                    type="text"
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">সরকারি PDS ID *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.pdsId}
                    onChange={(e) => setTeacherForm({ ...teacherForm, pdsId: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-english"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ইনডেক্স নম্বর</label>
                  <input
                    type="text"
                    value={teacherForm.indexNo}
                    onChange={(e) => setTeacherForm({ ...teacherForm, indexNo: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-english"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={teacherForm.category}
                    onChange={(e) => setTeacherForm({ ...teacherForm, category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="প্রশাসনিক">প্রশাসনিক</option>
                    <option value="শিক্ষক">শিক্ষক</option>
                    <option value="৩য় শ্রেণীর কর্মচারী">৩য় শ্রেণীর কর্মচারী</option>
                    <option value="৪র্থ শ্রেণীর কর্মচারী">৪র্থ শ্রেণীর কর্মচারী</option>
                    <option value="অতিরিক্ত শিক্ষক/কর্মচারী">অতিরিক্ত শিক্ষক/কর্মচারী</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">স্ট্যাটাস</label>
                  <select
                    value={teacherForm.status}
                    onChange={(e) => setTeacherForm({ ...teacherForm, status: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="active">কর্মরত (Active)</option>
                    <option value="retired">অবসরপ্রাপ্ত</option>
                    <option value="transferred">বদলিকৃত</option>
                    <option value="resigned">পদত্যাগকৃত</option>
                    <option value="deceased">প্রয়াত</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingTeacher(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-lg"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
