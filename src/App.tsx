import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider, useAuthContext } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import RegistrationScreen from './components/RegistrationScreen';
import OnboardingScreen2 from './components/OnboardingScreen2';
import OnboardingPasswordScreen from './components/OnboardingPasswordScreen';
import OnboardingScreen3 from './components/OnboardingScreen3';
import OnboardingScreen4 from './components/OnboardingScreen4';
import OnboardingFinalScreen from './components/OnboardingFinalScreen';
import StarryBackground from './components/StarryBackground';
import Dashboard from './components/Dashboard';
import tigerImage from './assets/tiger.png';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'registration-form' | 'onboarding2' | 'onboarding-password' | 'onboarding3' | 'onboarding4' | 'onboarding-final'>('login');
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    password: '',
    avatarUrl: '',
    locationEnabled: false,
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const { user, loading } = useAuthContext();

  // Reset to login screen when user signs out
  React.useEffect(() => {
    console.log('User state changed:', user);
    if (!user) {
      console.log('No user, setting screen to login');
      setCurrentScreen('login');
    }
  }, [user]);

  // Show dashboard if user is authenticated
  if (user) {
    return <Dashboard />;
  }

  const handleAuthModeChange = (mode: 'login' | 'register') => {
    if (mode === 'register') {
      setCurrentScreen('register');
    } else {
      setCurrentScreen('login');
    }
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleProceedToRegistration = () => {
    setCurrentScreen('registration-form');
  };

  const handleProceedToOnboarding3 = () => {
    setCurrentScreen('onboarding-password');
  };

  const handleProceedToOnboardingLocation = () => {
    setCurrentScreen('onboarding3');
  };

  const handleProceedToOnboarding4 = () => {
    setCurrentScreen('onboarding4');
  };

  const handleProceedToFinal = () => {
    setCurrentScreen('onboarding-final');
  };

  const handleRegistrationComplete = () => {
    // TODO: Redirect to actual dashboard
    console.log('Registration complete - redirecting to dashboard');
    setCurrentScreen('login'); // For now, go back to login
  };

  const handleProceedToOnboarding2 = () => {
    setCurrentScreen('onboarding2');
  };

  const handleOnboarding2Data = (data: { fullName: string; email: string }) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentScreen('onboarding-password');
  };

  const handlePasswordData = (data: { password: string }) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentScreen('onboarding3');
  };

  const handleLocationData = (data: { locationEnabled: boolean; latitude?: number; longitude?: number }) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setCurrentScreen('onboarding4');
  };

  const handleAvatarData = (data: { avatarUrl: string; avatarFile?: File }) => {
    setRegistrationData(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
    setCurrentScreen('onboarding-final');
  };

  const handleBackFromOnboarding3 = () => {
    setCurrentScreen('onboarding-password');
  };

  const handleBackFromOnboarding4 = () => {
    setCurrentScreen('onboarding3');
  };

  // Show registration welcome screen
  if (currentScreen === 'register') {
    return (
      <RegistrationScreen
        onProceed={handleProceedToOnboarding2}
        onBack={handleBackToLogin}
      />
    );
  }

  // Show onboarding screen 2 (name/email)
  if (currentScreen === 'onboarding2') {
    return (
      <OnboardingScreen2
        onProceed={handleOnboarding2Data}
        onBack={handleBackToLogin}
      />
    );
  }

  // Show password screen
  if (currentScreen === 'onboarding-password') {
    return (
      <OnboardingPasswordScreen
        onProceed={handlePasswordData}
        onBack={() => setCurrentScreen('onboarding2')}
      />
    );
  }

  // Show onboarding screen 3 (location)
  if (currentScreen === 'onboarding3') {
    return (
      <OnboardingScreen3
        onBack={handleBackFromOnboarding3}
        onProceed={handleLocationData}
      />
    );
  }

  // Show onboarding screen 4 (avatar)
  if (currentScreen === 'onboarding4') {
    return (
      <OnboardingScreen4
        onBack={handleBackFromOnboarding4}
        onProceed={handleAvatarData}
      />
    );
  }

  // Show final onboarding screen
  if (currentScreen === 'onboarding-final') {
    return (
      <OnboardingFinalScreen
        onComplete={handleRegistrationComplete}
      />
    );
  }

  // Show registration form (placeholder for now)
  if (currentScreen === 'registration-form') {
    return (
      <OnboardingFinalScreen
        onComplete={handleRegistrationComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Starry background */}
      <StarryBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center md:justify-end px-4 py-8 md:py-0">
        {/* Auth form with overlapping tiger and logo */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md relative mb-0 md:mb-0">
          {/* TigerBites logo positioned above tiger */}
          <div className="absolute -top-16 sm:-top-20 md:-top-14 lg:-top-16 xl:-top-20 left-1/2 transform -translate-x-1/2 z-50">
            <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-center tracking-wide">
              TigerBites
            </h1>
          </div>

          {/* Tiger image with purple glow - positioned to overlap form */}
          <div className="absolute -top-10 sm:-top-8 md:-top-8 lg:-top-10 xl:-top-12 left-1/2 transform -translate-x-1/2 z-30">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-40 scale-125"></div>
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30 scale-115"></div>
              <div className="absolute inset-0 bg-purple-300 rounded-full blur-xl opacity-20 scale-110"></div>
              <img
                src={tigerImage}
                alt="Tiger"
                className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        <AuthForm mode="login" onToggleMode={handleAuthModeChange} />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
