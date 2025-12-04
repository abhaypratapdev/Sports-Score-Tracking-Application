import React, { useState, useEffect } from 'react';
import { Trophy, MapPin, Calendar, Clock, Users } from 'lucide-react';

const CricketMatchInfo = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://api.cricapi.com/v1/match_info?apikey=f5d9e28e-70a6-435c-8475-40449b1da6bd&id=ea479cff-ddbe-48e0-9e4a-528f61a8a175'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch match data');
      }
      
      const result = await response.json();
      setMatchData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Oops!</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button 
            onClick={fetchMatchData}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">No match data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏏 Cricket Match Info</h1>
          <p className="text-gray-600">Live match details and updates</p>
        </div>

        {/* Main Match Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          {/* Match Status Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 flex items-center justify-center">
            <Trophy className="mr-3" size={24} />
            <span className="text-xl font-bold">{matchData.status}</span>
          </div>

          {/* Match Name */}
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <h2 className="text-2xl font-bold text-center mb-2">{matchData.name}</h2>
            <div className="flex items-center justify-center">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold uppercase">
                {matchData.matchType}
              </span>
            </div>
          </div>

          {/* Teams Section */}
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Users className="text-indigo-600 mr-2" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Teams</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchData.teamInfo && matchData.teamInfo.map((team, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    {team.img && (
                      <img 
                        src={team.img} 
                        alt={team.name}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{team.name}</h4>
                      <p className="text-indigo-600 font-semibold">{team.shortname}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* All Teams List (if teamInfo is incomplete) */}
            {matchData.teams && matchData.teams.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-600 mb-2">All Teams:</p>
                <div className="flex flex-wrap gap-2">
                  {matchData.teams.map((team, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Match Details Grid */}
          <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Venue */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center mb-2">
                <MapPin className="text-blue-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-600">Venue</span>
              </div>
              <p className="text-gray-800 font-medium">{matchData.venue}</p>
            </div>

            {/* Date */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center mb-2">
                <Calendar className="text-purple-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-600">Date</span>
              </div>
              <p className="text-gray-800 font-medium">{formatDate(matchData.date)}</p>
            </div>

            {/* Time */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center mb-2">
                <Clock className="text-orange-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-600">Time (GMT)</span>
              </div>
              <p className="text-gray-800 font-medium">{formatTime(matchData.dateTimeGMT)}</p>
            </div>
          </div>
        </div>

        {/* Match ID */}
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
          <p className="text-sm text-gray-500">
            Match ID: <span className="font-mono text-gray-700">{matchData.id}</span>
          </p>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchMatchData}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Refresh Match Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default CricketMatchInfo;