import React, { useState, useEffect } from 'react';
import { Smile, Heart, RotateCcw } from 'lucide-react';
import { JokeCard } from './components/JokeCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FavoritesList } from './components/FavoritesList';
import { Toast } from './components/Toast';
import { Joke } from './types/joke';
import { fetchRandomJoke, getFavoriteJokes, saveFavoriteJokes } from './utils/jokeService';

function App() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  useEffect(() => {
    setFavorites(getFavoriteJokes());
    loadNewJoke();
  }, []);

  const loadNewJoke = async () => {
    setIsLoading(true);
    try {
      const joke = await fetchRandomJoke();
      const favoriteJoke = favorites.find(fav => fav.id === joke.id);
      setCurrentJoke({
        ...joke,
        isFavorite: !!favoriteJoke
      });
    } catch (error) {
      showToast('Failed to load joke. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (joke: Joke) => {
    let updatedFavorites: Joke[];
    
    if (joke.isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== joke.id);
      showToast('Removed from favorites', 'success');
    } else {
      updatedFavorites = [...favorites, { ...joke, isFavorite: true }];
      showToast('Added to favorites!', 'success');
    }
    
    setFavorites(updatedFavorites);
    saveFavoriteJokes(updatedFavorites);
    
    if (currentJoke?.id === joke.id) {
      setCurrentJoke({
        ...joke,
        isFavorite: !joke.isFavorite
      });
    }
  };

  const removeFavorite = (joke: Joke) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== joke.id);
    setFavorites(updatedFavorites);
    saveFavoriteJokes(updatedFavorites);
    
    if (currentJoke?.id === joke.id) {
      setCurrentJoke({
        ...currentJoke,
        isFavorite: false
      });
    }
    
    showToast('Removed from favorites', 'success');
  };

  const handleShare = (success: boolean) => {
    if (success) {
      showToast('Joke copied to clipboard!', 'success');
    } else {
      showToast('Failed to share joke', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Smile className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dad Jokes Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Get ready to groan, laugh, and share the corniest jokes on the internet!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={loadNewJoke}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RotateCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="font-medium">
                {isLoading ? 'Loading...' : 'New Joke'}
              </span>
            </button>

            <button
              onClick={() => setShowFavorites(true)}
              className="flex items-center space-x-2 bg-red-100 text-red-600 px-6 py-3 rounded-full hover:bg-red-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-medium">
                Favorites ({favorites.length})
              </span>
            </button>
          </div>

          {/* Joke Display */}
          <div className="mb-8">
            {isLoading && !currentJoke ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                <LoadingSpinner />
                <p className="text-center text-gray-500 mt-4">
                  Preparing a joke for you...
                </p>
              </div>
            ) : currentJoke ? (
              <JokeCard
                joke={currentJoke}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
              />
            ) : null}
          </div>

          {/* Fun Stats */}
          <div className="text-center text-gray-500">
            <p className="text-sm">
              You've favorited {favorites.length} joke{favorites.length !== 1 ? 's' : ''} so far!
            </p>
          </div>
        </div>
      </main>

      {/* Favorites Modal */}
      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onClose={() => setShowFavorites(false)}
        />
      )}

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;