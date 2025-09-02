# Tamil Hangman Game

A modern, interactive Hangman game built with React and TypeScript, featuring Tamil language support and neo-brutalism design aesthetics.

## 🎯 Overview

Tamil Hangman is a web-based word guessing game that combines traditional hangman mechanics with Tamil language support. Players guess Tamil words by selecting consonants and vowels, with a unique scoring system and responsive design.

## ✨ Features

- **Tamil Language Support**: Full support for Tamil graphemes and word composition
- **Interactive Gameplay**: Dynamic hangman animations using GSAP
- **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- **Neo-Brutalism UI**: Bold, clean design with sharp shadows and borders
- **Real-time Feedback**: Toast notifications for correct/incorrect guesses
- **Dynamic Difficulty**: Word length-based move calculation
- **Language Toggle**: Switch between English and Tamil interfaces

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Internationalization**: i18next
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository
```bash
git clone https://github.com/Alien501/hangman.git
cd hangman/client
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## 🎮 How to Play

1. **Start Game**: Click "Start" to begin with a random Tamil word
2. **Guess Letters**: 
   - Click Uyir Ezhuthu (vowels) for immediate input
   - Select Mei Ezhuthu (consonants) and combine with vowels for complex sounds
   - Use the confirm button to submit composed sounds
3. **Progress**: Each wrong guess advances the hangman animation
4. **Win**: Reveal all letters before running out of moves
5. **Language**: Toggle between English and Tamil interface using the language button

## 🔮 Future Goals

### 1. Gamification
- Achievement system with badges and milestones
- Daily challenges and word themes
- Streak tracking and statistics
- Leaderboards for competitive play

### 2. Score Calculation
- Time-based scoring with bonuses
- Move efficiency multipliers
- Difficulty-based point scaling
- Historical performance tracking

### 3. Own Word List
- Custom word creation and management
- Category-based word organization
- User-submitted word contributions
- Offline word database

### 4. Backend
- User authentication and profiles
- Progress synchronization across devices
- Multiplayer game modes
- API for word management and statistics

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Game screens and layouts
│   ├── sprites/        # Game character assets
│   ├── routes/         # Application routing
│   ├── i18n.ts         # Internationalization setup
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tamil Words API**: Powered by [mskian/vue-tamil-words](https://github.com/mskian/vue-tamil-words)
- **Design Inspiration**: Neo-brutalism design principles
- **Community**: Tamil language enthusiasts and developers

## 📞 Contact

- **Developer**: Alien501
- **GitHub**: [@Alien501](https://github.com/Alien501)
- **LinkedIn**: [Vignesh](https://www.linkedin.com/in/vignesh501/)
- **Email**: cvignesh404@gmail.com

---

Made with ❤️ for the Tamil language community
