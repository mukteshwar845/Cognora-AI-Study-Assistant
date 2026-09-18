import { AcademicLevel, SubjectDiscipline, AnswerMode } from '../types';

export interface EducationTierInfo {
  id: AcademicLevel;
  title: string;
  shortLabel: string;
  badge: string;
  gradeRange: string;
  description: string;
  suggestedAnswerMode: AnswerMode;
  defaultSubjects: string[];
}

export const EDUCATION_TIERS: Record<AcademicLevel, EducationTierInfo> = {
  minor_school: {
    id: 'minor_school',
    title: 'Minor / Middle School (Grades 1-8)',
    shortLabel: 'Middle School',
    badge: '🎒 Minor School',
    gradeRange: 'Grades 1 to 8',
    description: 'Foundational concepts, clear visual analogies, easy step-by-step doubt resolution, and curiosity-sparking learning.',
    suggestedAnswerMode: 'eli10',
    defaultSubjects: [
      'General Science',
      'Mathematics (Arithmetic & Geometry)',
      'Social Studies & Geography',
      'English Grammar & Reading',
      'Environmental Studies'
    ]
  },
  high_school: {
    id: 'high_school',
    title: 'High School / Secondary (Grades 9-12 / K-12)',
    shortLabel: 'High School',
    badge: '🏫 High School',
    gradeRange: 'Grades 9 to 12 • Board & AP Exams',
    description: 'Exam-oriented breakdowns, formula derivation, board marking criteria, and structured revision plans.',
    suggestedAnswerMode: 'exam_ready',
    defaultSubjects: [
      'Physics',
      'Chemistry',
      'Mathematics (Algebra & Calculus)',
      'Biology',
      'World History & Civics',
      'Accountancy & Economics'
    ]
  },
  undergraduate: {
    id: 'undergraduate',
    title: 'Undergraduate (UG / College / Bachelors)',
    shortLabel: 'Undergraduate (UG)',
    badge: '🎓 College / UG',
    gradeRange: 'Bachelors • B.Tech / MBBS / B.Com / BA / B.Sc / LLB',
    description: 'Rigorous conceptual depth, technical implementations, analytical question evaluation, and university exam preparation.',
    suggestedAnswerMode: 'detailed',
    defaultSubjects: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Micro & Macroeconomics',
      'Anatomy & Physiology',
      'Constitutional Law',
      'Linear Algebra'
    ]
  },
  postgraduate: {
    id: 'postgraduate',
    title: 'Postgraduate (PG / Masters / PhD / Research)',
    shortLabel: 'Postgraduate (PG)',
    badge: '🏛️ Masters / PhD',
    gradeRange: 'M.Tech / MBA / MD / MS / MA / LLM / Research',
    description: 'Advanced research methodologies, literature synthesis, thesis support, statistical modeling, and deep domain theory.',
    suggestedAnswerMode: 'detailed',
    defaultSubjects: [
      'Advanced Machine Learning',
      'Econometric Modeling',
      'Research Methodology & Seminar',
      'Advanced Molecular Genetics',
      'Corporate Jurisprudence'
    ]
  },
  competitive_exam: {
    id: 'competitive_exam',
    title: 'Competitive Exam Aspirant (SAT, JEE, NEET, UPSC, GRE)',
    shortLabel: 'Competitive Aspirant',
    badge: '🎯 Competitive Exams',
    gradeRange: 'JEE • NEET • UPSC • SAT • GRE • GMAT • GATE • CAT • USMLE',
    description: 'Speed-solving heuristics, high-yield MCQs, negative-marking traps, formula sheets, and timed mock drills.',
    suggestedAnswerMode: 'exam_ready',
    defaultSubjects: [
      'Quantitative Aptitude & Logic',
      'Physics (Mechanics & Electrodynamics)',
      'Organic & Inorganic Chemistry',
      'Human Physiology & Genetics',
      'General Studies & Current Affairs',
      'Verbal Reasoning & Reading Comprehension'
    ]
  },
  professional_learner: {
    id: 'professional_learner',
    title: 'Professional & Lifelong Learner',
    shortLabel: 'Professional / Lifelong',
    badge: '💼 Professional',
    gradeRange: 'Industry Certifications • Career Transition • Executive',
    description: 'Practical business applications, case studies, hands-on frameworks, and modern industry best practices.',
    suggestedAnswerMode: 'example',
    defaultSubjects: [
      'Data Science & Analytics',
      'Strategic Financial Management',
      'Cloud Architecture & DevOps',
      'Product Design & UX',
      'Corporate Governance & Compliance'
    ]
  }
};

export interface SubjectCategoryInfo {
  id: SubjectDiscipline;
  label: string;
  icon: string;
  accentClass: string;
  bgLight: string;
  bgDark: string;
  subjects: string[];
}

