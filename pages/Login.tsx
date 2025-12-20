import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Smartphone, ArrowRight, ArrowLeft, KeyRound, MessageSquare, X } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 p-3 rounded-2xl hover:bg-emerald-50 text-emerald-600 transition-all active:scale-90 group z-50 flex items-center gap-2"
        aria-label="Back to home"
      >
        <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      {/* Mock SMS */}
      {showMockSms && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] animate-in slide-in-from-top duration-500">
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 p-2 rounded-xl text-white"><MessageSquare size={20} /></div>
                <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">MatchPoint: Your verification code is <span className="text-emerald-600 font-black">123456</span></p>
                </div>
                <button onClick={() => setShowMockSms(false)}><X size={16} /></button>
            </div>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
            <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg"
                style={{ backgroundColor: BRAND_GREEN }}
            >
                MP
            </div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-gray-500 font-medium">Verify your phone to continue.</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50/50 py-10 px-6 sm:px-10 border border-gray-100 rounded-[2rem] shadow-sm">
            {step === 'PHONE' ? (
                <form className="space-y-6" onSubmit={handleSendOtp}>
                    <Input
                        label="Phone Number"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="py-4 rounded-xl border-gray-200 text-lg font-bold"
                    />
                    <Button type="submit" className="w-full py-4 text-base font-black uppercase tracking-widest bg-[#059669]" isLoading={loading}>
                        Send Code <ArrowRight size={18} className="ml-2"/>
                    </Button>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleVerify}>
                    <Input
                        label="Verification Code"
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="tracking-[1em] text-center text-2xl font-black py-5 rounded-xl border-gray-200"
                    />
                    <Button type="submit" className="w-full py-4 text-base font-black uppercase tracking-widest bg-[#059669]" isLoading={loading}>
                        Verify Code
                    </Button>
                </form>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                    onClick={handleDemoLogin}
                    className="w-full py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition-colors"
                >
                    Demo Access
                </button>
                <div className="mt-4 text-center text-sm">
                    <span className="text-gray-500">New here? </span>
                    <Link to="/signup" className="font-black text-emerald-600">Join the community</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};