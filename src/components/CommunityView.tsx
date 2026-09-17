import React, { useState } from 'react';
import { StudyGroup, DiscussionThread } from '../types';
import {
  Users,
  MessageSquare,
  Pin,
  Heart,
  Search,
  Plus,
  Send
} from 'lucide-react';

interface CommunityViewProps {
  groups: StudyGroup[];
  discussions: DiscussionThread[];
  onToggleJoinGroup: (groupId: string) => void;
  onToggleLikeThread: (threadId: string) => void;
  onAddReply: (threadId: string, content: string) => void;
  onCreateThread: (title: string, content: string, subject: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  groups,
  discussions,
  onToggleJoinGroup,
  onToggleLikeThread,
  onAddReply,
  onCreateThread
}) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'discussions'>('discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject] = useState<string>('all');

  // Active expanded thread for replies
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  // New thread modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('Data Structures');

  const filteredDiscussions = discussions.filter((t) => {
    const matchSubject = selectedSubject === 'all' || t.subject === selectedSubject;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handlePostReply = (threadId: string) => {
    const text = replyInputs[threadId];
    if (!text || !text.trim()) return;
    onAddReply(threadId, text.trim());
    setReplyInputs({ ...replyInputs, [threadId]: '' });
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    onCreateThread(newTitle.trim(), newContent.trim(), newSubject);
    setNewTitle('');
    setNewContent('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <Users className="w-3.5 h-3.5" />
              Collaborative Learning
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              Peer Study & Discussion Forum
            </h1>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Share doubts, exchange notes, and prepare for university exams with fellow students.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'discussions'
                  ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-xs'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200'
              }`}
            >
              Discussions ({discussions.length})
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'groups'
                  ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-xs'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200'
              }`}
            >
              Study Groups ({groups.length})
            </button>
          </div>
        </div>

        {/* Filter bar for discussions */}
        {activeTab === 'discussions' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08]">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8E95A5] dark:text-[#70707B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doubts, topics or questions..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#4F46E5]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Start Discussion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: DISCUSSIONS */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          {filteredDiscussions.map((thread) => {
            const isExpanded = expandedThreadId === thread.id;

            return (
              <div
                key={thread.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {thread.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 border border-amber-200 dark:border-amber-800 font-mono">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase font-mono">
                        {thread.subject}
                      </span>
                      <span className="text-xs text-[#8E95A5] dark:text-[#70707B]">&bull;</span>
                      <span className="text-xs text-[#4B5563] dark:text-[#A8A8B3] font-medium">
                        {thread.author}
                      </span>
                      <span className="text-xs text-[#8E95A5] dark:text-[#70707B]">&bull;</span>
                      <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">{thread.date}</span>
                    </div>

                    <h2 className="font-heading font-semibold text-lg text-[#111827] dark:text-[#F5F5F7]">
                      {thread.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => onToggleLikeThread(thread.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      thread.userLiked
                        ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 border-rose-300'
                        : 'bg-[#F7F8FC] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] border-[#E2E4E9] dark:border-white/[0.08]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${thread.userLiked ? 'fill-current' : ''}`} />
                    <span className="font-mono">{thread.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed whitespace-pre-line">
                  {thread.content}
                </p>

                {/* Tags */}
                {thread.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {thread.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F] text-[10px] font-mono text-[#8E95A5] dark:text-[#70707B]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reply section toggler */}
                <div className="pt-2 border-t border-[#E2E4E9]/60 dark:border-white/[0.04] flex items-center justify-between">
                  <button
                    onClick={() =>
                      setExpandedThreadId(isExpanded ? null : thread.id)
                    }
                    className="text-xs font-medium text-[#4F46E5] dark:text-[#818CF8] flex items-center gap-1 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {thread.replies.length} Replies {isExpanded ? '(Hide)' : '(View)'}
                    </span>
                  </button>
                </div>

                {/* Expanded Replies View */}
                {isExpanded && (
                  <div className="space-y-3 pt-2 bg-[#F7F8FC] dark:bg-[#19191F] p-4 rounded-2xl border border-[#E2E4E9] dark:border-white/[0.06]">
                    <div className="space-y-2.5">
                      {thread.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="p-3 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                            <span className="font-semibold text-[#111827] dark:text-[#F5F5F7]">
                              {reply.author}
                            </span>
                            <span className="font-mono">{reply.date}</span>
                          </div>
                          <p className="text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Input Box */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={replyInputs[thread.id] || ''}
                        onChange={(e) =>
                          setReplyInputs({ ...replyInputs, [thread.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handlePostReply(thread.id);
                        }}
                        placeholder="Write a helpful response..."
                        className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#131318] text-[#111827] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#4F46E5]"
                      />
                      <button
                        onClick={() => handlePostReply(thread.id)}
                        className="p-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs active:scale-95 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: STUDY GROUPS */}
      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase font-mono">
                    {group.subject}
                  </span>
                  <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
                    {group.membersCount} Members
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7]">
                  {group.name}
                </h3>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                  {group.description}
                </p>
                <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] pt-1">
                  Active: {group.recentActivity}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E4E9]/60 dark:border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-[#4B5563] dark:text-[#A8A8B3] font-medium">
                  {group.materialsCount} Shared Notes
                </span>
                <button
                  onClick={() => onToggleJoinGroup(group.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    group.isJoined
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white'
                  }`}
                >
                  {group.isJoined ? '✓ Joined Group' : 'Join Study Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start Discussion Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <h2 className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7]">
              Start a New Discussion Thread
            </h2>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                  Subject
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                >
                  <option value="Data Structures">Data Structures & Algorithms</option>
                  <option value="DBMS">Database Management Systems</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                  Question / Thread Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How do I prove B-Tree height bound?"
                  className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                  Details / Context
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain where you got stuck or what proof step is confusing..."
                  className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#4B5563] dark:text-[#A8A8B3] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white font-semibold shadow-xs"
                >
                  Post Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
