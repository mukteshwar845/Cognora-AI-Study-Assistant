import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Plus,
  Menu
} from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenUpload?: () => void;
  onOpenProfile?: () => void;
  onOpenDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpload,
  onOpenDrawer
}) => {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131318]/95 backdrop-blur-xl border-t border-[#E2E4E9] dark:border-white/[0.08] px-2 pt-1 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] transition-colors duration-200 select-none"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* 1. Dashboard / Home */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all relative active-press ${
            currentTab === 'dashboard'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
          }`}
          aria-label="Home Dashboard"
        >
          {currentTab === 'dashboard' && (
            <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          )}
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* 2. Library */}
        <button
          onClick={() => onSelectTab('library')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all relative active-press ${
            currentTab === 'library'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
          }`}
          aria-label="Library"
        >
          {currentTab === 'library' && (
            <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          )}
          <Layers className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Library</span>
        </button>

        {/* 3. Center Elevated Action Button (Upload / Quick Add) */}
        <div className="flex-1 flex items-center justify-center -mt-5">
          <button
            onClick={onOpenUpload}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 ring-4 ring-white dark:ring-[#131318] active-press transition-transform"
            title="Upload Material"
            aria-label="Upload Study Material"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. AI Tutor */}
        <button
          onClick={() => onSelectTab('ask_ai')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all relative active-press ${
            currentTab === 'ask_ai'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
          }`}
          aria-label="AI Study Tutor"
        >
          {currentTab === 'ask_ai' && (
            <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          )}
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">AI Tutor</span>
        </button>

        {/* 5. More / All Modules Drawer Trigger */}
        <button
          onClick={onOpenDrawer}
          className="flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7] transition-all active-press"
          aria-label="More Features & Menu"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Menu</span>
        </button>
      </div>
    </nav>
  );
};
