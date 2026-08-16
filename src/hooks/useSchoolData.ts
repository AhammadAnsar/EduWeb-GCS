import { useState, useEffect } from 'react';
import { StorageService, subscribeToDataChanges } from '../services/storageService';
import {
  InstitutionInfo,
  CommitteeMember,
  TeacherStaff,
  TeacherPostSummary,
  StudentClassOverview,
  Student,
  PublicExamResult,
  InternalExamResult,
  Notice,
  GalleryItem,
  CustomPage,
  SiteSettings,
  RoutineItem
} from '../types';

export function useSchoolData() {
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setDataVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  return {
    version: dataVersion,
    institution: StorageService.getInstitution(),
    committeeOverview: StorageService.getCommitteeOverview(),
    committeeMembers: StorageService.getCommitteeMembers(),
    committee: StorageService.getCommitteeMembers(),
    currentCommittee: StorageService.getCurrentCommitteeMembers(),
    formerCommittee: StorageService.getFormerCommitteeMembers(),
    teacherPostSummary: StorageService.getTeacherPostSummary(),
    teachersAndStaff: StorageService.getTeachersAndStaff(),
    teachers: StorageService.getTeachersAndStaff(),
    activeTeachers: StorageService.getActiveTeachersAndStaff(),
    formerTeachers: StorageService.getFormerTeachersAndStaff(),
    studentClassOverviews: StorageService.getStudentClassOverviews(),
    students: StorageService.getStudents(),
    publicExamResults: StorageService.getPublicExamResults(),
    internalExamResults: StorageService.getInternalExamResults(),
    notices: StorageService.getNotices(),
    gallery: StorageService.getGallery(),
    routines: StorageService.getRoutines(),
    customPages: StorageService.getCustomPages(),
    settings: StorageService.getSettings(),

    // Mutation helpers
    updateInstitution: (data: Partial<InstitutionInfo>) => StorageService.updateInstitution(data),
    addCommitteeMember: (member: Omit<CommitteeMember, 'id'> | CommitteeMember) => {
      const { id, ...rest } = member as any;
      return StorageService.addCommitteeMember(rest);
    },
    updateCommitteeMember: (member: CommitteeMember) =>
      StorageService.updateCommitteeMember(member.id, member),
    deleteCommitteeMember: (id: string) => StorageService.deleteCommitteeMember(id),

    addTeacher: (teacher: Omit<TeacherStaff, 'id'> | TeacherStaff) => {
      const { id, ...rest } = teacher as any;
      return StorageService.addTeacherOrStaff(rest);
    },
    updateTeacher: (teacher: TeacherStaff) =>
      StorageService.updateTeacherOrStaff(teacher.id, teacher),
    deleteTeacher: (id: string) => StorageService.deleteTeacherOrStaff(id),
    updateTeacherPostSummary: (summary: TeacherPostSummary[]) =>
      StorageService.updateTeacherPostSummary(summary),

    addStudent: (student: Omit<Student, 'id'> | Student) => {
      const { id, ...rest } = student as any;
      return StorageService.addStudent(rest);
    },
    updateStudent: (student: Student) => StorageService.updateStudent(student.id, student),
    deleteStudent: (id: string) => StorageService.deleteStudent(id),
    updateStudentClassOverview: (data: StudentClassOverview[]) =>
      StorageService.updateStudentClassOverviews(data),

    updatePublicExamResult: (id: string, data: Partial<PublicExamResult>) =>
      StorageService.updatePublicExamResult(id, data),

    addNotice: (notice: Omit<Notice, 'id'> | Notice) => {
      const { id, ...rest } = notice as any;
      return StorageService.addNotice(rest);
    },
    updateNotice: (notice: Notice) => StorageService.updateNotice(notice.id, notice),
    deleteNotice: (id: string) => StorageService.deleteNotice(id),

    addGalleryItem: (item: Omit<GalleryItem, 'id'> | GalleryItem) => {
      const { id, ...rest } = item as any;
      return StorageService.addGalleryItem(rest);
    },
    deleteGalleryItem: (id: string) => StorageService.deleteGalleryItem(id),

    addCustomPage: (page: Omit<CustomPage, 'id'> | CustomPage) => {
      const { id, ...rest } = page as any;
      return StorageService.addCustomPage(rest);
    },
    updateCustomPage: (page: CustomPage) => StorageService.updateCustomPage(page.id, page),
    deleteCustomPage: (id: string) => StorageService.deleteCustomPage(id),

    updateSettings: (settings: Partial<SiteSettings>) => StorageService.updateSettings(settings),
    exportDataJson: () => StorageService.exportAllDataJSON(),
    importDataJson: (jsonStr: string) => StorageService.importAllDataJSON(jsonStr),
    resetToDefault: () => StorageService.resetToDefault()
  };
}
