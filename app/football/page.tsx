"use client"

import { useState, useEffect } from "react"
import { Footer } from "@/components/layout/footer"
import { Sun, Moon } from "lucide-react"

// Mock Data
const mockMatches = [
  { id: 1, homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 1, status: "live", time: "67'", sport: "football" },
  { id: 2, homeTeam: "Barcelona", awayTeam: "Real Madrid", homeScore: null, awayScore: null, status: "upcoming", time: "Tomorrow 8:00 PM", sport: "football" },
  { id: 3, homeTeam: "Liverpool", awayTeam: "Chelsea", homeScore: 3, awayScore: 2, status: "finished", time: "FT", sport: "football" },
  { id: 4, homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeScore: 1, awayScore: 1, status: "live", time: "82'", sport: "football" },
]

const mockNews = [
  { id: 1, title: "Champions League Drama: Last-Minute Winner Sends Team Through", image: "🏆", category: "Football", time: "2h ago" },
  { id: 2, title: "Transfer News: Record-Breaking Deal Confirmed", image: "✍️", category: "Football", time: "5h ago" },
  { id: 3, title: "Premier League: Title Race Heats Up with Stunning Victory", image: "⚽", category: "Football", time: "1d ago" },
]

type FilterStatus = "all" | "live" | "upcoming" | "finished"

export default function FootballPage() {
  const [filter, setFilter] = useState<FilterStatus>("all")

  // minimal theme state
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

  const footballMatches = mockMatches
  const filteredMatches = filter === "all" ? footballMatches : footballMatches.filter((m) => m.status === filter)
  const footballNews = mockNews

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
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80" 
            alt="Football Stadium"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Football
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Get live updates from Premier League, La Liga, Bundesliga, Serie A, Ligue 1, and more.
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-3 flex-wrap pt-4">
              {(["all", "live", "upcoming", "finished"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 capitalize ${
                    filter === status
                      ? "bg-white text-gray-900 shadow-lg"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Matches Section */}
        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {filter === "all" && "All Matches"}
              {filter === "live" && "Live Now"}
              {filter === "upcoming" && "Upcoming"}
              {filter === "finished" && "Finished"}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{filteredMatches.length} matches</span>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <div key={match.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide">Football</span>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                      match.status === 'live' ? 'bg-red-100 text-red-700' :
                      match.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {match.time}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">{match.homeTeam}</span>
                      <span className="text-gray-900 dark:text-gray-100 font-bold text-xl">{match.homeScore ?? '-'}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-slate-700"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">{match.awayTeam}</span>
                      <span className="text-gray-900 dark:text-gray-100 font-bold text-xl">{match.awayScore ?? '-'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center border border-gray-200">
              <p className="text-gray-600 text-lg font-medium">No {filter !== "all" ? filter : ""} matches available</p>
            </div>
          )}
        </section>

        {/* Football News */}
        {footballNews.length > 0 && (
          <section className="py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Latest Football News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {footballNews.map((article) => (
                <div key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-7xl">
                    {article.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">{article.category}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-300">{article.time}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-gray-100 font-semibold leading-snug group-hover:text-blue-600 transition-colors text-lg">{article.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top Leagues */}
        <section className="py-16 pb-24 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Top Leagues</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Premier League", country: "England", gradient: "from-purple-50 to-pink-50" },
              { name: "La Liga", country: "Spain", gradient: "from-red-50 to-orange-50" },
              { name: "Bundesliga", country: "Germany", gradient: "from-yellow-50 to-amber-50" },
              { name: "Serie A", country: "Italy", gradient: "from-blue-50 to-cyan-50" },
              { name: "Ligue 1", country: "France", gradient: "from-indigo-50 to-purple-50" },
            ].map((league) => (
              <div
                key={league.name}
                className={`bg-gradient-to-br ${league.gradient} rounded-xl p-5 text-center border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer`}
              >
                <h3 className="font-bold text-gray-900 mb-1">{league.name}</h3>
                <p className="text-xs text-gray-600 font-medium">{league.country}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
