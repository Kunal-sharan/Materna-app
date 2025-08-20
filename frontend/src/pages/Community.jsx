import { useEffect, useMemo, useRef, useState } from "react";
import bgVideo from "@/assets/sky1.mp4";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------- Copy & config ------------------------- */
const TAGS = [
  "Wellness",
  "Relationships",
  "Question",
  "Rant",
  "Tips",
  "Product Recommendations"
];

const COPY = {
  heroTitle: "Where real moms connect, uplift, and thrive",
  heroSub:
    "Welcome to the Materna Community",
  ctaStart: "New Post",
  ctaBrowse: "Browse discussions",
  titlePlaceholder: "Write a headline that sparks connection…",
  bodyPlaceholder:
    "Share your question, story, or advice. Be specific, be kind, and write like you’d talk to a friend.",
  tagLabel: "Choose up to 3 tags",
  emptyTitle: "This category is brand new ✨",
  emptySub:
    "Be the first spark. Ask something you wish you’d seen here last week.",
  emptyBtn: "Post your first thread",
  rulesTitle: "Community Guidelines",
  rulesPoints: [
    "Lead with kindness. Assume good intent and speak to lift, not score points.",
    "Share what’s helped you. No medical claims; reference professionals when needed.",
    "Protect privacy. Remove names, hospitals, or identifying details.",
    "Be inclusive. Every path to motherhood is valid here.",
    "No spam, promo, or DMs for advice. Report anything that feels off.",
  ],
  postBtn: "Post",
  draftBtn: "Save draft",
  previewBtn: "Preview",
};

/* ------------------------- Tiny inline icons ------------------------- */
const IconUp = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M12 4l6 8h-4v8H10v-8H6l6-8z"
      fill="currentColor"
    />
  </svg>
);

