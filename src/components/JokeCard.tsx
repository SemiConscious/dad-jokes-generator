import React from 'react';
import { Heart, Share2, Copy } from 'lucide-react';
import { Joke } from '../types/joke';
import { shareJoke } from '../utils/jokeService';

interface JokeCardProps {
  joke: Joke;
  onToggleFavorite: (joke: Joke) => void;
  onShare?: (success: boolean) => void;
}

export const JokeCard: React.FC<JokeCardProps> = ({ joke, onToggleFavorite, onShare }) => {
  const handleShare = async () => {
    const success = await shareJoke(joke.joke);
    onShare?.(success);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joke.joke);
      onShare?.(true);
    } catch {
      onShare?.(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
          "{joke.joke}"
        </p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onToggleFavorite(joke)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
            joke.isFavorite
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={joke.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`w-5 h-5 ${joke.isFavorite ? 'fill-current' : ''}`} 
          />
          <span className="text-sm font-medium">
            {joke.isFavorite ? 'Favorited' : 'Favorite'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200"
          aria-label="Share joke"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-200"
          aria-label="Copy joke"
        >
          <Copy className="w-5 h-5" />
          <span className="text-sm font-medium">Copy</span>
        </button>
      </div>
    </div>
  );
};