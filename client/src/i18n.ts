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
        correctDescription: 'is in word',
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
        hint: 'Hint',
      },
      modal: {
        congratulations: 'Congratulations!',
        wordFound: 'You found the word!',
        continueQuestion: 'Would you like to continue playing?',
        continue: 'Continue',
        quit: 'Quit',
      },
      howToPlay: {
        title: 'How to Play',
        objective: 'Objective',
        objectiveDescription:
          'Guess the hidden Tamil word by selecting letters from the Tamil keyboard.',
        howToPlay: 'How to Play',
        step1: 'Click on Tamil letters to guess the word',
        step2: 'Correct letters will appear in the word',
        step3: 'Wrong letters will increase your error count',
        step4: 'You lose when you make too many mistakes',
        tamilKeyboard: 'Tamil Keyboard',
        tamilKeyboardDescription:
          'Use the Tamil keyboard to select letters. You can combine consonants (மெய் எழுத்து) with vowels (உயிர் எழுத்து) to form compound letters.',
        note: 'This game is only available for Tamil words',
        gotIt: 'Got it!',
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
        hint: 'குறிப்பு',
      },
      modal: {
        congratulations: 'வாழ்த்துக்கள்!',
        wordFound: 'நீங்கள் வார்த்தையைக் கண்டுபிடித்துவிட்டீர்கள்!',
        continueQuestion: 'விளையாட்டைத் தொடர விரும்புகிறீர்களா?',
        continue: 'தொடர்',
        quit: 'வெளியேறு',
      },
      howToPlay: {
        title: 'எப்படி விளையாடுவது',
        objective: 'நோக்கம்',
        objectiveDescription:
          'தமிழ் விசைப்பலகையிலிருந்து எழுத்துக்களைத் தேர்ந்தெடுத்து மறைக்கப்பட்ட தமிழ் வார்த்தையை யூகிக்கவும்.',
        howToPlay: 'எப்படி விளையாடுவது',
        step1: 'வார்த்தையை யூகிக்க தமிழ் எழுத்துக்களைக் கிளிக் செய்யவும்',
        step2: 'சரியான எழுத்துக்கள் வார்த்தையில் தோன்றும்',
        step3: 'தவறான எழுத்துக்கள் உங்கள் பிழை எண்ணிக்கையை அதிகரிக்கும்',
        step4: 'நீங்கள் அதிக தவறுகள் செய்யும்போது தோற்கிறீர்கள்',
        tamilKeyboard: 'தமிழ் விசைப்பலகை',
        tamilKeyboardDescription:
          'எழுத்துக்களைத் தேர்ந்தெடுக்க தமிழ் விசைப்பலகையைப் பயன்படுத்தவும். கூட்டு எழுத்துக்களை உருவாக்க மெய் எழுத்துக்களை உயிர் எழுத்துக்களுடன் இணைக்கலாம்.',
        note: 'இந்த விளையாட்டு தமிழ் வார்த்தைகளுக்கு மட்டுமே கிடைக்கும்',
        gotIt: 'புரிந்தது!',
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
