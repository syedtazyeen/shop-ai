# AI Shopper - Product Suggestion App

A React Native mobile app that turns shopping into a conversation. Instead of browsing through endless product lists, users simply chat with an AI advisor about what they need. The AI understands natural language and suggests relevant products from a curated catalog.

Think of it as having a knowledgeable shopping assistant who remembers your preferences and can recommend products based on your specific needs, budget, and style.

## Tech Stack

**Frontend**: React Native 0.79.6 with Expo 53.0.22 for cross-platform development  
**AI Engine**: Google Gemini AI for natural language understanding and product recommendations  
**State Management**: Custom store implementation with React Context API for chat state  
**Data**: JSON-based product catalog with 51 products across 8 categories  
**Styling**: Custom color system with component-based design  
**Dependencies**: 
- React 19.0.0
- React Native 0.79.6
- React Native Safe Area Context 5.4.0
- React Native Reanimated 3.17.4 for smooth animations
- Expo Splash Screen 0.30.10 for app loading experience
- Google Fonts (Outfit) for typography
- Dotenv 17.2.2 for environment configuration

## Architecture

The app follows a clean, modular architecture with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Layer      │    │   State Layer    │    │   Data Layer    │
│                 │    │                  │    │                 │
│ • ChatInput     │◄──►│ • ChatProvider   │◄──►│ • API Services  │
│ • ChatContent   │    │ • Custom Store   │    │ • Product Data  │
│ • ProductCard   │    │ • useChatActions │    │ • Gemini API    │
│ • ProductModal  │    │ • Chat Selectors │    │ • SKUs JSON     │
│ • Badge         │    │ • Reducer        │    │ • Utils         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

**Data Flow**: User input → Chat Context → Custom Store → API Service → Gemini AI → Product Validation → UI Update

**Key Components**:
- **Custom Store**: Lightweight state management with reducer pattern
- **Chat Provider**: React Context wrapper for global chat state
- **API Layer**: Modular services for Gemini AI and product data
- **Component System**: Reusable UI components with consistent styling
- **Animation System**: React Native Reanimated for smooth transitions and micro-interactions
- **Splash Screen**: Custom loading experience with animated branding
- **Typography System**: Google Fonts integration with consistent text styling

## Approach

**Why Chat-Based Interface?** Traditional e-commerce relies on filters and search terms. A conversational approach feels more natural - users can say "I need something for my home office under ₹200" instead of navigating complex filter systems.

**Component-First Design**: Each UI element is a reusable component. This makes the code maintainable and allows for easy testing and updates.

**Context Over Redux**: For a chat-focused app, React Context provides the right balance of simplicity and functionality without the overhead of Redux.

**AI Integration Strategy**: Instead of building complex recommendation algorithms, we leverage Gemini's natural language capabilities to understand user intent and match it with our product catalog.

## File Structure

```
src/
├── components/           # Reusable UI components
│   ├── chat/            # Chat-specific components
│   │   ├── ChatInput.js    # Message input with send functionality
│   │   ├── ChatContent.js  # Message list and display
│   │   ├── ChatHeader.js   # Top bar with edit/clear options
│   │   ├── ListItem.js     # Individual message rendering
│   │   ├── ListEmpty.js    # Empty state component
│   │   ├── ListFooter.js   # Footer component
│   │   └── index.js        # Chat component exports
│   ├── product/         # Product display components
│   │   ├── ProductCard.js  # Product recommendation cards
│   │   ├── ProductModal.js # Product detail modal
│   │   └── index.js        # Product component exports
│   └── ui/              # Generic UI components
│       ├── Button.js       # Custom button component with variants
│       ├── Typography.js   # Text styling components
│       ├── badge.js        # Badge component for categories
│       └── index.js        # UI component exports
├── api/                 # External service integrations
│   ├── suggestion.js    # Gemini AI API calls and content generation
│   ├── product.js       # Product data management and validation
│   └── index.js         # API utility functions
├── store/               # State management
│   ├── chat.js          # Chat state, actions, and reducer
│   └── index.js         # Custom store implementation
├── hooks/               # Custom React hooks
│   └── useChatActions.js # Chat interaction logic and API calls
├── lib/                 # Utility functions and constants
│   ├── colors.js        # App color palette and theme
│   ├── prompt.js        # AI prompt templates for Gemini
│   └── utils.js         # Helper functions for data processing
├── data/                # Static data
│   ├── skus.json        # Product catalog (51 products, 8 categories)
│   └── chat.json        # Sample chat data for testing
├── AdvisorScreen.js     # Main screen component with keyboard handling
├── SplashScreen.js      # Animated splash screen component
└── App.js              # Root app component with font loading and providers
```

