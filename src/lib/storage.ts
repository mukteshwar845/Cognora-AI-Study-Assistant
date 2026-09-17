import {
  UserProfile,
  StudyMaterial,
  StudyPlanSession,
  StudyGroup,
  DiscussionThread,
  NotificationItem,
  ExamAttempt
} from '../types';
import {
  initialUser,
  initialMaterials,
  initialStudyPlan,
  initialStudyGroups,
  initialDiscussions,
  initialNotifications,
  initialExamHistory
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

export const DEFAULT_MATERIALS = initialMaterials;
