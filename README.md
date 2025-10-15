# Prembly Assessment Projects

This repository contains three independent React applications demonstrating different features and implementations.

## Projects

### 1. Shopping Cart (TypeScript)
**Location:** `shopping-cart-ts/`

A fully functional e-commerce shopping cart built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

**Features:**
- Product listing with images
- Add to cart functionality
- Cart management (increment, decrement, remove items)
- Order summary with totals
- Mobile responsive design
- Redux state management

**Run:**
```bash
npm run dev:cart:ts
```

### 2. Shopping Cart (JavaScript)
**Location:** `shopping-cart-js/`

Same shopping cart application implemented in JavaScript for comparison.

**Run:**
```bash
npm run dev:cart:js
```

### 3. API Demos (TypeScript)
**Location:** `api-demos-ts/`

A collection of pages demonstrating API integration with different public APIs.

**Features:**
- **Quotes Page:** Paginated inspirational quotes
- **COVID-19 Page:** US COVID statistics with pagination (20 items per page)
- **Users Page:** Random user generator with detailed cards
- Shared Loader and Error components
- Mobile responsive design
- Modern UI with gradients and animations

**Run:**
```bash
npm run dev:api:ts
```

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev:cart:ts` - Run Shopping Cart (TypeScript)
- `npm run dev:cart:js` - Run Shopping Cart (JavaScript)
- `npm run dev:api:ts` - Run API Demos (TypeScript)
- `npm run build` - Build all projects
- `npm run lint` - Run ESLint

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Redux Toolkit** (for shopping carts)
- **React Router**
- **Tailwind CSS**
- **React Icons**
