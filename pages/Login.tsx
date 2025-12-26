
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Smartphone, ArrowRight, ArrowLeft, KeyRound, MessageSquare, X } from 'lucide-react';
import { LOGO_DATA_URI } from '../components/Layout';

const BRAND_GREEN = "#059669";

export const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMockSms, setShowMockSms] = useState(false);
  
  const { login, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
        setError("Please enter a phone number");
        return;
    }
    setError('');
    setLoading(true);
    
    try {
      await sendOtp(phoneNumber);
      setStep('OTP');
      setTimeout(() => setShowMockSms(true), 1000);
    } catch (err) {
      setError('Could not send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const isValid = await verifyOtp(phoneNumber, otp);
      if (isValid) {
        setShowMockSms(false);
        await login(phoneNumber);
        navigate('/courts');
      } else {
        setError('Invalid code. Try "123456"');
      }
    } catch (err) {
      setError('Login failed. Account may not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const demoPhone = '+15550101';
      setPhoneNumber(demoPhone);
      setOtp('123456');
      await sendOtp(demoPhone);
      setStep('OTP');
      setTimeout(async () => {
          await login(demoPhone);
          navigate('/courts');
      }, 1200);
    } catch (err) {
      setError('Failed to log in with demo account.');
      setLoading(false);
    }
  };

  const inputBaseClasses = "w-full bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-300 transition-all outline-none text-sm font-medium shadow-sm";

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation Layer */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-90 group z-50 flex items-center gap-2"
        aria-label="Back to home"
      >
        <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Mock SMS - Visual Feedback */}
      {showMockSms && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xs z-[100] animate-in slide-in-from-top duration-500">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 p-2 rounded-xl text-white shadow-lg"><MessageSquare size={18} /></div>
                <div className="flex-1">
                    <p className="text-xs text-gray-800 font-medium">SecondServed: Your verification code is <span className="text-emerald-600 font-black">123456</span></p>
                </div>
                <button onClick={() => setShowMockSms(false)} className="text-gray-400 hover:text-gray-900"><X size={14} /></button>
            </div>
        </div>
      )}

      {/* Logo & Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex justify-center mb-5">
            <img 
                src={LOGO_DATA_URI} 
                alt="Logo"
                onClick={() => navigate('/')}
                className="h-16 w-auto cursor-pointer hover:scale-110 active:scale-95 transition-all drop-shadow-xl"
            />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
        <p className="mt-1.5 text-gray-400 text-sm font-medium">Verify your phone to continue.</p>
      </div>

      {/* White Contrasting Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm relative z-10">
        <div className="bg-white py-8 px-6 sm:px-8 border border-gray-100 rounded-[1.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
            {step === 'PHONE' ? (
                <form className="space-y-5" onSubmit={handleSendOtp}>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className={inputBaseClasses}
                        />
                    </div>
                    {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
                    <Button type="submit" className="w-full py-3 text-sm font-black uppercase tracking-widest bg-[#059669] hover:bg-[#047857] shadow-xl shadow-emerald-500/20" isLoading={loading}>
                        Send Code <ArrowRight size={16} className="ml-2"/>
                    </Button>
                </form>
            ) : (
                <form className="space-y-5" onSubmit={handleVerify}>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Verification Code</label>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                            className={`${inputBaseClasses} tracking-[0.8em] text-center text-xl font-black py-4`}
                        />
                    </div>
                    {error && <p className="text-[10px] font-bold text-red-500 ml-1 text-center">{error}</p>}
                    <Button type="submit" className="w-full py-3 text-sm font-black uppercase tracking-widest bg-[#059669] hover:bg-[#047857] shadow-xl shadow-emerald-500/20" isLoading={loading}>
                        Verify Code
                    </Button>
                </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-50">
                <button
                    onClick={handleDemoLogin}
                    className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-emerald-600 transition-colors"
                >
                    Quick Demo Access
                </button>
                <div className="mt-3 text-center text-xs">
                    <span className="text-gray-400">New here? </span>
                    <Link to="/signup" className="font-black text-emerald-600 hover:text-emerald-700 transition-colors">Join community</Link>
                </div>
            </div>
        </div>

        {/* Legal & Support Footer Notice */}
        <div className="mt-10 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
            <p className="text-gray-400 text-[11px] font-medium leading-relaxed tracking-wide opacity-80">
                By signing in, you agree to our <br />
                <Link to="/terms" className="underline decoration-gray-600 hover:text-white transition-colors">Terms of Service</Link> & <Link to="/privacy" className="underline decoration-gray-600 hover:text-white transition-colors">Privacy Policy</Link>
            </p>
            <p className="text-gray-400 text-xs font-semibold tracking-wider pt-2">
                Need help? <a href="tel:7147860139" className="underline decoration-gray-600 hover:text-white transition-colors">Text or Call Support</a>
            </p>
        </div>
      </div>
    </div>
  );
};
