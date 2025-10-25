# STUPID — The AI that starts with nothing

An experimental web application that inverts the usual AI learning paradigm: instead of the AI teaching the human, the human teaches the AI. Watch as your explanations shape understanding from scratch.

## 🎯 Project Overview

**STUPID** demonstrates how knowledge is built interactively through a teaching-by-explaining approach. The AI starts with absolutely no knowledge and learns only from what you teach it—step by step, concept by concept.

### Features

- 🧠 **Blank Slate AI** - Starts knowing nothing, learns only from you
- 💬 **Interactive Teaching** - Chat-based instruction interface
- 📝 **Real-time Learning Notes** - Watch AI's understanding evolve as markdown summaries
- 📊 **Comprehension Tracking** - Visual indicators showing learning progress (Novice → Intermediate → Expert)
- 📚 **Multi-Category Support** - Teach Biology, Math, Physics, Computer Science, and more
- 🎨 **Kraft Paper Aesthetic** - Calm, notebook-inspired design with flat UI
- 🚀 **Frontend-Only** - No database, no authentication, completely in-memory

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17.0 or later
- **pnpm** (recommended) or npm/yarn
- **OpenAI API Key** - Get one from [platform.openai.com](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd stupid
```

2. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Configure environment variables:**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

> ⚠️ **Important:** Never commit your `.env.local` file. It's already in `.gitignore`.

4. **Run the development server:**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 How to Use

### Step 1: Landing Page
- View the "dumb AI" concept and current knowledge progress
- Click **"Start Teaching"** to begin

### Step 2: Create a Concept
- Click **"New Concept"** button
- Enter what you want to teach (e.g., "Photosynthesis", "Quantum Entanglement")
- Select a category (Biology, Physics, etc.)

### Step 3: Start Teaching
- Use the chat window to explain your concept
- The AI will ask questions and show its understanding
- Watch the **Learning Note** (right panel) update in real-time
- See the **Comprehension Level** progress from Novice → Intermediate → Expert

### Step 4: Track Progress
- Return to the homepage to view overall knowledge progress by category
- Switch between different concepts in the left sidebar
- Each concept maintains its own independent learning session

## 🏗️ Project Structure

```
/src
  /app
    /api
      /chat         # OpenAI API integration endpoint
    /[locale]
      /teach        # Teaching interface page
      /layout.tsx   # Root layout with ConceptProvider
      /page.tsx     # Landing page
  /components
    /ChatWindow.tsx       # Chat interface
    /ConceptList.tsx      # Sidebar concept list
    /LearningNote.tsx     # Markdown note renderer
    /NewConceptModal.tsx  # Create concept dialog
    /ProgressOverview.tsx # Category progress display
  /context
    /ConceptContext.tsx   # Global state management
  /lib
    /aiService.ts         # AI service integration
  /types
    /index.ts             # TypeScript definitions
```

## 🛠️ Technical Details

### Tech Stack
- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS 4 (kraft paper aesthetic)
- **AI Integration:** OpenAI API (GPT-4o-mini)
- **Markdown:** react-markdown
- **State Management:** React Context API

### Key Design Decisions
- **No Persistence:** All data stored in-memory (resets on refresh)
- **Frontend-Only:** No backend database or authentication
- **Self-Contained Sessions:** Each concept is an independent learning environment
- **AI Self-Assessment:** The AI evaluates its own comprehension level after each exchange

## 🎨 Visual Design

The application uses a **kraft paper / notebook aesthetic**:
- **Colors:** Cream/beige backgrounds, dark gray text, pale blue/green accents
- **Style:** Flat design, clean typography, generous white space
- **Mood:** Calm, serious, with subtle humor

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI responses | Yes |

## 📝 Notes

- **Data is NOT persisted** - Refreshing the page will reset all concepts
- **API costs** - Each message uses OpenAI API credits (~$0.0001-0.001 per exchange)
- **Desktop optimized** - Best experience on larger screens
- **No authentication** - Anyone with access to your deployed URL can use the app

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your `OPENAI_API_KEY` environment variable in Vercel's dashboard
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- Render
- Any Node.js hosting platform

Just ensure you set the `OPENAI_API_KEY` environment variable.

## 🤝 Contributing

This project was built for a hackathon. Feel free to fork and modify for your own use!

## 📄 License

MIT License - feel free to use for educational and experimental purposes.

## 🎓 Educational Use

Perfect for:
- Demonstrating learning-by-teaching concepts
- Educational workshops on AI interaction
- Hackathon projects
- Exploring how explanations shape understanding

---

**Built for hackathons and curious minds** 🧠✨
