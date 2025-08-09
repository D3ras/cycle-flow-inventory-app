# Cycle Inventory Management System (Frontend)

## Overview

A modern, type-safe frontend for managing bicycle inventory. Designed to work with any backend (Supabase-compatible by default).

## Features

- **Inventory Management**: Track cycles with detailed specifications
- **Responsive UI**: Works on all device sizes
- **Type Safety**: Built with TypeScript for robust development
- **Modern Styling**: Utilizes Tailwind CSS and shadcn-ui components

## Tech Stack

- ⚡ [Vite](https://vitejs.dev/) - Next-gen frontend tooling
- 🏗️ [React 18](https://reactjs.org/) - Component-based UI
- 📜 [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🧩 [shadcn-ui](https://ui.shadcn.com/) - Beautifully designed components

## Prerequisites

- Node.js ≥16.x
- npm/yarn/pnpm

## Installation

```bash
# Clone the repository
git clone  https://github.com/D3ras/cycle-flow-inventory-app.git

# Navigate to project directory
cd cycle-flow-inventory-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration


Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

## Project Structure

```
/src
├── /assets          # Static assets
├── /components      # Reusable UI components
├── /hooks           # Custom React hooks
├── /lib             # Utility functions
├── /pages           # Application pages
├── /types           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Available Scripts

- `dev`: Start development server
- `build`: Create production build
- `preview`: Preview production build locally
- `lint`: Run ESLint
- `type-check`: Verify TypeScript types

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License
