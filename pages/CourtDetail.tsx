import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Court, User } from '../types';
import { MockService } from '../services/mockService';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { MapPin, Clock, Users, Trophy, Navigation, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const CourtDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [court, setCourt] = useState<Court | null>(null);
  const [activePlayers, setActivePlayers] = useState<User[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for activity chart
  const activityData = [
    { time: '6am', players: 2 },
    { time: '9am', players: 8 },
    { time: '12pm', players: 5 },
    { time: '3pm', players: 4 },
    { time: '6pm', players: 12 },
    { time: '9pm', players: 6 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const courtData = await MockService.getCourtById(id);
      const players = await MockService.getActiveCheckInsForCourt(id);
      
      if (courtData) {
        setCourt(courtData);
        setActivePlayers(players);
        if (user) {
            setIsCheckedIn(players.some(p => p.id === user.id));
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id, user]);

  const handleCheckIn = async () => {
    if (!user || !id) return;
    
    // Optimistic update
    setIsCheckedIn(true);
    const newPlayers = [...activePlayers, user];
    setActivePlayers(newPlayers);
    
    await MockService.checkIn(user.id, id);
  };

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-emerald-500 rounded-full border-t-transparent"></div></div>;
  if (!court) return <div className="p-10 text-center">Court not found</div>;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        <img src={court.imageUrl} alt={court.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{court.name}</h1>
                    <div className="flex items-center gap-2 text-gray-200">
                        <MapPin size={18} />
                        <span>{court.address}</span>
                    </div>
                </div>
                <div className="hidden md:block">
                     <Button variant={isCheckedIn ? "outline" : "primary"} onClick={handleCheckIn} disabled={isCheckedIn} className={isCheckedIn ? "bg-white/10 text-white border-white hover:bg-white/20" : ""}>
                        {isCheckedIn ? <><CheckCircle2 size={18} className="mr-2"/> Checked In</> : "Check In Here"}
                    </Button>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Hours</div>
                <div className="font-medium text-gray-900 flex items-center gap-2"><Clock size={16} className="text-emerald-500"/> {court.hours}</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Surface</div>
                <div className="font-medium text-gray-900">{court.surfaceType}</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Activity</div>
                <div className="font-medium text-gray-900">{activePlayers.length} Players</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50" onClick={() => window.open(`https://maps.google.com/?q=${court.address}`, '_blank')}>
                <div className="text-gray-500 text-xs uppercase font-semibold mb-1">Directions</div>
                <div className="font-medium text-emerald-600 flex items-center gap-2">Open Maps <Navigation size={14}/></div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{court.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {court.amenities.map(amenity => (
                    <span key={amenity} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        {amenity}
                    </span>
                ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Typical Activity Levels</h2>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={activityData}>
                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                   <YAxis hide />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                   <Bar dataKey="players" radius={[4, 4, 0, 0]}>
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 4 ? '#10b981' : '#e5e7eb'} />
                      ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Players */}
        <div className="space-y-6">
            <div className="md:hidden">
                 <Button variant={isCheckedIn ? "outline" : "primary"} onClick={handleCheckIn} disabled={isCheckedIn} className="w-full py-4">
                    {isCheckedIn ? "You are Checked In" : "Check In Now"}
                </Button>
            </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users className="text-emerald-500" size={20}/>
                    Active Players
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">{activePlayers.length}</span>
            </div>
            
            {activePlayers.length > 0 ? (
                <div className="space-y-4">
                {activePlayers.map((player) => (
                    <div key={player.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                    <img src={player.avatarUrl} alt={player.name} className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{player.name}</p>
                        <div className="flex items-center gap-1">
                            <Trophy size={12} className={
                                player.skillLevel === 'Pro' || player.skillLevel === 'Advanced' ? "text-amber-500" : "text-gray-400"
                            } />
                            <p className="text-xs text-gray-500">{player.skillLevel}</p>
                        </div>
                    </div>
                    {player.id === user?.id && <span className="text-xs text-emerald-600 font-medium">You</span>}
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-400 text-sm">No players checked in currently.</p>
                    <p className="text-emerald-600 text-sm font-medium cursor-pointer mt-1" onClick={handleCheckIn}>Be the first!</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};