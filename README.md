# Cookie Commerce Interview App

A small Next.js + Node.js ecommerce demo for a technical interview debugging exercise.

## Stack

- Frontend: Next.js app router, React, TypeScript
- Backend: Node.js, Express, TypeScript, Zod
- Package manager: npm workspaces

## Run Locally

```bash
npm install
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000).
The backend runs on [http://localhost:4001](http://localhost:4001).

## Useful Commands

```bash
npm run dev
npm run dev:frontend
npm run dev:backend
npm run test:types
npm run build
```

## Interview Prompt

You can give candidates a prompt like:

> This is a simple cookie ecommerce app. Users can browse products, filter by flavor,
> add items to a cart, and submit checkout. A few small bugs exist across the frontend
> and backend. Please run the app, identify issues, explain your debugging process,
> and implement fixes.

## Suggested Areas To Ask About

- React state updates and derived cart totals
- API payload contracts between frontend and backend
- Backend validation and inventory updates
- How to write focused regression tests for cart and checkout logic
- How the candidate would separate interview-only demo code from production code
