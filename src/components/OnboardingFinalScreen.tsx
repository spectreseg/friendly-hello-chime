import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface OnboardingFinalScreenProps {
  onComplete: () => void;
}

const OnboardingFinalScreen: React.FC<OnboardingFinalScreenProps> = ({ onComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Simulate account creation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm mx-auto text-center">
          {/* Tiger logo with celebration effect */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-60 scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 scale-125 animate-pulse"></div>
              <img
                src={tigerImage}
                alt="Tiger"
                className="relative z-10 w-32 h-32 object-contain drop-shadow-2xl mx-auto"
              />
              
              {/* Celebration sparkles */}
              <div className="absolute -top-4 -left-4 text-yellow-400 animate-bounce">
                <Sparkles size={20} />
              </div>
              <div className="absolute -top-2 -right-6 text-purple-400 animate-bounce delay-300">
                <Sparkles size={16} />
              </div>
              <div className="absolute -bottom-2 -left-6 text-yellow-300 animate-bounce delay-500">
                <Sparkles size={14} />
              </div>
            </div>
          </div>

          {/* Success content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              
              <h1 className="text-white text-3xl font-serif font-light mb-2 tracking-wide">
                Welcome to TigerBites!
              </h1>
              
              <p className="text-white/80 text-sm leading-relaxed">
                You're all set! Get ready to discover amazing restaurants and have delicious food delivered right to your door.
              </p>
            </div>

            {/* Features preview */}
            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span>Discover local restaurants and cuisines</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span>Get personalized food recommendations</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span>Track your orders in real-time</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <span>Exclusive deals and promotions</span>
              </div>
            </div>

            <Button
              onClick={handleComplete}
              disabled={isCompleting}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
            >
              {isCompleting ? (
                <span>Creating your account...</span>
              ) : (
                <>
                  <span>Start Exploring</span>
                  <ArrowRight size={20} />
                </>
              )}
            </Button>
          </div>

          <p className="text-white/60 text-xs">
            🎉 Welcome to the TigerBites family!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFinalScreen;