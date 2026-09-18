import { UserProfile, StudyMaterial, StudyPlanSession, StudyGroup, DiscussionThread, NotificationItem, ExamAttempt, AppSettings } from '../types';

export const initialAppSettings: AppSettings = {
  dailyStudyGoalMinutes: 60,
  weeklyStudyGoalHours: 15,
  gradingScale: 'percentage',
  spacedRepetitionSpeed: 'standard',
  defaultAnswerMode: 'simple',
  defaultQuizDifficulty: 'medium',
  aiTutorPersona: 'supportive',
  customAiDirectives: 'Provide clear, step-by-step conceptual breakdowns with memorable exam mnemonics.',
  geminiApiKey: '',
  aiModel: 'gemini-3.8-flash',
  dailyReminderEnabled: true,
  dailyReminderTime: '19:00',
  examAlertsEnabled: true,
  streakSaverEnabled: true,
  soundEffectsEnabled: true,
  confettiEnabled: true,
  themePreference: 'system',
  accentColor: 'indigo',
  layoutDensity: 'comfortable'
};

export const initialUser: UserProfile = {
  id: 'user_mukteswar_1',
  name: 'Mukteswar',
  email: 'mukteswar.g@example.edu',
  institution: 'Cognora Academic Academy',
  bio: 'Aiming for academic excellence through active recall, structured notes, and AI doubt solving.',
  degree: 'Undergraduate Program (UG)',
  semester: 'Semester 5',
  graduationYear: '2027',
  targetGpa: '9.2 / 10.0',
  academicLevel: 'undergraduate',
  avatarColor: 'from-indigo-600 via-purple-600 to-violet-500',
  avatarIcon: 'brain',
  streakDays: 7,
  weekActivity: [true, true, true, true, true, true, true], // Mon through Sun
  totalStudyMinutes: 755, // 12h 35m
  weeklyHoursSpent: 12.6,
  questionsSolved: 142,
  quizzesAttempted: 142,
  quizAverage: 82,
  averageQuizScore: 82,
  totalMaterialsUploaded: 7,
  subjectsEnrolled: [
    'Physics (Mechanics)',
    'Cellular Biology & Genetics',
    'Data Structures & Algorithms',
    'Microeconomics',
    'General Science'
  ],
  upcomingExams: [
    {
      id: 'exam_1',
      subject: 'Physics — Kinematics & Motion',
      date: '2026-09-29',
      daysLeft: 11,
      targetScore: 92
    },
    {
      id: 'exam_2',
      subject: 'Data Structures & Algorithms',
      date: '2026-10-05',
      daysLeft: 17,
      targetScore: 90
    },
    {
      id: 'exam_3',
      subject: 'Cellular Biology & Genetics',
      date: '2026-10-18',
      daysLeft: 30,
      targetScore: 88
    },
    {
      id: 'exam_4',
      subject: 'Microeconomics & Pricing',
      date: '2026-10-25',
      daysLeft: 37,
      targetScore: 85
    }
  ],
  targetExams: [
    {
      id: 'exam_1',
      subject: 'Physics — Kinematics & Motion',
      date: '2026-09-29',
      daysLeft: 11,
      targetScore: 92
    },
    {
      id: 'exam_2',
      subject: 'Data Structures & Algorithms',
      date: '2026-10-05',
      daysLeft: 17,
      targetScore: 90
    },
    {
      id: 'exam_3',
      subject: 'Cellular Biology & Genetics',
      date: '2026-10-18',
      daysLeft: 30,
      targetScore: 88
    },
    {
      id: 'exam_4',
      subject: 'Microeconomics & Pricing',
      date: '2026-10-25',
      daysLeft: 37,
      targetScore: 85
    }
  ],
  weakTopics: ['Electromagnetic Induction', 'Dynamic Programming Memoization', 'Price Elasticity Calculations'],
  strongTopics: ['Newtonian Kinematics', 'Mitosis Cell Division', 'Binary Search & Sorting', 'Photosynthesis Equation'],
  subjectProgress: [
    { subject: 'Physics', progress: 85, color: '#06b6d4' },
    { subject: 'Biology', progress: 78, color: '#10b981' },
    { subject: 'DSA', progress: 80, color: '#3b82f6' },
    { subject: 'Economics', progress: 70, color: '#f59e0b' }
  ]
};

