import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  Users,
  Settings,
  Plus,
  Binary
} from 'lucide-react';
import { UserProfile } from '../types';
import { CognoraLogo } from './CognoraLogo';


interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenUpload: () => void;
  onOpenProfile: () => void;
  onOpenSettings?: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  user: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

interface NavSection {
  label: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    highlight?: boolean;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpload,
  onOpenProfile,
  onOpenSettings,
  onOpenNotifications,
  unreadCount,
  user,
  darkMode,
  onToggleDarkMode,
}) => {
  const sections: NavSection[] = [
    {
      label: 'STUDY',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'workspace', label: 'Study Workspace', icon: BookOpen },
        { id: 'library', label: 'My Library', icon: Layers },
        { id: 'ask_ai', label: 'AI Tutor', icon: Sparkles, badge: 'Smart' }
      ]
    },
    {
      label: 'PRACTICE',
      items: [
        { id: 'quizzes', label: 'Quizzes', icon: CheckCircle2 },
        { id: 'flashcards', label: 'Flashcards', icon: Layers },
        { id: 'formulas', label: 'Formula Sheet', icon: Binary },
        { id: 'exams', label: 'Exam Mode', icon: Clock, highlight: true }
      ]
    },
    {
      label: 'PLANNING',
      items: [
        { id: 'planner', label: 'Study Planner', icon: Calendar },
        { id: 'analytics', label: 'Progress Analytics', icon: TrendingUp }
      ]
    },
    {
      label: 'COMMUNITY',
      items: [
        { id: 'community', label: 'Study Groups', icon: Users }
      ]
    }
  ];

  return (
    <aside className="w-[250px] border-r border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#0B0B0F] flex flex-col justify-between shrink-0 h-screen sticky top-0 hidden lg:flex select-none z-30 transition-colors duration-200">
      {/* Top Section */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-none">
        {/* Brand Header */}
        <div className="px-1.5 py-1">
          <CognoraLogo
            size="md"
            subtitle="AI Study Assistant"
          />
        </div>

        {/* Primary Sidebar CTA: Upload Material */}
        <button
          onClick={onOpenUpload}
          className="w-full py-2.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all hover:shadow-indigo-500/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Upload Material</span>
        </button>

        {/* Grouped Navigation */}
        <div className="space-y-4 pt-1">
          {sections.map((section) => (
            <div key={section.label} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B] font-mono">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 group ${
                        isActive
                          ? 'bg-[#EEF2FF] dark:bg-indigo-500/10 text-[#1F2937] dark:text-[#F5F5F7] font-semibold'
                          : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] font-medium'
                      }`}
                    >
                      {/* Active Indicator Bar on Left */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#4F46E5] dark:bg-[#818CF8]" />
                      )}

                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#4F46E5] dark:text-[#818CF8]'
                              : item.highlight
                              ? 'text-amber-500/90'
                              : 'text-[#8E95A5] dark:text-[#70707B] group-hover:text-[#4B5563] dark:group-hover:text-[#A8A8B3]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E0E7FF] dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono">
                          {item.badge}
                        </span>
                      )}
                      {item.highlight && !item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-mono">
                          Timed
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Bottom: Utility Navigation + Compact Profile */}
      <div className="p-3 border-t border-[#E2E4E9] dark:border-white/[0.08] space-y-2 bg-[#F1F3F8]/60 dark:bg-[#131318]/70">
        {/* Utility row: Settings */}
        <div className="px-1">
          <button
            onClick={onOpenSettings || onOpenProfile}
            className="w-full flex items-center gap-2 text-xs text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-[#EBF0F7] dark:hover:bg-[#19191F] transition-colors group"
            title="Settings & Study Hub"
          >
            <Settings className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="text-[11px] font-medium">Settings</span>
          </button>
        </div>

        {/* Compact Profile Card */}
        <div
          onClick={onOpenProfile}
          className="p-2 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-indigo-300 dark:hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
          title={`Student Profile: ${user.name}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${user.avatarColor || 'from-indigo-600 to-violet-500'} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-heading font-semibold text-xs text-[#111827] dark:text-[#F5F5F7] truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {user.name}
              </div>
              <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] truncate font-mono">
                {user.degree ? `${user.semester || 'Sem 5'}` : (user.semester || 'Semester 5')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
