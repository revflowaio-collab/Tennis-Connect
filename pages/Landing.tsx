
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, MapPin, Zap, Users, Trophy } from 'lucide-react';
import { LOGO_DATA_URI } from '../components/Layout';

const BRAND_GREEN = "#059669";

type FeatureType = 'Local' | 'Live' | 'Social' | 'Pro' | null;

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);

  const handleFeatureClick = (feature: FeatureType) => {
    setActiveFeature(activeFeature === feature ? null : feature);
  };

  const getThemeStyles = () => {
    switch (activeFeature) {
      case 'Local':
        return {
          bg: 'bg-emerald-950',
          glow1: 'bg-emerald-500',
          glow2: 'bg-teal-600',
          accent: 'text-emerald-400',
          title: 'Local',
          logoColor: '#059669',
          btnClasses: 'bg-emerald-600 hover:bg-emerald-700 border-emerald-800 shadow-[0_12px_30px_rgba(5,150,105,0.25)]',
          featureActiveColor: 'bg-emerald-600'
        };
      case 'Live':
        return {
          bg: 'bg-blue-950',
          glow1: 'bg-cyan-400',
          glow2: 'bg-blue-600',
          accent: 'text-blue-400',
          title: 'Live',
          logoColor: '#2563eb', 
          btnClasses: 'bg-blue-600 hover:bg-blue-700 border-blue-800 shadow-[0_12px_30px_rgba(37,99,235,0.25)]',
          featureActiveColor: 'bg-blue-600'
        };
      case 'Social':
        return {
          bg: 'bg-indigo-950',
          glow1: 'bg-purple-500',
          glow2: 'bg-indigo-600',
          accent: 'text-purple-400',
          title: 'Social',
          logoColor: '#8b5cf6', 
          btnClasses: 'bg-violet-600 hover:bg-violet-700 border-violet-800 shadow-[0_12px_30px_rgba(139,92,246,0.25)]',
          featureActiveColor: 'bg-violet-600'
        };
      case 'Pro':
        return {
          bg: 'bg-gray-950',
          glow1: 'bg-yellow-600',
          glow2: 'bg-gray-800',
          accent: 'text-yellow-500',
          title: 'Pro',
          logoColor: '#CA8A04',
          btnClasses: 'bg-yellow-600 hover:bg-yellow-700 border-yellow-800 shadow-[0_12px_30px_rgba(202,138,4,0.25)]',
          featureActiveColor: 'bg-yellow-600'
        };
      default:
        return {
          bg: 'bg-[#0f172a]',
          glow1: 'bg-[#059669]',
          glow2: 'bg-blue-600',
          accent: 'text-emerald-400',
          title: 'Served.',
          logoColor: BRAND_GREEN,
          btnClasses: 'bg-[#059669] hover:bg-[#047857] border-[#036c4b] shadow-[0_12px_30px_rgba(5,150,105,0.25)]',
          featureActiveColor: 'bg-white'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col relative overflow-hidden font-['Inter'] transition-colors duration-700`}>
      
      {/* Background Visual Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ambient Glows */}
        <div className={`absolute top-[-15%] left-[-10%] w-[80%] h-[80%] ${theme.glow1} rounded-full blur-[160px] animate-pulse-slow opacity-25 transition-colors duration-1000`}></div>
        <div className={`absolute bottom-[-15%] right-[-10%] w-[90%] h-[90%] ${theme.glow2} rounded-full blur-[180px] animate-pulse-slow-reverse opacity-15 transition-colors duration-1000`}></div>
        
        {/* Full Stretched Tennis Court Lines */}
        <div className={`absolute inset-0 opacity-[0.08] transition-opacity duration-1000 ${activeFeature ? 'opacity-[0.03]' : 'opacity-[0.08]'}`}>
           <svg width="100%" height="100%" viewBox="0 0 100 120" preserveAspectRatio="none" fill="none">
              <line x1="15" y1="0" x2="15" y2="120" stroke="white" strokeWidth="0.5" />
              <line x1="85" y1="0" x2="85" y2="120" stroke="white" strokeWidth="0.5" />
              <line x1="5" y1="0" x2="5" y2="120" stroke="white" strokeWidth="0.2" />
              <line x1="95" y1="0" x2="95" y2="120" stroke="white" strokeWidth="0.2" />
              <line x1="15" y1="30" x2="85" y2="30" stroke="white" strokeWidth="0.5" />
              <line x1="15" y1="90" x2="85" y2="90" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="30" x2="50" y2="90" stroke="white" strokeWidth="0.5" />
              <line x1="5" y1="0" x2="95" y2="0" stroke="white" strokeWidth="0.8" />
              <line x1="5" y1="120" x2="95" y2="120" stroke="white" strokeWidth="0.8" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="1.2" />
           </svg>
        </div>

        {/* Feature-Specific Overlays */}
        <div className="absolute inset-0 transition-all duration-1000">
          {activeFeature === 'Local' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-1000">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="opacity-10">
                  <path d="M0 10 H100 M0 20 H100 M0 30 H100 M0 40 H100 M0 50 H100 M0 60 H100 M0 70 H100 M0 80 H100 M0 90 H100 M10 0 V100 M20 0 V100 M30 0 V100 M40 0 V100 M50 0 V100 M60 0 V100 M70 0 V100 M80 0 V100 M90 0 V100" stroke="white" strokeWidth="0.05" />
               </svg>
               <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full animate-ping-slow"></div>
               <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-emerald-500/5 rounded-full animate-ping-slow delay-700"></div>
               <MapPin size={250} className="text-emerald-500 opacity-[0.03] rotate-[-15deg]" />
            </div>
          )}

          {activeFeature === 'Live' && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden animate-in fade-in duration-1000">
               <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-scan opacity-60 blur-sm"></div>
               <div className="absolute inset-0 border-[25vw] border-blue-500/5 rounded-full animate-pulse-live"></div>
               <Zap size={250} className="text-blue-500 opacity-[0.03]" />
            </div>
          )}

          {activeFeature === 'Social' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-1000">
               <div className="absolute w-[300px] h-[300px] border border-purple-500/20 rounded-full animate-spin-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_#a855f7]"></div>
               </div>
               <div className="absolute w-[450px] h-[450px] border border-purple-500/10 rounded-full animate-spin-slow-reverse">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-[0_0_20px_#6366f1]"></div>
               </div>
               <Users size={300} className="text-purple-500 opacity-[0.04] animate-pulse" />
            </div>
          )}

          {activeFeature === 'Pro' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-1000">
               <div className="w-full h-full bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent"></div>
               <Trophy size={300} className="text-yellow-500/5 rotate-[15deg]" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto w-full">
        {/* New Logo Integration */}
        <div className="h-20 md:h-24 w-auto mb-8 cursor-pointer transition-all hover:scale-110 active:scale-95 drop-shadow-2xl animate-in slide-in-from-top-4 duration-700 flex items-center justify-center">
            <img 
                src={LOGO_DATA_URI} 
                alt="SecondServed Logo" 
                onClick={() => setActiveFeature(null)}
                className="h-full w-auto"
            />
        </div>

        {/* Scaled Down Title Section */}
        <div className="h-28 md:h-40 flex items-center justify-center w-full mb-6">
          <h1 className={`font-black text-white leading-none tracking-tighter transition-all duration-700 flex flex-col items-center justify-center ${activeFeature ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'}`}>
            <span className={`block transition-all duration-500 transform ${activeFeature ? 'h-0 opacity-0 -translate-y-6 pointer-events-none' : 'h-auto opacity-100 translate-y-0 mb-2'}`}>
              Second
            </span>
            <span className={`${theme.accent} transition-colors duration-500 block`}>
              {theme.title}
            </span>
          </h1>
        </div>

        {/* Navigation / Feature Grid - More Compact */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-10 w-full">
            {[
                { icon: MapPin, label: 'Local', id: 'Local' as const },
                { icon: Zap, label: 'Live', id: 'Live' as const },
                { icon: Users, label: 'Social', id: 'Social' as const },
                { icon: Trophy, label: 'Pro', id: 'Pro' as const }
            ].map((feature, i) => {
                const isActive = activeFeature === feature.id;
                return (
                  <div 
                    key={i} 
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                      <div className={`w-10 h-10 rounded-xl border-2 transition-all duration-500 shadow-md ${
                        isActive 
                        ? `${theme.featureActiveColor} text-white border-white/30 scale-110 shadow-[0_8px_25px_rgba(255,255,255,0.08)]` 
                        : 'bg-white/5 border-white/5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-105'
                      }`}>
                          <div className="w-full h-full flex items-center justify-center">
                             <feature.icon size={18} strokeWidth={isActive ? 3 : 2} />
                          </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-400'
                      }`}>
                          {feature.label}
                      </span>
                  </div>
                );
            })}
        </div>

        {/* CTA Section - Minimized Width Button */}
        <div className="w-full flex justify-center">
          <Button 
            variant="ghost"
            onClick={() => navigate('/login')}
            className={`px-10 py-3.5 text-sm font-black uppercase tracking-[0.12em] rounded-xl transition-all active:scale-95 group border-b-[3px] ${theme.btnClasses}`}
          >
            Get Started 
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} strokeWidth={4} />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.3; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: scale(1.2); opacity: 0.1; }
          50% { transform: scale(1); opacity: 0.05; }
        }
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-live {
          0% { transform: scale(0.6); opacity: 0; }
          50% { opacity: 0.15; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 0.2; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-pulse-slow { animation: pulse-slow 12s ease-in-out infinite; }
        .animate-pulse-slow-reverse { animation: pulse-slow-reverse 15s ease-in-out infinite; }
        .animate-scan { animation: scan 6s linear infinite; }
        .animate-pulse-live { animation: pulse-live 4s ease-out infinite; }
        .animate-ping-slow { animation: ping-slow 5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 35s linear infinite; }
      `}</style>
    </div>
  );
};
