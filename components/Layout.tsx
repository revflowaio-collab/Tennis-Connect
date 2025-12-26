
import React, { useMemo } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Users, UserCircle, LogOut, X, ChevronRight, Menu } from 'lucide-react';

// Tennis ball SVG placeholder
export const LOGO_DATA_URI = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgZmlsbD0iI2NjZmYwMCIvPjxwYXRoIGQ9Ik0yNSAxMCBBNDAgNDAgMCAwIDEgMjUgOTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTc1IDEwIEE0MCA0MCAwIDAgMCA3NSA5MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiLz48L3N2Zz4=";

// Facebook-style silhouette SVG
const ProfileSilhouette = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400 bg-gray-100" fill="currentColor">
    <circle cx="50" cy="50" r="50" fill="#E5E7EB" />
    <circle cx="50" cy="35" r="18" fill="#9CA3AF" />
    <path d="M50 58c-20 0-35 12-35 24v4h70v-4c0-12-15-24-35-24z" fill="#9CA3AF" />
  </svg>
);

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Define nav items with specific color schemes
  const navItems = [
    { 
      name: 'Courts', 
      path: '/courts', 
      icon: MapPin, 
      desc: 'Find local play spots',
      activeColor: 'bg-emerald-600',
      textColor: 'text-emerald-500',
      shadowColor: 'shadow-emerald-900/40',
      glowColor: 'rgba(16, 185, 129, 0.5)'
    },
    { 
      name: 'Players', 
      path: '/players', 
      icon: Users, 
      desc: 'Connect with partners',
      activeColor: 'bg-blue-600',
      textColor: 'text-blue-500',
      shadowColor: 'shadow-blue-900/40',
      glowColor: 'rgba(37, 99, 235, 0.5)'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: UserCircle, 
      desc: 'Your stats & skill',
      activeColor: 'bg-indigo-600',
      textColor: 'text-indigo-500',
      shadowColor: 'shadow-indigo-900/40',
      glowColor: 'rgba(79, 70, 229, 0.5)'
    },
  ];

  // Calculate current theme based on path
  const currentTheme = useMemo(() => {
    const item = navItems.find(i => location.pathname.startsWith(i.path));
    return item || navItems[0];
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-['Inter']">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0f172a] text-white h-screen sticky top-0 overflow-y-auto border-r border-white/5 shadow-2xl z-50">
        <div 
          className="p-8 mb-2 flex items-center gap-3 group cursor-pointer transition-all duration-500" 
          onClick={() => navigate('/')}
        >
          <img 
            src={LOGO_DATA_URI} 
            alt="Logo" 
            className="w-6 h-6 transition-all duration-500 group-hover:rotate-12" 
            style={{ filter: `drop-shadow(0 0 8px ${currentTheme.glowColor})` }}
          />
          <span className={`text-base font-black tracking-tighter uppercase transition-all duration-500 ${currentTheme.textColor}`}>
            SecondServed
          </span>
        </div>

        <nav className="flex-1 px-5 space-y-2">
          <p className="px-3 text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? `${item.activeColor} text-white shadow-lg ${item.shadowColor}`
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="transition-transform group-hover:scale-110" strokeWidth={isActive ? 3 : 2} />
                  <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-all duration-300 ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'}`} />
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
            <div className="flex items-center gap-3 mb-4 px-1">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-800 border border-white/10 shrink-0">
                    <ProfileSilhouette />
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] font-black truncate uppercase tracking-wider">{user?.name}</p>
                    <p className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-500 ${currentTheme.textColor}`}>{user?.skillLevel}</p>
                </div>
            </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-2 text-gray-500 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-lg transition-all group font-black text-[9px] uppercase tracking-[0.3em]"
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-[#0f172a] text-white/90 p-4 px-5 flex items-center justify-between sticky top-0 z-[60] backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src={LOGO_DATA_URI} 
            alt="Logo" 
            className="h-5 w-5 transition-all duration-500" 
            style={{ filter: `drop-shadow(0 0 8px ${currentTheme.glowColor})` }}
          />
          <span className={`font-black text-xs tracking-tighter uppercase transition-all duration-500 ${currentTheme.textColor}`}>
            SecondServed
          </span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="p-2 bg-white/5 rounded-lg active:scale-90 border border-white/5"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0f172a] z-[1000] p-5 pt-8 animate-in fade-in slide-in-from-right duration-400 flex flex-col">
          <div className="flex justify-between items-center mb-10 px-1">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>
              <img 
                src={LOGO_DATA_URI} 
                alt="Logo" 
                className="h-6 w-6" 
                style={{ filter: `drop-shadow(0 0 10px ${currentTheme.glowColor})` }}
              />
              <span className={`font-black text-sm tracking-tighter uppercase transition-colors duration-500 ${currentTheme.textColor}`}>
                SecondServed
              </span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 bg-white/5 text-white rounded-xl active:scale-95 border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-3">
             <p className="px-2 text-[8px] font-black text-gray-500 uppercase tracking-[0.5em] mb-1">Navigation</p>
             {navItems.map((item) => {
               const isActive = location.pathname.startsWith(item.path);
               return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 px-4 rounded-2xl transition-all duration-300 border ${
                      isActive
                        ? `${item.activeColor} text-white border-white/20 shadow-xl ${item.shadowColor} scale-[1.01]`
                        : 'bg-white/5 text-gray-400 border-white/5'
                    }`}
                >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                        <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
                      </div>
                      <div>
                        <span className="font-black text-xs uppercase tracking-[0.2em] block">{item.name}</span>
                        <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-gray-500'}`}>{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className={isActive ? 'opacity-100' : 'opacity-20'} />
                </NavLink>
               );
             })}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
             <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-white/10 shrink-0">
                    <ProfileSilhouette />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-black uppercase text-[10px] tracking-wider truncate">{user?.name}</p>
                    <p className={`text-[8px] font-black uppercase tracking-[0.2em] mt-0.5 transition-colors duration-500 ${currentTheme.textColor}`}>{user?.skillLevel}</p>
                </div>
                <div className="w-2 h-2 rounded-full animate-pulse transition-all duration-500 shadow-[0_0_8px_currentColor]" style={{ color: currentTheme.glowColor, backgroundColor: currentTheme.glowColor }}></div>
             </div>
             
             <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 text-gray-500 border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:text-red-400 active:scale-95"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full relative min-h-screen">
        <div className="p-4 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            <Outlet />
        </div>
      </main>
    </div>
  );
};
