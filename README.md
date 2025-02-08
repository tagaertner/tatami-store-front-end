# Tatami an E-commerce Capstone Project: Front-end 

A streamlined e-commerce platform built with React and Material-UI, focusing on clean code and user experience. This project demonstrates modern web development practices while maintaining simplicity and efficiency in design and functionality.

## Project Philosophy

We believe in building things right rather than building them big. Our focus is on:

- Clean, maintainable code
- Smooth user experience
- Modern cloud technology integration
- Practical feature implementation

## Tech Stack

- **Frontend Programming Language:** TypeScript
- **Frontend Framework:** React
- **UI Library:** Tailwind, Shadcn/ui
- **Authentication:** AWS Cognito
- **Payment Processing:** Stripe
- **State Management:** Redux, React Router
- **Testing:** Jest, React Testing Library

## Project Structure

```
src/
├── actions/          # Redux actions
├── assets/          # Static files (images, etc.)
├── components/      # Shared components
├── data/           # Data models and constants
├── features/        # Feature modules
│   ├── cart/       # Cart functionality
│   ├── order/      # Order management
│   ├── theme/      # Theme settings
│   └── user/       # User features
├── lib/            # Library code
│   ├── hooks/      # Custom hooks
│   └── utils/      # Utility functions
├── loader/         # Route loaders
├── pages/          # Page components
├── utils/          # General utilities
├── app.tsx         # Main app component
├── index.css       # Global styles
├── main.tsx        # Entry point
├── Orders.tsx      # Orders component
└── store.ts        # Redux store config
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

### State Management & Routing

We use Redux Toolkit and React Routers with TypeScript

Our app manages user data, shopping carts, orders, and navigation with features like:

- Persistent shopping cart that saves your items
- Protected user account pages
- Secure checkout process
- Easy navigation between products and pages

## Key Components

- **Products**: Browse and search catalog
- **Cart**: Manage shopping items
- **Checkout**: Handle payments and shipping
- **User Dashboard**: Account management
- **Orders**: Track order history

### Environment Variables and Configuration

For security reasons, we don't share sensitive configuration details in this README. To set up the project, you'll need:

1. **AWS Cognito Configuration**
2. **Stripe Integration**
3. **API Configuration**
  
Note: Add all sensitive configuration values to your `.env` file and ensure it's listed in `.gitignore`.

## Deployment

Deployed under Heroku

## Working with the Backend

This frontend connects to our Python Back-end.

Key integration points:

- Authentication flows with AWS Cognito
- API endpoints for product management
- Cart synchronization
- Order processing with Stripe
- S3 Buckets

## Link to backend

https://github.com/Nerpassevera/tatami-store-back-end.git

## Final project link
https://tatami-store-fe-4a4f67c5b2c2.herokuapp.com/ 

## Team

Tami Gaertner & Tatiana Trofimova

## License

This project is licensed under the MIT License
