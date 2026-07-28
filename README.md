# Developer Productivity Suite

A production-grade SaaS platform containing multiple developer productivity tools, built with a modular, scalable architecture.

## Overview

The Developer Productivity Suite (DPS) is designed to provide developers with a collection of powerful code-generation and schema-building tools. Each tool is implemented as an isolated module, enabling independent development, testing, and deployment.

### Planned Modules

| Module | Description |
|--------|-------------|
| **Auth** | Authentication & authorization generator |
| **Bootstrap** | Project scaffolding generator |
| **Admin** | Admin panel generator |
| **Schema** | Database schema builder |
| **API Builder** | REST/GraphQL API generator |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS 4, React Router 7, Axios |
| Backend | Node.js 20+, Express 4, Helmet, Compression, Morgan |
| Database | MongoDB (planned) |
| Auth | JWT (planned) |

## Project Structure

```
developer-productivity-suite/
├── package.json              # Root workspace config
├── client/                   # React frontend (Vite)
│   ├── src/
│   │   ├── assets/           # Static assets (images, icons, fonts)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/       # App-wide generic components
│   │   │   ├── layout/       # Structural components (Header, Sidebar)
│   │   │   └── ui/           # Low-level primitives (Button, Input, Card)
│   │   ├── config/           # App-level client configuration
│   │   ├── constants/        # Static values, enums, API URLs
│   │   ├── context/          # React Context providers
│   │   ├── features/         # Feature-specific modules (co-located logic)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page layout wrappers
│   │   ├── routes/           # Route config and guards
│   │   ├── services/         # Axios API client and endpoint functions
│   │   ├── utils/            # Pure helper functions
│   │   ├── App.jsx           # Root component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles + Tailwind
│   ├── index.html
│   └── vite.config.js
│
└── server/                   # Express.js backend
    └── src/
        ├── config/           # Server configuration
        ├── middlewares/      # Express middlewares
        ├── modules/          # Business modules (feature-isolated)
        │   ├── auth/         # Authentication module
        │   ├── bootstrap/    # Project bootstrap module
        │   ├── admin/        # Admin panel module
        │   ├── schema/       # Schema builder module
        │   └── api-builder/  # API builder module
        ├── storage/          # Runtime file storage
        │   ├── generated/    # Generated output files
        │   └── temp/         # Temporary working files
        ├── templates/        # Static templates (email, code gen)
        ├── utils/            # Server utility functions
        ├── validations/      # Request validation schemas
        ├── app.js            # Express app setup
        └── index.js          # Server entry point
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
npm install
```

> This installs all dependencies for client, server, and root via npm workspaces.

### Environment Setup

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### Development

```bash
npm run dev
```

This starts both the frontend (port 5173) and backend (port 5000) simultaneously.

### Individual Services

```bash
npm run dev -w client    # Frontend only
npm run dev -w server    # Backend only
```

### Build

```bash
npm run build            # Production build of client
```

### Lint

```bash
npm run lint:client      # Lint frontend
npm run lint:server      # Lint backend
```

## API

### Health Check

```
GET /api/health

Response:
{
  "success": true,
  "message": "Developer Productivity Suite API is running."
}
```

## Architecture Principles

- **Modular**: Each tool is a self-contained module in `server/src/modules/`
- **Feature-based**: Client code is organized by feature in `src/features/`
- **Separation of concerns**: `app.js` (config) vs `index.js` (startup)
- **Security-first**: Helmet, CORS, rate limiting configured by default
- **Workspace-based**: npm workspaces for unified dependency management
