import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Joke } from '../types/joke';

interface FavoritesListProps {
  favorites: Joke[];
  onRemoveFavorite: (joke: Joke) => void;
  onClose: () => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ 
  favorites, 
  onRemoveFavorite, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-800">
                Favorite Jokes ({favorites.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close favorites"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-96 p-6">
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No favorite jokes yet!</p>
              <p className="text-gray-400 text-sm mt-2">
                Click the heart icon on jokes you love to add them here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((joke) => (
                <div 
                  key={joke.id} 
                  className="bg-gray-50 rounded-xl p-4 flex items-start justify-between"
                >
                  <p className="text-gray-800 flex-1 mr-4">{joke.joke}</p>
                  <button
                    onClick={() => onRemoveFavorite(joke)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};