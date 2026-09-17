import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  TrendingUp,
  Plus,
  Clock
} from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenUpload?: () => void;
  onOpenProfile?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpload
}) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'library', label: 'Library', icon: Layers },
    { id: 'ask_ai', label: 'AI Tutor', icon: Sparkles },
    { id: 'exams', label: 'Exams', icon: Clock },
    { id: 'analytics', label: 'Progress', icon: TrendingUp }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131318]/95 backdrop-blur-xl border-t border-[#E2E4E9] dark:border-white/[0.08] px-3 py-1.5 flex items-center justify-between shadow-lg transition-colors duration-200">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
              isActive
                ? 'text-[#4F46E5] dark:text-[#818CF8] font-semibold'
                : 'text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-[#F5F5F7]'
            }`}
          >
            {isActive && (
              <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-[#4F46E5] dark:bg-[#818CF8]" />
            )}
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}

      {/* Floating Upload Quick Action for Mobile */}
      {onOpenUpload && (
        <button
          onClick={onOpenUpload}
          className="fixed bottom-16 right-4 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all z-50 lg:hidden"
          title="Upload Study Material"
          aria-label="Upload Study Material"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
