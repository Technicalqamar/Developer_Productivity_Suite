# Server - Express.js Backend

Express.js API server running on port 5000.

## Setup

```bash
npm install
npm run dev
```

## Folder Structure

```
src/
├── config/          # App configuration (db connection, environment variables)
├── controllers/     # Request handlers (business logic orchestration)
├── routes/          # API route definitions and parameter mapping
├── models/          # Database schemas and models (Mongoose)
├── middlewares/     # Express middlewares (auth, error handling, validation)
├── services/        # Business logic layer (reusable, testable units)
├── utils/           # Helper functions (email, file, crypto, logger)
├── templates/       # Static templates (email HTML, code generators)
├── validations/     # Request validation schemas (Joi/Zod)
├── app.js           # Express app setup (middleware, routes, error handling)
└── index.js         # Entry point (loads env, starts server)
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |

All other endpoints are under `/api/`.
