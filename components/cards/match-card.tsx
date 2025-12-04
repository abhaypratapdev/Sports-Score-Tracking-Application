import { Badge } from "@/components/ui/badge"

interface MatchCardProps {
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
}

export function MatchCard({ match }: { match: MatchCardProps }) {
  const isLive = match.status === "live"
  const isFootball = match.sport === "football"

  return (
    <div className="bg-card-bg rounded-lg overflow-hidden card-shadow hover:card-shadow transition-all duration-300 ease-out hover:scale-[1.02] cursor-pointer">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-text-secondary uppercase">{match.league}</span>
          {isLive && <Badge className="bg-red-500 text-white animate-pulse">Live</Badge>}
          {match.status === "upcoming" && <span className="text-xs text-text-secondary">{match.time}</span>}
          {match.status === "finished" && <span className="text-xs text-text-secondary">Final</span>}
        </div>

        {/* Teams */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <img
                src={match.homeTeam.logo || "/placeholder.svg"}
                alt={match.homeTeam.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-sm flex-1">{match.homeTeam.name}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold">{match.homeTeam.score ?? "-"}</span>
              {match.homeTeam.wickets !== undefined && (
                <span className="text-xs text-text-secondary ml-1">/ {match.homeTeam.wickets}</span>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <img
                src={match.awayTeam.logo || "/placeholder.svg"}
                alt={match.awayTeam.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-sm flex-1">{match.awayTeam.name}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold">{match.awayTeam.score ?? "-"}</span>
              {match.awayTeam.wickets !== undefined && (
                <span className="text-xs text-text-secondary ml-1">/ {match.awayTeam.wickets}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
