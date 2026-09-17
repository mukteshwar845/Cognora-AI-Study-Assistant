import React, { useState, useEffect } from 'react';
import {
  loadUserProfile,
  saveUserProfile,
  loadMaterials,
  saveMaterials,
  loadStudyPlan,
  saveStudyPlan,
  loadDiscussions,
  saveDiscussions,
  loadStudyGroups,
  saveStudyGroups,
  loadNotifications,
  saveNotifications,
  loadExamHistory,
  saveExamHistory,
  DEFAULT_MATERIALS
} from './lib/storage';
import {
  UserProfile,
  StudyMaterial,
  StudyPlanSession,
  DiscussionThread,
  StudyGroup,
  NotificationItem,
  ExamAttempt
} from './types';

// Components
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/DashboardView';
import { LibraryView } from './components/LibraryView';
import { StudyWorkspace } from './components/StudyWorkspace';
import { AskAIView } from './components/AskAIView';
import { QuizView } from './components/QuizView';
import { FlashcardsView } from './components/FlashcardsView';
import { ExamModeView } from './components/ExamModeView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { AnalyticsView } from './components/AnalyticsView';
import { CommunityView } from './components/CommunityView';
import { UploadModal } from './components/UploadModal';
import { ProfileModal } from './components/ProfileModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MobileDrawer } from './components/MobileDrawer';

