
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Smartphone, KeyRound, MapPin, Search, Check, MessageSquare, X, ArrowLeft } from 'lucide-react';
import { LOGO_DATA_URI } from '../components/Layout';

const BRAND_GREEN = "#059669";

const MAJOR_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", 
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Oklahoma City, OK",
  "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA",
  "Kansas City, MO", "Mesa, AZ", "Atlanta, GA", "Omaha, NE", "Colorado Springs, CO",
  "Raleigh, NC", "Long Beach, CA", "Virginia Beach, VA", "Miami, FL", "Oakland, CA",
  "Minneapolis, MN", "Tulsa, OK", "Bakersfield, CA", "Wichita, KS", "Arlington, TX",
  "San Juan, PR", "Santa Ana, CA", "St. Louis, MO", "Riverside, CA", "Pittsburgh, PA",
  "Cincinnati, OH", "Tampa, FL", "Anchorage, AK", "Toledo, OH", "Newark, NJ",
  "Greensboro, NC", "Plano, TX", "Henderson, NV", "Lincoln, NE", "Orlando, FL",
  "Jersey City, NJ", "Chula Vista, CA", "Buffalo, NY", "Irvine, CA", "Madison, WI"
].sort();

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    location: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMockSms, setShowMockSms] = useState(false);
  
  // City search state
  const [isCityOpen, setIsCityOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = useMemo(() => {
    if (!formData.location || !isCityOpen) return [];
    const query = formData.location.toLowerCase();
    return MAJOR_CITIES.filter(city => 
      city.toLowerCase().includes(query) && city.toLowerCase() !== query
    ).slice(0, 5); 
  }, [formData.location, isCityOpen]);

  const { signup, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
        setError('Please enter your City, State');
        return;
    }
    setLoading(true);
    setError('');
    
    try {
      await sendOtp(formData.phoneNumber);
      setStep('OTP');
      setTimeout(() => setShowMockSms(true), 800);
    } catch (err) {
      setError('Error sending verification code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const isValid = await verifyOtp(formData.phoneNumber, otp);
      if (isValid) {
          await signup(formData.name, formData.phoneNumber, formData.location);
          setShowMockSms(false);
          navigate('/courts');
      } else {
          setError('Invalid code. Try "123456"');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-300 transition-all shadow-sm outline-none text-sm font-medium";
  const labelClasses = "block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5";

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Link 
        to="/" 
        className="absolute top-6 left-6 p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-90 group z-50 flex items-center gap-2"
        aria-label="Back to home"
      >
        <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      {showMockSms && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xs z-[100] animate-in slide-in-from-top duration-500">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-4 flex items-start gap-4 ring-1 ring-black/5">
                <div className="bg-blue-500 p-2 rounded-xl text-white shrink-0 shadow-lg">
                    <MessageSquare size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-800 font-medium">
                        SecondServed: Your code is <span className="text-emerald-600 font-black">123456</span>
                    </p>
                </div>
                <button onClick={() => setShowMockSms(false)} className="text-gray-400 hover:text-gray-900">
                    <X size={14} />
                </button>
            </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center relative z-10">
        <div className="flex justify-center mb-5">
            <img 
                src={LOGO_DATA_URI} 
                alt="Logo"
                onClick={() => navigate('/')}
                className="h-16 w-auto cursor-pointer hover:scale-110 active:scale-95 transition-all drop-shadow-xl"
            />
        </div>
        <h2 className="text-3xl font-black text-white leading-tight tracking-tight">Join the Club</h2>
        <p className="mt-2 text-sm font-medium text-gray-400">
          Already a member? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-all">Sign in</Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm relative z-10">
        <div className="bg-white py-10 px-6 sm:px-8 border border-gray-100 rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
            {step === 'DETAILS' ? (
                <form className="space-y-5" onSubmit={handleSendOtp}>
                    <div>
                        <label className={labelClasses}>Full Name</label>
                        <input
                            type="text"
                            required
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John D."
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Phone Number</label>
                        <input
                            type="tel"
                            required
                            className={inputClasses}
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <label className={labelClasses}>City, State</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                className={`${inputClasses} pr-10`}
                                value={formData.location}
                                autoComplete="off"
                                onFocus={() => setIsCityOpen(true)}
                                onChange={(e) => {
                                    setFormData({...formData, location: e.target.value});
                                    setIsCityOpen(true);
                                }}
                                placeholder="Start typing your city..."
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center text-gray-300 pointer-events-none">
                                <Search size={16} />
                            </div>
                        </div>

                        {isCityOpen && filteredCities.length > 0 && (
                            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {filteredCities.map((city) => (
                                    <div 
                                        key={city}
                                        className="px-4 py-3 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer transition-colors flex items-center justify-between group"
                                        onClick={() => {
                                            setFormData({...formData, location: city});
                                            setIsCityOpen(false);
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 group-hover:text-emerald-700">{city}</span>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Major City</span>
                                        </div>
                                        <Check size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}

                    <Button type="submit" className="w-full py-4 text-sm font-black uppercase tracking-widest rounded-xl bg-[#059669] hover:bg-[#047857] shadow-xl shadow-emerald-500/20" isLoading={loading}>
                        Create Account
                    </Button>
                    
                    {/* Legal Notice inside the white box */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-[11px] font-medium leading-relaxed tracking-wide">
                            By signing up, you agree to the <br />
                            <Link to="/terms" className="underline decoration-gray-300 hover:text-emerald-600 transition-colors">Terms of Service</Link> & <Link to="/privacy" className="underline decoration-gray-300 hover:text-emerald-600 transition-colors">Privacy Policy</Link>
                        </p>
                    </div>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleVerifyAndSignup}>
                    <div>
                        <label className={labelClasses}>Verification Code</label>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            className={`${inputClasses} tracking-[0.8em] text-center text-2xl font-black py-5`}
                            autoFocus
                        />
                        <p className="text-center text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Sent to {formData.phoneNumber}</p>
                    </div>

                    {error && <p className="text-[10px] font-bold text-red-500 text-center">{error}</p>}

                    <div className="space-y-3">
                        <Button type="submit" className="w-full py-4 text-sm font-black uppercase tracking-widest rounded-xl bg-[#059669] hover:bg-[#047857] shadow-xl shadow-emerald-500/20" isLoading={loading}>
                            Verify & Join
                        </Button>
                         <button 
                            type="button"
                            onClick={() => { setStep('DETAILS'); setError(''); setShowMockSms(false); }}
                            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition-colors py-2"
                        >
                            Edit details
                        </button>
                    </div>
                    
                    {/* Legal Notice inside the white box for OTP step too */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-[11px] font-medium leading-relaxed tracking-wide">
                            By signing up, you agree to the <br />
                            <Link to="/terms" className="underline decoration-gray-300 hover:text-emerald-600 transition-colors">Terms of Service</Link> & <Link to="/privacy" className="underline decoration-gray-300 hover:text-emerald-600 transition-colors">Privacy Policy</Link>
                        </p>
                    </div>
                </form>
            )}
        </div>

        {/* Support link remains in the dark area outside the white box */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
            <p className="text-gray-400 text-xs font-semibold tracking-wider">
                Need help? <a href="tel:7147860139" className="underline decoration-gray-600 hover:text-white transition-colors">Text or Call Support</a>
            </p>
        </div>
      </div>
    </div>
  );
};
