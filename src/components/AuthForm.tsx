import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
  onToggleMode: (mode: 'login' | 'register') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp, loading } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

            {mode === 'register' && (
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg p-2 border border-red-400/20">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onToggleMode(mode === 'login' ? 'register' : 'login')}
              className="text-white/80 hover:text-white text-sm underline underline-offset-2 transition-colors"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;