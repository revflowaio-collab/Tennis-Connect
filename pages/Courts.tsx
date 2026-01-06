
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Court } from '../types';
import { MockService } from '../services/mockService';
import { MapPin, Users, Search, X, Map as MapIcon, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const BRAND_GREEN = "#059669";

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export const Courts: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  const fetchCourts = useCallback(async (query?: string) => {
    if (query) setIsSearching(true);
    const data = await MockService.getCourts(query);
    setCourts(data);
    setLoading(false);
    setIsSearching(false);
    
    // If results found, center map on first result
    if (data.length > 0) {
        setUserLocation({ lat: data[0].lat, lng: data[0].lng });
    }
  }, []);

  useEffect(() => {
    fetchCourts();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: 40.785091, lng: -73.968285 });
        }
      );
    } else {
        setUserLocation({ lat: 40.785091, lng: -73.968285 });
    }
  }, [fetchCourts]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!search.trim()) {
        fetchCourts();
        return;
    }
    fetchCourts(search);
  };

  const createCustomIcon = (playerCount: number) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="relative group transition-all duration-300 transform hover:scale-110">
            <svg width="34" height="42" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
                <path d="M20 48C20 48 0 31.2 0 19.2C0 8.59604 8.95431 0 20 0C31.0457 0 40 8.59604 40 19.2C40 31.2 20 48 20 48Z" fill="${BRAND_GREEN}"/>
                <circle cx="20" cy="19" r="14" fill="white"/>
                <circle cx="20" cy="19" r="6" fill="${BRAND_GREEN}"/>
            </svg>
            ${playerCount > 0 ? `
                <div class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#ef4444] rounded-full text-white text-[8px] font-black flex items-center justify-center border-2 border-white px-1 shadow-md animate-bounce">
                    ${playerCount}
                </div>
            ` : ''}
        </div>
      `,
      iconSize: [34, 42],
      iconAnchor: [17, 42],
      popupAnchor: [0, -42]
    });
  };

  const UserLocationIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: `<div class="w-4 h-4 bg-white rounded-full border-[4px] border-blue-500 shadow-2xl"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
  });

  if (loading || !userLocation) {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-3 py-20">
            <Loader2 className="animate-spin h-10 w-10 text-emerald-500" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Preparing Courts...</p>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6 pb-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl font-black text-[#0f172a] tracking-tighter mb-1 uppercase">Courts</h1>
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[9px]">Discover play spots nearby</p>
            </div>
            {courts.length > 0 && (
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 self-center sm:self-auto border border-emerald-100 transition-all animate-in fade-in slide-in-from-right-2">
                    <MapIcon size={12} />
                    {courts.length} Courts Available
                </div>
            )}
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl mx-auto sm:mx-0 flex gap-2">
            <div className="relative flex-1">
                <input 
                    type="text"
                    placeholder="Search by ZIP (e.g. 94117) or Name..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-gray-100 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm font-bold text-sm text-gray-700 placeholder:text-gray-300"
                />
                <Search className="absolute top-[14px] left-3.5 text-gray-300" size={16} strokeWidth={2.5} />
                {search && (
                    <button 
                        type="button"
                        onClick={() => { setSearch(''); fetchCourts(); }}
                        className="absolute top-[14px] right-3 text-gray-300 hover:text-gray-500 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            <Button 
                type="submit"
                isLoading={isSearching}
                className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] bg-emerald-600 hover:bg-emerald-700 shadow-lg"
            >
                Search
            </Button>
        </form>
      </div>

      <div className="relative flex-1 min-h-[400px] h-[60vh] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-50">
        
        {/* Searching Overlay */}
        {isSearching && (
            <div className="absolute inset-0 z-[2000] flex flex-col items-center justify-center bg-emerald-950/20 backdrop-blur-[2px] animate-in fade-in duration-300">
                <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-emerald-100">
                    <div className="relative">
                        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        <MapPin className="absolute inset-0 m-auto text-emerald-400 w-4 h-4" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">Scanning Area...</p>
                </div>
            </div>
        )}

        {/* Empty State */}
        {courts.length === 0 && !isSearching && (
            <div className="absolute inset-0 z-[1000] flex items-center justify-center p-6 text-center backdrop-blur-sm bg-white/60 animate-in fade-in duration-300">
                <div className="max-w-xs space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <Search size={32} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">No Matches</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Try searching for a different ZIP code or check back later.</p>
                    </div>
                    <Button 
                        onClick={() => { setSearch(''); fetchCourts(); }}
                        variant="secondary"
                        className="w-full rounded-xl py-2.5 font-black uppercase tracking-widest text-[10px]"
                    >
                        <RotateCcw size={14} className="mr-2" /> Show All
                    </Button>
                </div>
            </div>
        )}

        <MapContainer 
            center={[userLocation.lat, userLocation.lng]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                className="map-tiles"
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />

            <Marker position={[userLocation.lat, userLocation.lng]} icon={UserLocationIcon} />

            {courts.map((court) => (
                <Marker 
                    key={court.id} 
                    position={[court.lat, court.lng]}
                    icon={createCustomIcon(court.playerCount)}
                >
                    <Popup className="custom-popup">
                        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                            <div className="h-24 w-full relative">
                                <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
                                <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">{court.surfaceType}</div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-black text-gray-900 text-sm mb-0.5 leading-tight">{court.name}</h3>
                                <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mb-3 font-black uppercase tracking-tight">
                                    <MapPin size={10} className="text-emerald-500"/> {court.address.split(',')[0]}
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-1.5 text-[8px] font-black text-emerald-800 bg-emerald-50 px-2 py-1.5 rounded-lg uppercase tracking-[0.1em] border border-emerald-100">
                                        <Users size={10}/> {court.playerCount} ACTIVE
                                    </div>
                                </div>
                                <Button 
                                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[9px] shadow-lg shadow-emerald-200"
                                    onClick={() => navigate(`/court/${court.id}`)}
                                >
                                    Details
                                </Button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
      </div>
      
      <style>{`
        .map-tiles {
            filter: grayscale(0.8) contrast(1.1) brightness(0.98);
        }
        .leaflet-container {
            background-color: #f8fafc !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
            padding: 0;
            background: transparent;
            box-shadow: none;
        }
        .custom-popup .leaflet-popup-content {
            margin: 0;
            width: 220px !important;
        }
        .custom-popup .leaflet-popup-tip-container {
            display: none;
        }
      `}</style>
    </div>
  );
};
