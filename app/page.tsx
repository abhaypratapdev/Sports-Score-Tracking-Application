
"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const CRICKET_API_KEY = "f5d9e28e-70a6-435c-8475-40449b1da6bd"
const CRICKET_API_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`

// Mock football data
const mockFootballMatches = [
  { id: 1, homeTeam: "Man City", awayTeam: "Arsenal", homeScore: 2, awayScore: 1, status: "live", time: "67'", sport: "football" },
  { id: 3, homeTeam: "Barcelona", awayTeam: "Real Madrid", homeScore: null, awayScore: null, status: "upcoming", time: "Tomorrow 8:00 PM", sport: "football" },
  { id: 4, homeTeam: "Liverpool", awayTeam: "Chelsea", homeScore: 3, awayScore: 2, status: "finished", time: "FT", sport: "football" },
]

const mockNews = [
  { id: 1, title: "Champions League Drama: Last-Minute Winner Sends Team Through", image: "🏆", category: "Football", time: "2h ago" },
  { id: 2, title: "Breaking: Star Player Signs Record-Breaking Contract Extension", image: "✍️", category: "Transfer News", time: "5h ago" },
  { id: 3, title: "World Cup Qualifiers: Upsets and Surprises in Latest Round", image: "🌍", category: "International", time: "1d ago" },
]

export default function Home() {
  const [cricketMatches, setCricketMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allMatches, setAllMatches] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    fetchCricketMatches()
    
    // Initialize theme
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next)
    }
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const fetchCricketMatches = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(CRICKET_API_URL)
      const data = await response.json()
      
      if (data.status === "success" && data.data && Array.isArray(data.data)) {
        // Transform cricket API data
        const transformedMatches = data.data.slice(0, 10).map((match) => {
          const isLive = match.matchStarted && !match.matchEnded
          const isUpcoming = !match.matchStarted
          const isFinished = match.matchEnded
          
          let status = "upcoming"
          let time = "Upcoming"
          
          if (match.dateTimeGMT) {
            const matchDate = new Date(match.dateTimeGMT)
            time = matchDate.toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
          
          if (isLive) {
            status = "live"
            time = "Live"
          } else if (isFinished) {
            status = "finished"
            time = match.status || "Finished"
          }

          // Extract scores
          let homeScore = null
          let awayScore = null
          
          if (match.score && Array.isArray(match.score) && match.score.length > 0) {
            const team1Name = match.teams?.[0] || ""
            const team2Name = match.teams?.[1] || ""
            
            const team1Score = match.score.find(s => 
              s.inning?.toLowerCase().includes(team1Name.toLowerCase())
            )
            const team2Score = match.score.find(s => 
              s.inning?.toLowerCase().includes(team2Name.toLowerCase())
            )
            
            homeScore = team1Score ? `${team1Score.r}/${team1Score.w}` : null
            awayScore = team2Score ? `${team2Score.r}/${team2Score.w}` : null
          }

          return {
            id: match.id,
            homeTeam: match.teams?.[0] || match.teamInfo?.[0]?.name || "Team 1",
            awayTeam: match.teams?.[1] || match.teamInfo?.[1]?.name || "Team 2",
            homeScore,
            awayScore,
            homeImg: match.teamInfo?.[0]?.img,
            awayImg: match.teamInfo?.[1]?.img,
            status,
            time,
            sport: "cricket",
            matchType: match.matchType?.toUpperCase() || "MATCH",
            venue: match.venue || "TBA",
            series: match.name || "Cricket Match",
            matchStatus: match.status || ""
          }
        })
        
        setCricketMatches(transformedMatches)
        
        // Combine with football matches
        const combined = [...transformedMatches, ...mockFootballMatches]
        setAllMatches(combined)
      } else {
        throw new Error("Invalid API response")
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching cricket data:", err)
      setError("Failed to load cricket matches")
      setAllMatches(mockFootballMatches)
      setLoading(false)
    }
  }

  const liveMatches = allMatches.filter(m => m.status === "live")
  const liveCricketMatches = cricketMatches.filter(m => m.status === "live")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SportsPulse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="/football" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Football</a>
              <a href="/cricket" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Cricket</a>
              <a href="/players" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Players</a>
              <a href="/news" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">News</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/60 backdrop-blur transition-all hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                </span>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80" 
            alt="Stadium"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
              <span className="text-sm text-white font-medium">
                {loading ? "Loading..." : `${liveMatches.length} matches live now`}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Your Daily
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sports Pulse
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Live cricket scores, football updates, and breaking sports news
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <button 
                onClick={() => document.getElementById('live-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explore Matches
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300">
                Watch Highlights
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Cricket Matches Section */}
        {liveCricketMatches.length > 0 && (
          <section className="py-16" id="live-section">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span>Live Cricket</span>
              </h2>
              <button 
                onClick={fetchCricketMatches}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all font-semibold text-sm disabled:opacity-50"
              >
                <span className={loading ? "animate-spin" : ""}>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveCricketMatches.map((match) => (
                <div key={match.id} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-md hover:shadow-2xl">
                  <div className="absolute top-6 right-6 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">LIVE</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {match.matchType} • {match.series}
                    </span>
                  </div>
                  
                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {match.homeImg ? (
                          <img src={match.homeImg} alt={match.homeTeam} className="w-12 h-12 rounded-full object-cover shadow-md" />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {match.homeTeam.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg truncate">{match.homeTeam}</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-4">{match.homeScore || '-'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {match.awayImg ? (
                          <img src={match.awayImg} alt={match.awayTeam} className="w-12 h-12 rounded-full object-cover shadow-md" />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {match.awayTeam.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg truncate">{match.awayTeam}</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-4">{match.awayScore || '-'}</span>
                    </div>
                  </div>
                  
                  {match.matchStatus && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{match.matchStatus}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Live Matches", value: liveMatches.length, icon: "🔴", color: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20" },
              { label: "Cricket Matches", value: cricketMatches.length, icon: "🏏", color: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20" },
              { label: "Breaking News", value: mockNews.length, icon: "📰", color: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20" },
              { label: "Teams Covered", value: "1000+", icon: "🏆", color: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20" },
            ].map((stat) => (
              <div key={stat.label} className={`group relative bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}>
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All Matches */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">All Matches</h2>
            {error && (
              <span className="text-sm text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">{error}</span>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-slate-800 rounded-xl p-5 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-px bg-gray-200 dark:bg-slate-700"></div>
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {allMatches.map((match) => (
                <div key={match.id} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {match.sport === 'cricket' ? `🏏 ${match.matchType || 'Cricket'}` : '⚽ Football'}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      match.status === 'live' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                        : match.status === 'upcoming' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                    }`}>
                      {match.time}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 text-sm font-semibold truncate pr-2">{match.homeTeam}</span>
                      <span className="text-gray-900 dark:text-gray-100 font-bold text-lg whitespace-nowrap">{match.homeScore ?? '-'}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-slate-700"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 text-sm font-semibold truncate pr-2">{match.awayTeam}</span>
                      <span className="text-gray-900 dark:text-gray-100 font-bold text-lg whitespace-nowrap">{match.awayScore ?? '-'}</span>
                    </div>
                  </div>
                  
                  {match.venue && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">📍 {match.venue}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top News */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Breaking News</h2>
            <a href="/news" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-semibold group">
              <span>View All</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNews.map((article) => (
              <div key={article.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-7xl">
                  {article.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold">{article.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{article.time}</span>
                  </div>
                  <h3 className="text-gray-900 dark:text-gray-100 font-semibold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse by Sport */}
        <section className="py-16 pb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Browse by Sport</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { sport: "Football", icon: "⚽", desc: "Premier League, La Liga, Champions League", color: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" },
              { sport: "Cricket", icon: "🏏", desc: "IPL, Test Series, World Cup", color: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" },
            ].map((item) => (
              <a key={item.sport} href={`/${item.sport.toLowerCase()}`} className={`group relative bg-gradient-to-br ${item.color} rounded-2xl p-10 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.sport}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>
      </main>


      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">SportsPulse</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                SportsPulse brings you the latest scores, updates, and insights from the world of sports — football, cricket, and beyond. Stay connected and stay in the game.
              </p>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-blue-600 transition">Football</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Cricket</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Matches</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Consumer Support</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Send a Message</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 rounded-md shadow-md hover:shadow-lg transition"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 dark:border-slate-700 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 <span className="font-semibold text-gray-900 dark:text-gray-100">SportsPulse</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

