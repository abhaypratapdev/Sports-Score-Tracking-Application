"use client"

import  Navbar  from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { mockMatches } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = mockMatches.find((m) => m.id === params.id)

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Match not found</h1>
            <p className="text-text-secondary mb-6">The match you're looking for doesn't exist.</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 ease-out"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isFootball = match.sport === "football"
  const isLive = match.status === "live"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="py-6">
          <Link
            href={match.sport === "football" ? "/football" : "/cricket"}
            className="flex items-center space-x-2 text-accent hover:text-accent-secondary transition-all duration-300 ease-out font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {match.sport === "football" ? "Football" : "Cricket"}</span>
          </Link>
        </div>

        {/* Match Header */}
        <div className="bg-card-bg rounded-lg p-8 card-shadow border border-border mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{match.league}</h1>
              <p className="text-text-secondary">{match.time}</p>
            </div>
            <div className="flex items-center space-x-3">
              {isLive && <Badge className="bg-red-500 text-white animate-pulse text-lg py-2 px-4">Live</Badge>}
              <button className="p-2 hover:bg-border rounded-lg transition-all duration-300 ease-out">
                <Share2 className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>

          {/* Teams Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Home Team */}
            <div className="text-center">
              <img
                src={match.homeTeam.logo || "/placeholder.svg"}
                alt={match.homeTeam.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-foreground mb-2">{match.homeTeam.name}</h2>
              <div className="flex justify-center items-center space-x-2">
                <span className="text-5xl font-bold text-accent">{match.homeTeam.score ?? "-"}</span>
                {match.homeTeam.wickets !== undefined && (
                  <span className="text-2xl text-text-secondary">/ {match.homeTeam.wickets}</span>
                )}
              </div>
            </div>

            {/* Match Status */}
            <div className="text-center">
              <div className="bg-border rounded-lg p-4">
                <p className="text-text-secondary text-sm uppercase font-semibold mb-2">
                  {match.status === "live" ? "Currently" : match.status === "upcoming" ? "Scheduled" : "Result"}
                </p>
                <p className="text-foreground font-semibold">{match.time}</p>
              </div>
            </div>

            {/* Away Team */}
            <div className="text-center">
              <img
                src={match.awayTeam.logo || "/placeholder.svg"}
                alt={match.awayTeam.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-foreground mb-2">{match.awayTeam.name}</h2>
              <div className="flex justify-center items-center space-x-2">
                <span className="text-5xl font-bold text-accent">{match.awayTeam.score ?? "-"}</span>
                {match.awayTeam.wickets !== undefined && (
                  <span className="text-2xl text-text-secondary">/ {match.awayTeam.wickets}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Match Info Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Statistics */}
          <div className="bg-card-bg rounded-lg p-6 card-shadow border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Match Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Possession</span>
                <span className="font-semibold text-foreground">60% - 40%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Shots</span>
                <span className="font-semibold text-foreground">12 - 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Corners</span>
                <span className="font-semibold text-foreground">5 - 3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Fouls</span>
                <span className="font-semibold text-foreground">14 - 11</span>
              </div>
            </div>
          </div>

          {/* Teams Info */}
          <div className="bg-card-bg rounded-lg p-6 card-shadow border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Teams Information</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text-secondary uppercase mb-2">Home Team</p>
                <p className="font-semibold text-foreground">{match.homeTeam.name}</p>
                <p className="text-sm text-text-secondary mt-1">Ranking: #2</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary uppercase mb-2">Away Team</p>
                <p className="font-semibold text-foreground">{match.awayTeam.name}</p>
                <p className="text-sm text-text-secondary mt-1">Ranking: #5</p>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="bg-card-bg rounded-lg p-6 card-shadow border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Match Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary uppercase">Competition</p>
                <p className="font-semibold text-foreground">{match.league}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Sport</p>
                <p className="font-semibold text-foreground capitalize">{match.sport}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase">Status</p>
                <p className="font-semibold text-foreground capitalize">{match.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Players */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team Key Players */}
            <div className="bg-card-bg rounded-lg p-6 card-shadow border border-border">
              <h3 className="font-bold text-foreground mb-4">{match.homeTeam.name}</h3>
              <div className="space-y-4">
                {[
                  { name: "Player 1", role: "Captain" },
                  { name: "Player 2", role: "Striker" },
                  { name: "Player 3", role: "Midfielder" },
                ].map((player) => (
                  <Link
                    key={player.name}
                    href={`/players/${player.name}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-border transition-all duration-300 ease-out group"
                  >
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-accent transition-all duration-300 ease-out">
                        {player.name}
                      </p>
                      <p className="text-sm text-text-secondary">{player.role}</p>
                    </div>
                    <span className="text-accent font-bold">8.5</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Away Team Key Players */}
            <div className="bg-card-bg rounded-lg p-6 card-shadow border border-border">
              <h3 className="font-bold text-foreground mb-4">{match.awayTeam.name}</h3>
              <div className="space-y-4">
                {[
                  { name: "Player 4", role: "Captain" },
                  { name: "Player 5", role: "Forward" },
                  { name: "Player 6", role: "Defender" },
                ].map((player) => (
                  <Link
                    key={player.name}
                    href={`/players/${player.name}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-border transition-all duration-300 ease-out group"
                  >
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-accent transition-all duration-300 ease-out">
                        {player.name}
                      </p>
                      <p className="text-sm text-text-secondary">{player.role}</p>
                    </div>
                    <span className="text-accent font-bold">7.8</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
