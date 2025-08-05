# 🥁 AI Drum Machine

A modern, AI-powered drum machine web application built with Next.js, React, and TypeScript. Create, generate, and play drum patterns with an intuitive interface and AI-assisted beat generation.

## ✨ Features

### 🎵 Core Drum Machine

- **16-step sequencer** with real-time playback
- **5 drum sounds**: Kick, Snare, Hi-hat, Open Hi-hat, and Clap
- **Adjustable BPM** (60-200 BPM)
- **Real-time audio playback** using Web Audio API
- **Visual step indicator** showing current position

### 🤖 AI Beat Generation

- **AI-powered beat creation** using natural language prompts
- **Genre presets**: Techno, House, Trap, Breakbeat, Minimal
- **Smart suggestions** for beat types and styles
- **Instant pattern generation** with descriptive text

### 🎨 Modern UI/UX

- **Responsive design** that works on desktop and mobile
- **Smooth animations** powered by Framer Motion
- **Dark/Light theme** support
- **Intuitive grid interface** for pattern editing
- **Professional audio controls** with volume adjustment

### 💾 Project Management

- **Save and load** your custom beats
- **Export functionality** for sharing patterns
- **Beat naming** and organization
- **Freemium model** with generation limits

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd drum-machine
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Drum Machine

1. **Navigate to the main page** to access the basic drum machine
2. **Click on grid cells** to toggle drum hits on/off
3. **Adjust BPM** using the slider
4. **Use transport controls**:
   - ▶️ Play/Pause
   - ⏹️ Stop
   - 🔄 Reset

### AI Beat Generator

1. **Go to `/generator`** for the advanced AI-powered version
2. **Enter a prompt** describing your desired beat
3. **Choose from genre presets** or use custom descriptions
4. **Click "Generate Beat"** to create AI-generated patterns
5. **Save and export** your creations

### Example Prompts

- "A driving techno beat with heavy kicks on the 1 and 3"
- "Lo-fi hip-hop with laid-back snares and jazzy hi-hats"
- "Aggressive trap beat with 808s and fast hi-hat rolls"
- "Minimal house with four-on-the-floor kick pattern"

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### UI Components

- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Modern component library
- **Lucide React** - Icon library

### Audio

- **Web Audio API** - Real-time audio processing
- **Custom drum samples** - High-quality TR-808 style sounds

### AI Integration

- **AI SDK** - OpenAI integration for beat generation
- **XAI** - AI model for pattern creation

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
drum-machine/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Page-specific components
│   ├── dashboard/         # Dashboard page
│   ├── generator/         # AI generator page
│   ├── signup/           # Signup page
│   └── drum-machine.tsx  # Core drum machine component
├── components/            # Shared UI components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎵 Drum Samples

The application uses high-quality drum samples:

- **Kick**: Punchy TR-808 style kick drum
- **Snare**: Classic 808 snare with body
- **Hi-hat**: Crisp closing hi-hat
- **Open Hi-hat**: Airy open hi-hat
- **Clap**: Sharp TR-808 clap

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Custom API endpoints
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Customization

- **Drum samples**: Replace URLs in `DRUM_SAMPLES` object
- **BPM range**: Modify slider min/max values
- **Pattern length**: Change array sizes (default: 16 steps)
- **UI theme**: Customize Tailwind classes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TR-808** - Inspiration for drum sounds and interface
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Next.js team** - Amazing React framework

## 📞 Support

- **Issues**: [GitHub Issues](your-repo-url/issues)
- **Discussions**: [GitHub Discussions](your-repo-url/discussions)
- **Email**: your-email@example.com

---

Made with ❤️ and lots of 🥁 beats
