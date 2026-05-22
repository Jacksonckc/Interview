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

The frontend runs on [http://localhost:3005](http://localhost:3005).
The backend runs on [http://localhost:4001](http://localhost:4001).

## Known Problems

The frontend and backend each have their own bugs. Fixing the frontend does not automatically fix the backend behavior, and fixing the backend does not automatically fix what the frontend displays or sends.

### Frontend

- The cart subtotal ignores quantity. Adding two of the same cookie only counts the unit price once.
- Checkout sends `quantity: 1` for every cart item, even when the visible cart quantity is higher.

### Backend

- Checkout subtotal ignores item quantity when calculating the order total.
- Inventory decrements by `1` per product line instead of by the requested quantity.
