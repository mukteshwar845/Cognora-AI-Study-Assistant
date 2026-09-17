export type AnswerMode =
  | 'simple'
  | 'detailed'
  | 'exam_ready'
  | 'eli10'
  | 'example'
  | 'code';

export type ExplanationMode = AnswerMode;

export interface UpcomingExamItem {
  id: string;
  subject: string;
  date: string;
  daysLeft: number;
  targetScore?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  degree?: string;
  semester?: string;
  streakDays: number;
  weekActivity: boolean[]; // 7 days (Mon-Sun)
  totalStudyMinutes: number;
  weeklyHoursSpent?: number;
  questionsSolved: number;
  quizzesAttempted?: number;
  quizAverage: number;
  averageQuizScore?: number;
  totalMaterialsUploaded?: number;
  subjectsEnrolled?: string[];
  upcomingExams?: UpcomingExamItem[];
  targetExams?: UpcomingExamItem[];
  weakTopics: string[];
  strongTopics: string[];
  subjectProgress: {
    subject: string;
    progress: number; // 0-100
    color: string;
  }[];
}

export interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  description: string;
  subject: string;
}

export interface DefinitionItem {
  id: string;
  term: string;
  definition: string;
  isImportant: boolean;
  category?: string;
}

export interface ShortNoteItem {
  id: string;
  title: string;
  definition: string;
  conditions?: string[];
  timeComplexity?: string;
  examTip: string;
}

export interface Flashcard {
  id: string;
  materialId: string;
  front: string;
  back: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isDifficult: boolean;
  status: 'new' | 'learning' | 'mastered';
  lastReviewed?: string;
}

export interface QuizQuestion {
  id: string;
  materialId?: string;
  question: string;
  type: 'mcq' | 'true_false' | 'multiple_answer' | 'fill_blank' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'pdf' | 'docx' | 'pptx' | 'txt' | 'image' | 'notes';
  pageCount?: number;
  isFavorite: boolean;
  rawText?: string;
  summary: {
    tldr: string;
    detailed: string;
    keyTakeaways: string[];
    importantTopics: {
      topic: string;
      relevanceScore: number; // 1-100
    }[];
  };
  shortNotes: ShortNoteItem[];
  keyConcepts: {
    title: string;
    explanation: string;
    category: string;
  }[];
  formulas: FormulaItem[];
  hasFormulas: boolean;
  definitions: DefinitionItem[];
  questions: {
    id: string;
    question: string;
    answer: string;
    marks?: number;
    examType?: string;
  }[];
  flashcards: Flashcard[];
  quizzes: QuizQuestion[];
}

export interface TopicBreakdownItem {
  topic: string;
  score?: number;
  total?: number;
  percentage: number;
}

export interface AIFeedbackReport {
  strongAreas: string[];
  weakAreas: string[];
  revisionNeeded?: string[];
  commonMistakes?: string[];
  recommendedPractice?: string;
  revisionAdvice?: string;
}

export interface ExamAttempt {
  id: string;
  examTitle?: string;
  materialTitle?: string;
  subject: string;
  score: number;
  totalMarks: number;
  totalQuestions?: number;
  accuracy: number;
  timeTakenMinutes?: number;
  timeTakenSeconds?: number;
  date: string;
  mode?: 'practice' | 'real';
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  topicBreakdown?: TopicBreakdownItem[];
  topicPerformance?: TopicBreakdownItem[];
  aiFeedback?: AIFeedbackReport;
  aiAnalysis?: AIFeedbackReport;
}

export interface StudyPlanSession {
  id: string;
  time: string;
  subject: string;
  durationMinutes: number;
  taskType: 'study' | 'flashcards' | 'quiz' | 'revision' | 'mock_exam';
  completed: boolean;
  notes?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  membersCount: number;
  description: string;
  recentActivity: string;
  isJoined: boolean;
  materialsCount: number;
}

export interface DiscussionReply {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
}

export interface DiscussionThread {
  id: string;
  materialId?: string;
  subject: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  likes: number;
  userLiked: boolean;
  tags: string[];
  isPinned: boolean;
  repliesCount?: number;
  replies: DiscussionReply[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  time?: string;
  timestamp?: string;
  read?: boolean;
  isRead?: boolean;
  linkId?: string;
}

export interface DoubtMessage {
  id: string;
  sender: 'student' | 'ai';
  text: string;
  timestamp: string;
  mode?: AnswerMode;
  sourceReference?: {
    documentTitle: string;
    sectionOrPage: string;
    excerpt?: string;
  };
  isGeneralKnowledge?: boolean;
}
