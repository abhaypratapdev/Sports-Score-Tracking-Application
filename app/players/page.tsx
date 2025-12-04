"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const CRICKET_API_KEY = "f5d9e28e-70a6-435c-8475-40449b1da6bd"
const PLAYERS_API_URL = `https://api.cricapi.com/v1/players?apikey=${CRICKET_API_KEY}&offset=0`

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  // theme state (minimal addition)
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

  const searchPlayers = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a player name")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setHasSearched(true)
      
      const response = await fetch(`${PLAYERS_API_URL}&search=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.status === "success" && data.data) {
        setPlayers(data.data)
        if (data.data.length === 0) {
          setError("No players found. Try a different search term.")
        }
      } else {
        setError("Failed to fetch players. Please try again.")
        setPlayers([])
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching players:", err)
      setError("An error occurred while searching. Please try again.")
      setPlayers([])
      setLoading(false)
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      searchPlayers()
    }
  }

  const getPlayerInfo = async (playerId: any) => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.cricapi.com/v1/players_info?apikey=${CRICKET_API_KEY}&id=${playerId}`)
      const data = await response.json()
      
      if (data.status === "success" && data.data) {
        setSelectedPlayer(data.data)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching player info:", err)
      setLoading(false)
    }
  }

  const closeModal = () => {
    setSelectedPlayer(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
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
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
              <a href="/football" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Football</a>
              <a href="/cricket" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Cricket</a>
              <a href="/players" className="text-gray-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Players</a>
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

      {/* Hero Section */}
      <section className="relative h-[400px] mt-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-darkcyan-600/90 to-cadetblue-600/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <span className="text-sm text-white font-medium">🏏 Cricket Players Database</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Favorite Players
              </span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Search for cricket players and explore their detailed statistics and information
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for players... (e.g., Virat Kohli, MS Dhoni)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-4 pr-12 rounded-full text-gray-900 dark:text-gray-900 bg-white dark:bg-slate-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl text-lg"
                  />
                  <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                </div>
                <button
                  onClick={searchPlayers}
                  disabled={loading}
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Error Message */}
        {error && !loading && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl flex items-center space-x-3">
            <span className="text-2xl">⚠️</span>
            <span className="text-red-700 dark:text-red-300 font-medium">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Players Grid */}
        {!loading && players.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Search Results ({players.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {players.map((player: any) => (
                <div
                  key={player.id}
                  onClick={() => getPlayerInfo(player.id)}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {player.name ? player.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 transition-colors">
                        {player.name || 'Unknown Player'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{player.country || 'Country N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                    {player.playerRole && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Role:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{player.playerRole}</span>
                      </div>
                    )}
                    {player.battingStyle && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Batting:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">{player.battingStyle}</span>
                      </div>
                    )}
                    {player.bowlingStyle && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Bowling:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">{player.bowlingStyle}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <button className="w-full px-4 py-2 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-300 rounded-lg font-semibold text-sm group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white transition-all">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && players.length === 0 && !hasSearched && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏏</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Ready to Explore?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
              Search for your favorite cricket players above to get started. Try names like "Virat Kohli" or "MS Dhoni"
            </p>
          </div>
        )}

        {/* Stats Section */}
        {!loading && players.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Players", value: players.length, icon: "👥", color: "from-blue-50 to-blue-100" },
                { label: "Countries", value: new Set(players.map((p:any) => p.country).filter(Boolean)).size, icon: "🌍", color: "from-green-50 to-green-100" },
                { label: "Batsmen", value: players.filter((p:any) => p.playerRole?.toLowerCase().includes('bat')).length, icon: "🏏", color: "from-purple-50 to-purple-100" },
                { label: "Bowlers", value: players.filter((p:any) => p.playerRole?.toLowerCase().includes('bowl')).length, icon: "⚡", color: "from-orange-50 to-orange-100" },
              ].map((stat) => (
                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-gray-200 dark:border-slate-700`}>
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Player Details Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-white/30">
                    {selectedPlayer.name ? selectedPlayer.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPlayer.name || 'Unknown Player'}</h2>
                    <div className="flex items-center space-x-4 text-white/90">
                      <span className="flex items-center space-x-2">
                        <span>🌍</span>
                        <span className="font-medium">{selectedPlayer.country || 'N/A'}</span>
                      </span>
                      {selectedPlayer.dateOfBirth && (
                        <span className="flex items-center space-x-2">
                          <span>🎂</span>
                          <span className="font-medium">{new Date(selectedPlayer.dateOfBirth).toLocaleDateString()}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white transition-colors text-3xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                  <span>📋</span>
                  <span>Player Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlayer.playerRole && (
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Role</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedPlayer.playerRole}</p>
                    </div>
                  )}
                  {selectedPlayer.battingStyle && (
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Batting Style</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedPlayer.battingStyle}</p>
                    </div>
                  )}
                  {selectedPlayer.bowlingStyle && (
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Bowling Style</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedPlayer.bowlingStyle}</p>
                    </div>
                  )}
                  {selectedPlayer.placeOfBirth && (
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Place of Birth</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedPlayer.placeOfBirth}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-12">
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
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Football</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cricket</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Matches</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">News</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Consumer Support</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">Send a Message</h3>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
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