export const initialMaterials: StudyMaterial[] = [
  {
    id: 'mat_dsa_1',
    title: 'Data Structures — Unit 1',
    subject: 'Data Structures',
    chapter: 'Unit 1: Stacks, Queues & Linked Lists',
    uploadDate: '2026-09-14',
    fileSize: '4.2 MB',
    fileType: 'pdf',
    pageCount: 28,
    isFavorite: true,
    rawText: `Data Structures Unit 1 Overview:
Arrays, Linked Lists, Stacks, and Queues.
Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Key operations include push(), pop(), and peek(). Stacks are used in expression evaluation, function call call-stacks, undo mechanisms in text editors, and syntax parsing.
Queue is a FIFO (First-In-First-Out) linear structure with enqueue() at rear and dequeue() at front. Variations include Circular Queue, Deque (Double Ended Queue), and Priority Queue.
Binary Search operates on a sorted array by dividing search space into half each iteration with time complexity O(log n).
Time Complexity Reference:
Array Access: O(1), Search: O(n) or O(log n) if sorted.
Stack Push/Pop: O(1) amortized.
Queue Enqueue/Dequeue: O(1).
Singly Linked List Insertion at head: O(1), at tail without tail pointer: O(n).`,
    summary: {
      tldr: 'Covers foundational linear data structures: Arrays, Singly and Doubly Linked Lists, Stacks (LIFO), and Queues (FIFO) with asymptotic time-space analysis and core algorithmic applications.',
      detailed: 'This unit establishes the foundational principles of memory organization in computer science. It begins with contiguous memory allocation in static arrays and contrast it against non-contiguous node chaining in dynamic linked lists. Special attention is directed at Stack architectures implementing LIFO protocols, essential for recursion tracking and infix-to-postfix parsing, followed by Queue implementations maintaining FIFO integrity with circular buffer optimization.',
      keyTakeaways: [
        'Stack implements LIFO; push and pop operations run in O(1) constant time.',
        'Queue implements FIFO; circular queues prevent memory drift and false overflow conditions.',
        'Linked lists eliminate contiguous memory allocation constraints but trade off random indexing access.',
        'Binary search requires monotonically sorted inputs and achieves logarithmic O(log n) performance.',
        'Common interview patterns heavily emphasize two-pointer techniques on linked lists and monotonic stack patterns.'
      ],
      importantTopics: [
        { topic: 'Stack Applications & Infix/Postfix Evaluation', relevanceScore: 98 },
        { topic: 'Circular Queue & False Overflow Elimination', relevanceScore: 92 },
        { topic: 'Singly vs Doubly Linked Lists Memory Overhead', relevanceScore: 88 },
        { topic: 'Binary Search Edge Cases & Bounds', relevanceScore: 85 },
        { topic: 'Amortized Analysis of Dynamic Arrays', relevanceScore: 78 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_1',
        title: 'Binary Search Algorithm',
        definition: 'An optimal search algorithm that repeatedly divides a sorted collection in half to find a target value.',
        timeComplexity: 'O(log n) time, O(1) space',
        conditions: [
          'Array must be sorted prior to execution',
          'Access to elements must be constant time random access',
          'Calculate mid = low + (high - low) / 2 to avoid integer overflow'
        ],
        examTip: 'Remember: Binary search eliminates half of the remaining search space in every single iteration. Always check boundary conditions low <= high.'
      },
      {
        id: 'sn_2',
        title: 'Stack Data Structure',
        definition: 'A linear collection where elements are added and removed from the same end (Top), governed by LIFO.',
        timeComplexity: 'Push: O(1), Pop: O(1), Peek: O(1)',
        conditions: [
          'Overflow condition occurs when top == MAX_SIZE - 1 in fixed arrays',
          'Underflow condition occurs when top == -1 on pop operation'
        ],
        examTip: 'Key exam question: How to implement a Queue using two Stacks. One stack handles enqueuing, the second stack reverses order for dequeuing.'
      },
      {
        id: 'sn_3',
        title: 'Circular Queue Buffer',
        definition: 'A linear queue where the last position connects back to the first position to reuse deallocated memory cells.',
        timeComplexity: 'Enqueue: O(1), Dequeue: O(1)',
        conditions: [
          'Rear pointer advances via: rear = (rear + 1) % capacity',
          'Queue is full when: (rear + 1) % capacity == front'
        ],
        examTip: 'Linear queues suffer from "false overflow" where space exists at front but rear reaches max. Circular queues resolve this cleanly.'
      }
    ],
    keyConcepts: [
      {
        title: 'LIFO vs FIFO Paradigms',
        explanation: 'Last-In First-Out processes the latest item first (ideal for backtracking, recursion, stack machines). First-In First-Out preserves natural sequencing (ideal for buffers, scheduling, print queues).',
        category: 'Core Fundamentals'
      },
      {
        title: 'Memory Contiguity & Cache Locality',
        explanation: 'Arrays enjoy spatial cache locality due to sequential RAM addresses. Linked list nodes reside scattered across the heap, incurring cache misses during traversal.',
        category: 'System Architecture'
      },
      {
        title: 'Pointer Reversal in Linked Lists',
        explanation: 'Iterative in-place reversal requires three pointers: prev, curr, and next, avoiding additional auxiliary heap allocations.',
        category: 'Algorithms'
      }
    ],
    formulas: [
      {
        id: 'f_1',
        name: 'Circular Queue Next Index',
        formula: 'next_index = (current_index + 1) % Capacity',
        description: 'Computes the wrap-around index in a bounded circular array buffer.',
        subject: 'Data Structures'
      },
      {
        id: 'f_2',
        name: 'Circular Queue Count',
        formula: 'count = (rear - front + Capacity) % Capacity',
        description: 'Calculates the current active element count in a circular queue.',
        subject: 'Data Structures'
      },
      {
        id: 'f_3',
        name: 'Binary Search Midpoint (Overflow-safe)',
        formula: 'mid = low + ⌊(high - low) / 2⌋',
        description: 'Computes median index without exceeding maximum 32-bit integer limits.',
        subject: 'Algorithms'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_1',
        term: 'Stack',
        definition: 'A restricted linear data structure that operates under the LIFO (Last-In-First-Out) principle, permitting insertions and deletions exclusively at the top.',
        isImportant: true,
        category: 'Data Structures'
      },
      {
        id: 'def_2',
        term: 'Amortized Time Complexity',
        definition: 'The average time taken per operation over a worst-case sequence of operations, frequently used for resizing dynamic arrays.',
        isImportant: true,
        category: 'Complexity Analysis'
      },
      {
        id: 'def_3',
        term: 'False Overflow',
        definition: 'A condition in simple linear array-based queues where insertions are rejected because the rear pointer reaches the end, even though vacant slots exist at the front after dequeues.',
        isImportant: true,
        category: 'Queues'
      }
    ],
    questions: [
      {
        id: 'q_dsa_s1',
        question: 'Define false overflow in a linear queue and explain how circular queues resolve it.',
        answer: '• False Overflow: In a linear queue, elements dequeued from the front leave unutilized memory holes at indices 0..front-1. When rear reaches MAX-1, new enqueues are rejected despite free slots.\n• Solution: Circular queues wrap the rear pointer using (rear + 1) % Capacity, reusing freed front memory slots in constant O(1) time.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'critical',
        expectedPoints: ['Definition of false overflow', 'Rear pointer wrap-around', 'Modulo arithmetic']
      },
      {
        id: 'q_dsa_s2',
        question: 'Differentiate between array-based and linked list-based implementations of a Stack.',
        answer: '• Array Stack: Contiguous memory layout, fixed capacity (or O(n) reallocation), cache-friendly constant-time operations.\n• Linked List Stack: Dynamic growth with no fixed capacity limit, but requires 8 extra bytes per node for pointer references and incurs heap cache misses.',
        marks: 3,
        type: 'short',
        examType: 'Short Answer (3 Marks)',
        importance: 'high',
        expectedPoints: ['Memory continuity', 'Capacity limits', 'Cache locality vs pointer overhead']
      },
      {
        id: 'q_dsa_l1',
        question: 'Explain how a FIFO Queue can be implemented using two Stacks. Provide algorithms and amortized runtime proof.',
        answer: '1. Structure: Stack1 is the insertion inbox, Stack2 is the deletion outbox.\n\n2. Enqueue(x): Push x directly onto Stack1 in O(1).\n\n3. Dequeue():\n• If both stacks are empty: return Underflow.\n• If Stack2 is non-empty: pop from Stack2 and return.\n• If Stack2 is empty: pop all elements from Stack1 and push them into Stack2 (which reverses LIFO order into FIFO order), then pop Stack2.\n\n4. Complexity Proof: Each element is pushed to Stack1 once, popped from Stack1 once, pushed to Stack2 once, and popped from Stack2 once (4 operations total). Thus across n operations, amortized cost per operation is deterministic O(1).',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'Inbox/outbox dual stack design',
          'Order reversal mechanism',
          'Underflow boundary check',
          '4-step amortized O(1) proof'
        ]
      },
      {
        id: 'q_dsa_l2',
        question: 'Explain the complete architecture, boundary condition checks, and algorithms for Circular Queue operations.',
        answer: '1. Invariant Pointers: front and rear initialized to -1.\n• Empty condition: front == -1\n• Full condition: (rear + 1) % Capacity == front\n• Single element condition: front == rear\n\n2. Enqueue Algorithm: Check full condition. If empty, front=0, rear=0. Otherwise rear = (rear + 1) % Capacity. array[rear] = x.\n\n3. Dequeue Algorithm: Check empty condition. val = array[front]. If front == rear, reset front = -1, rear = -1. Otherwise front = (front + 1) % Capacity. Return val.\n\n4. Complexity: Deterministic O(1) time and space.',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'Full/empty mathematical invariants',
          'Modulo wrap-around',
          'Single element reset logic',
          'O(1) time analysis'
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc_1',
        materialId: 'mat_dsa_1',
        front: 'Which data structure follows the LIFO principle?',
        back: 'A Stack (Last-In, First-Out). Elements are added and removed strictly from the top.',
        topic: 'Stacks',
        difficulty: 'easy',
        isDifficult: false,
        status: 'mastered'
      },
      {
        id: 'fc_2',
        materialId: 'mat_dsa_1',
        front: 'What is the time complexity of Binary Search and what prerequisite is required?',
        back: 'O(log n) time complexity. Prerequisite: The input array or collection must be sorted.',
        topic: 'Searching',
        difficulty: 'medium',
        isDifficult: false,
        status: 'learning'
      },
      {
        id: 'fc_3',
        materialId: 'mat_dsa_1',
        front: 'How do you detect a cycle in a Singly Linked List in O(1) extra space?',
        back: "Floyd's Tortoise and Hare Algorithm: Use two pointers (slow moving 1 step, fast moving 2 steps). If they meet, a cycle exists.",
        topic: 'Linked Lists',
        difficulty: 'hard',
        isDifficult: true,
        status: 'learning'
      },
      {
        id: 'fc_4',
        materialId: 'mat_dsa_1',
        front: 'What causes "False Overflow" in a standard linear queue?',
        back: 'When rear reaches the end capacity index while previous front slots have been freed by dequeue operations.',
        topic: 'Queues',
        difficulty: 'medium',
        isDifficult: true,
        status: 'new'
      }
    ],
    quizzes: [
      {
        id: 'qz_1',
        materialId: 'mat_dsa_1',
        question: 'Which data structure follows the LIFO principle?',
        type: 'mcq',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        correctAnswer: 'Stack',
        explanation: 'A Stack strictly adheres to Last-In, First-Out (LIFO). Elements inserted most recently are the first to be popped.',
        difficulty: 'easy',
        topic: 'Stacks'
      },
      {
        id: 'qz_2',
        materialId: 'mat_dsa_1',
        question: 'What is the worst-case time complexity of searching in a sorted array of size n using Binary Search?',
        type: 'mcq',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        explanation: 'Binary search splits the searchable window in half on each step, yielding logarithmic logarithmic O(log n) worst-case time.',
        difficulty: 'easy',
        topic: 'Searching'
      },
      {
        id: 'qz_3',
        materialId: 'mat_dsa_1',
        question: 'A circular queue with capacity C is completely full when (rear + 1) % C == front.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Leaving one buffer cell empty allows distinct differentiation between completely full and completely empty states without auxiliary flags.',
        difficulty: 'medium',
        topic: 'Queues'
      },
      {
        id: 'qz_4',
        materialId: 'mat_dsa_1',
        question: 'Which of the following are valid applications of a Stack data structure?',
        type: 'multiple_answer',
        options: [
          'Function call activation frames (call stack)',
          'CPU process round-robin scheduling',
          'Undo/Redo history mechanisms',
          'Parentheses syntax balancing'
        ],
        correctAnswer: [
          'Function call activation frames (call stack)',
          'Undo/Redo history mechanisms',
          'Parentheses syntax balancing'
        ],
        explanation: 'Round-robin process scheduling utilizes a FIFO Queue, whereas function calls, undo/redo, and bracket validation are canonical LIFO Stack applications.',
        difficulty: 'hard',
        topic: 'Stacks'
      },
      {
        id: 'qz_5',
        materialId: 'mat_dsa_1',
        question: 'In a singly linked list with only a head pointer, inserting an element at the end requires ____ time.',
        type: 'mcq',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'Without a cached tail pointer, traversal through all n nodes from head to end is required before setting the new pointer.',
        difficulty: 'easy',
        topic: 'Linked Lists'
      }
    ]
  },
  {
    id: 'mat_dbms_1',
    title: 'Database Management Systems — Normalization & ACID',
    subject: 'DBMS',
    chapter: 'Unit 3: Relational Design & Concurrency',
    uploadDate: '2026-09-12',
    fileSize: '3.8 MB',
    fileType: 'pdf',
    pageCount: 34,
    isFavorite: false,
    rawText: `Database Management Systems: Normalization and Transaction Processing.
Normalization minimizes data redundancy and eliminates update anomalies (insertion, deletion, modification).
1NF: Atomic values only, no repeating groups.
2NF: In 1NF and no partial dependency (no non-prime attribute depends on a proper subset of candidate key).
3NF: In 2NF and no transitive dependency (non-prime attribute depending on another non-prime attribute).
BCNF (Boyce-Codd Normal Form): For every non-trivial functional dependency X -> Y, X must be a super key.
ACID Properties:
Atomicity: All operations in transaction succeed or none do (Rollback/Commit).
Consistency: Database transforms from one valid state to another satisfying all integrity constraints.
Isolation: Concurrent transactions execute without interfering with each other (Serializability).
Durability: Once committed, state changes persist even across power/system crashes.`,
    summary: {
      tldr: 'Comprehensive analysis of Relational Database Normalization forms (1NF through BCNF) and Transaction ACID properties ensuring integrity under high concurrency.',
      detailed: 'This module covers formal relational schema design via functional dependency analysis. It delineates the progression from unnormalized relations through First, Second, Third, and Boyce-Codd Normal Forms to eliminate update, insertion, and deletion anomalies. The second half explores Transaction Management, detailing Atomicity, Consistency, Isolation, and Durability, alongside lock protocols (2PL) and serializability.',
      keyTakeaways: [
        '1NF enforces scalar atomicity; 2NF eliminates partial functional dependencies on compound keys.',
        '3NF eliminates transitive dependencies between non-prime attributes.',
        'BCNF is stricter than 3NF: the left side of every non-trivial dependency must be a super key.',
        'ACID transactions guarantee reliable state transitions under concurrency and system faults.',
        'Conflict serializability guarantees that a concurrent schedule produces identical results to some serial execution.'
      ],
      importantTopics: [
        { topic: '3NF vs BCNF Decomposition & Dependency Preservation', relevanceScore: 96 },
        { topic: 'ACID Properties & Recovery Logging (WAL)', relevanceScore: 94 },
        { topic: 'Two-Phase Locking (2PL) Protocol & Deadlock', relevanceScore: 89 },
        { topic: 'Functional Dependency Closure & Minimal Cover', relevanceScore: 84 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_db_1',
        title: 'Normal Forms Summary',
        definition: 'Systematic progression of relational table structuring rules to eliminate redundancy.',
        conditions: [
          '1NF: Attributes contain only atomic (indivisible) values',
          '2NF: 1NF + No Partial Dependency (all non-prime attributes fully dependent on candidate key)',
          '3NF: 2NF + No Transitive Dependency (X -> Y: either X is super key OR Y is prime attribute)',
          'BCNF: For every X -> Y, X must be a super key'
        ],
        examTip: 'High-frequency question: Can a decomposition always achieve BCNF, lossless join, and dependency preservation simultaneously? Answer: Lossless join is guaranteed, but dependency preservation is NOT always achievable in BCNF (it is in 3NF).'
      },
      {
        id: 'sn_db_2',
        title: 'ACID Principles Breakdown',
        definition: 'Four core safety guarantees required for mission-critical database transaction processing.',
        conditions: [
          'Atomicity: All-or-nothing execution managed by transaction manager and rollback logs',
          'Consistency: Constraints and invariants hold before and after execution',
          'Isolation: Concurrency control prevents dirty reads, unrepeatable reads, and phantom reads',
          'Durability: Non-volatile storage write-ahead logging (WAL) survives crashes'
        ],
        examTip: 'Remember the acronym ACID and which database component enforces each: Atomicity (Recovery Mgr), Consistency (Application/Compiler), Isolation (Concurrency Control), Durability (Recovery Mgr/WAL).'
      }
    ],
    keyConcepts: [
      {
        title: 'Lossless Join Property',
        explanation: 'Decomposing table R into R1 and R2 is lossless if and only if the intersection of their attributes contains a candidate key for at least one decomposed relation.',
        category: 'Relational Design'
      },
      {
        title: 'Write-Ahead Logging (WAL)',
        explanation: 'Changes are written and flushed to durable disk log buffers before the corresponding data pages are written to the database files.',
        category: 'Recovery Architecture'
      }
    ],
    formulas: [
      {
        id: 'f_db_1',
        name: 'Lossless Join Condition',
        formula: '(R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2',
        description: 'Mathematical test to verify whether relational decomposition guarantees lossless join reconstruction.',
        subject: 'Database Management'
      },
      {
        id: 'f_db_2',
        name: 'B+ Tree Node Capacity Limits',
        formula: '⌈m / 2⌉ - 1 ≤ Number of Keys ≤ m - 1',
        description: 'Defines minimum and maximum search key capacity for internal nodes of order m in a B+ Tree index.',
        subject: 'Database Management'
      },
      {
        id: 'f_db_3',
        name: 'Block Nested Loop Join I/O Cost',
        formula: 'Disk I/O = B_R + ⌈B_R / (M - 2)⌉ × B_S',
        description: 'Calculates the number of block transfers needed when joining relation R and S with buffer memory of M blocks.',
        subject: 'Database Management'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_db_1',
        term: 'Candidate Key',
        definition: 'A minimal super key—a minimal set of attributes that uniquely identifies every tuple in a relation without redundant attributes.',
        isImportant: true,
        category: 'Keys'
      },
      {
        id: 'def_db_2',
        term: 'Transitive Dependency',
        definition: 'A condition where a non-prime attribute is functionally determined by another non-prime attribute through an intermediate relation (A -> B and B -> C).',
        isImportant: true,
        category: 'Dependencies'
      }
    ],
    questions: [
      {
        id: 'q_db_s1',
        question: 'What is a partial dependency and in which normal form is it eliminated?',
        answer: '• Definition: A partial dependency occurs when a non-prime attribute depends on a proper subset of a candidate key (rather than the whole composite key).\n• Elimination: Partial dependencies are strictly eliminated in Second Normal Form (2NF). Relations with single-attribute primary keys are automatically in 2NF if they are in 1NF.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'high'
      },
      {
        id: 'q_db_s2',
        question: 'State the ACID properties in transaction processing and identify the component responsible for Durability.',
        answer: '• Atomicity (Recovery Manager), Consistency (Application/Integrity constraints), Isolation (Concurrency Control manager), Durability (Write-Ahead Logging / Recovery Manager).\n• Durability guarantees that committed data survives power failures and system crashes via non-volatile log write buffers.',
        marks: 3,
        type: 'short',
        examType: 'Short Answer (3 Marks)',
        importance: 'high'
      },
      {
        id: 'q_db_c1',
        question: 'Differentiate between 3NF and BCNF with a concrete example of dependency preservation.',
        answer: '• 3NF Rule: For every non-trivial X → A, X must be a super key OR A must be a prime attribute (part of candidate key).\n• BCNF Rule: For every non-trivial X → A, X must strictly be a super key.\n• Difference: In relations with overlapping candidate keys (e.g., R(Student, Course, Instructor)), BCNF decomposition may destroy functional dependencies that 3NF preserves with lossless join.',
        marks: 5,
        type: 'conceptual',
        examType: 'Midterm Conceptual (5 Marks)',
        importance: 'critical'
      },
      {
        id: 'q_db_l1',
        question: 'Explain the complete normalization hierarchy from 1NF through BCNF. Provide schema examples, anomalies, and formal mathematical conditions.',
        answer: '1. Anomalies in Unnormalized Data: Insertion anomaly (cannot record entity without foreign relation), Deletion anomaly (deleting one entity accidentally deletes other facts), Modification anomaly (inconsistent data after partial update).\n\n2. 1NF (Scalar Atomicity): Attribute values must be atomic and indivisible with no repeating columns or sets.\n\n3. 2NF (No Partial Dependencies): Relation is in 1NF and every non-prime attribute is fully functionally dependent on the primary key.\n\n4. 3NF (No Transitive Dependencies): In 2NF and for every X → Y, either X is a super key or Y is a prime attribute.\n\n5. BCNF (Strict Superkey Determinants): Stricter than 3NF; removes cases where non-trivial dependencies have non-superkey determinants even if the RHS is prime.\n\n6. Summary Table: Contrast lossless join guarantees vs. functional dependency preservation across 3NF and BCNF.',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'Anomalies (Insertion, Deletion, Update)',
          '1NF through BCNF mathematical criteria',
          'Prime vs Non-prime attribute definitions',
          'Dependency preservation vs Lossless join trade-off'
        ]
      },
      {
        id: 'q_db_l2',
        question: 'Describe Concurrency Control protocols in DBMS. Contrast Two-Phase Locking (2PL) with Strict 2PL and explain Deadlock handling.',
        answer: '1. Serializability: Conflict serializability verified via precedence (serialization) graphs; acyclic graphs prove serial equivalence.\n\n2. Basic 2PL (Two-Phase Locking):\n• Growing Phase: Transaction may acquire locks but cannot release any.\n• Shrinking Phase: Transaction may release locks but cannot acquire new locks.\n• Guarantee: Ensures conflict serializability but may suffer cascading aborts and deadlocks.\n\n3. Strict 2PL:\n• Exclusive locks held until transaction commits or aborts.\n• Eliminates cascading rollbacks completely (recoverable and cascadeless schedules).\n\n4. Deadlock Detection and Recovery:\n• Wait-For Graph (WFG) cycle detection.\n• Wait-Die (non-preemptive) and Wound-Wait (preemptive) timestamp protocols.\n• Victim selection and rollback mechanisms.',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'Conflict serializability & Precedence graphs',
          'Growing vs Shrinking phase of 2PL',
          'Strict 2PL cascadeless abort guarantee',
          'Wait-For Graph & Wound-Wait deadlock prevention'
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc_db_1',
        materialId: 'mat_dbms_1',
        front: 'What requirement must hold for a relation to satisfy 2NF?',
        back: 'The relation must be in 1NF and have NO partial dependencies (no non-prime attribute can depend on a proper subset of a candidate key).',
        topic: 'Normalization',
        difficulty: 'medium',
        isDifficult: false,
        status: 'mastered'
      },
      {
        id: 'fc_db_2',
        materialId: 'mat_dbms_1',
        front: 'What does the "I" in ACID stand for and how is it achieved?',
        back: 'Isolation. It ensures concurrent transactions do not interfere with each other, achieved via Concurrency Control (e.g., Two-Phase Locking, Timestamp Ordering, MVCC).',
        topic: 'Transactions',
        difficulty: 'easy',
        isDifficult: false,
        status: 'learning'
      }
    ],
    quizzes: [
      {
        id: 'qz_db_1',
        materialId: 'mat_dbms_1',
        question: 'For a relation to be in BCNF, in every non-trivial functional dependency X -> Y, X must be a:',
        type: 'mcq',
        options: ['Candidate Key', 'Super Key', 'Foreign Key', 'Primary Key only'],
        correctAnswer: 'Super Key',
        explanation: 'BCNF requires that the determinant X in every non-trivial functional dependency X -> Y is a super key.',
        difficulty: 'medium',
        topic: 'Normalization'
      },
      {
        id: 'qz_db_2',
        materialId: 'mat_dbms_1',
        question: 'Which ACID property guarantees that once a transaction commits, its updates persist even after a system crash?',
        type: 'mcq',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswer: 'Durability',
        explanation: 'Durability ensures that committed transactions survive system failures through non-volatile logging mechanisms.',
        difficulty: 'easy',
        topic: 'Transactions'
      }
    ]
  },
  {
    id: 'mat_ml_1',
    title: 'Machine Learning — Supervised Learning & Neural Basics',
    subject: 'Data Science',
    chapter: 'Unit 2: Linear Models, Loss Functions & Perceptrons',
    uploadDate: '2026-09-08',
    fileSize: '6.1 MB',
    fileType: 'pdf',
    pageCount: 42,
    isFavorite: true,
    rawText: `Machine Learning Fundamentals:
Supervised learning trains models on labeled input-output pairs (X, y).
Linear Regression minimizes Mean Squared Error (MSE): L = (1/2m) * sum((h_theta(x) - y)^2).
Logistic Regression models class probability via sigmoid function: g(z) = 1 / (1 + e^(-z)). Loss is Cross-Entropy: -[y log(h) + (1-y) log(1-h)].
Gradient Descent update rule: theta_j := theta_j - alpha * (partial dL / partial dtheta_j).
Overfitting occurs when model memorizes training noise. Mitigation: L1 Lasso (sparsity) and L2 Ridge (weight shrinkage) regularization.
Perceptron is single-layer threshold classifier: y = sign(w . x + b). Cannot solve XOR without multi-layer non-linear hidden representations.`,
    summary: {
      tldr: 'Mathematical formulation of Supervised Learning foundations: Ordinary Least Squares, Logistic Classification, Gradient Optimization, Regularization, and early Neural Perceptrons.',
      detailed: 'This chapter provides mathematical rigor to core supervised predictive modeling. Beginning with parametric linear regression optimized via ordinary least squares and batch gradient descent, it transitions to binary logistic regression utilizing the Bernoulli cross-entropy likelihood objective. It explores generalization theory, the bias-variance tradeoff, L1/L2 regularization penalties, and concludes with McCulloch-Pitts and Rosenblatt Perceptron limitations.',
      keyTakeaways: [
        'Linear regression models continuous targets; logistic regression estimates discrete posterior probabilities.',
        'Mean Squared Error (MSE) is convex for linear regression, guaranteeing global minimum convergence with gradient descent.',
        'Cross-Entropy loss penalizes confident incorrect classifications exponentially.',
        'L2 Regularization (Ridge) shrinks weights uniformly; L1 Regularization (Lasso) drives redundant weights to exact zero.',
        'Single-layer perceptrons can only classify linearly separable decision boundaries.'
      ],
      importantTopics: [
        { topic: 'Gradient Descent Optimization & Learning Rate Alpha', relevanceScore: 95 },
        { topic: 'Cross-Entropy Loss Derivation & Sigmoid Activation', relevanceScore: 92 },
        { topic: 'Bias-Variance Tradeoff & L1 vs L2 Regularization', relevanceScore: 88 },
        { topic: 'Perceptron Convergence Theorem & XOR Limitation', relevanceScore: 80 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_ml_1',
        title: 'Gradient Descent Formulation',
        definition: 'First-order iterative optimization algorithm for finding a local minimum of a differentiable objective function.',
        conditions: [
          'Weights update opposite to the gradient vector direction',
          'Learning rate alpha controls step size (too high causes divergence; too low slows convergence)'
        ],
        examTip: 'Formula to memorize: θ := θ - α * ∇J(θ). Be ready to calculate one step of parameter update manually.'
      }
    ],
    keyConcepts: [
      {
        title: 'Bias-Variance Tradeoff',
        explanation: 'High bias implies underfitting (oversimplified model). High variance implies overfitting (excessive sensitivity to small fluctuations in training data).',
        category: 'Model Evaluation'
      }
    ],
    formulas: [
      {
        id: 'f_ml_1',
        name: 'Sigmoid Logistic Function',
        formula: 'σ(z) = 1 / (1 + e^(-z))',
        description: 'Maps any real-valued number into a probability range strictly between 0 and 1.',
        subject: 'Machine Learning'
      },
      {
        id: 'f_ml_2',
        name: 'Binary Cross-Entropy Loss',
        formula: 'L(θ) = - [ y log(h_θ(x)) + (1 - y) log(1 - h_θ(x)) ]',
        description: 'Convex cost function used for binary classification optimization.',
        subject: 'Machine Learning'
      },
      {
        id: 'f_ml_3',
        name: 'Mean Squared Error (MSE)',
        formula: 'MSE = (1 / m) ∑_{i=1}^{m} (y_pred^{(i)} - y_{true}^{(i)})²',
        description: 'Standard loss metric for continuous regression performance evaluation.',
        subject: 'Machine Learning'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_ml_1',
        term: 'Hyperparameter',
        definition: 'A configuration variable set prior to initiating model training (e.g. learning rate, regularization lambda, batch size) rather than learned from data.',
        isImportant: true,
        category: 'Optimization'
      }
    ],
    questions: [
      {
        id: 'q_ml_s1',
        question: 'Differentiate between L1 (Lasso) and L2 (Ridge) regularization penalties in terms of feature selection.',
        answer: '• L1 Regularization (Lasso): Adds the absolute sum of weights (λ∑|w_j|) to the cost function. Geometrically produces sparse models by driving redundant weights to exactly zero, effectively acting as an automatic feature selector.\n• L2 Regularization (Ridge): Adds the squared magnitude of weights (λ∑w_j²) to the cost function. Smoothly shrinks all weights towards zero without making any feature weight exactly zero.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'high'
      },
      {
        id: 'q_ml_s2',
        question: 'What is the role of the learning rate α in gradient descent and what happens if it is chosen poorly?',
        answer: '• Role: Learning rate α scales the step size taken in the negative gradient direction.\n• Too large α: The optimizer can overshoot the global minimum, leading to oscillation or numerical divergence.\n• Too small α: Convergence becomes prohibitively slow and may get trapped in flat plateau regions.',
        marks: 3,
        type: 'short',
        examType: 'Short Answer (3 Marks)',
        importance: 'high'
      },
      {
        id: 'q_ml_c1',
        question: 'Explain why single-layer perceptrons cannot learn the XOR function.',
        answer: '• Linear Separability: The XOR truth table outputs (0,0)→0, (1,1)→0, (0,1)→1, (1,0)→1. Plotting these 4 points reveals that no single straight hyper-plane can partition 1s from 0s.\n• Limitation: A single-layer perceptron creates only one hyper-plane decision boundary. Overcoming XOR requires at least one non-linear hidden layer (Multi-Layer Perceptron) to warp the feature space into a higher-dimensional linearly separable representation.',
        marks: 5,
        type: 'conceptual',
        examType: 'Midterm Conceptual (5 Marks)',
        importance: 'critical'
      },
      {
        id: 'q_ml_l1',
        question: 'Derive the Gradient Descent parameter update rule for Linear Regression with Mean Squared Error (MSE). Explain Batch, Stochastic, and Mini-Batch variants.',
        answer: '1. Hypothesis and Cost Function:\n• Hypothesis: h_θ(x) = ∑_{j=0}^{n} θ_j x_j = θ^T x\n• Cost Function: J(θ) = (1 / 2m) ∑_{i=1}^{m} (h_θ(x^{(i)}) - y^{(i)})²\n\n2. Partial Derivative Derivation:\n• ∂J/∂θ_j = (1 / m) ∑_{i=1}^{m} (h_θ(x^{(i)}) - y^{(i)}) · x_j^{(i)}\n• Update rule: θ_j := θ_j - α · (1 / m) ∑_{i=1}^{m} (h_θ(x^{(i)}) - y^{(i)}) x_j^{(i)}\n\n3. Optimizer Variants:\n• Batch Gradient Descent: Computes gradient over all m samples per step. Smooth convergence, but memory-intensive for large datasets.\n• Stochastic Gradient Descent (SGD): Updates parameters after every single sample. Extremely fast, high variance, helps escape shallow local minima.\n• Mini-Batch Gradient Descent: Splits data into batches of size B (e.g., 32, 64, 128), combining vectorization speed with smooth convergence.',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'MSE objective formulation',
          'Step-by-step calculus derivation of partial derivative',
          'Simultaneous parameter update equation',
          'Comparison of Batch, Mini-batch, and Stochastic variants'
        ]
      },
      {
        id: 'q_ml_l2',
        question: 'Formulate Binary Logistic Regression from first principles. Why does Mean Squared Error fail, and how does Binary Cross-Entropy ensure convexity?',
        answer: '1. Model Formulation:\n• Uses the Sigmoid activation: σ(z) = 1 / (1 + e^(-z)) to map z = θ^T x to range (0, 1) representing probability P(y=1|x).\n\n2. Why MSE Fails for Classification:\n• Substituting non-linear sigmoid into quadratic loss yields a non-convex surface plagued with local minima and flat gradients (vanishing gradient problem near saturation points).\n\n3. Binary Cross-Entropy Loss (Log-Loss):\n• Derived via maximum likelihood estimation under Bernoulli distribution:\n• L(θ) = - (1/m) ∑ [ y^{(i)} log(h_θ(x^{(i)})) + (1 - y^{(i)}) log(1 - h_θ(x^{(i)})) ]\n• Convexity: The Hessian matrix of cross-entropy with sigmoid is positive semi-definite everywhere, ensuring a unique global minimum.\n• Penalty Mechanism: Confident incorrect predictions (predicting 0 when y=1) incur an infinite loss penalty (-log(0) → ∞).',
        marks: 10,
        type: 'long',
        examType: 'Long Descriptive (10 Marks)',
        importance: 'critical',
        expectedPoints: [
          'Sigmoid activation function definition & properties',
          'Mathematical explanation of why MSE is non-convex for sigmoid',
          'Cross-Entropy log-likelihood formulation',
          'Gradient update equivalence to linear regression'
        ]
      }
    ],
    flashcards: [
      {
        id: 'fc_ml_1',
        materialId: 'mat_ml_1',
        front: 'What is the output range of the Sigmoid activation function?',
        back: 'Strictly between 0 and 1: (0, 1).',
        topic: 'Classification',
        difficulty: 'easy',
        isDifficult: false,
        status: 'mastered'
      },
      {
        id: 'fc_ml_2',
        materialId: 'mat_ml_1',
        front: 'What is the key difference in effect between L1 (Lasso) and L2 (Ridge) regularization?',
        back: 'L1 drives parameters to exactly 0 (performing feature selection/sparsity), whereas L2 shrinks parameters close to 0 without making them zero.',
        topic: 'Regularization',
        difficulty: 'medium',
        isDifficult: true,
        status: 'learning'
      }
    ],
    quizzes: [
      {
        id: 'qz_ml_1',
        materialId: 'mat_ml_1',
        question: 'Which regularization technique encourages sparsity by forcing some feature weights to exactly zero?',
        type: 'mcq',
        options: ['L2 Regularization (Ridge)', 'L1 Regularization (Lasso)', 'ElasticNet', 'Dropout'],
        correctAnswer: 'L1 Regularization (Lasso)',
        explanation: 'Due to the diamond contour of the L1 diamond norm, optimal weights frequently intersect axis corners at zero.',
        difficulty: 'medium',
        topic: 'Regularization'
      }
    ]
  },
  {
    id: 'mat_physics_1',
    title: 'Physics — Kinematics & Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Unit 1: Motion in One Dimension & Force Dynamics',
    uploadDate: '2026-09-15',
    fileSize: '3.6 MB',
    fileType: 'pdf',
    pageCount: 30,
    isFavorite: true,
    rawText: `Physics Mechanics Unit 1: Kinematics and Dynamics.
Displacement (s), Initial velocity (u), Final velocity (v), Constant acceleration (a), and Time (t).
Equations of Motion for uniform acceleration:
1. v = u + at
2. s = ut + 0.5 * a * t^2
3. v^2 = u^2 + 2as
Newton's First Law (Inertia): An object remains at rest or in uniform motion in a straight line unless acted upon by a net external force.
Newton's Second Law: The rate of change of momentum is directly proportional to the applied force: F = dp/dt = m * a (for constant mass).
Newton's Third Law: For every action, there is an equal and opposite reaction (F_AB = -F_BA).
Frictional Force: Static friction f_s <= mu_s * N; Kinetic friction f_k = mu_k * N.
Momentum: p = m * v. In the absence of external net force, total momentum is conserved: m1*u1 + m2*u2 = m1*v1 + m2*v2.`,
    summary: {
      tldr: 'Comprehensive coverage of 1D Kinematics and Newtonian Dynamics: Uniform acceleration equations, Newton\'s three laws of motion, friction mechanics, and linear momentum conservation.',
      detailed: 'This unit establishes foundational Newtonian mechanics. It begins with kinematic motion variables under constant acceleration, deriving the three fundamental equations of motion. It then investigates force interactions through Newton\'s three laws, defining inertia, momentum flux (F = dp/dt), and action-reaction pairs. Normal contact forces, static and kinetic friction limits, and inelastic vs. elastic collision conservation laws are analyzed.',
      keyTakeaways: [
        'Kinematic equations strictly apply only under constant, uniform acceleration.',
        'Newton\'s First Law introduces inertial reference frames; Second Law establishes the dynamic relation F = ma.',
        'Action and reaction forces act on two DIFFERENT interacting bodies simultaneously.',
        'Maximum static friction exceeds kinetic friction (μs > μk), creating breakaway threshold behavior.',
        'Total linear momentum is conserved in any isolated system with zero net external impulse.'
      ],
      importantTopics: [
        { topic: 'Equations of Motion Derivation & Graphs', relevanceScore: 98 },
        { topic: 'Newton\'s Second Law & Free Body Diagrams (FBD)', relevanceScore: 96 },
        { topic: 'Static vs Kinetic Friction on Inclined Planes', relevanceScore: 91 },
        { topic: 'Conservation of Linear Momentum & Recoil Velocity', relevanceScore: 89 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_phy_1',
        title: 'Kinematics Equations Summary',
        definition: 'Mathematical relationships connecting displacement, velocity, acceleration, and time under uniform acceleration.',
        conditions: [
          'Acceleration (a) must be constant throughout the motion',
          'Direction must be consistently signed (+ for forward/upward, - for backward/downward)',
          'For free-fall under gravity, a = -g = -9.8 m/s²'
        ],
        examTip: 'Whenever a body starts from rest, set u = 0. When it comes to a stop, set v = 0.'
      },
      {
        id: 'sn_phy_2',
        title: 'Newton\'s Laws of Motion',
        definition: 'Three empirical axioms formulated by Sir Isaac Newton describing the relationship between a body and the forces acting upon it.',
        conditions: [
          'First Law: Defines Inertia (mass is the quantitative measure of inertia)',
          'Second Law: F_net = m * a (vector equation resolved into x and y components)',
          'Third Law: Action-reaction pairs never cancel each other because they act on different bodies'
        ],
        examTip: 'In Free Body Diagrams (FBD), always isolate the object and draw ONLY forces acting ON the object, never forces exerted BY the object.'
      }
    ],
    keyConcepts: [
      {
        title: 'Inertia & Mass Relation',
        explanation: 'Inertia is the inherent resistance of any physical object to any change in its velocity. Mass is the quantitative measurement of inertia.',
        category: 'Dynamics'
      },
      {
        title: 'Friction on Inclines',
        explanation: 'For a block on an incline of angle θ, the normal force is N = mg cos θ and the parallel downward gravitational component is mg sin θ.',
        category: 'Applied Mechanics'
      }
    ],
    formulas: [
      {
        id: 'f_phy_1',
        name: 'First Equation of Motion',
        formula: 'v = u + a · t',
        description: 'Relates final velocity (v), initial velocity (u), uniform acceleration (a), and elapsed time (t).',
        subject: 'Physics'
      },
      {
        id: 'f_phy_2',
        name: 'Second Equation of Motion (Displacement)',
        formula: 's = u · t + ½ · a · t²',
        description: 'Calculates total displacement under constant acceleration.',
        subject: 'Physics'
      },
      {
        id: 'f_phy_3',
        name: 'Third Equation of Motion (Time-Independent)',
        formula: 'v² = u² + 2 · a · s',
        description: 'Connects velocities, acceleration, and displacement without requiring elapsed time.',
        subject: 'Physics'
      },
      {
        id: 'f_phy_4',
        name: 'Newton\'s Second Law of Motion',
        formula: 'F_net = m · a',
        description: 'Net force equals mass times acceleration for constant-mass systems.',
        subject: 'Physics'
      },
      {
        id: 'f_phy_5',
        name: 'Conservation of Linear Momentum',
        formula: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
        description: 'Total momentum before collision equals total momentum after collision in isolated systems.',
        subject: 'Physics'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_phy_1',
        term: 'Inertia',
        definition: 'The property of matter by which it retains its state of rest or its velocity along a straight line so long as it is not acted upon by an external force.',
        isImportant: true,
        category: 'Mechanics'
      },
      {
        id: 'def_phy_2',
        term: 'Linear Momentum',
        definition: 'The product of the mass and velocity of an object (p = mv), a vector quantity possessing the direction of velocity.',
        isImportant: true,
        category: 'Mechanics'
      }
    ],
    questions: [
      {
        id: 'q_phy_s1',
        question: 'State Newton\'s Second Law of Motion and show how F = ma is derived.',
        answer: '• Statement: The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.\n• Derivation: Momentum p = mv. Force F ∝ dp/dt = d(mv)/dt. If mass m is constant, F = m(dv/dt) = ma.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'high'
      },
      {
        id: 'q_phy_c1',
        question: 'Explain why a cricket fielder pulls their hands backwards while catching a fast-moving ball.',
        answer: '• Impulse Equation: Impulse J = F · Δt = Δp (change in momentum is constant for a given ball speed).\n• Hand Motion: By pulling hands backwards, the fielder increases the contact impact time Δt.\n• Result: Since F = Δp / Δt, increasing Δt reduces the impact force F exerted on the hands, preventing pain and injury.',
        marks: 5,
        type: 'conceptual',
        examType: 'Conceptual Application (5 Marks)',
        importance: 'critical'
      }
    ],
    flashcards: [
      {
        id: 'fc_phy_1',
        materialId: 'mat_physics_1',
        front: 'What is the formula for displacement under uniform acceleration?',
        back: 's = ut + ½at² (where u is initial velocity, a is acceleration, and t is time).',
        topic: 'Kinematics',
        difficulty: 'easy',
        isDifficult: false,
        status: 'mastered'
      }
    ],
    quizzes: [
      {
        id: 'qz_phy_1',
        materialId: 'mat_physics_1',
        question: 'A car starting from rest accelerates uniformly at 2 m/s² for 5 seconds. What is its final velocity?',
        type: 'mcq',
        options: ['5 m/s', '10 m/s', '15 m/s', '20 m/s'],
        correctAnswer: '10 m/s',
        explanation: 'Using v = u + at: with u = 0, a = 2 m/s², and t = 5 s: v = 0 + (2)(5) = 10 m/s.',
        difficulty: 'easy',
        topic: 'Kinematics'
      }
    ]
  },
  {
    id: 'mat_bio_1',
    title: 'Cellular Biology & Genetics — Mitosis, DNA & Mendelian Rules',
    subject: 'Biology',
    chapter: 'Unit 2: Cell Division, DNA Replication & Inheritance',
    uploadDate: '2026-09-16',
    fileSize: '5.1 MB',
    fileType: 'pdf',
    pageCount: 36,
    isFavorite: true,
    rawText: `Cellular Biology: Mitosis, Meiosis, DNA Replication, and Genetics.
The Cell Cycle: Interphase (G1, S, G2) and M Phase (Mitosis and Cytokinesis).
Mitosis stages: Prophase, Metaphase (chromosomes align at equatorial plate), Anaphase (sister chromatids separate), Telophase (nuclear membrane reforms).
DNA Structure: Double helix discovered by Watson & Crick. Complementary base pairing: Adenine pairs with Thymine (2 H-bonds), Guanine pairs with Cytosine (3 H-bonds).
DNA Replication is semi-conservative (Meselson-Stahl experiment). Key enzymes: Helicase (unwinds DNA), DNA Polymerase (synthesizes complementary strand 5' to 3'), Primase (RNA primer), Ligase (seals Okazaki fragments).
Mendel's Laws of Inheritance:
1. Law of Dominance: Heterozygous genotype expresses dominant phenotype.
2. Law of Segregation: Alleles separate during gamete formation so each gamete carries one allele. Monohybrid cross phenotypic ratio is 3:1, genotypic ratio is 1:2:1.
3. Law of Independent Assortment: Dihybrid cross phenotypic ratio is 9:3:3:1.`,
    summary: {
      tldr: 'Covers eukaryotic cell division cycles (Mitosis vs Meiosis), semi-conservative DNA replication mechanisms, molecular base-pairing rules, and classic Mendelian inheritance genetics.',
      detailed: 'This unit covers foundational molecular and cellular genetics. It analyzes the cell cycle progression through Interphase checkpoints and Mitotic karyokinesis stages. It contrasts equational mitotic division against reductional meiotic division. Molecular analysis explores DNA double-helix antiparallel topology, replication fork dynamics with leading and lagging strands, and concludes with Mendelian monohybrid and dihybrid cross ratios.',
      keyTakeaways: [
        'Mitosis produces 2 genetically identical diploid daughter cells; Meiosis produces 4 genetically distinct haploid gametes.',
        'DNA replication is semi-conservative: each daughter double helix retains one parental strand and one newly synthesized strand.',
        'DNA Polymerase can only synthesize DNA in the 5\' to 3\' direction, necessitating Okazaki fragments on the lagging strand.',
        'Monohybrid F2 cross yields 3:1 phenotypic and 1:2:1 genotypic ratios under complete dominance.',
        'Independent assortment applies to genes located on different chromosomes or far apart on the same chromosome.'
      ],
      importantTopics: [
        { topic: 'Stages of Mitosis vs Meiosis & Crossing Over', relevanceScore: 98 },
        { topic: 'DNA Replication Fork Enzymes & Okazaki Fragments', relevanceScore: 95 },
        { topic: 'Mendelian Crosses & Punnett Square Ratios', relevanceScore: 92 },
        { topic: 'Complementary Base Pairing & Hydrogen Bonds', relevanceScore: 88 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_bio_1',
        title: 'Stages of Mitosis (PMAT)',
        definition: 'Process of nuclear division in eukaryotic cells that produces two daughter nuclei identical to parent nucleus.',
        conditions: [
          'Prophase: Chromatin condenses into chromosomes; spindle apparatus forms',
          'Metaphase: Chromosomes align along the metaphase equatorial plate',
          'Anaphase: Centromeres split; sister chromatids migrate to opposite poles',
          'Telophase: Nuclear envelopes reform; chromatin decondenses'
        ],
        examTip: 'High-yield mnemonic: PMAT (Prophase, Metaphase, Anaphase, Telophase). Remember that DNA replication occurs during Interphase S-phase, NOT during Mitosis!'
      }
    ],
    keyConcepts: [
      {
        title: 'Semi-Conservative DNA Replication',
        explanation: 'Each replicated DNA molecule consists of one original conserved strand and one newly synthesized daughter strand, proven experimentally by Meselson and Stahl.',
        category: 'Molecular Genetics'
      }
    ],
    formulas: [
      {
        id: 'f_bio_1',
        name: 'Mendelian Monohybrid F2 Phenotypic Ratio',
        formula: 'Dominant : Recessive = 3 : 1',
        description: 'Phenotypic probability distribution in F2 generation of a monohybrid cross under complete dominance.',
        subject: 'Biology'
      },
      {
        id: 'f_bio_2',
        name: 'Mendelian Dihybrid F2 Phenotypic Ratio',
        formula: '9 : 3 : 3 : 1',
        description: 'Standard phenotypic ratio for two independently assorting unlinked genes in the F2 generation.',
        subject: 'Biology'
      },
      {
        id: 'f_bio_3',
        name: 'Chargaff\'s DNA Base-Pairing Rule',
        formula: '[A] = [T]  and  [G] = [C]  ⇒  [A + G] = [T + C]',
        description: 'The concentration of purines equals the concentration of pyrimidines in double-stranded DNA.',
        subject: 'Biology'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_bio_1',
        term: 'Allele',
        definition: 'One of two or more alternative forms of a gene that arise by mutation and are found at the same place on a chromosome.',
        isImportant: true,
        category: 'Genetics'
      }
    ],
    questions: [
      {
        id: 'q_bio_s1',
        question: 'State Chargaff\'s Rule of DNA base composition.',
        answer: '• Rule: In any double-stranded DNA molecule, the amount of Adenine (A) equals Thymine (T), and Guanine (G) equals Cytosine (C).\n• Ratio: Consequently, the ratio of total purines (A + G) to total pyrimidines (T + C) is always 1:1.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'high'
      }
    ],
    flashcards: [
      {
        id: 'fc_bio_1',
        materialId: 'mat_bio_1',
        front: 'In what direction does DNA Polymerase synthesize new DNA strands?',
        back: 'Strictly in the 5\' to 3\' direction (adding nucleotides to the 3\' OH end).',
        topic: 'DNA Replication',
        difficulty: 'medium',
        isDifficult: false,
        status: 'mastered'
      }
    ],
    quizzes: [
      {
        id: 'qz_bio_1',
        materialId: 'mat_bio_1',
        question: 'During which mitotic stage do sister chromatids separate and move toward opposite poles?',
        type: 'mcq',
        options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
        correctAnswer: 'Anaphase',
        explanation: 'In Anaphase, cohesin proteins degrade, centromeres split, and kinetochore microtubules pull sister chromatids to opposite poles.',
        difficulty: 'easy',
        topic: 'Mitosis'
      }
    ]
  },
  {
    id: 'mat_econ_1',
    title: 'Microeconomics — Demand Elasticity & Market Pricing',
    subject: 'Economics',
    chapter: 'Unit 1: Price Theory, Consumer Choice & Elasticity',
    uploadDate: '2026-09-17',
    fileSize: '3.2 MB',
    fileType: 'pdf',
    pageCount: 26,
    isFavorite: false,
    rawText: `Microeconomics: Demand, Supply, and Elasticity.
The Law of Demand: Other factors remaining constant (ceteris paribus), as price of a good increases, quantity demanded decreases (inverse relationship).
Price Elasticity of Demand (Ed): Measures the responsiveness of quantity demanded to a change in price.
Formula: Ed = (% change in Quantity Demanded) / (% change in Price) = (dQ / dP) * (P / Q).
Elasticity Categories:
Ed > 1: Price Elastic (luxuries, many substitutes).
Ed < 1: Price Inelastic (necessities, insulin, fuel).
Ed = 1: Unitary Elastic (Total Revenue remains unchanged).
Ed = 0: Perfectly Inelastic (vertical demand curve).
Ed = infinity: Perfectly Elastic (horizontal demand curve).
Total Revenue Rule:
If demand is Elastic, lowering price increases Total Revenue.
If demand is Inelastic, lowering price decreases Total Revenue.
Market Equilibrium: Occurs at price where Quantity Demanded equals Quantity Supplied (Qd = Qs).`,
    summary: {
      tldr: 'Core principles of Microeconomic price theory: Law of demand, price elasticity coefficient calculation, total revenue optimization, and market clearing equilibrium.',
      detailed: 'This unit develops the foundational framework of microeconomic consumer theory. It formalizes the downward-sloping demand curve under ceteris paribus assumptions. It defines price elasticity of demand using percentage and point methods, connecting elasticity coefficients to firm Total Revenue curves. It analyzes determinants of elasticity and demonstrates competitive market equilibrium determination.',
      keyTakeaways: [
        'Demand curves slope downward due to substitution and income effects.',
        'Price elasticity of demand (Ed) measures responsiveness: %ΔQd / %ΔP.',
        'Inelastic goods (Ed < 1) allow producers to increase revenue by raising prices.',
        'Elastic goods (Ed > 1) cause total revenue to decline if prices are raised.',
        'Market equilibrium is stable when excess demand bids price up and excess supply bids price down.'
      ],
      importantTopics: [
        { topic: 'Price Elasticity of Demand & Total Revenue Relationship', relevanceScore: 97 },
        { topic: 'Point Elasticity vs Arc Elasticity Formula', relevanceScore: 92 },
        { topic: 'Market Clearing Equilibrium & Price Ceilings/Floors', relevanceScore: 89 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_econ_1',
        title: 'Price Elasticity of Demand (Ed)',
        definition: 'A quantitative measure of consumer sensitivity to price variations.',
        conditions: [
          'Ed > 1: Elastic (consumers respond strongly to price changes)',
          'Ed = 1: Unitary (percentage changes in price and quantity are identical)',
          'Ed < 1: Inelastic (consumers must purchase regardless of price hike)'
        ],
        examTip: 'Remember the Total Revenue test: If price and total revenue move in opposite directions, demand is elastic. If they move in the same direction, demand is inelastic.'
      }
    ],
    keyConcepts: [
      {
        title: 'Total Revenue & Elasticity Matrix',
        explanation: 'Firms can only expand revenue by cutting prices when demand is elastic. For inelastic products, price increases drive revenue growth.',
        category: 'Pricing Strategy'
      }
    ],
    formulas: [
      {
        id: 'f_econ_1',
        name: 'Price Elasticity of Demand (Ed)',
        formula: 'E_d = (% Δ Quantity Demanded) / (% Δ Price) = (ΔQ / Q) / (ΔP / P)',
        description: 'Measures proportional responsiveness of quantity demanded to price variation.',
        subject: 'Economics'
      },
      {
        id: 'f_econ_2',
        name: 'Total Revenue Formula',
        formula: 'TR = Price × Quantity = P · Q',
        description: 'Gross revenue generated by selling Q units at market price P.',
        subject: 'Economics'
      },
      {
        id: 'f_econ_3',
        name: 'Competitive Market Equilibrium',
        formula: 'Q_demand(P*) = Q_supply(P*)',
        description: 'Condition where quantity demanded equals quantity supplied with no shortage or surplus.',
        subject: 'Economics'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_econ_1',
        term: 'Ceteris Paribus',
        definition: 'Latin phrase meaning "all other things being equal" or held constant during economic model testing.',
        isImportant: true,
        category: 'Economics Methodology'
      }
    ],
    questions: [
      {
        id: 'q_econ_s1',
        question: 'Why does lowering the price of a price-inelastic good reduce a company\'s total revenue?',
        answer: '• Explanation: In an inelastic market (Ed < 1), the percentage increase in quantity demanded is smaller than the percentage drop in price.\n• Mathematical Impact: Total Revenue TR = P · Q. Because price falls by a larger proportion than volume expands, total dollar revenue declines.',
        marks: 2,
        type: 'short',
        examType: 'Short Answer (2 Marks)',
        importance: 'high'
      }
    ],
    flashcards: [
      {
        id: 'fc_econ_1',
        materialId: 'mat_econ_1',
        front: 'What is the value of Price Elasticity of Demand for an essential medicine like Insulin?',
        back: 'Near 0 (Highly Inelastic), because patients require the exact dosage regardless of price fluctuations.',
        topic: 'Elasticity',
        difficulty: 'easy',
        isDifficult: false,
        status: 'mastered'
      }
    ],
    quizzes: [
      {
        id: 'qz_econ_1',
        materialId: 'mat_econ_1',
        question: 'When the price elasticity of demand for a good is greater than 1, demand is classified as:',
        type: 'mcq',
        options: ['Inelastic', 'Elastic', 'Unitary', 'Perfect'],
        correctAnswer: 'Elastic',
        explanation: 'When Ed > 1, consumers respond with a greater percentage change in quantity than the percentage price shift, indicating elastic demand.',
        difficulty: 'easy',
        topic: 'Elasticity'
      }
    ]
  },
  {
    id: 'mat_science_1',
    title: 'General Science — Photosynthesis & The Ecosystem',
    subject: 'General Science',
    chapter: 'Unit 1: Plant Life, Energy Flow & Food Webs',
    uploadDate: '2026-09-17',
    fileSize: '2.5 MB',
    fileType: 'pdf',
    pageCount: 20,
    isFavorite: false,
    rawText: `General Science: Plants, Photosynthesis, and Ecosystem Energy Flow.
Photosynthesis is the process by which green plants make their own food using sunlight, water, and carbon dioxide.
Word Equation: Carbon dioxide + Water + Sunlight -> Glucose + Oxygen.
Chemical Equation: 6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2.
Key Plant Parts:
Chloroplasts: Organelles containing chlorophyll (green pigment) that absorbs sunlight energy.
Stomata: Tiny pores on the underside of leaves for gas exchange (CO2 in, O2 out).
Xylem: Vessels that transport water and minerals upward from roots to leaves.
Phloem: Vessels that transport manufactured food (sugars) throughout the plant.
Ecosystem Food Chain:
Sun (Primary Energy Source) -> Producer (Green Plants) -> Primary Consumer (Herbivore: Deer, Rabbit) -> Secondary Consumer (Carnivore: Wolf, Snake) -> Tertiary Consumer (Apex Predator: Lion, Eagle).
Decomposers (Fungi, Bacteria): Break down dead matter and return nutrients to soil.`,
    summary: {
      tldr: 'Foundational introduction to photosynthesis in plants, plant vascular transport (xylem & phloem), food chains, and ecological energy transfer.',
      detailed: 'This unit introduces core biological science for middle and secondary learners. It explores the mechanism of autotrophic nutrition through photosynthesis, explaining how chloroplasts convert radiant solar energy into chemical energy stored in glucose molecules. It details stomatal gas exchange, vascular fluid transport via xylem and phloem, and expands outward into ecological food webs and trophic levels.',
      keyTakeaways: [
        'Photosynthesis converts water and carbon dioxide into glucose and releases oxygen gas.',
        'Chlorophyll is the green pigment in chloroplasts that absorbs light energy.',
        'Xylem carries water up; phloem carries prepared food in all directions.',
        'Plants are autotrophs (producers) forming the foundation of all terrestrial food webs.',
        'Energy flows unidirectionally from the sun through trophic levels, diminishing at each step.'
      ],
      importantTopics: [
        { topic: 'Photosynthesis Word & Chemical Equation', relevanceScore: 99 },
        { topic: 'Chloroplast, Chlorophyll & Stomatal Gas Exchange', relevanceScore: 94 },
        { topic: 'Xylem vs Phloem Plant Transport Vessels', relevanceScore: 89 },
        { topic: 'Producers, Consumers & Decomposers in Food Webs', relevanceScore: 85 }
      ]
    },
    shortNotes: [
      {
        id: 'sn_sci_1',
        title: 'Photosynthesis Overview',
        definition: 'Process by which green plants manufacture glucose from CO2 and H2O in the presence of sunlight and chlorophyll.',
        conditions: [
          'Raw materials needed: Carbon dioxide (from air) and Water (from soil)',
          'Conditions necessary: Sunlight and Chlorophyll',
          'Products formed: Glucose (food) and Oxygen (byproduct released into atmosphere)'
        ],
        examTip: 'Remember the formula: 6CO2 + 6H2O → C6H12O6 + 6O2. Remember that oxygen is released as a vital byproduct!'
      }
    ],
    keyConcepts: [
      {
        title: 'Xylem vs Phloem',
        explanation: 'Xylem acts like an elevator moving water only upwards from roots to leaves. Phloem acts like a two-way delivery truck carrying food everywhere.',
        category: 'Plant Transport'
      }
    ],
    formulas: [
      {
        id: 'f_sci_1',
        name: 'Photosynthesis Chemical Equation',
        formula: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂',
        description: 'The balanced biochemical equation describing glucose production and oxygen release in plants.',
        subject: 'General Science'
      }
    ],
    hasFormulas: true,
    definitions: [
      {
        id: 'def_sci_1',
        term: 'Chlorophyll',
        definition: 'The green pigment found in chloroplasts of plant cells that absorbs light energy required for photosynthesis.',
        isImportant: true,
        category: 'Plant Biology'
      },
      {
        id: 'def_sci_2',
        term: 'Stomata',
        definition: 'Microscopic pores on leaf surfaces regulated by guard cells to permit carbon dioxide intake and oxygen release.',
        isImportant: true,
        category: 'Plant Anatomy'
      }
    ],
    questions: [
      {
        id: 'q_sci_s1',
        question: 'Write the chemical equation for photosynthesis and name the byproduct gas released.',
        answer: '• Chemical Equation: 6CO2 + 6H2O + Sunlight (with Chlorophyll) → C6H12O6 + 6O2\n• Byproduct Gas: Oxygen (O2) is released into the atmosphere, which all aerobic living organisms breathe.',
        marks: 2,
        type: 'short',
        examType: 'School Examination (2 Marks)',
        importance: 'high'
      }
    ],
    flashcards: [
      {
        id: 'fc_sci_1',
        materialId: 'mat_science_1',
        front: 'What plant tissue transports water upward from the roots to the leaves?',
        back: 'Xylem tissue.',
        topic: 'Plant Transport',
        difficulty: 'easy',
        isDifficult: false,
        status: 'mastered'
      }
    ],
    quizzes: [
      {
        id: 'qz_sci_1',
        materialId: 'mat_science_1',
        question: 'Which gas do plants take in from the atmosphere through their stomata to perform photosynthesis?',
        type: 'mcq',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide',
        explanation: 'Plants absorb Carbon Dioxide (CO2) from the air through microscopic leaf openings called stomata.',
        difficulty: 'easy',
        topic: 'Photosynthesis'
      }
    ]
  }
];

export const initialStudyPlan: StudyPlanSession[] = [
  {
    id: 'sp_1',
    time: '5:30 PM',
    subject: 'Physics',
    durationMinutes: 45,
    taskType: 'study',
    completed: true,
    notes: 'Solve Kinematics uniform acceleration problems'
  },
  {
    id: 'sp_2',
    time: '6:30 PM',
    subject: 'Biology',
    durationMinutes: 40,
    taskType: 'quiz',
    completed: false,
    notes: 'Review Mitosis vs Meiosis stages and active recall'
  },
  {
    id: 'sp_3',
    time: '7:30 PM',
    subject: 'Data Structures',
    durationMinutes: 50,
    taskType: 'mock_exam',
    completed: false,
    notes: 'Unit 1 practice exam: Stacks, Queues & Linked Lists'
  },
  {
    id: 'sp_4',
    time: '8:45 PM',
    subject: 'Economics',
    durationMinutes: 30,
    taskType: 'flashcards',
    completed: false,
    notes: 'Review Elasticity coefficients and Total Revenue rules'
  }
];

export const initialStudyGroups: StudyGroup[] = [
  {
    id: 'grp_1',
    name: 'DSA Placement Prep Group',
    subject: 'Data Structures & Algorithms',
    membersCount: 124,
    description: 'Daily algorithmic problem solving, mock technical interviews, and notes exchange.',
    recentActivity: 'Shared 12 new questions on Binary Tree traversals',
    isJoined: true,
    materialsCount: 18
  },
  {
    id: 'grp_2',
    name: 'DBMS Core Masters',
    subject: 'Database Management',
    membersCount: 88,
    description: 'Deep-dive into transaction concurrency, SQL query optimization, and normal forms.',
    recentActivity: 'Group quiz scheduled for Friday 7:00 PM',
    isJoined: true,
    materialsCount: 12
  },
  {
    id: 'grp_3',
    name: 'AI & Machine Learning Scholars',
    subject: 'Machine Learning',
    membersCount: 156,
    description: 'Neural network architectures, statistical derivations, and Kaggle notebook walkthroughs.',
    recentActivity: 'New thread on Backpropagation chain rule',
    isJoined: false,
    materialsCount: 24
  }
];

export const initialDiscussions: DiscussionThread[] = [
  {
    id: 'disc_1',
    subject: 'Data Structures',
    title: '🔥 Important questions for upcoming Unit 1 midterm?',
    content: 'Our professor mentioned that circular queue false overflow and 2-stack queue implementation are almost guaranteed to appear on the exam. Has anyone summarized the proofs?',
    author: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    date: '2 hours ago',
    likes: 18,
    userLiked: true,
    tags: ['MidtermPrep', 'Stacks', 'Queues'],
    isPinned: true,
    repliesCount: 3,
    replies: [
      {
        id: 'rep_1',
        author: 'Priya Patel',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        content: 'Check the Short Notes tab in the Unit 1 material! The AI Study Assistant generated the exact amortized cost proof for the 2-stack queue.',
        date: '1 hour ago',
        likes: 6
      },
      {
        id: 'rep_2',
        author: 'Mukteswar',
        content: 'Yes! The condition (rear + 1) % C == front is also super critical for circular queues.',
        date: '45 mins ago',
        likes: 4
      }
    ]
  },
  {
    id: 'disc_2',
    subject: 'DBMS',
    title: '💡 Can someone explain deadlock in 2PL simply?',
    content: 'When two transactions each hold a shared lock on data item A and request an exclusive lock on item B held by the other, why does 2PL fail to prevent this?',
    author: 'Rohan Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    date: 'Yesterday',
    likes: 9,
    userLiked: false,
    tags: ['DBMS', 'Concurrency', '2PL'],
    isPinned: false,
    repliesCount: 2,
    replies: [
      {
        id: 'rep_3',
        author: 'Ananya Gupta',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: '2PL guarantees Serializability, NOT deadlock prevention! You need strict 2PL or wait-die / wound-wait schemes to prevent deadlocks.',
        date: 'Yesterday',
        likes: 5
      }
    ]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Daily Reminder',
    message: 'Time to study! You have a 7-day streak 🔥. Continue your progress.',
    type: 'daily',
    time: '15 mins ago',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Exam Reminder',
    message: '⏰ Your Data Structures exam is in 12 days. Review weak topic: Graph Cycle Detection.',
    type: 'exam',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Milestone Unlocked! 🎉',
    message: 'Congratulations! You have completed over 100 questions this month.',
    type: 'milestone',
    time: 'Yesterday',
    read: true
  },
  {
    id: 'notif_4',
    title: 'Study Plan Session',
    message: '📅 Today’s DSA practice exam session is scheduled for 7:00 PM.',
    type: 'plan',
    time: 'Yesterday',
    read: true
  }
];

export const initialExamHistory: ExamAttempt[] = [
  {
    id: 'exam_att_1',
    materialTitle: 'Data Structures — Mock Test 1',
    subject: 'Data Structures',
    score: 78,
    totalMarks: 100,
    accuracy: 82,
    timeTakenSeconds: 2482, // 41m 22s
    date: '2026-09-15',
    mode: 'real',
    correctCount: 21,
    incorrectCount: 5,
    unansweredCount: 4,
    topicPerformance: [
      { topic: 'Arrays', percentage: 90 },
      { topic: 'Linked Lists', percentage: 75 },
      { topic: 'Trees & Heaps', percentage: 58 },
      { topic: 'Graphs', percentage: 82 }
    ],
    aiAnalysis: {
      strongAreas: ['Array indexing and contiguous memory analysis', 'Queue circular pointer algebra', 'BFS Graph Traversal'],
      weakAreas: ['Tree balancing rotations (AVL/Red-Black)', 'Cycle detection in directed graphs'],
      revisionNeeded: ['AVL Tree balance factor recalculation', 'Tarjan / Kosaraju strongly connected components'],
      commonMistakes: ['Neglecting edge case where root node is null during tree recursive traversal', 'Index off-by-one in binary search ceiling calculation'],
      recommendedPractice: 'Complete 10 focused quiz questions on Tree Traversals and review the Flashcard set on AVL Rotations.'
    }
  }
];