export const SUBJECT_DISCIPLINES: SubjectCategoryInfo[] = [
  {
    id: 'all',
    label: 'All Disciplines',
    icon: '🌐',
    accentClass: 'text-indigo-600 dark:text-indigo-400',
    bgLight: 'bg-indigo-50/70',
    bgDark: 'dark:bg-indigo-500/10',
    subjects: []
  },
  {
    id: 'school_core',
    label: 'School Core (Grades 1-8)',
    icon: '🎒',
    accentClass: 'text-sky-600 dark:text-sky-400',
    bgLight: 'bg-sky-50/70',
    bgDark: 'dark:bg-sky-500/10',
    subjects: ['General Science', 'Basic Math & Fractions', 'Social Studies', 'English Grammar', 'EVS & Nature']
  },
  {
    id: 'stem_math',
    label: 'STEM & Physical Sciences',
    icon: '🔬',
    accentClass: 'text-cyan-600 dark:text-cyan-400',
    bgLight: 'bg-cyan-50/70',
    bgDark: 'dark:bg-cyan-500/10',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Calculus', 'Statistics', 'Engineering Mechanics']
  },
  {
    id: 'medical_bio',
    label: 'Medical, Biology & Health',
    icon: '🧬',
    accentClass: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-50/70',
    bgDark: 'dark:bg-emerald-500/10',
    subjects: ['Cellular Biology', 'Human Anatomy', 'Genetics', 'Physiology', 'Biochemistry', 'Pharmacology']
  },
  {
    id: 'commerce_business',
    label: 'Commerce, Finance & Econ',
    icon: '📊',
    accentClass: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-50/70',
    bgDark: 'dark:bg-amber-500/10',
    subjects: ['Financial Accounting', 'Microeconomics', 'Macroeconomics', 'Business Studies', 'Corporate Finance']
  },
  {
    id: 'humanities_arts',
    label: 'Humanities, History & Arts',
    icon: '🏛️',
    accentClass: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-50/70',
    bgDark: 'dark:bg-rose-500/10',
    subjects: ['World History', 'Political Science', 'Geography', 'Psychology', 'Philosophy', 'English Literature']
  },
  {
    id: 'law_governance',
    label: 'Law, Civics & Public Policy',
    icon: '⚖️',
    accentClass: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-50/70',
    bgDark: 'dark:bg-purple-500/10',
    subjects: ['Constitutional Law', 'Jurisprudence', 'Criminal Law', 'Public Administration', 'Legal Research']
  },
  {
    id: 'tech_coding',
    label: 'Technology & Computer Science',
    icon: '💻',
    accentClass: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-50/70',
    bgDark: 'dark:bg-blue-500/10',
    subjects: ['Data Structures', 'Algorithms', 'DBMS', 'Machine Learning', 'Computer Networks', 'Web Development']
  }
];

export interface AcademicTrackPreset {
  id: string;
  name: string;
  tier: AcademicLevel;
  discipline: SubjectDiscipline;
  icon: string;
  degreeLabel: string;
  institutionExample: string;
  motto: string;
  subjects: string[];
  sampleTopics: { strong: string[]; weak: string[] };
}

