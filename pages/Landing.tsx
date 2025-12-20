import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, MapPin, Zap, Users, Trophy } from 'lucide-react';

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
          btnClasses: 'bg-emerald-600 hover:bg-emerald-700 border-emerald-800 shadow-[0_25px_60px_rgba(5,150,105,0.4)]',
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
          btnClasses: 'bg-blue-600 hover:bg-blue-700 border-blue-800 shadow-[0_25px_60px_rgba(37,99,235,0.4)]',
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
          btnClasses: 'bg-violet-600 hover:bg-violet-700 border-violet-800 shadow-[0_25px_60px_rgba(139,92,246,0.4)]',
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
          btnClasses: 'bg-yellow-600 hover:bg-yellow-700 border-yellow-800 shadow-[0_25px_60px_rgba(202,138,4,0.4)]',
          featureActiveColor: 'bg-yellow-600'
        };
      default:
        return {
          bg: 'bg-[#0f172a]',
          glow1: 'bg-[#059669]',
          glow2: 'bg-blue-600',
          accent: 'text-emerald-400',
          title: 'Point.',
          logoColor: BRAND_GREEN,
          btnClasses: 'bg-[#059669] hover:bg-[#047857] border-[#036c4b] shadow-[0_25px_60px_rgba(5,150,105,0.4)]',
          featureActiveColor: 'bg-white'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col items-center justify-center relative overflow-hidden font-['Inter'] transition-colors duration-700`}>
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glows */}
        <div className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] ${theme.glow1} rounded-full blur-[140px] animate-pulse-slow opacity-20 transition-colors duration-1000`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[90%] h-[90%] ${theme.glow2} rounded-full blur-[160px] animate-pulse-slow-reverse opacity-10 transition-colors duration-1000`}></div>
        
        {/* Default Tennis Court SVG */}
        <div className={`absolute inset-0 opacity-[0.03] transition-opacity duration-700 ${activeFeature ? 'opacity-[0.01]' : 'opacity-[0.03]'}`}>
          <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none" preserveAspectRatio="none">
            <rect x="0" y="0" width="100" height="120" stroke="white" strokeWidth="0.4" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="1.2" />
            <line x1="50" y1="30" x2="50" y2="90" stroke="white" strokeWidth="0.4" opacity="0.6" />
            <line x1="15" y1="30" x2="85" y2="30" stroke="white" strokeWidth="0.4" opacity="0.6" />
            <line x1="15" y1="90" x2="85" y2="90" stroke="white" strokeWidth="0.4" opacity="0.6" />
          </svg>
        </div>

        {/* Feature Specific Visuals */}
        <div className="absolute inset-0 transition-all duration-700">
          {activeFeature === 'Local' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-700">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="opacity-10">
                  <path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100 M20 0 V100 M40 0 V100 M60 0 V100 M80 0 V100" stroke="white" strokeWidth="0.1" />
               </svg>
               <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
               <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-50 delay-700"></div>
               <div className="absolute top-1/2 right-1/2 w-5 h-5 bg-emerald-400 rounded-full animate-ping opacity-50 delay-300"></div>
            </div>
          )}

          {activeFeature === 'Live' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-700 overflow-hidden">
               <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-scan opacity-30"></div>
               <div className="absolute inset-0 border-[20vw] border-blue-500/5 rounded-full animate-pulse-live"></div>
            </div>
          )}

          {activeFeature === 'Social' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-700">
               <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow"></div>
               <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow-reverse"></div>
               <div className="flex gap-12 opacity-10">
                  <Users size={200} className="text-white" />
               </div>
            </div>
          )}

          {activeFeature === 'Pro' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-700">
               <div className="w-full h-full bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent"></div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500/20 to-transparent blur-md"></div>
               <Trophy size={300} className="text-yellow-500/5 rotate-12" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-xl px-6 text-center flex flex-col items-center">
        {/* Dynamic Logo */}
        <div 
          onClick={() => setActiveFeature(null)}
          className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl mb-14 transition-all hover:scale-111 duration-500 cursor-pointer active:scale-90 shadow-2xl"
          style={{ 
            backgroundColor: theme.logoColor,
            boxShadow: `0 20px 50px ${theme.logoColor}44` 
          }}
        >
          MP
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-white leading-tight mb-20 tracking-tighter transition-all duration-500">
          {activeFeature ? '' : 'Match '} 
          <span className={`${theme.accent} transition-colors duration-500`}>{theme.title}</span>
        </h1>

        {/* Feature Highlights */}
        <div className="flex gap-6 mb-14">
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
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                      <div className={`w-14 h-14 rounded-[1.25rem] border transition-all duration-500 shadow-lg ${
                        isActive 
                        ? `${theme.featureActiveColor} text-white border-white/40 scale-110 shadow-[0_10px_30px_rgba(255,255,255,0.1)]` 
                        : 'bg-white/5 border-white/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      }`}>
                          <div className="w-full h-full flex items-center justify-center">
                             <feature.icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                          </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-400'
                      }`}>
                          {feature.label}
                      </span>
                  </div>
                );
            })}
        </div>

        {/* Dynamic Get Started Button */}
        <Button 
          variant="ghost"
          onClick={() => navigate('/login')}
          className={`w-full sm:w-auto px-14 py-7 text-xl font-black uppercase tracking-[0.25em] rounded-3xl transition-all active:scale-95 group border-b-4 ${theme.btnClasses}`}
        >
          Get Started 
          <span className="hidden sm:inline"> Today</span>
          <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" strokeWidth={4} />
        </Button>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.15; }
          50% { transform: scale(1.15) translate(3%, 3%); opacity: 0.35; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: scale(1.15) translate(0, 0); opacity: 0.25; }
          50% { transform: scale(1) translate(-3%, -3%); opacity: 0.05; }
        }
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-live {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
        .animate-pulse-slow-reverse { animation: pulse-slow-reverse 12s ease-in-out infinite; }
        .animate-scan { animation: scan 4s linear infinite; }
        .animate-pulse-live { animation: pulse-live 3s ease-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
      `}</style>
    </div>
  );
};