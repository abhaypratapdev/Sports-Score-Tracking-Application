"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/layout/footer"
import { Sun, Moon } from "lucide-react"

// Mock Data
const mockNews = [
  { 
    id: 1, 
    title: "Champions League Drama: Last-Minute Winner Sends Team Through", 
    excerpt: "In a thrilling encounter that kept fans on the edge of their seats, the home side scored a dramatic winner in stoppage time to secure their place in the knockout stages.",
    image: "🏆", 
    category: "Football", 
    date: "Nov 9, 2025",
    time: "2h ago" 
  },
  { 
    id: 2, 
    title: "Breaking: Star Player Signs Record-Breaking Contract Extension", 
    excerpt: "The club has confirmed the signing of their star player to a new long-term deal worth a reported record fee.",
    image: "✍️", 
    category: "Football", 
    date: "Nov 9, 2025",
    time: "5h ago" 
  },
  { 
    id: 3, 
    title: "World Cup Qualifiers: Upsets and Surprises in Latest Round", 
    excerpt: "Several underdogs caused major upsets in the latest round of World Cup qualifiers, shaking up the standings.",
    image: "🌍", 
    category: "Football", 
    date: "Nov 8, 2025",
    time: "1d ago" 
  },
  { 
    id: 4, 
    title: "India Dominates Day 2 with Record Partnership", 
    excerpt: "The Indian batting duo put on a masterclass performance, recording the highest partnership for the second wicket.",
    image: "🏏", 
    category: "Cricket", 
    date: "Nov 8, 2025",
    time: "1d ago" 
  },
  { 
    id: 5, 
    title: "IPL Auction: Record-Breaking Bids for Young Talent", 
    excerpt: "Young players fetched record prices at this year's IPL auction as franchises looked to build for the future.",
    image: "💰", 
    category: "Cricket", 
    date: "Nov 7, 2025",
    time: "2d ago" 
  },
]

type NewsCategory = "all" | "Football" | "Cricket"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Minimal theme state
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored)
        document.documentElement.classList.toggle('dark', stored === 'dark')
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', prefersDark)
      }
    } catch (e) {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch (e) {}
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const filteredNews = mockNews
    .filter((article) => selectedCategory === "all" || article.category === selectedCategory)
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const categories: NewsCategory[] = ["all", "Football", "Cricket"]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">SportsPulse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="/football" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Football</a>
              <a href="/cricket" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Cricket</a>
              <a href="/players" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Players</a>
              <a href="/news" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">News</a>
            </div>

            {/* Minimal Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Light' : 'Dark'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/60 backdrop-blur transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </span>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <section className="relative h-[500px] mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80" 
            alt="Sports News"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">Sports News</h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">Breaking news, match analysis, player interviews, and in-depth coverage from around the sports world.</p>

            {/* Search Bar */}
            <div className="relative pt-4">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-5 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
              />
              <svg className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? "bg-white text-gray-900 shadow-lg"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <section className="py-16">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="h-80 md:h-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <span className="text-9xl">{filteredNews[0].image}</span>
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">Featured</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{filteredNews[0].category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">{filteredNews[0].date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">{filteredNews[0].title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{filteredNews[0].excerpt}</p>
                  <a
                    href={`/news/${filteredNews[0].id}`}
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30 w-fit"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Carousel */}
        <section className="py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Highlights</h2>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Quick view — hover to pause & read</span>
          </div>

          {/* Carousel container */}
          <div className="relative overflow-hidden">
            {/* Inline styles for marquee animation and pause-on-hover */}
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                display: flex;
                gap: 1rem;
                align-items: stretch;
                animation: marquee 20s linear infinite;
                will-change: transform;
              }
              .marquee-track:hover { animation-play-state: paused; }
              .marquee-item { flex: 0 0 320px; }
            `}</style>

            <div className="marquee-wrapper">
              <div className="marquee-track">
                {filteredNews.map((article) => (
                  <article key={article.id} className="marquee-item bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition">
                    <div className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-5xl">
                        {article.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${article.category === 'Football' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-300">{article.time}</span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-1">{article.title}</h3>

                        {/* excerpt appears on hover */}
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{transitionDelay: '50ms'}}>
                          {article.excerpt}
                        </p>

                        <a href={`/news/${article.id}`} className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Read</a>
                      </div>
                    </div>
                  </article>
                ))}

                {/* duplicate for seamless loop */}
                {filteredNews.map((article) => (
                  <article key={`dup-${article.id}`} className="marquee-item bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition">
                    <div className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-5xl">
                        {article.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${article.category === 'Football' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-300">{article.time}</span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-1">{article.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{transitionDelay: '50ms'}}>
                          {article.excerpt}
                        </p>
                        <a href={`/news/${article.id}`} className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Read</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fallback grid below carousel (kept for accessibility) */}
        <section className="py-8">
          <div className="sr-only md:not-sr-only">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.slice(1).map((article) => (
                <div key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-7xl">{article.image}</div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${article.category === 'Football' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-300">{article.time}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-gray-100 font-semibold leading-snug group-hover:text-blue-600 transition-colors text-lg mb-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
