# Hangman Backend API

A modern Node.js/Express API server for the Hangman game, built with TypeScript and best practices.

## Features

- 🚀 **Express.js** with TypeScript
- 🔒 **Security** with Helmet and CORS
- 📊 **Logging** with Morgan
- 🛡️ **Rate Limiting** to prevent abuse
- 🗜️ **Compression** for better performance
- 🎨 **Code Quality** with ESLint and Prettier
- 🪝 **Git Hooks** with Husky
- ⚡ **Hot Reload** with Nodemon

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API routes
├── utils/           # Utility functions
└── index.ts         # Main application entry point
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Root
- `GET /` - API information

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
HELMET_CSP_ENABLED=true
MORGAN_FORMAT=combined
```

## Development

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

Code is automatically formatted and linted before each commit.

## Security

The API includes several security measures:

- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate limiting** to prevent abuse
- **Input validation** with express-validator
- **Error handling** with proper status codes

## License

ISC
