import React from 'react';
import { NotificationItem } from '../types';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNotificationClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white dark:bg-[#131318] border-l border-[#E2E4E9] dark:border-white/[0.08] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-500" />
            <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
              Notifications & Alerts
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onNotificationClick(n)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.read
                  ? 'bg-[#F7F8FC] dark:bg-[#19191F]/50 border-[#E2E4E9] dark:border-white/[0.04] opacity-75'
                  : 'bg-white dark:bg-[#19191F] border-indigo-200/70 dark:border-indigo-500/25 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  {n.title.toLowerCase().includes('quiz') || n.title.toLowerCase().includes('score') ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : n.title.toLowerCase().includes('reminder') || n.title.toLowerCase().includes('exam') ? (
                    <Clock className="w-4 h-4" />
                  ) : n.title.toLowerCase().includes('streak') ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-semibold text-xs text-[#111827] dark:text-[#F5F5F7] truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] shrink-0 font-mono">
                      {n.time || n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mt-1 line-clamp-2 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
