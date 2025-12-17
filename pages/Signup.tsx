import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SkillLevel } from '../types';
import { Smartphone, KeyRound } from 'lucide-react';

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    skillLevel: 'Beginner' as SkillLevel
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendOtp(formData.phoneNumber);
      setStep('OTP');
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
          await signup(formData.name, formData.phoneNumber, formData.skillLevel);
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            {step === 'DETAILS' ? (
                <form className="space-y-6" onSubmit={handleSendOtp}>
                    <Input
                        label="Full Name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                    />

                    <div className="relative">
                        <Input
                            label="Phone Number"
                            type="tel"
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                            placeholder="+1 (555) 000-0000"
                        />
                        <div className="absolute top-[35px] right-3 text-gray-400">
                            <Smartphone size={18} />
                        </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        value={formData.skillLevel}
                        onChange={(e) => setFormData({...formData, skillLevel: e.target.value as SkillLevel})}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Pro">Pro</option>
                    </select>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Continue
                    </Button>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleVerifyAndSignup}>
                    <div>
                        <div className="relative">
                            <Input
                                label={`Enter verification code sent to ${formData.phoneNumber}`}
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
                            Verify & Create Account
                        </Button>
                         <button 
                            type="button"
                            onClick={() => { setStep('DETAILS'); setError(''); }}
                            className="w-full text-center text-sm text-gray-600 hover:text-emerald-600"
                        >
                            Back to details
                        </button>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};