**Key Features of This Structure**:
- **Modular Components**: Each component is self-contained with clear responsibilities
- **Centralized State**: Custom store implementation with reducer pattern for predictable state updates
- **API Abstraction**: Clean separation between UI and data fetching logic
- **Reusable UI System**: Consistent design system with Button, Typography, and Badge components
- **Animation Integration**: React Native Reanimated for smooth transitions and micro-interactions
- **Font Management**: Google Fonts integration with proper loading and fallbacks
- **Product Categories**: Healthtech and Wellness, Personal Care, Entertainment, Kitchen Appliances, Home Improvement, Travel & Lifestyle, Smart Mobility, Security & Surveillance

## Getting Started

### Prerequisites
- Node.js (v16+)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Studio
- Google Gemini API access

### Quick Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd ai-suggestion
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the app**
   ```bash
   npm start
   # Then press 'i' for iOS, 'a' for Android, or 'w' for web
   ```

**Note**: The app uses `app.config.js` to load environment variables into the Expo configuration. Make sure your `.env` file is in the project root.

### How to Use
1. Open the app and start typing your needs
2. Ask questions like "I need a laptop for coding under $1500" or "Show me smart home devices"
3. The AI will suggest relevant products from the catalog with detailed explanations
4. Tap on product cards to view more details in the modal
5. Keep chatting to refine your search or ask follow-up questions
6. Use the clear button to start a new conversation

## Key Features

### 🤖 AI-Powered Recommendations
- **Natural Language Processing**: Chat with AI using everyday language
- **Smart Product Matching**: AI analyzes your needs and suggests relevant products
- **Contextual Understanding**: Remembers conversation history for better recommendations
- **Product Validation**: Ensures all suggested products exist in the catalog

### 💬 Interactive Chat Experience
- **Real-time Messaging**: Instant responses with loading states
- **Message History**: View and continue previous conversations
- **Error Handling**: Graceful error messages and retry functionality
- **Keyboard Management**: Optimized for mobile typing experience

### 🛍️ Product Discovery
- **Rich Product Catalog**: 51 products across 8 categories
- **Detailed Product Cards**: Price, brand, description, and reasoning with smooth animations
- **Product Modal**: Full product details with category badges and shared transitions
- **Interactive Empty State**: Category suggestions with animated badges for easy discovery
- **Category System**: Healthtech and Wellness, Personal Care, Entertainment, Kitchen Appliances, Home Improvement, Travel & Lifestyle, Smart Mobility, Security & Surveillance

### 🎨 Modern UI/UX
- **Cross-Platform**: Works on iOS, Android, and Web
- **Responsive Design**: Adapts to different screen sizes
- **Custom Components**: Button variants, Typography system, Badge components
- **Safe Area Support**: Proper handling of device notches and status bars
- **Loading States**: Animated loading indicators with rotating elements and pulsing text
- **Smooth Animations**: React Native Reanimated for fluid transitions and micro-interactions
- **Typography**: Google Fonts for consistent and modern text styling

### 🔧 Technical Features
- **Custom State Management**: Lightweight store with reducer pattern
- **API Integration**: Seamless Gemini AI integration with timeout handling
- **Environment Configuration**: Secure API key management with dotenv
- **Modular Architecture**: Clean separation of concerns
- **Error Boundaries**: Robust error handling throughout the app
- **Animation Performance**: React Native Reanimated for 60fps animations
- **Keyboard Handling**: Smooth keyboard animations and safe area management
