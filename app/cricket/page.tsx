"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react";

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-lg font-bold">SportsPulse</span>
          </div>
          <p className="text-gray-400 text-sm">Your ultimate destination for live sports updates and news.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Sports</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/football" className="hover:text-white transition-colors">Football</a></li>
            <li><a href="/cricket" className="hover:text-white transition-colors">Cricket</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/players" className="hover:text-white transition-colors">Players</a></li>
            <li><a href="/news" className="hover:text-white transition-colors">News</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: info@sportspulse.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2025 SportsPulse. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

// Mock News Data
const mockNews = [
  { id: 1, title: "India Dominates Day 2 with Record Partnership", image: "🏏", category: "Cricket", time: "2h ago" },
  { id: 2, title: "Star Batsman Announces Retirement from International Cricket", image: "👋", category: "Cricket", time: "5h ago" },
  { id: 3, title: "IPL Auction: Record-Breaking Bids for Young Talent", image: "💰", category: "Cricket", time: "1d ago" },
]

type FilterStatus = "all" | "live" | "upcoming" | "finished"

export default function CricketPage() {
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Theme state (minimal addition)
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    fetchMatches()

    // Initialize theme from localStorage or system preference (minimal, safe)
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

  const fetchMatches = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(
        'https://api.cricapi.com/v1/currentMatches?apikey=f5d9e28e-70a6-435c-8475-40449b1da6bd&offset=0'
      )
      const data = await response.json()

      if (data.status === "success" && data.data && Array.isArray(data.data)) {
        setMatches(data.data)
      } else {
        setError("Failed to fetch matches")
        setMatches([])
      }
    } catch (err) {
      setError("Error loading matches")
      console.error("Error fetching matches:", err)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  // Transform API data to match component format
  const getMatchStatus = (match) => {
    if (match.matchEnded) return "finished"
    if (match.matchStarted && !match.matchEnded) return "live"
    return "upcoming"
  }

  const getMatchTime = (match) => {
    if (match.matchEnded) return "FT"
    if (match.matchStarted && !match.matchEnded) return "LIVE"

    if (!match.dateTimeGMT) return "TBD"

    // Format upcoming match time
    const matchDate = new Date(match.dateTimeGMT)
    const now = new Date()
    const diffHours = Math.floor((matchDate - now) / (1000 * 60 * 60))

    if (diffHours < 24) {
      return matchDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    return matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getTeamScore = (match, teamIndex) => {
    if (!match.score || match.score.length === 0 || !match.teams || !match.teams[teamIndex]) return null

    // Find the latest score for this team
    const teamScores = match.score.filter(s =>
      s.inning.toLowerCase().includes(match.teams[teamIndex].toLowerCase())
    )

    if (teamScores.length === 0) return null

    const latestScore = teamScores[teamScores.length - 1]
    return `${latestScore.r}/${latestScore.w} (${latestScore.o})`
  }

  // Filter matches based on status
  const filteredMatches = filter === "all" 
    ? matches 
    : matches.filter(m => getMatchStatus(m) === filter)

  const cricketNews = mockNews

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
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80" 
            alt="Cricket Stadium"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Cricket
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Follow Test Series, ODI, T20 Internationals, and franchise cricket around the world.
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-3 flex-wrap pt-4">
              {( ["all", "live", "upcoming", "finished"] as const).map((status) => (
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
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {loading ? "Loading..." : `${filteredMatches.length} matches`}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-2xl p-16 text-center border border-red-200">
              <p className="text-red-600 text-lg font-medium">{error}</p>
              <button 
                onClick={fetchMatches}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match, index) => {
                if (!match.teams || match.teams.length < 2) return null

                const matchStatus = getMatchStatus(match)
                const team1Score = getTeamScore(match, 0)
                const team2Score = getTeamScore(match, 1)

                return (
                  <div
                    key={match.id || index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer group dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {match.matchType}
                        </span>
                        {matchStatus === 'live' && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          </span>
                        )}
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                        matchStatus === 'live' ? 'bg-red-100 text-red-700' :
                        matchStatus === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getMatchTime(match)}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {match.teamInfo[0]?.img && (
                            <img 
                              src={match.teamInfo[0].img} 
                              alt={match.teams[0]}
                              className="w-8 h-8 object-contain"
                            />
                          )}
                          <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                            {match.teamInfo[0]?.shortname || match.teams[0]}
                          </span>
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 font-bold text-lg">
                          {team1Score || '-'}
                        </span>
                      </div>
                      
                      <div className="h-px bg-gray-200 dark:bg-slate-700"></div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {match.teamInfo[1]?.img && (
                            <img 
                              src={match.teamInfo[1].img} 
                              alt={match.teams[1]}
                              className="w-8 h-8 object-contain"
                            />
                          )}
                          <span className="text-gray-900 dark:text-gray-100 text-base font-semibold">
                            {match.teamInfo[1]?.shortname || match.teams[1]}
                          </span>
                        </div>
                        <span className="text-gray-900 dark:text-gray-100 font-bold text-lg">
                          {team2Score || '-'}
                        </span>
                      </div>
                    </div>

                    {match.status && match.matchEnded && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <p className="text-sm text-green-600 font-semibold">{match.status}</p>
                      </div>
                    )}

                    {match.venue && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <p className="text-xs text-gray-500 dark:text-gray-300">{match.venue}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center border border-gray-200">
              <p className="text-gray-600 text-lg font-medium">
                No {filter !== "all" ? filter : ""} matches available
              </p>
            </div>
          )}
        </section>

        {/* Cricket News */}
        {cricketNews.length > 0 && (
          <section className="py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Latest Cricket News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cricketNews.map((article) => (
                <div key={article.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl cursor-pointer dark:bg-slate-800 dark:border-slate-700">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-7xl">
                    {article.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-300">{article.time}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-gray-100 font-semibold leading-snug group-hover:text-blue-600 transition-colors text-lg">
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cricket Formats */}
        <section className="py-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Cricket Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { format: "Test", duration: "5 Days", overs: "Unlimited", gradient: "from-red-50 to-orange-50" },
              { format: "ODI", duration: "Full Day", overs: "50 Overs", gradient: "from-blue-50 to-cyan-50" },
              { format: "T20", duration: "3 Hours", overs: "20 Overs", gradient: "from-purple-50 to-pink-50" },
            ].map((fmt) => (
              <div
                key={fmt.format}
                className={`bg-gradient-to-br ${fmt.gradient} rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer group`}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:scale-105 transition-transform">{fmt.format}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Duration</p>
                    <p className="font-semibold text-gray-900 text-lg">{fmt.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Overs</p>
                    <p className="font-semibold text-gray-900 text-lg">{fmt.overs}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Teams */}
        <section className="py-16 pb-24 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Top Cricket Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "India",
              "Australia",
              "England",
              "New Zealand",
              "West Indies",
              "South Africa",
              "Pakistan",
              "Sri Lanka",
            ].map((team) => (
              <div
                key={team}
                className="bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer group dark:bg-slate-800 dark:border-slate-700"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{team}</p>
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
