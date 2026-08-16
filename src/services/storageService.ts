import {
  InstitutionInfo,
  CommitteeMember,
  CommitteeOverview,
  TeacherPostSummary,
  TeacherStaff,
  StudentClassOverview,
  Student,
  PublicExamResult,
  InternalExamResult,
  Notice,
  GalleryItem,
  CustomPage,
  RoutineItem,
  SiteSettings
} from '../types';

import {
  initialInstitution,
  initialCommitteeOverview,
  initialCommitteeMembers,
  initialTeacherPostSummary,
  initialTeachersAndStaff,
  initialStudentClassOverviews,
  initialStudents,
  initialPublicExamResults,
  initialInternalExamResults,
  initialNotices,
  initialGallery,
  initialRoutines,
  initialCustomPages,
  initialSettings
} from '../data/initialData';

const STORAGE_KEYS = {
  INSTITUTION: 'softdows_edu_institution',
  COMMITTEE_OVERVIEW: 'softdows_edu_committee_overview',
  COMMITTEE_MEMBERS: 'softdows_edu_committee_members',
  TEACHER_POST_SUMMARY: 'softdows_edu_teacher_post_summary',
  TEACHERS_AND_STAFF: 'softdows_edu_teachers_and_staff',
  STUDENT_CLASS_OVERVIEWS: 'softdows_edu_student_class_overviews',
  STUDENTS: 'softdows_edu_students',
  PUBLIC_EXAM_RESULTS: 'softdows_edu_public_exam_results',
  INTERNAL_EXAM_RESULTS: 'softdows_edu_internal_exam_results',
  NOTICES: 'softdows_edu_notices',
  GALLERY: 'softdows_edu_gallery',
  ROUTINES: 'softdows_edu_routines',
  CUSTOM_PAGES: 'softdows_edu_custom_pages',
  SETTINGS: 'softdows_edu_settings'
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const subscribeToDataChanges = (callback: Listener) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying listener:', e);
    }
  });
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading localStorage key ${key}:`, error);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (error) {
    console.error(`Error writing localStorage key ${key}:`, error);
  }
}

export const StorageService = {
  // 1. Institution
  getInstitution(): InstitutionInfo {
    return getStoredItem(STORAGE_KEYS.INSTITUTION, initialInstitution);
  },
  updateInstitution(data: Partial<InstitutionInfo>): InstitutionInfo {
    const current = this.getInstitution();
    const updated = { ...current, ...data };
    setStoredItem(STORAGE_KEYS.INSTITUTION, updated);
    return updated;
  },

  // 2. Committee Overview
  getCommitteeOverview(): CommitteeOverview {
    return getStoredItem(STORAGE_KEYS.COMMITTEE_OVERVIEW, initialCommitteeOverview);
  },
  updateCommitteeOverview(data: Partial<CommitteeOverview>): CommitteeOverview {
    const current = this.getCommitteeOverview();
    const updated = { ...current, ...data };
    setStoredItem(STORAGE_KEYS.COMMITTEE_OVERVIEW, updated);
    return updated;
  },

  // 3. Committee Members
  getCommitteeMembers(): CommitteeMember[] {
    return getStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, initialCommitteeMembers);
  },
  getCurrentCommitteeMembers(): CommitteeMember[] {
    return this.getCommitteeMembers().filter((m) => m.isCurrent);
  },
  getFormerCommitteeMembers(): CommitteeMember[] {
    return this.getCommitteeMembers().filter((m) => !m.isCurrent);
  },
  addCommitteeMember(member: Omit<CommitteeMember, 'id'>): CommitteeMember {
    const members = this.getCommitteeMembers();
    const newMember: CommitteeMember = {
      ...member,
      id: 'comm-' + Date.now() + Math.random().toString(36).substring(2, 6)
    };
    members.push(newMember);
    setStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, members);
    return newMember;
  },
  updateCommitteeMember(id: string, data: Partial<CommitteeMember>): boolean {
    const members = this.getCommitteeMembers();
    const index = members.findIndex((m) => m.id === id);
    if (index !== -1) {
      members[index] = { ...members[index], ...data };
      setStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, members);
      return true;
    }
    return false;
  },
  deleteCommitteeMember(id: string): boolean {
    const members = this.getCommitteeMembers();
    const filtered = members.filter((m) => m.id !== id);
    if (filtered.length !== members.length) {
      setStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, filtered);
      return true;
    }
    return false;
  },

  // 4. Teacher Post Summary
  getTeacherPostSummary(): TeacherPostSummary[] {
    return getStoredItem(STORAGE_KEYS.TEACHER_POST_SUMMARY, initialTeacherPostSummary);
  },
  updateTeacherPostSummary(summary: TeacherPostSummary[]): void {
    setStoredItem(STORAGE_KEYS.TEACHER_POST_SUMMARY, summary);
  },

  // 5. Teachers and Staff
  getTeachersAndStaff(): TeacherStaff[] {
    return getStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, initialTeachersAndStaff);
  },
  getActiveTeachersAndStaff(): TeacherStaff[] {
    return this.getTeachersAndStaff().filter((s) => s.status === 'active');
  },
  getFormerTeachersAndStaff(): TeacherStaff[] {
    return this.getTeachersAndStaff().filter((s) => s.status !== 'active');
  },
  getTeacherByPdsId(pdsId: string): TeacherStaff | undefined {
    return this.getTeachersAndStaff().find((s) => s.pdsId.toLowerCase() === pdsId.toLowerCase());
  },
  addTeacherOrStaff(staff: Omit<TeacherStaff, 'id'>): TeacherStaff {
    const all = this.getTeachersAndStaff();
    const newStaff: TeacherStaff = {
      ...staff,
      id: 'staff-' + Date.now() + Math.random().toString(36).substring(2, 6)
    };
    all.push(newStaff);
    setStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, all);
    return newStaff;
  },
  updateTeacherOrStaff(id: string, data: Partial<TeacherStaff>): boolean {
    const all = this.getTeachersAndStaff();
    const index = all.findIndex((s) => s.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, all);
      return true;
    }
    return false;
  },
  deleteTeacherOrStaff(id: string): boolean {
    const all = this.getTeachersAndStaff();
    const filtered = all.filter((s) => s.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, filtered);
      return true;
    }
    return false;
  },

  // 6. Student Class Overviews
  getStudentClassOverviews(): StudentClassOverview[] {
    return getStoredItem(STORAGE_KEYS.STUDENT_CLASS_OVERVIEWS, initialStudentClassOverviews);
  },
  updateStudentClassOverviews(data: StudentClassOverview[]): void {
    setStoredItem(STORAGE_KEYS.STUDENT_CLASS_OVERVIEWS, data);
  },
  addStudentClassOverview(item: Omit<StudentClassOverview, 'id'>): StudentClassOverview {
    const all = this.getStudentClassOverviews();
    const newItem: StudentClassOverview = {
      ...item,
      id: 'ov-' + Date.now()
    };
    all.push(newItem);
    setStoredItem(STORAGE_KEYS.STUDENT_CLASS_OVERVIEWS, all);
    return newItem;
  },

  // 7. Students Directory
  getStudents(): Student[] {
    return getStoredItem(STORAGE_KEYS.STUDENTS, initialStudents);
  },
  addStudent(student: Omit<Student, 'id'>): Student {
    const all = this.getStudents();
    const newStudent: Student = {
      ...student,
      id: 'std-' + Date.now() + Math.random().toString(36).substring(2, 6)
    };
    all.push(newStudent);
    setStoredItem(STORAGE_KEYS.STUDENTS, all);
    return newStudent;
  },
  updateStudent(id: string, data: Partial<Student>): boolean {
    const all = this.getStudents();
    const index = all.findIndex((s) => s.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.STUDENTS, all);
      return true;
    }
    return false;
  },
  deleteStudent(id: string): boolean {
    const all = this.getStudents();
    const filtered = all.filter((s) => s.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.STUDENTS, filtered);
      return true;
    }
    return false;
  },

  // 8. Public Exam Results
  getPublicExamResults(): PublicExamResult[] {
    return getStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, initialPublicExamResults);
  },
  addPublicExamResult(res: Omit<PublicExamResult, 'id'>): PublicExamResult {
    const all = this.getPublicExamResults();
    const newRes: PublicExamResult = {
      ...res,
      id: 'res-' + Date.now()
    };
    all.unshift(newRes);
    setStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, all);
    return newRes;
  },
  updatePublicExamResult(id: string, data: Partial<PublicExamResult>): boolean {
    const all = this.getPublicExamResults();
    const index = all.findIndex((r) => r.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, all);
      return true;
    }
    return false;
  },
  deletePublicExamResult(id: string): boolean {
    const all = this.getPublicExamResults();
    const filtered = all.filter((r) => r.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, filtered);
      return true;
    }
    return false;
  },

  // 9. Internal Exam Results
  getInternalExamResults(): InternalExamResult[] {
    return getStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, initialInternalExamResults);
  },
  addInternalExamResult(res: Omit<InternalExamResult, 'id'>): InternalExamResult {
    const all = this.getInternalExamResults();
    const newRes: InternalExamResult = {
      ...res,
      id: 'int-' + Date.now()
    };
    all.unshift(newRes);
    setStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, all);
    return newRes;
  },
  updateInternalExamResult(id: string, data: Partial<InternalExamResult>): boolean {
    const all = this.getInternalExamResults();
    const index = all.findIndex((r) => r.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, all);
      return true;
    }
    return false;
  },
  deleteInternalExamResult(id: string): boolean {
    const all = this.getInternalExamResults();
    const filtered = all.filter((r) => r.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, filtered);
      return true;
    }
    return false;
  },

  // 10. Notices
  getNotices(): Notice[] {
    return getStoredItem(STORAGE_KEYS.NOTICES, initialNotices);
  },
  getNoticeById(id: string): Notice | undefined {
    return this.getNotices().find((n) => n.id === id);
  },
  addNotice(notice: Omit<Notice, 'id'>): Notice {
    const all = this.getNotices();
    const newNotice: Notice = {
      ...notice,
      id: 'not-' + Date.now()
    };
    all.unshift(newNotice);
    setStoredItem(STORAGE_KEYS.NOTICES, all);
    return newNotice;
  },
  updateNotice(id: string, data: Partial<Notice>): boolean {
    const all = this.getNotices();
    const index = all.findIndex((n) => n.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.NOTICES, all);
      return true;
    }
    return false;
  },
  deleteNotice(id: string): boolean {
    const all = this.getNotices();
    const filtered = all.filter((n) => n.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.NOTICES, filtered);
      return true;
    }
    return false;
  },

  // 11. Gallery
  getGallery(): GalleryItem[] {
    return getStoredItem(STORAGE_KEYS.GALLERY, initialGallery);
  },
  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const all = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now()
    };
    all.unshift(newItem);
    setStoredItem(STORAGE_KEYS.GALLERY, all);
    return newItem;
  },
  deleteGalleryItem(id: string): boolean {
    const all = this.getGallery();
    const filtered = all.filter((g) => g.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.GALLERY, filtered);
      return true;
    }
    return false;
  },

  // 12. Routines & Syllabus
  getRoutines(): RoutineItem[] {
    return getStoredItem(STORAGE_KEYS.ROUTINES, initialRoutines);
  },
  addRoutine(routine: Omit<RoutineItem, 'id'>): RoutineItem {
    const all = this.getRoutines();
    const newItem: RoutineItem = {
      ...routine,
      id: 'rt-' + Date.now()
    };
    all.unshift(newItem);
    setStoredItem(STORAGE_KEYS.ROUTINES, all);
    return newItem;
  },
  deleteRoutine(id: string): boolean {
    const all = this.getRoutines();
    const filtered = all.filter((r) => r.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.ROUTINES, filtered);
      return true;
    }
    return false;
  },

  // 13. Custom Pages
  getCustomPages(): CustomPage[] {
    return getStoredItem(STORAGE_KEYS.CUSTOM_PAGES, initialCustomPages);
  },
  getPageBySlug(slug: string): CustomPage | undefined {
    return this.getCustomPages().find((p) => p.slug === slug);
  },
  addCustomPage(page: Omit<CustomPage, 'id'>): CustomPage {
    const all = this.getCustomPages();
    const newPage: CustomPage = {
      ...page,
      id: 'pg-' + Date.now()
    };
    all.push(newPage);
    setStoredItem(STORAGE_KEYS.CUSTOM_PAGES, all);
    return newPage;
  },
  updateCustomPage(id: string, data: Partial<CustomPage>): boolean {
    const all = this.getCustomPages();
    const index = all.findIndex((p) => p.id === id);
    if (index !== -1) {
      all[index] = { ...all[index], ...data };
      setStoredItem(STORAGE_KEYS.CUSTOM_PAGES, all);
      return true;
    }
    return false;
  },
  deleteCustomPage(id: string): boolean {
    const all = this.getCustomPages();
    const filtered = all.filter((p) => p.id !== id);
    if (filtered.length !== all.length) {
      setStoredItem(STORAGE_KEYS.CUSTOM_PAGES, filtered);
      return true;
    }
    return false;
  },

  // 14. Settings
  getSettings(): SiteSettings {
    return getStoredItem(STORAGE_KEYS.SETTINGS, initialSettings);
  },
  updateSettings(data: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...data };
    setStoredItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Backup & Restore
  exportAllDataJSON(): string {
    const allData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      institution: this.getInstitution(),
      committeeOverview: this.getCommitteeOverview(),
      committeeMembers: this.getCommitteeMembers(),
      teacherPostSummary: this.getTeacherPostSummary(),
      teachersAndStaff: this.getTeachersAndStaff(),
      studentClassOverviews: this.getStudentClassOverviews(),
      students: this.getStudents(),
      publicExamResults: this.getPublicExamResults(),
      internalExamResults: this.getInternalExamResults(),
      notices: this.getNotices(),
      gallery: this.getGallery(),
      routines: this.getRoutines(),
      customPages: this.getCustomPages(),
      settings: this.getSettings()
    };
    return JSON.stringify(allData, null, 2);
  },

  importAllDataJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.institution) setStoredItem(STORAGE_KEYS.INSTITUTION, data.institution);
      if (data.committeeOverview) setStoredItem(STORAGE_KEYS.COMMITTEE_OVERVIEW, data.committeeOverview);
      if (data.committeeMembers) setStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, data.committeeMembers);
      if (data.teacherPostSummary) setStoredItem(STORAGE_KEYS.TEACHER_POST_SUMMARY, data.teacherPostSummary);
      if (data.teachersAndStaff) setStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, data.teachersAndStaff);
      if (data.studentClassOverviews) setStoredItem(STORAGE_KEYS.STUDENT_CLASS_OVERVIEWS, data.studentClassOverviews);
      if (data.students) setStoredItem(STORAGE_KEYS.STUDENTS, data.students);
      if (data.publicExamResults) setStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, data.publicExamResults);
      if (data.internalExamResults) setStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, data.internalExamResults);
      if (data.notices) setStoredItem(STORAGE_KEYS.NOTICES, data.notices);
      if (data.gallery) setStoredItem(STORAGE_KEYS.GALLERY, data.gallery);
      if (data.routines) setStoredItem(STORAGE_KEYS.ROUTINES, data.routines);
      if (data.customPages) setStoredItem(STORAGE_KEYS.CUSTOM_PAGES, data.customPages);
      if (data.settings) setStoredItem(STORAGE_KEYS.SETTINGS, data.settings);
      notifyListeners();
      return true;
    } catch (e) {
      console.error('Failed to import JSON data:', e);
      return false;
    }
  },

  resetToDefault(): void {
    localStorage.clear();
    setStoredItem(STORAGE_KEYS.INSTITUTION, initialInstitution);
    setStoredItem(STORAGE_KEYS.COMMITTEE_OVERVIEW, initialCommitteeOverview);
    setStoredItem(STORAGE_KEYS.COMMITTEE_MEMBERS, initialCommitteeMembers);
    setStoredItem(STORAGE_KEYS.TEACHER_POST_SUMMARY, initialTeacherPostSummary);
    setStoredItem(STORAGE_KEYS.TEACHERS_AND_STAFF, initialTeachersAndStaff);
    setStoredItem(STORAGE_KEYS.STUDENT_CLASS_OVERVIEWS, initialStudentClassOverviews);
    setStoredItem(STORAGE_KEYS.STUDENTS, initialStudents);
    setStoredItem(STORAGE_KEYS.PUBLIC_EXAM_RESULTS, initialPublicExamResults);
    setStoredItem(STORAGE_KEYS.INTERNAL_EXAM_RESULTS, initialInternalExamResults);
    setStoredItem(STORAGE_KEYS.NOTICES, initialNotices);
    setStoredItem(STORAGE_KEYS.GALLERY, initialGallery);
    setStoredItem(STORAGE_KEYS.ROUTINES, initialRoutines);
    setStoredItem(STORAGE_KEYS.CUSTOM_PAGES, initialCustomPages);
    setStoredItem(STORAGE_KEYS.SETTINGS, initialSettings);
    notifyListeners();
  }
};
