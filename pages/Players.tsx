import React, { useEffect, useState } from 'react';
import { User, SkillLevel } from '../types';
import { MockService } from '../services/mockService';
import { Search, Trophy, Filter } from 'lucide-react';
import { Input } from '../components/ui/Input';

export const Players: React.FC = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState<SkillLevel | 'All'>('All');

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await MockService.getPlayers();
      setPlayers(data);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = skillFilter === 'All' || p.skillLevel === skillFilter;
    return matchesSearch && matchesSkill;
  });

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-emerald-500 rounded-full border-t-transparent"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-500">Connect with other players in your area.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                <Input 
                    label=""
                    placeholder="Search players..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 w-full sm:w-64 mb-0"
                />
            </div>
            
            <div className="relative">
                <Filter className="absolute top-3 left-3 text-gray-400" size={18} />
                <select 
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 h-[42px] bg-white text-gray-700 w-full sm:w-auto appearance-none"
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value as any)}
                >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Pro">Pro</option>
                </select>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="relative">
                <img src={player.avatarUrl} alt={player.name} className="w-24 h-24 rounded-full bg-gray-100 mb-4 object-cover" />
                <div className={`absolute bottom-4 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center
                    ${player.skillLevel === 'Pro' ? 'bg-amber-500' : 
                      player.skillLevel === 'Advanced' ? 'bg-emerald-500' : 'bg-blue-500'}
                `}>
                    <Trophy size={12} className="text-white" />
                </div>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900">{player.name}</h3>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mb-2">
                {player.skillLevel}
            </span>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">"{player.bio}"</p>
            
            <button className="w-full mt-auto py-2 text-emerald-600 font-medium text-sm border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                View Profile
            </button>
          </div>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
          <div className="text-center py-20">
              <p className="text-gray-500">No players found matching your criteria.</p>
          </div>
      )}
    </div>
  );
};