import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Court } from '../types';
import { MockService } from '../services/mockService';
import { MapPin, Users, Sun, Clock, Search, List, Map as MapIcon, Navigation } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Component to recenter map when location changes
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export const Courts: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      const data = await MockService.getCourts();
      setCourts(data);
      setLoading(false);
    };
    fetchCourts();

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location permission denied or unavailable, using default.", error);
          // Default to Central Park
          setUserLocation({ lat: 40.785091, lng: -73.968285 });
        }
      );
    } else {
        // Fallback default
        setUserLocation({ lat: 40.785091, lng: -73.968285 });
    }
  }, []);

  const filteredCourts = courts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const createCustomIcon = (playerCount: number) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="relative">
            <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${playerCount > 0 ? 'bg-emerald-600' : 'bg-gray-700'}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            ${playerCount > 0 ? `<div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border border-white">${playerCount}</div>` : ''}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  const UserLocationIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ring-4 ring-blue-500/30"></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
  });

  if (loading || !userLocation) return <div className="flex justify-center items-center h-[calc(100vh-100px)]"><div className="animate-spin h-8 w-8 border-4 border-emerald-500 rounded-full border-t-transparent"></div></div>;

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Courts</h1>
          <p className="text-gray-500">Find active communities nearby.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Input 
                    label="" 
                    placeholder="Search locations..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 mb-0"
                />
                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
            </div>
            <button 
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
                {viewMode === 'map' ? <><List size={18}/> List View</> : <><MapIcon size={18}/> Map View</>}
            </button>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative bg-white min-h-[500px]">
        {viewMode === 'map' ? (
             <MapContainer 
                center={[userLocation.lat, userLocation.lng]} 
                zoom={12} 
                style={{ height: '100%', width: '100%' }}
             >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />

                {/* Current User Location */}
                <Marker position={[userLocation.lat, userLocation.lng]} icon={UserLocationIcon}>
                     <Popup>You are here</Popup>
                </Marker>

                {filteredCourts.map((court) => (
                    <Marker 
                        key={court.id} 
                        position={[court.lat, court.lng]}
                        icon={createCustomIcon(court.playerCount)}
                    >
                        <Popup>
                            <div className="w-full">
                                <div className="h-24 w-full rounded-t-lg overflow-hidden relative">
                                    <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
                                    <div className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">{court.surfaceType}</div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-gray-900 text-sm mb-1">{court.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                        <Clock size={12}/> {court.hours}
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                            <Users size={12}/> {court.playerCount} Playing
                                        </div>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        className="w-full text-xs py-1.5"
                                        onClick={() => navigate(`/court/${court.id}`)}
                                    >
                                        Join Community
                                    </Button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
             </MapContainer>
        ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-y-auto">
                {filteredCourts.map((court) => (
                    <Link 
                        key={court.id} 
                        to={`/court/${court.id}`}
                        className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 h-fit"
                    >
                        <div className="h-48 relative overflow-hidden">
                        <img 
                            src={court.imageUrl} 
                            alt={court.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                            {court.surfaceType}
                        </div>
                        {court.playerCount > 0 && (
                            <div className="absolute bottom-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            {court.playerCount} active players
                            </div>
                        )}
                        </div>
                        
                        <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{court.name}</h3>
                        <div className="flex items-start gap-2 text-gray-500 text-sm mb-4">
                            <MapPin size={16} className="mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{court.address}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <Clock size={16} className="text-emerald-600" />
                            <span className="truncate">{court.hours}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <Sun size={16} className="text-orange-500" />
                            <span>{court.surfaceType}</span>
                            </div>
                        </div>
                        </div>
                    </Link>
                ))}
                {filteredCourts.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                            <MapPin size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No courts found</h3>
                        <p className="text-gray-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};