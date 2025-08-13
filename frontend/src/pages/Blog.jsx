import { useEffect, useMemo, useRef, useState } from "react";
import bgVideo from "@/assets/sky1.mp4";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";

/* 
  Materna Blogs Page — Premium UX
  - Smooth hero with soft gradient + subtle parallax
  - Featured carousel (auto + arrows + hover pause)
  - Blog grid cards (hover lift, gentle shadow)
  - Sidebar: categories, recent posts, newsletter
  - Like/Unlike (instant, localStorage)
  - Comments (instant, per-post, localStorage)
  - Create Post (title, body, image upload, category) — prepends to feed
  - Search + category filter
  - Small, tasteful micro-animations and section fades
  - Uses Materna palette:
      teal-ish #99C8C1, rose #DFA69F, navy #234451, sand #EAE3CA
*/

const MAT_COLORS = {
  teal: "#99C8C1",
  rose: "#DFA69F",
  navy: "#234451",
  sand: "#EAE3CA",
};

// Demo seed content (can be replaced by API data)
const seedPosts = [
  {
    id: "p1",
    title: "Week 28: Gentle Yoga Flows for Better Sleep",
    body:
      "Simple prenatal-friendly sequences to ease back tension and prep your body for deep, restorative rest.",
    image:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1200&auto=format&fit=crop",
    category: "Exercise",
    featured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "p2",
    title: "Dietician Notes: Iron-Rich Meals You’ll Actually Crave",
    body:
      "From lentil bowls to cocoa overnight oats—balanced, delicious, and bump-approved.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    category: "Food",
    featured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: "p3",
    title: "Mindful Mornings: 6-Minute Breathwork",
    body:
      "A tiny ritual for focus, calm, and energy. Designed for trimester-safe breathing.",
    image:
      "https://images.unsplash.com/photo-1527236438218-d82077ae1f85?q=80&w=1200&auto=format&fit=crop",
    category: "Lifestyle",
    featured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
  {
    id: "p4",
    title: "OB Answers: What’s Normal in Trimester 2?",
    body:
      "From round ligament pains to baby flutters—when to breathe and when to call your provider.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    category: "Tips & Hacks",
    featured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "p5",
    title: "Snack Map: Smart, Simple, Satisfying",
    body:
      "Elevate snack time with protein + fiber combos you can prep in 5 minutes.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
    category: "Food",
    featured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p6",
    title: "At-Home Strength: Resistance Band Basics",
    body:
      "Safe full-body moves to support posture and reduce aches as your bump grows.",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07d?q=80&w=1200&auto=format&fit=crop",
    category: "Exercise",
    featured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "p7",
    title: "Why My Pregnancy Rant is Actually Self-Care",
    body:
      "Sometimes you just need to let it out. Why a good rant can be a healthy part of your journey.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1200&auto=format&fit=crop",
    category: "Self-Care",
    featured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "p8",
    title: "5 Tips & Hacks for Morning Sickness Relief",
    body:
      "Quick, practical tricks to ease your queasiness and get on with your day.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    category: "Tips & Hacks",
    featured: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
];

// Utilities — localStorage helpers
const LS_KEYS = {
  POSTS: "materna_blogs_posts",
  LIKES: "materna_blogs_likes",
  COMMENTS: "materna_blogs_comments",
  NEWSLETTER: "materna_newsletter_emails",
};
const readLS = (k, fallback) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const writeLS = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

// Accent font class: swap to your configured Tailwind font if available
// Example: add in tailwind.config `fontFamily: { display: ['"Playfair Display"', 'serif'] }`
const displayFont = "font-serif"; // change to 'font-display' if you have one

const Blog = () => {
  // Posts state
  const [posts, setPosts] = useState(() => readLS(LS_KEYS.POSTS, seedPosts));
  const [likes, setLikes] = useState(() => readLS(LS_KEYS.LIKES, {}));
  const [comments, setComments] = useState(() =>
    readLS(LS_KEYS.COMMENTS, {
      // structure: { [postId]: [{ id, text, createdAt }] }
    })
  );

  // UI state
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  // Carousel state
  const featured = useMemo(() => posts.filter((p) => p.featured), [posts]);
  const [slide, setSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const sliderRef = useRef(null);

  // Derived
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [posts, activeCategory, search]);

  // Persist
  useEffect(() => writeLS(LS_KEYS.POSTS, posts), [posts]);
  useEffect(() => writeLS(LS_KEYS.LIKES, likes), [likes]);
  useEffect(() => writeLS(LS_KEYS.COMMENTS, comments), [comments]);

  // Auto-advance carousel
  useEffect(() => {
    if (!featured.length) return;
    const t = setInterval(() => {
      if (!carouselPaused) setSlide((s) => (s + 1) % featured.length);
    }, 4500);
    return () => clearInterval(t);
  }, [featured.length, carouselPaused]);

  // Parallax hero (small, subtle)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.15; // subtle
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Actions
  const toggleLike = (postId) => {
    setLikes((prev) => {
      const next = { ...prev, [postId]: !prev[postId] };
      return next;
    });
  };

  const addComment = (postId, text) => {
    if (!text.trim()) return;
    setComments((prev) => {
      const list = prev[postId] || [];
      const next = {
        ...prev,
        [postId]: [
          ...list,
          { id: `${postId}-${Date.now()}`, text: text.trim(), createdAt: Date.now() },
        ],
      };
      return next;
    });
  };

  const createPost = ({ title, body, imageFile, category, featured: isFeatured }) => {
    const id = `p-${Date.now()}`;
    const image = imageFile ? URL.createObjectURL(imageFile) : undefined;
    const newPost = {
      id,
      title: title.trim(),
      body: body.trim(),
      image:
        image ||
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1200&auto=format&fit=crop",
      category: category || "General",
      featured: !!isFeatured,
      createdAt: Date.now(),
    };
    setPosts((prev) => [newPost, ...prev]);
    // optional: set featured carousel to first slide when adding featured
    if (newPost.featured) setSlide(0);
  };

  return (
    <>
      <style>{`
        /* micro-animations & helpers */
        @keyframes soft-fade-in { 
          from { opacity: 0; transform: translateY(8px) } 
          to { opacity: 1; transform: translateY(0) } 
        }
        .animate-soft-in { animation: soft-fade-in 600ms ease both; }
        .hover-lift { transition: transform .35s ease, box-shadow .35s ease; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 18px 40px -15px rgba(0,0,0,.35); }
        .glass {
          background: rgba(255,255,255,.58);
          border: 1px solid rgba(255,255,255,.35);
          backdrop-filter: blur(8px);
        }
        .chip {
          border: 1px solid rgba(0,0,0,.06);
        }
        .carousel-dot { width: 8px; height: 8px; border-radius: 9999px; opacity:.5; transition: all .3s ease; }
        .carousel-dot.active { width: 20px; opacity: 1; }
        .focus-ring:focus {
          outline: 3px solid ${MAT_COLORS.teal};
          outline-offset: 2px;
        }
      `}</style>

      <Navbar />

      <main className="relative min-h-screen overflow-hidden">
        {/* Background video + star layer + white glass veil */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 -z-20 h-screen w-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <StarStill />
        <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/40 backdrop-blur-sm"></div>

        {/* HERO */}
        <section
          className="relative pt-20"
          aria-label="Materna Blog Hero"
          style={{
            background:
              "radial-gradient(1200px 600px at 10% 10%, rgba(153,200,193,0.35) 0%, rgba(223,166,159,0.30) 40%, rgba(255,255,255,0.00) 72%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-soft-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${displayFont} tracking-tight`}
                  style={{ color: MAT_COLORS.navy }}
                >
                  Materna <span className="opacity-80">Blog</span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-slate-700/90 max-w-2xl">
                  Reassuring fact-based reads on exercise, nutrition, mindfulness, and
                  more. Curated with care by fellow moms and Materna.
                </p>
                {/* Search + Category Chips */}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1 glass rounded-xl px-4 py-3 hover-lift">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search articles, e.g. “sleep”, “iron”, “breathwork”…"
                      className="w-full bg-transparent placeholder:text-slate-500/70 focus:outline-none text-slate-800"
                      aria-label="Search blogs"
                    />
                  </div>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="rounded-xl px-5 py-3 text-sm font-medium hover-lift"
                    style={{
                      background: MAT_COLORS.navy,
                      color: "#ffffff",
                    }}
                    aria-haspopup="dialog"
                  >
                    + New Post
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`chip rounded-full px-3 py-1 text-sm transition ${
                        activeCategory === c
                          ? "bg-white/70"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-pressed={activeCategory === c}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Carousel */}
              <div className="lg:col-span-5">
                <div
                  className="relative glass rounded-2xl p-3 md:p-4 hover-lift"
                  onMouseEnter={() => setCarouselPaused(true)}
                  onMouseLeave={() => setCarouselPaused(false)}
                >
                  <div className="overflow-hidden rounded-xl">
                    <div
                      ref={sliderRef}
                      className="flex transition-transform duration-700 ease-out"
                      style={{ transform: `translateX(-${slide * 100}%)` }}
                    >
                      {featured.map((p) => (
                        <article key={p.id} className="min-w-full">
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-600">
                              Featured · {p.category}
                            </div>
                            <h3
                              className={`mt-1 text-lg md:text-xl ${displayFont}`}
                              style={{ color: MAT_COLORS.navy }}
                            >
                              {p.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-700/90 line-clamp-2">
                              {p.body}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Carousel controls */}
                  <button
                    aria-label="Previous featured"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 hover-lift"
                    onClick={() =>
                      setSlide((s) => (s - 1 + featured.length) % featured.length)
                    }
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next featured"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full glass p-2 hover-lift"
                    onClick={() => setSlide((s) => (s + 1) % featured.length)}
                  >
                    ›
                  </button>

                  {/* Dots */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setSlide(i)}
                        className={`carousel-dot ${i === slide ? "active" : ""}`}
                        style={{
                          background: i === slide ? MAT_COLORS.navy : MAT_COLORS.navy + "66",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT AREA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Blog Grid */}
            <div className="lg:col-span-8 space-y-6">
              {filteredPosts.length === 0 && (
                <div className="glass rounded-2xl p-8 text-center animate-soft-in">
                  <p className="text-slate-700">No posts match your search.</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((p) => (
                  <BlogCard
                    key={p.id}
                    post={p}
                    liked={!!likes[p.id]}
                    onToggleLike={() => toggleLike(p.id)}
                    comments={comments[p.id] || []}
                    onAddComment={(text) => addComment(p.id, text)}
                    colors={MAT_COLORS}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* About / CTA */}
              <div className="glass rounded-2xl p-6 animate-soft-in hover-lift">
                <h3
                  className={`text-xl ${displayFont}`}
                  style={{ color: MAT_COLORS.navy }}
                >
                  Browse by Category
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const count =
                      c === "All" ? posts.length : posts.filter((p) => p.category === c).length;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`chip rounded-full px-3 py-1 text-sm ${
                          activeCategory === c
                            ? "bg-white/80"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                      >
                        {c} · {count}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Liked Blogs */}
              <div className="glass rounded-2xl p-6 animate-soft-in hover-lift">
                <h3 className={`text-xl ${displayFont}`} style={{ color: MAT_COLORS.navy }}>
                  Liked Blogs
                </h3>
                <ul className="mt-4 space-y-4">
                  {posts
                    .filter((p) => likes[p.id])
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 5)
                    .map((p) => (
                      <li key={p.id} className="flex gap-3">
                        <img
                          src={
                            p.image ||
                            "https://cafesommerhaven.dk/wp-content/uploads/2024/03/desktop-wallpaper-cute-aesthetic-flowers-aesthetic-spring.jpg"
                          }
                          alt=""
                          className="h-14 w-14 rounded-lg object-cover flex-none"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://cafesommerhaven.dk/wp-content/uploads/2024/03/desktop-wallpaper-cute-aesthetic-flowers-aesthetic-spring.jpg";
                          }}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {p.title}
                          </p>
                          <p className="text-xs text-slate-600">{p.category}</p>
                        </div>
                      </li>
                    ))}
                  {posts.filter((p) => likes[p.id]).length === 0 && (
                    <li className="text-sm text-slate-600">No liked posts yet.</li>
                  )}
                </ul>
              </div>

              {/* Newsletter */}
              <Newsletter colors={MAT_COLORS} />

              {/* Go to Community Posts Button */}
              <div className="animate-soft-in hover-lift">
                <button
                  onClick={() => window.location.href = "/community"}
                  className="w-full rounded-xl px-5 py-3 text-sm font-medium hover-lift"
                  style={{
                    background: MAT_COLORS.navy,
                    color: "#ffffff",
                  }}
                >
                  Go to Community Posts
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* CREATE POST DIALOG */}
        {showCreate && (
          <CreatePostDialog
            onClose={() => setShowCreate(false)}
            onCreate={createPost}
            colors={MAT_COLORS}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

/* ---------- Subcomponents ---------- */

function BlogCard({ post, liked, onToggleLike, comments, onAddComment, colors }) {
  const [openComments, setOpenComments] = useState(false);
  const [text, setText] = useState("");

  // Handler to open full post
  const handleOpenPost = () => {
    alert("Open full post page / route — wire to router");
  };

  // Stop propagation for like/comment buttons
  const stopPropagation = (fn) => (e) => {
    e.stopPropagation();
    fn && fn(e);
  };

  return (
    <article
      className="glass rounded-2xl overflow-hidden hover-lift animate-soft-in cursor-pointer"
      onClick={handleOpenPost}
      tabIndex={0}
      role="button"
      aria-label={`Open blog post: ${post.title}`}
    >
      <div className="relative">
        <img
          src={post.image || "https://cafesommerhaven.dk/wp-content/uploads/2024/03/desktop-wallpaper-cute-aesthetic-flowers-aesthetic-spring.jpg"}
          alt={post.title}
          className="h-56 w-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://cafesommerhaven.dk/wp-content/uploads/2024/03/desktop-wallpaper-cute-aesthetic-flowers-aesthetic-spring.jpg"; }}
        />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: "#ffffff", color: colors.navy }}
        >
          {post.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-700/90 line-clamp-3">{post.body}</p>

        <div className="mt-4 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={stopPropagation(onToggleLike)}
              className="rounded-full px-3 py-2 text-sm glass hover-lift"
              aria-pressed={liked}
              aria-label={liked ? "Unlike" : "Like"}
              title={liked ? "Unlike" : "Like"}
              tabIndex={0}
            >
              {liked ? "♥︎ Liked" : "♡ Like"}
            </button>
            <button
              onClick={stopPropagation(() => setOpenComments((v) => !v))}
              className="rounded-full px-3 py-2 text-sm glass hover-lift"
              aria-expanded={openComments}
              aria-controls={`comments-${post.id}`}
              title="Comments"
              tabIndex={0}
            >
              💬 {comments.length}
            </button>
          </div>
        </div>

        {/* Comments */}
        {openComments && (
          <div id={`comments-${post.id}`} className="mt-4 space-y-3" onClick={e => e.stopPropagation()}>
            <ul className="space-y-2">
              {comments.map((c) => (
                <li key={c.id} className="rounded-lg bg-white/70 p-3">
                  <p className="text-sm text-slate-800">{c.text}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
              {comments.length === 0 && (
                <li className="rounded-lg bg-white/70 p-3 text-sm text-slate-600">
                  Be the first to comment.
                </li>
              )}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddComment(text);
                setText("");
              }}
              className="flex gap-2"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment…"
                className="flex-1 rounded-lg bg-white/80 px-3 py-2 text-sm focus:outline-none focus-ring"
              />
              <button
                className="rounded-lg px-3 py-2 text-sm hover-lift"
                style={{ background: colors.teal, color: colors.navy }}
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}

function Newsletter({ colors }) {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const prev = readLS(LS_KEYS.NEWSLETTER, []);
    writeLS(LS_KEYS.NEWSLETTER, [...prev, email]);
    setSaved(true);
  };

  return (
    <div className="glass rounded-2xl p-6 animate-soft-in hover-lift">
      <h3 className="text-xl font-semibold" style={{ color: colors.navy }}>
        Newsletter
      </h3>
      <p className="mt-2 text-sm text-slate-700/90">
        Exciting new reads delivered occasionally.
      </p>
      {saved ? (
        <p className="mt-4 rounded-lg bg-white/80 p-3 text-sm" style={{ color: colors.navy }}>
          You’re in! We’ll be gentle with your inbox. 💌
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg bg-white/80 px-3 py-2 text-sm focus:outline-none focus-ring"
          />
          <button
            className="w-full rounded-lg px-4 py-2 text-sm hover-lift"
            style={{ background: colors.rose, color: colors.navy }}
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

function CreatePostDialog({ onClose, onCreate, colors }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!imageFile) return setPreview("");
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-w-2xl rounded-2xl p-6 animate-soft-in">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold" style={{ color: colors.navy }}>
            Create New Post
          </h3>
          <button onClick={onClose} className="rounded-lg px-3 py-2 hover-lift glass">
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !body.trim()) return;
            onCreate({ title, body, imageFile, category, featured });
            onClose();
          }}
          className="mt-4 grid grid-cols-1 gap-4"
        >
          <div>
            <label className="text-sm text-slate-700">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/80 px-3 py-2 text-sm focus:outline-none focus-ring"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/80 px-3 py-2 text-sm focus:outline-none focus-ring"
              >
                {["General", "Exercise", "Food", "Lifestyle", "Self-Care", "Tips & Hacks"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm text-slate-700">
                Feature this post
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="mt-1 w-full rounded-lg bg-white/80 px-3 py-2 text-sm focus:outline-none focus-ring"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-700">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-1 w-full rounded-lg bg-white/80 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-white/90 file:px-3 file:py-1"
              />
              <p className="mt-1 text-xs text-slate-500">
                JPG/PNG; large images are auto-fit.
              </p>
            </div>
            <div className="rounded-lg bg-white/70 p-2">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 w-full rounded-md object-cover"
                />
              ) : (
                <div className="grid h-40 place-items-center text-sm text-slate-500">
                  Image preview
                </div>
              )}
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="glass rounded-lg px-4 py-2 hover-lift">
              Cancel
            </button>
            <button
              className="rounded-lg px-4 py-2 hover-lift"
              style={{ background: colors.navy, color: "#ffffff" }}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Blog;