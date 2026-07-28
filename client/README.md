# Client - React Frontend

React 19 + Vite application served on port 5173.

## Setup

```bash
npm install
npm run dev
```

## Folder Structure

```
src/
├── assets/          # Static assets (images, icons, fonts)
├── components/      # Reusable UI components
│   ├── common/      # Generic, app-wide components (Button, Modal, Spinner)
│   ├── layout/      # Structural components (Header, Sidebar, Footer)
│   └── ui/          # Low-level UI primitives (Input, Card, Badge)
├── pages/           # Top-level route components (one per URL)
├── layouts/         # Page layout wrappers (DashboardLayout, AuthLayout)
├── hooks/           # Custom React hooks (useAuth, useApi)
├── services/        # Axios API client and endpoint functions
├── utils/           # Pure helper functions (formatDate, validators)
├── routes/          # Route configuration and guards
├── context/         # React Context providers (AuthContext, ThemeContext)
├── constants/       # Static values (API URLs, role names, config)
├── App.jsx          # Root component with route definitions
├── main.jsx         # Entry point (ReactDOM render)
└── index.css        # Global styles and Tailwind directives
```

## Path Alias

`@/` maps to `src/` — use `import X from "@/components/ui/Button"`.

## API Proxy

The Vite dev server proxies `/api` requests to `http://localhost:5000`.