export const ACADEMIC_TRACK_PRESETS: AcademicTrackPreset[] = [
  {
    id: 'preset_middle_school',
    name: 'Middle School Explorer',
    tier: 'minor_school',
    discipline: 'school_core',
    icon: '🎒',
    degreeLabel: 'Class 7 • Middle School Curriculum',
    institutionExample: 'Oakridge International School',
    motto: 'Curious learner discovering how the natural world and math work.',
    subjects: ['General Science', 'Mathematics', 'Social Studies', 'English Grammar'],
    sampleTopics: {
      strong: ['Photosynthesis & Plant Cells', 'Fractions & Decimals'],
      weak: ['Water Cycle & Weather Systems', 'Linear Equations in One Variable']
    }
  },
  {
    id: 'preset_high_school_stem',
    name: 'High School STEM & Boards',
    tier: 'high_school',
    discipline: 'stem_math',
    icon: '🔬',
    degreeLabel: 'Grade 11-12 (Physics, Chem, Math, Bio)',
    institutionExample: 'St. Xavier’s Senior Secondary',
    motto: 'Focusing on conceptual mastery for Board exams and STEM entrance tests.',
    subjects: ['Physics', 'Chemistry', 'Mathematics (Calculus)', 'Biology'],
    sampleTopics: {
      strong: ['Newtonian Kinematics', 'Chemical Bonding & Periodic Table'],
      weak: ['Electromagnetic Induction', 'Integral Calculus Substitution']
    }
  },
  {
    id: 'preset_high_school_commerce',
    name: 'High School Commerce & Economics',
    tier: 'high_school',
    discipline: 'commerce_business',
    icon: '📈',
    degreeLabel: 'Grade 11-12 (Commerce Stream)',
    institutionExample: 'Delhi Public School',
    motto: 'Understanding commercial systems, economic principles, and accounting balances.',
    subjects: ['Accountancy', 'Economics', 'Business Studies', 'Applied Mathematics'],
    sampleTopics: {
      strong: ['Ledger Posting & Trial Balance', 'Law of Demand & Elasticity'],
      weak: ['Partnership Dissolution Accounting', 'Fiscal Deficit Calculations']
    }
  },
  {
    id: 'preset_ug_cs',
    name: 'UG Computer Science & Engineering',
    tier: 'undergraduate',
    discipline: 'tech_coding',
    icon: '💻',
    degreeLabel: 'B.Tech in Computer Science & Engineering',
    institutionExample: 'National Institute of Technology',
    motto: 'Mastering distributed systems, scalable algorithms, and software design.',
    subjects: ['Data Structures & Algorithms', 'Database Systems (DBMS)', 'Operating Systems', 'Machine Learning'],
    sampleTopics: {
      strong: ['Binary Search & Sorting', 'Relational Normalization & ACID'],
      weak: ['Dynamic Programming Memoization', 'B+ Tree Indexing & Concurrency']
    }
  },
  {
    id: 'preset_ug_medical',
    name: 'Pre-Med & MBBS Healthcare',
    tier: 'undergraduate',
    discipline: 'medical_bio',
    icon: '🩺',
    degreeLabel: 'MBBS / Pre-Med Medical Sciences',
    institutionExample: 'All India Institute of Medical Sciences',
    motto: 'Precision in clinical anatomy, human physiology, and evidence-based diagnosis.',
    subjects: ['Human Anatomy', 'Medical Physiology', 'Biochemistry', 'Pathology'],
    sampleTopics: {
      strong: ['Cardiovascular Hemodynamics', 'Cell Membrane Transport'],
      weak: ['Autonomic Nervous System Receptors', 'Glycolysis & Krebs Cycle Regulation']
    }
  },
  {
    id: 'preset_ug_commerce_bba',
    name: 'UG Commerce & Business Administration',
    tier: 'undergraduate',
    discipline: 'commerce_business',
    icon: '💼',
    degreeLabel: 'B.Com (Honors) / BBA Finance',
    institutionExample: 'Faculty of Management Studies',
    motto: 'Targeting corporate finance leadership and strategic market analysis.',
    subjects: ['Corporate Accounting', 'Financial Management', 'Business Law', 'Macroeconomics'],
    sampleTopics: {
      strong: ['Time Value of Money (DCF)', 'Market Equilibrium Analysis'],
      weak: ['Capital Budgeting & WACC', 'Negotiable Instruments Act']
    }
  },
  {
    id: 'preset_ug_humanities_law',
    name: 'Law, Political Science & Humanities',
    tier: 'undergraduate',
    discipline: 'law_governance',
    icon: '⚖️',
    degreeLabel: 'BA LLB (Honors) / Political Science',
    institutionExample: 'National Law School',
    motto: 'Rigorous legal analysis, constitutional rights, and public governance.',
    subjects: ['Constitutional Law', 'Jurisprudence', 'Modern World History', 'Political Theory'],
    sampleTopics: {
      strong: ['Fundamental Rights (Part III)', 'Separation of Powers'],
      weak: ['Judicial Review Standards', 'Doctrine of Basic Structure Evolution']
    }
  },
  {
    id: 'preset_competitive_aspirant',
    name: 'Competitive Exam Aspirant (UPSC / JEE / NEET)',
    tier: 'competitive_exam',
    discipline: 'all',
    icon: '🎯',
    degreeLabel: 'National Competitive Exam Preparation',
    institutionExample: 'National Aspirant Council',
    motto: 'High-speed problem solving, active recall, and zero-error test simulations.',
    subjects: ['General Studies', 'Quantitative Aptitude', 'Analytical Reasoning', 'Physics & Chemistry'],
    sampleTopics: {
      strong: ['Constitutional Polity', 'Logical Syllogisms & Series'],
      weak: ['Thermodynamics & Carnot Cycles', 'Data Interpretation Complex Tables']
    }
  },
  {
    id: 'preset_pg_research',
    name: 'Postgraduate & Research Scholar',
    tier: 'postgraduate',
    discipline: 'stem_math',
    icon: '🏛️',
    degreeLabel: 'M.S. / Ph.D. Research Program',
    institutionExample: 'Indian Institute of Science',
    motto: 'Advancing research frontiers through empirical validation and peer review.',
    subjects: ['Advanced Statistical Modeling', 'Research Methodology', 'Domain Seminar Theory'],
    sampleTopics: {
      strong: ['Hypothesis Testing & ANOVA', 'Literature Review Synthesis'],
      weak: ['Bayesian Non-parametric Estimation', 'Stochastic Differential Equations']
    }
  }
];
