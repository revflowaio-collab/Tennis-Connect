import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Users, UserCircle, LogOut, X, ChevronRight, Menu } from 'lucide-react';

const BRAND_GREEN = "#059669";

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/courts', icon: MapPin, label: 'Courts' },
    { to: '/players', icon: Users, label: 'Players' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Universal Header (Mobile & Desktop) */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        {/* Top Left: MP Green Square */}
        <div className="flex items-center gap-3">
            <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-200"
                style={{ backgroundColor: BRAND_GREEN }}
            >
                MP
            </div>
            <span className="font-black text-xl text-[#0f172a] tracking-tight hidden sm:inline-block">MatchPoint</span>
        </div>

        {/* Center: Branding (optional for symmetry) */}
        <div className="sm:hidden font-black text-lg text-[#0f172a] tracking-tight">MatchPoint</div>

        {/* Top Right: Hamburger Menu */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2.5 hover:bg-gray-50 rounded-xl transition-all active:scale-90 text-gray-400 hover:text-gray-900"
          aria-label="Open Menu"
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Mobile Drawer */}
        <aside className={`
          fixed inset-y-0 right-0 z-[60] w-80 bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col">
            <div className="p-8 flex items-center justify-between">
              <h2 className="font-black text-2xl text-gray-900">Menu</h2>
              <button 
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <nav className="flex-1 px-6 space-y-2">
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-4 mb-4">Navigate MatchPoint</div>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-black shadow-sm'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-bold'
                    }`
                  }
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={22} className={location.pathname === item.to ? 'text-emerald-600' : 'text-gray-300 group-hover:text-gray-600'} />
                    {item.label}
                  </div>
                  <ChevronRight size={18} className={`transition-opacity ${location.pathname === item.to ? 'opacity-100' : 'opacity-0'}`} />
                </NavLink>
              ))}
            </nav>

            <div className="p-8 border-t bg-gray-50/30">
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={user?.avatarUrl || 'https://via.placeholder.com/48'} 
                  alt="Profile" 
                  className="w-14 h-14 rounded-full bg-white border-4 border-white shadow-xl"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-black text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-emerald-600 font-black uppercase tracking-wider">{user?.skillLevel}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all text-sm font-black uppercase tracking-widest shadow-sm"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for Menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-[55] animate-in fade-in duration-500"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-73px)] relative">
          <div className="max-w-5xl mx-auto p-6 pb-24 md:pb-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Bar (Keeping for UX convenience) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 h-20 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-8 flex items-center justify-around z-40 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isActive ? 'bg-emerald-100 text-emerald-700 scale-110 shadow-sm' : 'text-gray-300'
              }`}>
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              </div>
              <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${
                isActive ? 'text-emerald-700' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};