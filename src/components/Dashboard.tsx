import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, MapPin, Star, Clock, User } from 'lucide-react';
import tigerImage from '../assets/tiger.png';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuthContext();

  // Mock restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Tiger's Den Burgers",
      image: "🍔",
      rating: 4.8,
      deliveryTime: "25-35 min",
      cuisine: "American",
      featured: true,
    },
    {
      id: 2,
      name: "Spicy Tiger Thai",
      image: "🍜",
      rating: 4.6,
      deliveryTime: "30-40 min",
      cuisine: "Thai",
      featured: false,
    },
    {
      id: 3,
      name: "Tiger Sushi Express",
      image: "🍣",
      rating: 4.9,
      deliveryTime: "20-30 min",
      cuisine: "Japanese",
      featured: true,
    },
    {
      id: 4,
      name: "Roaring Pizza Co.",
      image: "🍕",
      rating: 4.5,
      deliveryTime: "35-45 min",
      cuisine: "Italian",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={tigerImage} alt="TigerBites" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">TigerBites</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">Delivering to current location</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm text-gray-700">Hi, {user?.fullName || 'User'}!</span>
              </div>
              
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName || 'User'}! 🐅
          </h2>
          <p className="text-gray-600">What would you like to eat today?</p>
        </div>

        {/* Featured Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.filter(r => r.featured).map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{restaurant.image}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Restaurants */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">All Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="text-3xl mb-3 text-center">{restaurant.image}</div>
                  <h4 className="text-md font-semibold text-gray-900 mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-xs mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;