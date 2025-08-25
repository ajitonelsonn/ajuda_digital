# 🌐 Ajuda Digital Website

**Showcase Website for Ajuda Digital Project** (`www.ajuda-digital.com`)

This is the public-facing website for the Ajuda Digital project - a comprehensive AI government assistant for Timor-Leste. This website serves as the information portal and showcase platform for the project.

## 🎯 Purpose

This website (`www.ajuda-digital.com`) serves as the **showcase and information platform** for the Ajuda Digital ecosystem, while the main AI chatbot runs on `chat.ajuda-digital.com`.

### Key Functions:

- **Project Introduction** - Introduce Ajuda Digital to the public
- **Team Profiles** - Meet the young Timorese developers behind the project
- **Technology Showcase** - Display the cutting-edge AI technologies used
- **Problem Statement** - Explain the challenges we're solving for Timorese citizens
- **Real-time Analytics** - Track global visitor engagement with Firebase
- **Cultural Representation** - Showcase Timorese heritage with Tais patterns

## 🛠️ Technical Architecture

### Frontend Framework

- **[Next.js 15.5.0](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library

### Backend & Analytics

- **[Firebase Realtime Database](https://firebase.google.com/)** - Real-time visitor data
- **[Firebase Analytics](https://firebase.google.com/products/analytics)** - User behavior tracking
- **Geolocation APIs** - Multiple fallback APIs for country detection

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page - main landing page
│   ├── team/              # Team page - developer profiles
│   │   └── page.tsx
│   ├── datasets/          # Datasets page - data collection status
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header with language selector
│   │   └── Footer.tsx    # Footer with visitor counter and links
│   ├── animations/       # Animation components
│   │   ├── TextReveal.tsx       # Text reveal animation
│   │   └── LoadingScreen.tsx    # Loading screen component
│   └── VisitorCounter.tsx       # Real-time visitor analytics
├── contexts/             # React contexts
│   └── LanguageContext.tsx     # Multilingual support
├── hooks/                # Custom React hooks
│   └── useScrollAnimation.ts   # Scroll-based animations
├── lib/                  # Utility libraries
│   ├── visitorTracking.ts      # Visitor analytics logic
│   ├── firebaseService.ts      # Firebase integration
│   └── i18n/                   # Internationalization
│       ├── translations.ts     # Translation strings
│       └── index.ts            # i18n configuration
└── styles/               # Additional styles
    └── globals.css       # Global CSS and custom styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm or yarn** - Package manager
- **Firebase Account** - For analytics and visitor tracking

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ajitonelsonn/ajuda_digital.git
   cd ajuda_digital/ajuda-digital-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create `.env.local` file:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebasedatabase.app
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

## 👨‍💻 Team

Built with ❤️ by young Timorese :

- **[Ajito Nelson Lucio da Costa](https://github.com/ajitonelsonn)** - Team Leader
- **[Jedinilda S. Seixas dos Reis](https://github.com/Jedinilda20)** - Team Member
- **[Abrao Glorito DC](https://github.com/abraog)** - Team Member

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

![Tais Traditional Pattern](../Picture/tais.png)

**Made in Timor-Leste 🇹🇱**