export default function App() {
  // Navigation & View State - Always starts on landing page on initial load & page refresh
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);
  const [examMaterial, setExamMaterial] = useState<StudyMaterial | null>(null);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Modals & Drawers
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('study_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Core Data
  const [user, setUser] = useState<UserProfile>(loadUserProfile);
  const [materials, setMaterials] = useState<StudyMaterial[]>(loadMaterials);
  const [studyPlan, setStudyPlan] = useState<StudyPlanSession[]>(loadStudyPlan);
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(loadDiscussions);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(loadStudyGroups);
  const [notifications, setNotifications] = useState<NotificationItem[]>(loadNotifications);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>(loadExamHistory);

  // Sync dark mode class and data-theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('study_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('study_theme', 'light');
    }
  }, [darkMode]);

  // Sync state helpers
  const handleUpdateMaterials = (newMaterials: StudyMaterial[]) => {
    setMaterials(newMaterials);
    saveMaterials(newMaterials);
    // Update user stats
    const updatedUser = {
      ...user,
      totalMaterialsUploaded: newMaterials.length
    };
    setUser(updatedUser);
    saveUserProfile(updatedUser);
  };

  const handleUpdateMaterial = (updated: StudyMaterial) => {
    const next = materials.map((m) => (m.id === updated.id ? updated : m));
    handleUpdateMaterials(next);
    if (activeMaterial && activeMaterial.id === updated.id) {
      setActiveMaterial(updated);
    }
  };

  const handleDeleteMaterial = (id: string) => {
    const next = materials.filter((m) => m.id !== id);
    handleUpdateMaterials(next);
    if (activeMaterial && activeMaterial.id === id) {
      setActiveMaterial(next[0] || null);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const next = materials.map((m) =>
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    );
    handleUpdateMaterials(next);
  };

  const handleProcessedUpload = (newMaterial: StudyMaterial) => {
    const next = [newMaterial, ...materials];
    handleUpdateMaterials(next);
    setActiveMaterial(newMaterial);
    setCurrentTab('workspace');
    setIsUploadOpen(false);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Material Processed',
      message: `"${newMaterial.title}" is ready with summary, quiz, notes and flashcards.`,
      time: 'Just now',
      timestamp: 'Just now',
      read: false,
      isRead: false,
      type: 'material',
      linkId: newMaterial.id
    };
    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    saveNotifications(nextNotifs);
  };

  const handleTogglePlanSession = (id: string) => {
    const next = studyPlan.map((s) =>
      s.id === id ? { ...s, completed: !s.completed } : s
    );
    setStudyPlan(next);
    saveStudyPlan(next);
  };

  const handleUpdateStudyPlan = (newPlan: StudyPlanSession[]) => {
    setStudyPlan(newPlan);
    saveStudyPlan(newPlan);
  };

  const handleToggleLikeThread = (threadId: string) => {
    const next = discussions.map((t) => {
      if (t.id === threadId) {
        const userLiked = !t.userLiked;
        return {
          ...t,
          userLiked,
          likes: userLiked ? t.likes + 1 : Math.max(0, t.likes - 1)
        };
      }
      return t;
    });
    setDiscussions(next);
    saveDiscussions(next);
  };

  const handleAddReply = (threadId: string, content: string) => {
    const next = discussions.map((t) => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [
            ...t.replies,
            {
              id: `r_${Date.now()}`,
              author: user.name,
              authorAvatar: '',
              content,
              date: 'Just now',
              likes: 0
            }
          ]
        };
      }
      return t;
    });
    setDiscussions(next);
    saveDiscussions(next);
  };

  const handleCreateThread = (title: string, content: string, subject: string) => {
    const newThread: DiscussionThread = {
      id: `thread_${Date.now()}`,
      title,
      author: user.name,
      authorAvatar: '',
      subject,
      content,
      date: 'Just now',
      likes: 0,
      replies: [],
      tags: [subject.toLowerCase().replace(/\s+/g, '-'), 'doubt'],
      isPinned: false,
      userLiked: false,
      repliesCount: 0
    };
    const next = [newThread, ...discussions];
    setDiscussions(next);
    saveDiscussions(next);
  };

  const handleToggleJoinGroup = (groupId: string) => {
    const next = studyGroups.map((g) => {
      if (g.id === groupId) {
        const isJoined = !g.isJoined;
        return {
          ...g,
          isJoined,
          membersCount: isJoined ? g.membersCount + 1 : g.membersCount - 1
        };
      }
      return g;
    });
    setStudyGroups(next);
    saveStudyGroups(next);
  };

  const handleCompleteExam = (attempt: ExamAttempt) => {
    const nextAttempts = [attempt, ...examHistory];
    setExamHistory(nextAttempts);
    saveExamHistory(nextAttempts);

    // Update user stats
    const avg = Math.round(
      nextAttempts.reduce((acc, curr) => acc + curr.score, 0) / nextAttempts.length
    );
    const questionsCount =
      attempt.correctCount + attempt.incorrectCount + attempt.unansweredCount;
    const updatedUser: UserProfile = {
      ...user,
      quizzesAttempted: (user.quizzesAttempted || 0) + questionsCount,
      questionsSolved: user.questionsSolved + attempt.correctCount,
      quizAverage: avg,
      averageQuizScore: avg
    };
    setUser(updatedUser);
    saveUserProfile(updatedUser);
  };

  const handleMarkAllNotifsRead = () => {
    const next = notifications.map((n) => ({ ...n, read: true, isRead: true }));
    setNotifications(next);
    saveNotifications(next);
  };

  const unreadNotifCount = notifications.filter((n) => !(n.read || n.isRead)).length;

  // Jump handlers
  const handleOpenMaterial = (mat: StudyMaterial) => {
    setActiveMaterial(mat);
    setCurrentTab('workspace');
  };

  const handleStartExam = (mat: StudyMaterial) => {
    setExamMaterial(mat);
    setCurrentTab('exams');
  };

  const handleEnterDashboard = () => {
    setShowLanding(false);
    setCurrentTab('dashboard');
  };

  // If user is on landing page view
  if (showLanding) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <LandingPage
          onStartStudying={handleEnterDashboard}
          currentUser={user}
          onLoginSuccess={(updatedUser) => {
            setUser(updatedUser);
            saveUserProfile(updatedUser);
            handleEnterDashboard();
          }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F7F8FC] dark:bg-[#0B0B0F] text-[#111827] dark:text-[#F5F5F7] flex flex-col font-sans transition-colors duration-200`}>
      <div className="flex flex-1 min-h-screen">
        {/* Left Desktop Sidebar (hidden in focus mode) */}
        {!isFocusMode && (
          <Sidebar
            currentTab={currentTab}
            onSelectTab={(tab) => {
              if (tab !== 'workspace') setIsFocusMode(false);
              setCurrentTab(tab);
              if (tab === 'workspace' && !activeMaterial && materials.length > 0) {
                setActiveMaterial(materials[0]);
              }
            }}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenNotifications={() => setIsNotifOpen(true)}
            unreadCount={unreadNotifCount}
            user={user}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}

        {/* Main Content Pane */}
        <div className={`flex-1 flex flex-col min-w-0 ${isFocusMode ? 'pb-8' : 'pb-28 lg:pb-8'}`}>
          {/* Top Navbar (hidden in focus mode) */}
          {!isFocusMode && (
            <Navbar
              currentTab={currentTab}
              user={user}
              unreadCount={unreadNotifCount}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode(!darkMode)}
              onOpenNotifications={() => setIsNotifOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
              onToggleLanding={() => setShowLanding(true)}
              onOpenDrawer={() => setIsMobileDrawerOpen(true)}
              onEnterFocusMode={() => {
                if (!activeMaterial && materials.length > 0) {
                  setActiveMaterial(materials[0]);
                }
                setCurrentTab('workspace');
                setIsFocusMode(true);
              }}
            />
          )}

          {/* Dynamic Page Views */}
          <main className={`flex-1 ${isFocusMode ? 'p-3 sm:p-6 max-w-5xl w-full mx-auto' : 'p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto'}`}>
            {/* View 1: Student Dashboard */}
            {currentTab === 'dashboard' && (
              <DashboardView
                user={user}
                materials={materials}
                studyPlan={studyPlan}
                onOpenUpload={() => setIsUploadOpen(true)}
                onOpenMaterial={handleOpenMaterial}
                onStartExam={handleStartExam}
                onNavigateTab={(tab) => {
                  if (tab !== 'workspace') setIsFocusMode(false);
                  setCurrentTab(tab);
                  if (tab === 'workspace' && !activeMaterial && materials.length > 0) {
                    setActiveMaterial(materials[0]);
                  }
                }}
                onTogglePlanSession={handleTogglePlanSession}
              />
            )}

            {/* View 2: Study Library */}
            {currentTab === 'library' && (
              <LibraryView
                materials={materials}
                onOpenMaterial={handleOpenMaterial}
                onOpenUpload={() => setIsUploadOpen(true)}
                onToggleFavorite={handleToggleFavorite}
                onDeleteMaterial={handleDeleteMaterial}
                onStartExam={handleStartExam}
              />
            )}

            {/* View 3: Comprehensive Study Workspace */}
            {currentTab === 'workspace' && (
              <div className="space-y-4">
                {materials.length > 0 ? (
                  <>
                    {/* Material Selector Strip if multiple docs (hidden in Focus Mode) */}
                    {!isFocusMode && materials.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <span className="text-xs font-semibold text-stone-500 shrink-0">
                          Active Document:
                        </span>
                        {materials.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setActiveMaterial(m)}
                            className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                              activeMaterial?.id === m.id
                                ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                          >
                            {m.title}
                          </button>
                        ))}
                      </div>
                    )}

                    <StudyWorkspace
                      material={activeMaterial || materials[0]}
                      onUpdateMaterial={handleUpdateMaterial}
                      onStartExam={(mat) => {
                        setIsFocusMode(false);
                        handleStartExam(mat);
                      }}
                      onAskAIGlobal={(q) => {
                        setIsFocusMode(false);
                        setCurrentTab('ask_ai');
                      }}
                      isFocusMode={isFocusMode}
                      onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
                    />
                  </>
                ) : (
                  <div className="p-12 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl space-y-3">
                    <p className="text-sm text-stone-500">
                      No study materials found. Upload your first document to launch the workspace.
                    </p>
                    <button
                      onClick={() => setIsUploadOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                    >
                      Upload Material
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* View 4: Context-Aware Doubt Solver */}
            {currentTab === 'ask_ai' && (
              <AskAIView
                materials={materials}
                selectedMaterialId={activeMaterial?.id || materials[0]?.id || ''}
                onSelectMaterial={(matId) => {
                  const found = materials.find((m) => m.id === matId);
                  if (found) setActiveMaterial(found);
                }}
                onOpenWorkspace={(mat) => {
                  setActiveMaterial(mat);
                  setCurrentTab('workspace');
                }}
              />
            )}

            {/* View 5: Quiz Platform */}
            {currentTab === 'quizzes' && (
              <QuizView
                materials={materials}
                onMaterialSelect={handleOpenMaterial}
              />
            )}

            {/* View 6: AI Flashcards */}
            {currentTab === 'flashcards' && (
              <FlashcardsView
                materials={materials}
                onUpdateMaterial={handleUpdateMaterial}
              />
            )}

            {/* View 7: Timed Exam Mode */}
            {currentTab === 'exams' && (
              <ExamModeView
                material={examMaterial || activeMaterial || materials[0]}
                allMaterials={materials}
                onFinishExam={handleCompleteExam}
                onExit={() => setCurrentTab('dashboard')}
                onReviseWithAI={(topic) => {
                  setCurrentTab('ask_ai');
                }}
              />
            )}

            {/* View 8: Study Planner */}
            {currentTab === 'planner' && (
              <StudyPlannerView
                studyPlan={studyPlan}
                onUpdateStudyPlan={handleUpdateStudyPlan}
                onToggleSession={handleTogglePlanSession}
              />
            )}

            {/* View 9: Progress & Exam Readiness Analytics */}
            {currentTab === 'analytics' && (
              <AnalyticsView
                user={user}
                examHistory={examHistory}
                materials={materials}
                onPracticeTopic={(topic) => {
                  setCurrentTab('quizzes');
                }}
                onTakeExam={() => {
                  setCurrentTab('exams');
                }}
              />
            )}

            {/* View 10: Peer Study & Groups */}
            {currentTab === 'community' && (
              <CommunityView
                groups={studyGroups}
                discussions={discussions}
                onToggleJoinGroup={handleToggleJoinGroup}
                onToggleLikeThread={handleToggleLikeThread}
                onAddReply={handleAddReply}
                onCreateThread={handleCreateThread}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation (hidden in focus mode) */}
      {!isFocusMode && (
        <MobileNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab !== 'workspace') setIsFocusMode(false);
            setCurrentTab(tab);
            if (tab === 'workspace' && !activeMaterial && materials.length > 0) {
              setActiveMaterial(materials[0]);
            }
          }}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenDrawer={() => setIsMobileDrawerOpen(true)}
        />
      )}

      {/* Mobile Slide-up Full Menu Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab !== 'workspace') setIsFocusMode(false);
          setCurrentTab(tab);
          if (tab === 'workspace' && !activeMaterial && materials.length > 0) {
            setActiveMaterial(materials[0]);
          }
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onToggleLanding={() => setShowLanding(true)}
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onMaterialCreated={handleProcessedUpload}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onSaveUser={(updated) => {
          setUser(updated);
          saveUserProfile(updated);
        }}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotifsRead}
        onNotificationClick={(notif) => {
          if (notif.type === 'material' && notif.linkId) {
            const mat = materials.find((m) => m.id === notif.linkId);
            if (mat) {
              setActiveMaterial(mat);
              setCurrentTab('workspace');
              setIsNotifOpen(false);
            }
          }
        }}
      />
    </div>
  );
}
