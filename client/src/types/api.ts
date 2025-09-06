// API Response Types
export interface Word {
  word: string;
  meaning: string;
  pronouncination: string;
}

export interface WordApiResponse {
  message: string;
  data: Word;
}

// Game Types
export interface GameState {
  currentWord: string[];
  guessedLetters: Set<string>;
  wrongGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
  wordData?: Word;
}