const IconComment = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M4 5h16v10H7l-3 3V5z"
      fill="currentColor"
    />
  </svg>
);

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ------------------------- Tag Chip ------------------------- */
function TagChip({ label, active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "px-3 py-1.5 rounded-full text-sm transition",
        "border backdrop-blur-md",
        active
          ? "bg-white/20 border-white/30 text-[#234451]"
          : "bg-white/10 border-white/20 text-[#234451]/80 hover:bg-white/15",
        "focus:outline-none focus:ring-2 focus:ring-white/40"
      ].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

/* ------------------------- Post Card (feed) ------------------------- */
import React from "react";
function countThreadedComments(comments) {
  if (!Array.isArray(comments)) return 0;
  let count = 0;
  for (const c of comments) {
    count += 1;
    if (Array.isArray(c.replies) && c.replies.length > 0) {
      count += countThreadedComments(c.replies);
    }
  }
  return count;
}

function PostCard({ post }) {
  const [votes, setVotes] = useState(post.votes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(
    post.commentList || []
  );
  const [commentText, setCommentText] = useState("");

  const totalComments = countThreadedComments(commentList);

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim().length === 0) return;
    const newComment = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      text: commentText.trim(),
      replies: [],
      likes: 0,
      showReply: false,
    };
    setCommentList((prev) => [...prev, newComment]);
    setCommentText("");
  };

  const handleLikeComment = (id) => {
    function likeRecursive(comments) {
      return comments.map((c) => {
        if (c.id === id) {
          return { ...c, likes: (c.likes || 0) + 1 };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: likeRecursive(c.replies) };
        }
        return c;
      });
    }
    setCommentList((prev) => likeRecursive(prev));
  };

  const handleToggleReply = (id) => {
    function toggleRecursive(comments) {
      return comments.map((c) => {
        if (c.id === id) {
          return { ...c, showReply: !c.showReply };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: toggleRecursive(c.replies) };
        }
        return c;
      });
    }
    setCommentList((prev) => toggleRecursive(prev));
  };

  const handleAddReply = (parentId, replyText) => {
    function addRecursive(comments) {
      return comments.map((c) => {
        if (c.id === parentId) {
          const newReply = {
            id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
            text: replyText,
            replies: [],
            likes: 0,
            showReply: false,
          };
          return {
            ...c,
            replies: [...c.replies, newReply],
            showReply: false,
          };
        }
        if (c.replies && c.replies.length > 0) {
          return { ...c, replies: addRecursive(c.replies) };
        }
        return c;
      });
    }
    setCommentList((prev) => addRecursive(prev));
  };

  const HeartIcon = ({ filled = true, className = "w-4 h-4" }) => (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? undefined : 2}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
      />
    </svg>
  );

  const CommentThread = ({ comments, depth = 0, isLast = true }) => {
    const [localReply, setLocalReply] = useState({});
    return (
      <ul className="space-y-2">
        {comments.map((c, idx) => {
          const isChild = depth > 0;
          const isLastChild = idx === comments.length - 1;
          return (
            <li
              key={c.id}
              className="relative"
              style={{
                marginLeft: isChild ? 18 : 0,
              }}
            >
              {isChild && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: -10,
                    top: 0,
                    bottom: isLastChild ? "18px" : "0",
                    width: "0",
                    borderLeft: "2px solid rgba(35,68,81,0.13)",
                    zIndex: 0,
                  }}
                />
              )}
              <div
                className="rounded-lg px-3 py-2 text-[#234451]/90 text-sm"
                style={{
                  background: "rgba(255,255,255,0.13)",
                  borderLeft: isChild ? "2px solid rgba(35,68,81,0.13)" : undefined,
                  boxShadow: "0 4px 20px -8px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span>{c.text}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="px-2 py-1 rounded-full bg-white/30 text-[#234451] border border-white/30 text-xs font-semibold hover:bg-white/60 transition flex items-center gap-1"
                        onClick={() => handleLikeComment(c.id)}
                      >
                        <HeartIcon filled={true} className="w-4 h-4" />
                        {c.likes}
                      </button>
                      <button
                        type="button"
                        className="px-2 py-1 rounded-full bg-white/20 text-[#234451] border border-white/25 text-xs hover:bg-white/30 transition"
                        onClick={() => handleToggleReply(c.id)}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                  {/* Reply form */}
                  {c.showReply && (
                    <form
                      className="mt-2"
                      onSubmit={e => {
                        e.preventDefault();
                        if (
                          localReply[c.id] &&
                          localReply[c.id].trim().length > 0
                        ) {
                          handleAddReply(c.id, localReply[c.id].trim());
                          setLocalReply((prev) => ({ ...prev, [c.id]: "" }));
                        }
                      }}
                    >
                      <textarea
                        value={localReply[c.id] || ""}
                        onChange={(e) =>
                          setLocalReply((prev) => ({
                            ...prev,
                            [c.id]: e.target.value,
                          }))
                        }
                        rows={2}
                        className="w-full rounded-xl bg-white/20 border border-white/20 text-[#234451] placeholder-[#234451]/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40 mt-1"
                        placeholder="Write a reply…"
                      />
                      <div className="flex justify-end mt-1">
                        <button
                          type="submit"
                          className="rounded-full px-3 py-1 font-semibold text-slate-900 bg-white hover:bg-white/90 transition text-xs"
                          disabled={
                            !localReply[c.id] ||
                            localReply[c.id].trim().length === 0
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-2">
                      <CommentThread comments={c.replies} depth={depth + 1} isLast={isLastChild} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <article
      className="relative rounded-2xl p-5 md:p-6 bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.35)] text-[#234451]"
      role="article"
    >
      <header className="mb-3">
        <h3 className="text-lg md:text-xl font-semibold leading-snug text-[#234451]">
          {post.title}
        </h3>
        <p className="text-xs text-[#234451]/70 mt-1">
          {post.anonymous ? "Posted anonymously" : "Posted by You"}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-xs border border-white/25 bg-white/10 text-[#234451]/90"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <p className="text-[#234451]/90 leading-relaxed text-sm md:text-base">
        {post.body}
      </p>

      <footer className="mt-4 flex items-center gap-4 text-[#234451]/80">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 hover:bg-white/15 transition"
          aria-label="Upvote"
          onClick={() => setVotes(votes + 1)}
        >
          <HeartIcon filled={true} className="w-4 h-4" />
          <span className="text-sm">{votes}</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 hover:bg-white/15 transition"
          aria-label="Comment"
          onClick={handleToggleComments}
        >
          <IconComment className="w-4 h-4" />
          <span className="text-sm">{totalComments} comments</span>
        </button>
      </footer>
      {/* Comment section with toggle */}
      <div className="mt-4">
        {!showComments ? (
          <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex items-center justify-between">
            <span className="text-sm text-[#234451]/80">
              {totalComments === 0
                ? "No comments yet."
                : `${totalComments} comment${totalComments !== 1 ? "s" : ""}`}
            </span>
            <button
              type="button"
              className="rounded-full px-3 py-1.5 font-semibold text-slate-900 bg-white hover:bg-white/90 transition text-sm"
              onClick={handleToggleComments}
            >
              Show Comments
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-white/10 border border-white/15 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-[#234451]/90">
                {totalComments === 0
                  ? "No comments yet."
                  : `${totalComments} comment${totalComments !== 1 ? "s" : ""}`}
              </span>
              <button
                type="button"
                className="rounded-full px-3 py-1.5 font-semibold text-[#234451]/90 border border-white/25 hover:bg-white/20 transition text-sm"
                onClick={handleToggleComments}
              >
                Hide Comments
              </button>
            </div>
            <form onSubmit={handleCommentSubmit} className="mb-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="w-full rounded-xl bg-white/20 border border-white/20 text-[#234451] placeholder-[#234451]/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40"
                placeholder="Write a comment…"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="rounded-full px-4 py-1.5 font-semibold text-slate-900 bg-white hover:bg-white/90 transition text-sm"
                  disabled={commentText.trim().length === 0}
                >
                  Submit
                </button>
              </div>
            </form>
            {commentList.length > 0 ? (
              <CommentThread comments={commentList} />
            ) : (
              <div className="text-xs text-[#234451]/70">No comments yet.</div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------- Rules Sidebar ------------------------- */
function RulesPanel({ onClose }) {
  return (
    <aside
      className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 text-[#234451] shadow-[0_8px_40px_-10px_rgba(0,0,0,0.35)]"
      aria-label="Posting rules"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base md:text-lg font-semibold text-[#234451]">
            {COPY.rulesTitle}
          </h4>
          <p className="mt-1 text-[#234451]/80 text-sm">
            Keep it supportive, practical, and safe for everyone.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            aria-label="Close rules"
          >
            <IconClose className="w-4 h-4 text-[#234451]" />
          </button>
        )}
      </div>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#234451]/90 marker:text-[#234451]/60 list-disc pl-5">
        {COPY.rulesPoints.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </aside>
  );
}

/* ------------------------- Composer ------------------------- */
function Composer({
  selectedTags,
  setSelectedTags,
  onPost,
  setComposing,
  composing,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [anonymous, setAnonymous] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (composing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [composing]);

  const toggleTag = (t) => {
    setSelectedTags((prev) => {
      if (prev.includes(t)) return prev.filter((x) => x !== t);
      if (prev.length >= 3) return prev; // cap at 3
      return [...prev, t];
    });
  };

  const validate = () => {
    const e = {};
    if (title.trim().length < 3) e.title = "Add a short, clear headline.";
    if (title.trim().length > 100) e.title = "Title cannot exceed 100 characters.";
    if (body.trim().length < 10) e.body = "Share a bit more context.";
    if (body.trim().length > 1000) e.body = "Post body cannot exceed 1000 characters.";
    if (selectedTags.length < 1) e.tags = "Choose at least one tag.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveDraft = () => {
    const draft = {
      title,
      body,
      tags: selectedTags,
      anonymous,
    };
    try {
      localStorage.setItem("communityDraft", JSON.stringify(draft));
    } catch (e) {
      // Optionally handle error
    }
  };

  const handlePost = () => {
    if (!validate()) return;
    onPost({
      title: title.trim(),
      body: body.trim(),
      tags: selectedTags,
      anonymous,
    });
    setTitle("");
    setBody("");
    setSelectedTags([]);
    setErrors({});
    setComposing(false);
  };

  return (
    <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      {/* Composer Card */}
      <section
        className="relative rounded-2xl p-5 md:p-6 bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.35)]"
        aria-label="Create a post"
      >
        <div className="absolute inset-0 rounded-2xl -z-10 [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_30%,transparent_100%)] bg-gradient-to-br from-sky-300/20 via-fuchsia-300/20 to-emerald-300/20" />
        <header className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-[#234451]">
            Start a new thread
          </h3>
          <p className="text-sm text-[#234451]/80">
            Ask a question, share an experience, or begin a discussion.
          </p>
        </header>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setComposing(true)}
            placeholder={COPY.titlePlaceholder}
            className="w-full rounded-xl bg-white/10 border border-white/20 text-[#234451] placeholder-[#234451]/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setComposing(true)}
            rows={6}
            placeholder={COPY.bodyPlaceholder}
            className="w-full rounded-xl bg-white/10 border border-white/20 text-[#234451] placeholder-[#234451]/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40"
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#234451]/80">{COPY.tagLabel}</span>
              <span className="text-xs text-[#234451]/60">
                {selectedTags.length}/3
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <TagChip
                  key={t}
                  label={t}
                  active={selectedTags.includes(t)}
                  onToggle={() => toggleTag(t)}
                />
              ))}
            </div>
            {errors.tags && (
              <p className="mt-2 text-xs text-rose-200">{errors.tags}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="h-4 w-4 text-[#234451] border-white/30 rounded focus:ring-white/40"
              />
              <label htmlFor="anonymous" className="text-sm text-[#234451]/80">
                Post anonymously
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePost}
              className="rounded-full px-4 py-2 font-semibold text-slate-900 bg-white hover:bg-white/90 transition"
            >
              {COPY.postBtn}
            </button>
            {/* Preview button removed */}
            <button
              type="button"
              className="rounded-full px-4 py-2 font-semibold text-[#234451]/90 border border-white/25 hover:bg-white/10 transition"
              onClick={handleSaveDraft}
            >
              {COPY.draftBtn}
            </button>
            <div className="ml-auto text-xs text-[#234451]/60">
              Please avoid sharing private medical info.
            </div>
          </div>

          {/* Validation text (polite, no jank) */}
          <div aria-live="polite" className="text-xs text-rose-200 space-y-1">
            {errors.title && <p>{errors.title}</p>}
            {errors.body && <p>{errors.body}</p>}
          </div>
        </div>
      </section>

      {/* Rules: sticky on desktop; sheet on mobile */}
      <div className="hidden lg:block sticky top-24 h-fit">
        <RulesPanel />
      </div>

      {/* Mobile sheet */}
      {composing && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 p-4">
          <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.45)]">
            <div className="p-4">
              <RulesPanel onClose={() => {/* keeps composing open, only closes sheet */}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------- Page ------------------------- */
const Community = () => {
  const [posts, setPosts] = useState([]); // start empty to show inspiring empty state
  const [selectedTags, setSelectedTags] = useState([]);
  const [showComposer, setShowComposer] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const composerRef = useRef(null);

  const handlePost = ({ title, body, tags, anonymous }) => {
    const newPost = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      body,
      tags,
      anonymous,
      votes: 1,
      comments: 0,
    };
    setPosts((p) => [newPost, ...p]);
  };

  const openComposer = () => {
    setShowComposer(true);
    setTimeout(() => {
      composerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  const handleFilterClick = (tag) => {
    setActiveFilter(tag);
  };

  const filteredByTag = activeFilter
    ? posts.filter((p) => p.tags.includes(activeFilter))
    : posts;

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return filteredByTag;
    const q = searchQuery.trim().toLowerCase();
    return filteredByTag.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.body && p.body.toLowerCase().includes(q))
    );
  }, [filteredByTag, searchQuery]);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden pt-28 md:pt-32 pb-16 font-inter text-[#234451]">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 -z-10 h-screen w-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        {/* Soft tint over video (behind content) */}
        <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/40 backdrop-blur-sm" />

        {/* Content container */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-200 via-fuchsia-200 to-emerald-200">
              {COPY.heroTitle}
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-[#234451]/85 max-w-3xl mx-auto">
              {COPY.heroSub}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={openComposer}
                className="rounded-full px-5 py-3 font-semibold text-slate-900 bg-white hover:bg-white/90 transition shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]"
              >
                {COPY.ctaStart}
              </button>
              <a
                href="/blog"
                className="rounded-full px-5 py-3 font-semibold text-[#234451] border border-white/25 hover:bg-white/10 transition"
              >
                Blogs
              </a>
            </div>
          </section>

          {/* Tag filter dropdown and search bar */}
          <section className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tag Filter Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="tag-filter" className="text-sm text-[#234451]/80 font-medium">
                Filter by tag:
              </label>
              <select
                id="tag-filter"
                value={activeFilter || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  handleFilterClick(v === "" ? null : v);
                }}
                className="rounded-full px-3 py-1.5 border border-white/20 bg-white/10 text-[#234451]/90 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <option value="">All</option>
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#234451]/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-full pl-10 pr-4 py-2 border border-white/20 bg-white/10 text-[#234451] placeholder-[#234451]/60 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>
          </section>

          {showComposer && (
            <section ref={composerRef} className="mt-10 md:mt-12">
              <Composer
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onPost={handlePost}
                composing={true}
                setComposing={setShowComposer}
              />
            </section>
          )}

          {/* Feed */}
          <section id="feed" className="mt-12 md:mt-16 space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center">
                <div className="mx-auto max-w-2xl rounded-2xl p-8 bg-white/10 border border-white/15 backdrop-blur-xl">
                  <h3 className="text-2xl font-semibold text-[#234451]">{COPY.emptyTitle}</h3>
                  <p className="mt-2 text-[#234451]/85">
                    {COPY.emptySub}
                  </p>
                  <button
                    type="button"
                    onClick={openComposer}
                    className="mt-5 rounded-full px-5 py-3 font-semibold text-slate-900 bg-white hover:bg-white/90 transition"
                  >
                    {COPY.emptyBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Community;