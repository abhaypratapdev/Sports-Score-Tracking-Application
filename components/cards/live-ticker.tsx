"use client"

import { useState, useEffect } from "react"
import { MatchCard } from "./match-card"

interface TickerMatch {
  id: string
  sport: "football" | "cricket"
  homeTeam: {
    name: string
    logo: string
    score?: number
    wickets?: number
  }
  awayTeam: {
    name: string
    logo: string
    score?: number
    wickets?: number
  }
  status: "live" | "upcoming" | "finished"
  time: string
  league: string
  lastUpdate?: string
}

export function LiveTicker({ matches }: { matches: TickerMatch[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const liveMatches = matches.filter((m) => m.status === "live")

  useEffect(() => {
    if (liveMatches.length === 0) return

    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (liveMatches.length * 350))
    }, 3000)

    return () => clearInterval(interval)
  }, [liveMatches.length])

  if (liveMatches.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg p-8 text-center border border-border">
        <p className="text-text-secondary">No live matches at the moment</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ticker Container */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {liveMatches.map((match) => (
          <div key={match.id} className="flex-shrink-0 w-full md:w-96 snap-center">
            <MatchCard match={match} />
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      {liveMatches.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {liveMatches.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                index === Math.floor(scrollPosition / 350) ? "bg-accent w-8" : "bg-border w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
