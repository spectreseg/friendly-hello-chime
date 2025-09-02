import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera, User, Upload } from 'lucide-react';
import StarryBackground from './StarryBackground';
import tigerImage from '../assets/tiger.png';

interface OnboardingScreen4Props {
  onProceed: (data: { avatarUrl: string; avatarFile?: File }) => void;
  onBack: () => void;
}

const OnboardingScreen4: React.FC<OnboardingScreen4Props> = ({ onProceed, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      // For HEIC files, you would convert them here using heic2any
      let fileToUse = file;
      
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        // Dynamic import heic2any for HEIC conversion
        const heic2any = await import('heic2any');
        const convertedBlob = await heic2any.default({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        }) as Blob;
        
        fileToUse = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
          type: 'image/jpeg',
        });
      }

      const imageUrl = URL.createObjectURL(fileToUse);
      setSelectedImage(imageUrl);
      setSelectedFile(fileToUse);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try another file.');
    }
  };

  const handleContinue = () => {
    if (selectedImage && selectedFile) {
      onProceed({ avatarUrl: selectedImage, avatarFile: selectedFile });
    } else {
      onProceed({ avatarUrl: '' });
    }
  };

  const handleSkip = () => {
    onProceed({ avatarUrl: '' });
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
              <h2 className="text-white text-xl font-medium mb-2">Add Profile Picture</h2>
              <p className="text-white/80 text-sm">
                Help others recognize you by adding a profile picture
              </p>
            </div>

            {/* Avatar display */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-2 border-white/30 flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-white/70" />
                  )}
                </div>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
                >
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* Upload button */}
            <div className="mb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.heic,.heif"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 bg-white/5 flex items-center justify-center space-x-2"
              >
                <Upload size={16} />
                <span>Choose Photo</span>
              </Button>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Continue
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
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen4;