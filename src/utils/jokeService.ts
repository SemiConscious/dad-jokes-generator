import { Joke, JokeAPIResponse } from '../types/joke';

const FALLBACK_JOKES: Joke[] = [
  { id: '1', joke: "I'm reading a book about anti-gravity. It's impossible to put down!" },
  { id: '2', joke: "Why don't scientists trust atoms? Because they make up everything!" },
  { id: '3', joke: "I told my wife she was drawing her eyebrows too high. She looked surprised." },
  { id: '4', joke: "What do you call a fake noodle? An impasta!" },
  { id: '5', joke: "Why did the scarecrow win an award? He was outstanding in his field!" },
  { id: '6', joke: "I used to hate facial hair, but then it grew on me." },
  { id: '7', joke: "What do you call a bear with no teeth? A gummy bear!" },
  { id: '8', joke: "Why don't eggs tell jokes? They'd crack each other up!" },
  { id: '9', joke: "What's the best thing about Switzerland? I don't know, but the flag is a big plus." },
  { id: '10', joke: "I only know 25 letters of the alphabet. I don't know y." }
];

export const fetchRandomJoke = async (): Promise<Joke> => {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data: JokeAPIResponse = await response.json();
    return {
      id: data.id,
      joke: data.joke
    };
  } catch (error) {
    // Return a random fallback joke if API fails
    const randomIndex = Math.floor(Math.random() * FALLBACK_JOKES.length);
    return FALLBACK_JOKES[randomIndex];
  }
};

export const getFavoriteJokes = (): Joke[] => {
  try {
    const favorites = localStorage.getItem('dadJokeFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

export const saveFavoriteJokes = (jokes: Joke[]): void => {
  try {
    localStorage.setItem('dadJokeFavorites', JSON.stringify(jokes));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

export const shareJoke = async (joke: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Dad Joke',
        text: joke
      });
      return true;
    } catch {
      return false;
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(joke);
    return true;
  } catch {
    return false;
  }
};