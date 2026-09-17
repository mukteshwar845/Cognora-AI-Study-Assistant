# 🧠 Cognora — AI Study Assistant & Exam Preparation Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.8%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Cognora** is an intelligent, context-aware AI study assistant and exam preparation ecosystem that transforms raw textbooks, lecture notes, slides, and syllabus documents into structured summaries, high-yield revision notes, adaptive quizzes, spaced-repetition flashcards, and personalized study schedules.

---

## 🌟 Why Cognora? (Benefits for Students & Learners)

Traditional studying often involves passive reading, fragmented notes, and last-minute cramming without knowing which concepts will actually be tested. **Cognora eliminates study fatigue and accelerates academic mastery:**

- **⚡ Saves Hundreds of Hours**: Automatically digests lengthy PDFs, slides, and handwritten notes into instant TL;DR summaries, key takeaways, and prioritized high-frequency exam topics.
- **🎯 Closes Concept Gaps Faster**: Ask questions against your exact course syllabus or uploaded slides with 6 customized explanation levels (from ELI10 to Exam-Ready structured answers).
- **🧠 Proven Active Recall & Retention**: Converts any material into interactive 3D flashcards and quizzes, embedding knowledge directly into long-term memory.
- **📊 Eliminates Exam Anxiety**: Simulates real university exam conditions with timed test papers and delivers instant diagnostic reports showing your weak spots, recurring pitfalls, and exact revision steps.
- **📅 Realistic, Stress-Free Planning**: Generates day-by-day study timetables based on your upcoming exam dates, daily available hours, and self-identified weak subjects.
- **🛡️ Zero-Downtime Reliability**: Runs in **Dual Mode** — leverages **Google Gemini 3.8 Flash** for deep AI reasoning when configured, and provides robust **offline fallback generators** so students never face service interruptions.

---

## 🚀 Key Features & Capabilities

### 1. 📄 Multimodal Document Ingestion & Synthesis
- Upload **PDFs, DOCX, PPTX, TXT, Images, or paste raw lecture notes**.
- Extracts foundational theory, algorithmic invariants, and operational trade-offs.
- Automatically generates:
  - **TL;DR Overview**: 1–2 sentence executive summary.
  - **Detailed Synthesis**: Comprehensive academic breakdown.
  - **Key Takeaways & Exam Weightage**: Relevancy-ranked topic hierarchy.

### 2. 📝 High-Yield Study Suite
- **Short Notes & Exam Tips**: Concise definitions, boundary conditions, algorithmic complexities ($O(n)$, $O(\log n)$), and high-frequency university exam tips.
- **Key Concepts Matrix**: Category-tagged foundational building blocks for rapid review.
- **Formula Sheets & Runtime Equations**: Mathematical and computational formulas organized with descriptions and variables.
- **Crucial Definitions**: Filterable glossary of core terminology flagged for significance.

### 3. 🤖 Context-Aware AI Doubt Solver ("Ask AI")
- Query individual documents or your entire uploaded library.
- **6 Tailored Answer Modes**:
  | Mode | Purpose |
  | :--- | :--- |
  | **Simple** | Clear, concise overview for rapid understanding. |
  | **Detailed** | Comprehensive deep-dive covering edge cases and underlying mechanics. |
  | **Exam Ready** | Point-by-point, structured format optimized for scoring maximum marks. |
  | **ELI10** | Explain Like I'm 10 — intuitive analogies and simplified terms. |
  | **Real-World Example** | Practical application scenarios that make theoretical concepts click. |
  | **Code / Implementation** | Complete code snippets, syntax explanations, and edge-case handling. |

### 4. 🎯 Adaptive AI Quiz Generator
- Generates custom practice sets on demand across multiple formats:
  - Multiple Choice Questions (MCQs)
  - True / False statements
  - Multiple Answer selections
- Difficulty toggle: **Easy**, **Medium**, or **Hard**.
- Immediate scoring with in-depth rationale for both correct answers and distractors.

### 5. ⏱️ Exam Mode Simulation & AI Diagnostics
- Experience realistic exam environments with an active countdown timer, categorized question palette, question flagging, and progress tracker.
- Post-submission **AI Diagnostic Report**:
  - **Strong Areas**: Confirmed topics you have mastered.
  - **Weak Areas**: Specific concepts requiring immediate reinforcement.
  - **Common Mistakes**: Off-by-one errors, boundary oversights, and logic traps.
  - **Revision Action Items**: Targeted study tasks to increase your exam score.

### 6. 🗂️ 3D Spaced-Repetition Flashcards
- Interactive flip cards with tactile 3D perspective animations.
- Categorization by subject, chapter, and difficulty level.
- Status progression: **New** ➔ **Learning** ➔ **Mastered**.
- Filter specifically for cards marked as difficult during revision sessions.

### 7. 📅 Intelligent Daily Study Planner
- Input your **Exam Date**, **Daily Study Budget (hours)**, **Weak Subjects**, and **Preferred Study Window** (Morning, Afternoon, Evening, Night).
- Dynamically schedules a balanced timetable featuring:
  - Deep-dive concept sessions
  - Timed mock exams
  - Spaced flashcard drills
  - Buffer revision blocks

