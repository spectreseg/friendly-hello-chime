import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Shield } from 'lucide-react';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface OnboardingScreen3Props {
  onProceed: (data: { locationEnabled: boolean; latitude?: number; longitude?: number }) => void;
  onBack: () => void;
}

const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({ onProceed, onBack }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleEnableLocation = async () => {
    setIsRequesting(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      onProceed({
        locationEnabled: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Location error:', error);
      // Still proceed but without location data
      onProceed({ locationEnabled: false });
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    onProceed({ locationEnabled: false });
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

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-purple-400" />
              </div>
              
              <h2 className="text-white text-xl font-medium mb-2">Enable Location</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Allow us to access your location to find the best restaurants near you and provide accurate delivery estimates.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <Shield size={16} className="text-green-400 flex-shrink-0" />
                <span>Your location is kept private and secure</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <MapPin size={16} className="text-purple-400 flex-shrink-0" />
                <span>Find restaurants and estimate delivery times</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleEnableLocation}
                disabled={isRequesting}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                {isRequesting ? 'Getting Location...' : 'Enable Location'}
              </Button>
              
              <Button
                onClick={handleSkip}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                Skip for now
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen3;