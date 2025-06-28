export interface Joke {
  id: string;
  joke: string;
  isFavorite?: boolean;
}

export interface JokeAPIResponse {
  id: string;
  joke: string;
  status: number;
}