# Next.js Starter for AI-Assisted Development

A modern Next.js 15 starter template optimized for AI-assisted development with Cursor. This project includes internationalization, TailwindCSS 4, TypeScript, and a structured architecture to help you jumpstart new projects.

## Features

- ⚡ **Next.js 15** with App Router
- 🔤 **TypeScript** for type safety
- 🎨 **TailwindCSS 4** for styling
- 🌐 **Internationalization** with next-intl
- 📱 **Responsive Design** built-in
- 🧩 **Component Structure** for organized development
- 🤖 **AI-Ready** with documentation optimized for AI tools

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm (recommended) or npm/yarn

### Installation

1. Fork this repository to create your own project
2. Clone your forked repository:

```bash
git clone https://github.com/yourusername/your-project-name.git
cd your-project-name
```

3. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see your application

## Project Structure

```
/src
  /app
    /[locale]      # Route groups with i18n support
      /layout.tsx  # Root layout with providers
      /page.tsx    # Home page
  /components      # Reusable UI components
  /lib             # Utility functions and helpers
  /i18n            # Internationalization configuration
/public            # Static assets
```

## Customization

### Changing the Application Name

1. Update the name in `package.json`
2. Update title and metadata in `src/app/[locale]/layout.tsx`

### Adding New Pages

Create new pages under the `src/app/[locale]` directory:

```typescript
// src/app/[locale]/about/page.tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4">About page content goes here.</p>
    </main>
  );
}
```

## AI Assistance

This template is optimized for AI-assisted development with tools like Cursor:

1. Use the `PLANNING.md` file to understand project architecture
2. Check `TASKS.md` for current tasks and backlog
3. Follow the structure and conventions to maintain consistency

## Deployment

Deploy your Next.js app on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fyour-project-name)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
