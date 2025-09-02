import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface OnboardingPasswordScreenProps {
  onProceed: (data: { password: string }) => void;
  onBack: () => void;
}

const OnboardingPasswordScreen: React.FC<OnboardingPasswordScreenProps> = ({ onProceed, onBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onProceed({ password });
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-8 left-4 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Tiger logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-40 scale-125"></div>
              <img
                src={tigerImage}
                alt="Tiger"
                className="relative z-10 w-24 h-24 object-contain drop-shadow-2xl mx-auto"
              />
            </div>
            <h1 className="text-white text-2xl font-serif font-light mt-4 tracking-wide">
              TigerBites
            </h1>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-white text-xl font-medium mb-2 text-center">Create a secure password</h2>
            <p className="text-white/80 text-sm mb-6 text-center">
              Choose a strong password to protect your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Continue
              </Button>
            </form>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPasswordScreen;