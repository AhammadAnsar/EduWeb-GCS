export interface InstitutionInfo {
  nameBn: string;
  nameEn: string;
  eiin: string;
  mpoCode: string;
  village: string;
  union: string;
  postOffice: string;
  upazila: string;
  district: string;
  region: string;
  mouzaName: string;
  dagNo: string;
  estDate: string;
  instituteType: string;
  typeCategory: string;
  groups: string[];
  genderType: string;
  shiftCount: string;
  management: string;
  recognitionStatus: string;
  recognitionLevel: string;
  firstRecognitionDate: string;
  lastRecognitionExpiry: string;
  isMpo: string;
  isVocationalMpo: string;
  mpoLevel: string;
  mpoDate: string;
  phone: string;
  email: string;
  website: string;
  headmasterName: string;
  headmasterMessage: string;
  headmasterPhoto: string;
  presidentName: string;
  presidentMessage: string;
  presidentPhoto: string;
  logoUrl: string;
  heroBannerUrl: string;
  historyText: string;
  missionVision: string;
  googleMapEmbedUrl: string;
}

export interface CommitteeMember {
  id: string;
  serialNo: number;
  designation: string; // সভাপতি, প্রতিষ্ঠাতা সদস্য, দাতা সদস্য, অভিভাবক সদস্য, সংরক্ষিত মহিলা অভিভাবক সদস্য, সাধারণ শিক্ষক প্রতিনিধি, সংরক্ষিত মহিলা শিক্ষক প্রতিনিধি, সদস্য সচিব
  name: string;
  photo: string;
  profession: string;
  qualification: string;
  phone: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  committeeType: 'Regular' | 'Adhoc' | 'Special' | 'Interim';
  roleCategory: 'president' | 'founder' | 'donor' | 'guardian' | 'teacher_rep' | 'secretary' | 'member';
}

export interface CommitteeOverview {
  committeeType: string;
  totalMembers: number;
  approvalDate: string;
  expiryDate: string;
}

export interface TeacherPostSummary {
  id: string;
  postType: string; // প্রধান শিক্ষক, সহকারী প্রধান শিক্ষক, সিনিয়র শিক্ষক / সহকারী শিক্ষক, অফিস স্টাফ, সাপোর্ট স্টাফ
  approved: number;
  working: number;
  mpo: number;
  extra: number;
  partTime: number;
  contractual: number;
}

export interface TeacherStaff {
  id: string;
  category: 'প্রশাসনিক' | 'শিক্ষক' | 'অতিরিক্ত শিক্ষক/কর্মচারী' | '৩য় শ্রেণীর কর্মচারী' | '৪র্থ শ্রেণীর কর্মচারী';
  postCategory: 'প্যাটার্নভুক্ত পদ' | 'অতিরিক্ত শিক্ষক/কর্মচারী' | 'খন্ডকালীন' | 'চুক্তিভিত্তিক';
  designation: string; // প্রধান শিক্ষক, সহকারী প্রধান শিক্ষক, সিনিয়র শিক্ষক/সহকারী শিক্ষক, অফিস সহকারী কাম কম্পিউটার অপারেটর, নিরাপত্তাকর্মী, পরিচ্ছন্নতাকর্মী, নৈশ প্রহরী, আয়া, অফিস সহায়ক
  subject?: string;
  pdsId: string; // C1003642, N1065809 etc. (Used for Teacher Portal Login)
  indexNo: string;
  name: string;
  gender: 'পুরুষ' | 'নারী';
  recruitmentType: 'কমিটি কর্তৃক নিয়োগপ্রাপ্ত' | 'NTRCA কর্তৃক সুপারিশপ্রাপ্ত' | 'সরকারি নিয়োগপ্রাপ্ত';
  batchNo: string;
  firstMpoDate: string;
  firstJoinDate: string;
  currentJoinDate: string;
  dob: string;
  districtUpazila: string;
  nid: string;
  mobile: string;
  photo: string;
  email?: string;
  bloodGroup?: string;
  education?: string;
  status: 'active' | 'retired' | 'transferred' | 'resigned' | 'deceased' | 'terminated';
  departureDate?: string;
  departureReason?: string;
  bio?: string;
}

export interface StudentClassOverview {
  id: string;
  className: string; // 6th, 7 th, 8 th, 9 th, 10 th
  group?: string; // Science, Business Study, Humanities
  maleCount: number;
  femaleCount: number;
  totalCount: number;
  maleStipend: number;
  femaleStipend: number;
  maleRepeater: number;
  femaleRepeater: number;
  maleScholarship: number;
  femaleScholarship: number;
  transferIn: number;
  transferOut: number;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  fatherName: string;
  motherName: string;
  village: string;
  className: string;
  group?: string;
  section?: string;
  roll: number;
  session: string;
  photo: string;
  gender: 'ছাত্র' | 'ছাত্রী';
  dob?: string;
  phone?: string;
  guardianMobile?: string;
  bloodGroup?: string;
}

export interface PublicExamResult {
  id: string;
  year: number;
  examType: 'SSC' | 'JSC' | 'VOC';
  registeredMale: number;
  registeredFemale: number;
  regularMale: number;
  regularFemale: number;
  irregularMale: number;
  irregularFemale: number;
  gpa5: number;
  gpa4_5: number;
  gpa3_5_4: number;
  gpa3_3_5: number;
  gpa2_3: number;
  gpa1_2: number;
  totalPassMale: number;
  totalPassFemale: number;
}

export interface InternalExamResult {
  id: string;
  year: number;
  examName: string; // অর্ধবার্ষিক পরীক্ষা, বার্ষিক পরীক্ষা, নির্বাচনী পরীক্ষা
  className: string;
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  highestGpa: number;
  publishDate: string;
  pdfUrl?: string;
}

export interface Notice {
  id: string;
  noticeNo: string;
  title: string;
  category: 'একাডেমিক' | 'প্রশাসনিক' | 'পরীক্ষা' | 'ভর্তি' | 'ছুটি' | 'অন্যান্য';
  publishDate: string;
  expiryDate: string;
  fileUrl?: string;
  fileName?: string;
  description?: string;
  isPinned?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ক্যাম্পাস' | 'ক্রীড়া ও সাংস্কৃতিক' | 'পুরস্কার বিতরণ' | 'শ্রেণিকক্ষ ও ল্যাব' | 'জাতীয় দিবস';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  date: string;
  description?: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface RoutineItem {
  id: string;
  title: string;
  type: 'ক্লাস রুটিন' | 'পরীক্ষার রুটিন' | 'একাডেমিক ক্যালেন্ডার' | 'সিলেবাস';
  className?: string;
  publishDate: string;
  fileUrl?: string;
  description?: string;
}

export interface SiteSettings {
  themeColor: 'emerald' | 'blue' | 'indigo' | 'rose' | 'teal';
  marqueeText: string;
  emergencyHotline: string;
  contactEmail: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}
