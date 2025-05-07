# Next.js Starter Project with AI-Assisted Development

## Project Purpose
This is a Next.js starter template designed to be forked and used as a foundation for quickly bootstrapping new projects using AI-assisted development tools like Cursor. The template includes essential configurations, modern tooling, and best practices to accelerate development workflows.

## Architecture & Structure
- **App Router Architecture**: Using Next.js 15 app router with i18n support via next-intl
- **Component Organization**: Feature-based organization with shared UI components
- **State Management**: React's built-in hooks and Context API for simplicity
- **File Structure**:
  - `/src/app/[locale]` - Page routes with i18n support
  - `/src/components` - Reusable UI components
  - `/src/lib` - Utility functions and helpers
  - `/src/i18n` - Internationalization configuration
  - `/public` - Static assets

## Tech Stack
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Internationalization**: next-intl
- **Utilities**: 
  - clsx/tailwind-merge for conditional classes
  - class-variance-authority for component variants
  - lucide-react for icons

## Naming Conventions
- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useLocalStorage.ts`, `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Event Handlers**: Prefix with "handle" (e.g., `handleClick`, `handleSubmit`)
- **Context Providers**: Suffix with "Provider" (e.g., `AuthProvider.tsx`)

## Development Guidelines
- **TypeScript**: Use strict mode and proper type definitions
- **Component Size**: Keep components focused on a single responsibility
- **Testing**: Component tests with React Testing Library
- **State Management**: Prefer composition and context over complex state management libraries
- **Accessibility**: Follow WCAG guidelines for accessible components

## Constraints
- Maintain simplicity to ensure the template remains versatile for different project types
- Keep dependencies minimal and up-to-date
- Ensure the starter is compatible with major deployment platforms (Vercel, Netlify, etc.)
- Document any specific configuration needed when forking

## Expansion Strategy
This starter can be expanded with:
- Authentication templates
- Database integration examples
- API route examples
- More complex UI component libraries

## Performance Considerations
- Built-in optimization for images, fonts, and other assets
- Server components where appropriate
- Code-splitting and lazy loading