### 8. 📊 Performance Analytics & Habit Tracker
- **Consistency Tracking**: Current study streak (days) and weekly activity heatmap.
- **Subject Mastery**: Visual progress bars and accuracy metrics per course.
- **Study Volume**: Total minutes logged, questions solved, and quiz averages.

### 9. 👥 Collaborative Student Community
- Discussion threads with subject tags, question upvoting, and peer replies.
- Peer study groups for group exam preparation and shared milestones.

### 10. 🎨 Premium Modern UI / UX
- Sleek dark and light mode themes with custom palette accents.
- **Focus Mode**: Distraction-free interface hiding menus and notifications.
- Smooth micro-interactions powered by Framer Motion.
- Fully responsive across desktop, tablet, and mobile browsers.

---

## 🛠️ Architecture & Tech Stack

```
Cognora Architecture
├── Frontend (SPA)
│   ├── React 19 (Hooks, Context, State Management)
│   ├── TypeScript (Strict Typings)
│   ├── Tailwind CSS v4 (Modern Styling & Dark Mode)
│   ├── Motion (Micro-animations & 3D card flips)
│   ├── Lucide React (Icons)
│   └── Canvas Confetti (Gamified milestones)
│
├── Backend (Node.js & Express)
│   ├── Express (REST API Routes & Static Serving)
│   ├── Vite (Development Middleware Mode)
│   ├── Google GenAI SDK (@google/genai — Gemini 3.8 Flash)
│   └── Built-in Fallback Generators (Offline zero-downtime resilience)
│
└── Storage Layer
    └── LocalStorage abstraction with seeded academic course datasets
```

---

## 📂 Directory Structure

```plaintext
Cognora-AI-Study-Assistant/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Modular React UI views
│   │   ├── AnalyticsView.tsx       # Student performance analytics & streak heatmap
│   │   ├── AskAIView.tsx           # Context-aware doubt solver with 6 answer modes
│   │   ├── CognoraLogo.tsx         # Brand vector logo
│   │   ├── CommunityView.tsx       # Peer discussions and study groups
│   │   ├── DashboardView.tsx       # Overview metrics, upcoming exams & recent notes
│   │   ├── ExamModeView.tsx        # Timed exam simulation and diagnostic report
│   │   ├── FlashcardsView.tsx      # 3D spaced-repetition flashcards
│   │   ├── LandingPage.tsx         # Interactive product landing page
│   │   ├── LibraryView.tsx         # Uploaded materials & documents catalog
│   │   ├── MobileNav.tsx           # Responsive bottom navigation bar
│   │   ├── Navbar.tsx              # Top navigation, search, and mode toggles
│   │   ├── NotificationDrawer.tsx  # Exam alerts and study reminders
│   │   ├── ProfileModal.tsx        # Student profile and academic goals
│   │   ├── QuizView.tsx            # Adaptive practice quiz interface
│   │   ├── Sidebar.tsx             # Primary navigation sidebar
│   │   ├── SignInModal.tsx         # Authentication modal
│   │   ├── StudyPlannerView.tsx    # Dynamic timetable generator
│   │   ├── StudyWorkspace.tsx      # Tabbed material viewer (Notes, Formulas, Flashcards)
│   │   ├── ThemeSwitcher.tsx       # Theme controller
│   │   └── UploadModal.tsx         # Document upload dialog
│   ├── data/               # Seeded academic data
│   ├── lib/
│   │   └── storage.ts      # Local persistence layer & default materials
│   ├── App.tsx             # Application root router & state hub
│   ├── index.css           # Tailwind v4 base styles & custom animations
│   ├── main.tsx            # DOM entrypoint
│   └── types.ts            # TypeScript data contracts
├── .env.example            # Environment template
├── index.html              # HTML shell
├── package.json            # Scripts & dependencies
├── server.ts               # Express server & Gemini API endpoints
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & development configuration
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` (comes with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/mukteshwar845/Cognora-AI-Study-Assistant.git
cd Cognora-AI-Study-Assistant
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your **Google Gemini API Key**:
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
PORT=3000
```
> **Note:** If `GEMINI_API_KEY` is not set, Cognora will run seamlessly using its built-in intelligent fallback generators.

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
👉 **`http://localhost:3000`**

### 5. Production Build & Run
```bash
# Build client and bundle server
npm run build

# Start production server
npm start
```

---

## 📡 Backend API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and `aiEnabled` indicator |
| `POST` | `/api/ai/analyze-document` | Parses uploaded document and extracts notes, formulas, and summaries |
| `POST` | `/api/ai/ask-doubt` | Solves questions using specified explanation mode and document context |
| `POST` | `/api/ai/generate-quiz` | Generates structured MCQs, True/False, and multi-answer questions |
| `POST` | `/api/ai/generate-study-plan`| Builds personalized daily study timetable based on target exam dates |
| `POST` | `/api/ai/exam-feedback` | Provides post-exam diagnostic reports, identifying strong and weak topics |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/mukteshwar845">Mukteswar Gochhayat</a> for students and lifelong learners worldwide.
</p>
