import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Smartphone, ArrowRight, KeyRound } from 'lucide-react';

export const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
      // In a real app, we might check if user exists first, but here we just send OTP
      await sendOtp(phoneNumber);
      setStep('OTP');
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
      
      // Simulate flow
      await sendOtp(demoPhone);
      setStep('OTP');
      
      // Short delay for visual effect
      setTimeout(async () => {
          await login(demoPhone);
          navigate('/courts');
      }, 800);
    } catch (err) {
      setError('Failed to log in with demo account.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-emerald-200 shadow-xl">TC</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tennis Connect
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            {step === 'PHONE' ? (
                <form className="space-y-6" onSubmit={handleSendOtp}>
                    <div>
                        <div className="relative">
                            <Input
                                label="Phone Number"
                                type="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1 (555) 000-0000"
                            />
                            <div className="absolute top-[35px] right-3 text-gray-400">
                                <Smartphone size={18} />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">We'll send you a temporary code.</p>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    )}

                    <div>
                        <Button type="submit" className="w-full" isLoading={loading}>
                            Continue <ArrowRight size={16} className="ml-2"/>
                        </Button>
                    </div>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleVerify}>
                    <div>
                        <div className="relative">
                            <Input
                                label={`Enter code sent to ${phoneNumber}`}
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                className="tracking-widest text-center text-lg"
                                autoFocus
                            />
                            <div className="absolute top-[35px] right-3 text-gray-400">
                                <KeyRound size={18} />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button type="submit" className="w-full" isLoading={loading}>
                            Sign in
                        </Button>
                        <button 
                            type="button"
                            onClick={() => { setStep('PHONE'); setError(''); }}
                            className="w-full text-center text-sm text-gray-600 hover:text-emerald-600"
                        >
                            Change phone number
                        </button>
                    </div>
                </form>
            )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading && step === 'OTP' && otp === '123456' ? 'Signing in...' : 'Demo User Access'}
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm">
             <span className="text-gray-600">Don't have an account? </span>
             <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
               Sign up
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};