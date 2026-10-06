# Project STUPID — The AI that starts with nothing

## Project Purpose
STUPID is an experimental web application that inverts the usual AI learning paradigm: instead of the AI teaching the human, the human teaches the AI. This project demonstrates how knowledge is built interactively through a teaching-by-explaining approach.

## Educational Goals
- Promote **reflective learning** — learning by explaining
- Make the process of **knowledge construction** visible and tangible
- Demystify AI by showing it as a blank slate that learns only through interaction
- Offer a simple, calm, and slightly humorous experience

## Architecture & Structure
- **App Router Architecture**: Next.js 16 app router with i18n support
- **State Management**: React Context API for in-memory concept and chat storage
- **No paid APIs**: Local mock learner; no OpenAI or other external LLM
- **File Structure**:
  - `/src/app/[locale]` - Page routes (landing, teaching interface)
  - `/src/components` - UI components (chat, concept list, markdown notes)
  - `/src/lib` - Utilities, mock AI client, local topic classifier
  - `/src/context` - Global state management for concepts and sessions
  - `/src/types` - TypeScript type definitions

## Tech Stack
- **Framework**: Next.js 16 with React 19
- **Runtime**: Node.js 24
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Learner**: Local mock in `/api/chat` (notes built from user messages)
- **Markdown**: react-markdown for rendering learning notes
- **Utilities**:
  - clsx/tailwind-merge for conditional classes
  - lucide-react for icons

## Core Features
1. **Home Page**: Logo "Stupid" with slogan "Teach it if you can", radar chart visualization, quick concept input, persistent concept list
2. **Teaching Interface**: Dynamic layout (concepts sidebar, chat center, markdown notes right when active)
3. **Session Logic**: Self-contained concept environments with no persistence
4. **Comprehension Evaluation**: AI self-assesses understanding after each exchange
5. **Radar Chart**: Visual representation of knowledge across 7 domains (Biology, Mathematics, Physics, Computer Science, Chemistry, History, Literature)
6. **Humorous Feedback**: AI intelligence level punchlines that change based on overall knowledge

## Visual Design
- **Mood**: Minimalistic, modern, with playful humor
- **Color Palette**: Dark theme with #0a0a0a background, #141414 surfaces, blue/purple accents
- **Style**: Clean, minimalistic design with smooth transitions, gradient text, and subtle borders
- **Key Features**: 
  - Spider web radar chart for knowledge domain visualization
  - Humorous AI intelligence punchlines based on overall knowledge level
  - Persistent concept list sidebar
  - Dynamic layout that adapts based on active concept

## Naming Conventions
- **Components**: PascalCase (e.g., `ChatWindow.tsx`, `ConceptList.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useConceptStore.ts`, `aiService.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Event Handlers**: Prefix with "handle" (e.g., `handleSendMessage`, `handleCreateConcept`)

## Development Guidelines
- **TypeScript**: Strict mode with comprehensive type definitions
- **Component Size**: Keep under 500 lines, split into modules as needed
- **State Management**: Use Context API for global concept/chat state
- **No Persistence**: All data stored in-memory only
- **Accessibility**: WCAG-compliant interactive elements

## Constraints
- No database, no authentication, no API keys
- Fast response cycles (local mock, no network LLM)
- Optimized for desktop display
- Lightweight and stable for live demos

## Learner behavior (mock)
- Appears naïve and curious, not sarcastic
- Builds the learning note from user messages only
- Comprehension level rises with the number of user messages
  (1 → Novice, 2–3 → Intermediate, 4+ → Expert)
