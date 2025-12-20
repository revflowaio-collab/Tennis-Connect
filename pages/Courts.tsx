import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Court } from '../types';
import { MockService } from '../services/mockService';
import { MapPin, Users, Clock, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const BRAND_GREEN = "#059669";

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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourts = async () => {
      const data = await MockService.getCourts();
      setCourts(data);
      setLoading(false);
    };
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
  }, []);

  const filteredCourts = courts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  const createCustomIcon = (playerCount: number) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="relative group transition-all duration-300 transform hover:scale-110">
            <svg width="42" height="50" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]">
                <path d="M20 48C20 48 0 31.2 0 19.2C0 8.59604 8.95431 0 20 0C31.0457 0 40 8.59604 40 19.2C40 31.2 20 48 20 48Z" fill="${BRAND_GREEN}"/>
                <circle cx="20" cy="19" r="14" fill="white"/>
                <circle cx="20" cy="19" r="6" fill="${BRAND_GREEN}"/>
            </svg>
            ${playerCount > 0 ? `
                <div class="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-[#ef4444] rounded-full text-white text-[10px] font-black flex items-center justify-center border-2 border-white px-1 shadow-lg">
                    ${playerCount}
                </div>
            ` : ''}
        </div>
      `,
      iconSize: [42, 50],
      iconAnchor: [21, 50],
      popupAnchor: [0, -50]
    });
  };

  const UserLocationIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping"></div>
            <div class="w-6 h-6 bg-white rounded-full border-[6px] border-blue-500 shadow-2xl"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
  });

  if (loading || !userLocation) {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-4">
            <div className="animate-spin h-10 w-10 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Locating Courts...</p>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-8 pb-10">
      {/* Search Header */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-5xl font-black text-[#0f172a] tracking-tight mb-2">Courts</h1>
          <p className="text-gray-400 font-bold text-sm">Discover the best places to play.</p>
        </div>
        
        {/* Full-width Centered Search */}
        <div className="relative w-full max-w-2xl mx-auto sm:mx-0">
            <input 
                type="text"
                placeholder="Search by city or zip code" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-100 bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm font-bold text-lg text-gray-700 placeholder:text-gray-300"
            />
            <Search className="absolute top-[18px] left-5 text-gray-300" size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Map Container - High Contrast Styling */}
      <div className="relative flex-1 min-h-[500px] h-[65vh] rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)] bg-gray-50">
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

            <Marker position={[userLocation.lat, userLocation.lng]} icon={UserLocationIcon}>
                 <Popup>Current Location</Popup>
            </Marker>

            {filteredCourts.map((court) => (
                <Marker 
                    key={court.id} 
                    position={[court.lat, court.lng]}
                    icon={createCustomIcon(court.playerCount)}
                >
                    <Popup className="custom-popup">
                        <div className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
                            <div className="h-32 w-full relative">
                                <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
                                <div className="absolute top-3 right-3 bg-[#059669] text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">{court.surfaceType}</div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-black text-gray-900 text-lg mb-1 leading-tight">{court.name}</h3>
                                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4 font-black uppercase tracking-tight">
                                    <MapPin size={12} className="text-emerald-500"/> {court.address.split(',')[0]}
                                </div>
                                <div className="flex justify-between items-center mb-5">
                                    <div className="flex items-center gap-2 text-[11px] font-black text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl uppercase tracking-[0.1em] border border-emerald-100">
                                        <Users size={12}/> {court.playerCount} ACTIVE
                                    </div>
                                </div>
                                <Button 
                                    className="w-full py-4 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-200"
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
        
        {/* Floating Tags */}
        <div className="absolute top-8 left-8 z-[500] pointer-events-none">
            <div className="bg-[#0f172a] text-white p-3 px-6 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                Live Court Map
            </div>
        </div>

        {/* Custom Controls Container */}
        <div className="absolute top-8 right-8 z-[500] flex flex-col gap-2">
            <button 
                onClick={() => navigate('/players')}
                className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 text-emerald-600 hover:scale-105 transition-transform"
            >
                <Users size={24} />
            </button>
        </div>
      </div>
      
      <style>{`
        .map-tiles {
            /* Aggressive grayscale filter to make streets dark and background light */
            filter: grayscale(1) contrast(1.2) brightness(0.95);
        }
        .leaflet-container {
            background-color: #f1f5f9 !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
            padding: 0;
            background: transparent;
            box-shadow: none;
        }
        .custom-popup .leaflet-popup-content {
            margin: 0;
            width: 260px !important;
        }
        .custom-popup .leaflet-popup-tip-container {
            display: none;
        }
        .leaflet-zoom-animated {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};