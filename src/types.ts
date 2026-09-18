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

export type AcademicLevel = 'high_school' | 'undergraduate' | 'postgraduate' | 'competitive_exam';
export type GradingScale = 'percentage' | 'gpa10' | 'gpa4';
export type AITutorPersona = 'supportive' | 'socratic' | 'strict' | 'concise';
export type SpacedRepetitionSpeed = 'relaxed' | 'standard' | 'cram';
export type AccentColor = 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  institution?: string;
  bio?: string;
  avatarUrl?: string;
  avatarColor?: string; // gradient preset class
  avatarIcon?: string;  // icon key: 'sparkles' | 'graduation' | 'brain' | 'rocket' | 'code' | 'atom'
  degree?: string;
  semester?: string;
  graduationYear?: string;
  targetGpa?: string;
  academicLevel?: AcademicLevel;
  streakDays: number;
  weekActivity: boolean[]; // 7 days (Mon-Sun)
  totalStudyMinutes: number;
  weeklyHoursSpent?: number;
  questionsSolved: number;
  quizzesAttempted?: number;
  quizAverage: number;
  averageQuizScore?: number;
  examReadinessScore?: number;
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

export interface AppSettings {
  // Academic & Study Targets
  dailyStudyGoalMinutes: number;
  weeklyStudyGoalHours: number;
  gradingScale: GradingScale;
  spacedRepetitionSpeed: SpacedRepetitionSpeed;

  // AI Tutor & Intelligence
  defaultAnswerMode: AnswerMode;
  defaultQuizDifficulty: 'easy' | 'medium' | 'hard';
  aiTutorPersona: AITutorPersona;
  customAiDirectives: string;
  geminiApiKey?: string;
  aiModel: 'gemini-2.5-flash' | 'gemini-3.8-flash' | 'gemini-2.5-pro';

  // Notifications & Alerts
  dailyReminderEnabled: boolean;
  dailyReminderTime: string;
  examAlertsEnabled: boolean;
  streakSaverEnabled: boolean;
  soundEffectsEnabled: boolean;
  confettiEnabled: boolean;

  // Appearance & UI
  themePreference: 'light' | 'dark' | 'system';
  accentColor: AccentColor;
  layoutDensity: 'comfortable' | 'compact';
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

export interface ExamQuestionItem {
  id: string;
  question: string;
  answer: string;
  marks?: number;
  examType?: string;
  type?: 'short' | 'long' | 'conceptual' | 'numerical';
  importance?: 'critical' | 'high' | 'medium';
  expectedPoints?: string[];
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
  questions: ExamQuestionItem[];
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
  percentage?: number;
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
