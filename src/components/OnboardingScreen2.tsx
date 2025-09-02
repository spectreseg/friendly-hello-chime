import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface OnboardingScreen2Props {
  onProceed: (data: { fullName: string; email: string }) => void;
  onBack: () => void;
}

const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({ onProceed, onBack }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onProceed({ fullName: fullName.trim(), email: email.trim() });
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
            <h2 className="text-white text-xl font-medium mb-2 text-center">Tell us about yourself</h2>
            <p className="text-white/80 text-sm mb-6 text-center">
              We'll use this to personalize your experience
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
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
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen2;