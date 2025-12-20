import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Smartphone, KeyRound, MapPin, ChevronDown, Check, MessageSquare, X } from 'lucide-react';

// Curated list of major US cities for the dropdown
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
  const [citySearch, setCitySearch] = useState('');
  const [isCityOpen, setIsCityOpen] = useState(false);

  const filteredCities = useMemo(() => {
    if (!citySearch) return MAJOR_CITIES;
    return MAJOR_CITIES.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch]);

  const { signup, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
        setError('Please select your City, State');
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

  const inputClasses = "w-full bg-[#333333] border-none text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 transition-all";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5 ml-1";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Mock SMS Notification */}
      {showMockSms && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 animate-in slide-in-from-top duration-500">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-4 flex items-start gap-4 ring-1 ring-black/5">
                <div className="bg-blue-500 p-2 rounded-xl text-white shrink-0">
                    <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Messages</span>
                        <span className="text-[10px] text-gray-400">now</span>
                    </div>
                    <p className="text-sm text-gray-800 font-medium">
                        <span className="font-bold">MatchPoint:</span> Your verification code is <span className="text-emerald-600 font-black tracking-widest text-base">123456</span>
                    </p>
                </div>
                <button onClick={() => setShowMockSms(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                </button>
            </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h2 className="text-center text-[40px] font-black text-[#0f172a] leading-tight">
          Create your account
        </h2>
        <p className="mt-3 text-center text-base font-medium text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-bold underline-offset-4 hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 sm:px-10 border border-gray-100/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
            {step === 'DETAILS' ? (
                <form className="space-y-6" onSubmit={handleSendOtp}>
                    <div>
                        <label className={labelClasses}>Name</label>
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
                        <div className="relative">
                            <input
                                type="tel"
                                required
                                className={`${inputClasses} pr-12`}
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                placeholder="+1 (555) 000-0000"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                                <Smartphone size={20} strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label className={labelClasses}>City, State</label>
                        <div 
                            className={`${inputClasses} flex items-center justify-between cursor-pointer ${formData.location ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setIsCityOpen(!isCityOpen)}
                        >
                            <span>{formData.location || "Select your location"}</span>
                            <ChevronDown size={20} className={`transition-transform duration-300 ${isCityOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isCityOpen && (
                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#333333] rounded-2xl shadow-2xl border border-white/10 z-50 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                                <div className="p-3 border-b border-white/5">
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            className="w-full bg-[#444444] border-none text-sm text-white px-3 py-2 rounded-lg focus:ring-1 focus:ring-emerald-500"
                                            placeholder="Search cities..."
                                            autoFocus
                                            value={citySearch}
                                            onChange={(e) => setCitySearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                    {filteredCities.map(city => (
                                        <div 
                                            key={city}
                                            className="px-4 py-3 text-sm text-gray-300 hover:bg-emerald-600 hover:text-white cursor-pointer transition-colors flex items-center justify-between group"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({...formData, location: city});
                                                setIsCityOpen(false);
                                                setCitySearch('');
                                            }}
                                        >
                                            {city}
                                            {formData.location === city && <Check size={16} className="text-emerald-400 group-hover:text-white" />}
                                        </div>
                                    ))}
                                    {filteredCities.length === 0 && (
                                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                            No cities found
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <p className="text-sm font-bold text-red-800">{error}</p>
                        </div>
                    )}

                    <Button type="submit" className="w-full py-4 text-base font-bold rounded-2xl bg-[#059669] hover:bg-[#047857] shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]" isLoading={loading}>
                        Continue
                    </Button>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleVerifyAndSignup}>
                    <div>
                        <label className={labelClasses}>Verification Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className={`${inputClasses} tracking-[1em] text-center text-2xl font-black py-5`}
                                autoFocus
                            />
                             <div className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                                <KeyRound size={20} />
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-2 font-medium">Enter the code sent to {formData.phoneNumber}</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <p className="text-sm font-bold text-red-800">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Button type="submit" className="w-full py-4 text-base font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700" isLoading={loading}>
                            Verify & Create Account
                        </Button>
                         <button 
                            type="button"
                            onClick={() => { setStep('DETAILS'); setError(''); setShowMockSms(false); }}
                            className="w-full text-center text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors py-2"
                        >
                            Edit details
                        </button>
                    </div>
                </form>
            )}
        </div>
      </div>
      
      {/* Styles for the custom scrollbar in dropdown */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333333;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444444;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555555;
        }
      `}</style>
    </div>
  );
};