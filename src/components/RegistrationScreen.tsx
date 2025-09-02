import React from 'react';
import { Button } from '@/components/ui/button';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface RegistrationScreenProps {
  onProceed: () => void;
  onBack: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onProceed, onBack }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm mx-auto text-center">
          {/* Tiger logo */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-40 scale-125"></div>
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30 scale-115"></div>
              <img
                src={tigerImage}
                alt="Tiger"
                className="relative z-10 w-32 h-32 object-contain drop-shadow-2xl mx-auto"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-4xl font-serif font-light mb-2 tracking-wide">
            TigerBites
          </h1>
          
          <p className="text-white/80 text-lg mb-8">
            Welcome to the jungle of flavors
          </p>

          {/* Registration content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
            <h2 className="text-white text-xl font-medium mb-6">Create Your Account</h2>
            
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Join thousands of food lovers and discover amazing restaurants in your area. 
              Get personalized recommendations and exclusive deals!
            </p>

            <div className="space-y-4">
              <Button
                onClick={onProceed}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </Button>
              
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Back to Login
              </Button>
            </div>
          </div>

          <p className="text-white/60 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;