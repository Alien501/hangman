import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      app: {
        title: 'HANGMAN',
      },
      header: {
        source: 'Source Code',
        wordsBy: 'Words by',
        developer: 'Developer',
        alien501: 'Alien501',
        lang: 'Language',
        en: 'EN',
        ta: 'TA',
      },
      toast: {
        correct: 'Correct!',
        wrong: 'Wrong!',
        wrongDescription: 'is not in the word',
        gameOver: 'Game over!',
        gameOverDescription: 'You have used all moves. Start a new game?',
      },
      home: {
        start: 'Start',
      },
      game: {
        moves: 'Moves',
        loading: 'Loading word...',
      },
    },
  },
  ta: {
    translation: {
      app: {
        title: 'தொங்கும் மனிதன்',
      },
      header: {
        source: 'மூலக் குறியீடு',
        wordsBy: 'நன்றி',
        developer: 'மென்பொருள் பொறியாளர்',
        alien501: 'ஏலியன்501',
        lang: 'மொழி',
        en: 'ஆங்',
        ta: 'தமிழ்',
      },
      toast: {
        correct: 'சரி!',
        correctDescription: 'வார்த்தையில் உள்ளது.',
        wrong: 'தவறு!',
        wrongDescription: 'வார்த்தையில் இல்லை',
        gameOver: 'விளையாட்டு முடிந்தது!',
        gameOverDescription:
          'நீங்கள் எல்லா அசைவுகளையும் பயன்படுத்திவிட்டீர்கள். புதிய விளையாட்டைத் தொடங்கவா',
      },
      home: {
        start: 'தொடங்கு',
      },
      game: {
        moves: 'நகர்வுகள்',
        loading: 'தயவுசெய்து காத்திருக்கவும்...',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ta'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
