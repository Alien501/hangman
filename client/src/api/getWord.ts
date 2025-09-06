import type { WordApiResponse, Word } from '../types/api';

export const getWord = async (setWord: (word: Array<string>) => void): Promise<Word | null> => {
  try {
    const wordResponse = await fetch(import.meta.env.VITE_WORDS_API)
    if (wordResponse.ok) {
      const response: WordApiResponse = await wordResponse.json()
      
      // Extract the word data from the new API response format
      const wordData = response.data
      
      // Segment the Tamil word into graphemes
      const segmenter = new Intl.Segmenter('ta', { granularity: 'grapheme' })
      const segments = segmenter.segment(wordData.word)
      const graphemes = Array.from(segments, (segment) => segment.segment)

      setWord(graphemes)
      return wordData // Return the word data object with word, meaning, and pronunciation
    }
  } catch (error) {
    console.error('Error fetching word:', error)
    return null
  }
  
  return null
}
