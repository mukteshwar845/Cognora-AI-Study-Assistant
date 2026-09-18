import {
  UserProfile,
  StudyMaterial,
  StudyPlanSession,
  StudyGroup,
  DiscussionThread,
  NotificationItem,
  ExamAttempt,
  AppSettings
} from '../types';
import {
  initialUser,
  initialMaterials,
  initialStudyPlan,
  initialStudyGroups,
  initialDiscussions,
  initialNotifications,
  initialExamHistory,
  initialAppSettings
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'ai_study_user_v1',
  MATERIALS: 'ai_study_materials_v1',
  PLAN: 'ai_study_plan_v1',
  GROUPS: 'ai_study_groups_v1',
  DISCUSSIONS: 'ai_study_discussions_v1',
  NOTIFICATIONS: 'ai_study_notifications_v1',
  EXAM_HISTORY: 'ai_study_exam_history_v1',
  THEME: 'ai_study_theme_v1',
  SETTINGS: 'ai_study_settings_v1',
};

export function loadUser(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : initialUser;
  } catch {
    return initialUser;
  }
}

export function saveUser(user: UserProfile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadMaterials(): StudyMaterial[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
    return saved ? JSON.parse(saved) : initialMaterials;
  } catch {
    return initialMaterials;
  }
}

export function saveMaterials(materials: StudyMaterial[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadStudyPlan(): StudyPlanSession[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PLAN);
    return saved ? JSON.parse(saved) : initialStudyPlan;
  } catch {
    return initialStudyPlan;
  }
}

export function saveStudyPlan(plan: StudyPlanSession[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadStudyGroups(): StudyGroup[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return saved ? JSON.parse(saved) : initialStudyGroups;
  } catch {
    return initialStudyGroups;
  }
}

export function saveStudyGroups(groups: StudyGroup[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadDiscussions(): DiscussionThread[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DISCUSSIONS);
    return saved ? JSON.parse(saved) : initialDiscussions;
  } catch {
    return initialDiscussions;
  }
}

export function saveDiscussions(discussions: DiscussionThread[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(discussions));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadNotifications(): NotificationItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : initialNotifications;
  } catch {
    return initialNotifications;
  }
}

export function saveNotifications(notifications: NotificationItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadExamHistory(): ExamAttempt[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return saved ? JSON.parse(saved) : initialExamHistory;
  } catch {
    return initialExamHistory;
  }
}

export function saveExamHistory(history: ExamAttempt[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

export function loadUserProfile(): UserProfile {
  return loadUser();
}

export function saveUserProfile(user: UserProfile) {
  saveUser(user);
}

export function loadAppSettings(): AppSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!saved) return initialAppSettings;
    return { ...initialAppSettings, ...JSON.parse(saved) };
  } catch {
    return initialAppSettings;
  }
}

export function saveAppSettings(settings: AppSettings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Settings save failed:', e);
  }
}

export interface BackupData {
  version: string;
  exportDate: string;
  user: UserProfile;
  settings: AppSettings;
  materials: StudyMaterial[];
  studyPlan: StudyPlanSession[];
  examHistory: ExamAttempt[];
  studyGroups: StudyGroup[];
  discussions: DiscussionThread[];
  notifications: NotificationItem[];
}

export function exportAllStudyData(): string {
  const data: BackupData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    user: loadUserProfile(),
    settings: loadAppSettings(),
    materials: loadMaterials(),
    studyPlan: loadStudyPlan(),
    examHistory: loadExamHistory(),
    studyGroups: loadStudyGroups(),
    discussions: loadDiscussions(),
    notifications: loadNotifications()
  };
  return JSON.stringify(data, null, 2);
}

export function importStudyData(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Invalid JSON backup format.' };
    }
    if (parsed.user) saveUserProfile(parsed.user);
    if (parsed.settings) saveAppSettings(parsed.settings);
    if (Array.isArray(parsed.materials)) saveMaterials(parsed.materials);
    if (Array.isArray(parsed.studyPlan)) saveStudyPlan(parsed.studyPlan);
    if (Array.isArray(parsed.examHistory)) saveExamHistory(parsed.examHistory);
    if (Array.isArray(parsed.studyGroups)) saveStudyGroups(parsed.studyGroups);
    if (Array.isArray(parsed.discussions)) saveDiscussions(parsed.discussions);
    if (Array.isArray(parsed.notifications)) saveNotifications(parsed.notifications);
    return { success: true, message: 'Backup successfully restored!' };
  } catch (e: any) {
    return { success: false, message: e?.message || 'Failed to parse backup file.' };
  }
}

export function resetStudyProgress(): void {
  try {
    // Clear exam history
    saveExamHistory([]);
    // Reset flashcard statuses in all materials
    const materials = loadMaterials();
    const updatedMaterials = materials.map((m) => ({
      ...m,
      flashcards: m.flashcards.map((f) => ({ ...f, status: 'new' as const, isDifficult: false }))
    }));
    saveMaterials(updatedMaterials);
  } catch (e) {
    console.warn('Reset progress failed:', e);
  }
}

export function calculateStorageUsage(): { usedBytes: number; usedFormatted: string; percentEstimated: number } {
  try {
    let totalBytes = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key) && key.startsWith('ai_study_')) {
        const val = localStorage.getItem(key) || '';
        totalBytes += (key.length + val.length) * 2; // UTF-16 approx 2 bytes per char
      }
    }
    const maxBytes = 5 * 1024 * 1024; // typical browser 5MB
    const kb = (totalBytes / 1024).toFixed(1);
    return {
      usedBytes: totalBytes,
      usedFormatted: `${kb} KB`,
      percentEstimated: Math.min(100, Math.round((totalBytes / maxBytes) * 100))
    };
  } catch {
    return { usedBytes: 0, usedFormatted: '0 KB', percentEstimated: 0 };
  }
}

export const DEFAULT_MATERIALS = initialMaterials;

