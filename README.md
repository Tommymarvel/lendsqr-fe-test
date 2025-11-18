# Lendsqr Frontend Engineering Assessment

A fully responsive admin dashboard application built with React, TypeScript, and Vite. This project demonstrates modern web development practices with a focus on user experience, accessibility, and code quality.

**Developer:** Marvellous Ibironke

## 🚀 Live Demo

[View Live Demo](https://marvellous-ibironke-lendsqr-fe-test.vercel.app/) <!-- Add your deployment URL here -->

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Design Decisions](#design-decisions)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)
- [Deployment](#deployment)

## ✨ Features

### Authentication

- Login page with form validation using Formik and Yup
- Email and password validation
- Password visibility toggle
- Responsive design with custom Avenir Next LT Pro font

### Dashboard

- Fully responsive layout (mobile, tablet, desktop)
- Hamburger menu for mobile navigation
- Sidebar with 22+ navigation items with custom SVG icons
- Top bar with search, notifications, and user profile

### Users Management

- **Summary Cards**: Display key metrics (users, active users, loans, savings)
  - Responsive grid layout
  - Horizontal carousel on mobile (≤600px)
- **Advanced Filtering**: Filter users by organization, username, email, date, phone, and status
- **Search Functionality**: Real-time search across user data
- **Data Table**:
  - Sortable columns
  - Row actions (view, blacklist, activate)
  - Responsive horizontal scroll on mobile
- **Pagination**: Navigate through user data with customizable items per page

### User Details

- Comprehensive user information display
- Tabbed interface (General Details, Documents, Bank Details, Loans, Savings, App and System)
- Action buttons (Blacklist/Activate User)
- Responsive layout that adapts to all screen sizes
- LocalStorage caching for improved performance

### Placeholder Pages

- Placeholder pages for all unimplemented routes
- Consistent UI/UX across the application
- Easy navigation back to Users page

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS Modules
- **Form Handling**: Formik + Yup
- **Icons**: Lucide React + Custom SVG Icons
- **Data Generation**: Faker.js
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage for data persistence

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Tommymarvel/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
lendsqr-fe-test/
├── public/
│   ├── font/
│   │   └── Avenir_Next/          # Custom font family (24 font files)
│   ├── icons/                     # SVG icons for navigation (22 files)
│   ├── lendsqr-favicon.svg        # Favicon
│   └── users.json                 # Mock user data
├── src/
│   ├── layouts/
│   │   ├── DashboardLayouts.tsx   # Main dashboard layout
│   │   └── DashboardLayout.scss   # Layout styles
│   ├── pages/
│   │   ├── Login/                 # Login page
│   │   ├── PlaceholderPage/       # Placeholder for unimplemented routes
│   │   ├── UserDetailsPage/       # User details page
│   │   └── UsersPage/             # Users listing page
│   ├── routes/
│   │   └── AppRoutes.tsx          # Application routing
│   ├── styles/
│   │   └── main.scss              # Global styles and variables
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Application entry point
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # Project documentation
```

## 🎯 Key Features

### Responsive Design

- **Mobile (≤600px)**:
  - Hamburger menu navigation
  - Carousel view for summary cards
  - Stacked layouts for optimal mobile viewing
- **Tablet (601px - 1024px)**:

  - Condensed sidebar
  - Two-column grid layouts
  - Optimized spacing and typography

- **Desktop (>1024px)**:
  - Full sidebar with icons and labels
  - Multi-column grid layouts
  - Enhanced spacing and visual hierarchy

### Data Management

- Mock data generated using Faker.js
- 500 users pre-generated and stored in `public/users.json`
- LocalStorage for caching user details
- Client-side filtering, searching, and pagination

### User Experience

- Smooth transitions and animations
- Loading states and error handling
- Accessible form inputs with proper labels
- Keyboard navigation support
- Touch-friendly mobile interface

## 🎨 Design Decisions

### Typography

- **Global**: Work Sans (Google Fonts) for clean, modern readability
- **Login Page**: Avenir Next LT Pro (10 weights: Regular, Medium, Demi, Bold, Heavy + italics)

### Color Scheme

- Primary: `#213F7D` (Lendsqr Blue)
- Consistent with Lendsqr brand guidelines
- Accessible color contrast ratios

### Component Architecture

- Modular, reusable components
- SCSS Modules for scoped styling
- Separation of concerns (layout, pages, styles)

### State Management

- React Hooks for local state
- LocalStorage for persistence
- No external state management library (keeping it simple)

## ⚡ Performance Optimizations

- **Code Splitting**: React Router lazy loading
- **Asset Optimization**: Optimized SVG icons
- **Caching**: LocalStorage for frequently accessed data
- **Build Optimization**: Vite's fast HMR and optimized production builds
- **Font Loading**: `font-display: swap` for better perceived performance

## 🧪 Testing

The project is ready for testing implementation. Recommended testing stack:

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Safety**: TypeScript for compile-time checking

## 🚀 Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from the 'dist' folder
```

## 📝 Environment Variables

No environment variables required for this project. All configurations are handled through the application code.

## 🤝 Contributing

This is an assessment project, but feedback and suggestions are welcome!

## 📄 License

This project is part of the Lendsqr Frontend Engineering Assessment.

## 👤 Author

**Marvellous Ibironke**

- GitHub: [@Tommymarvel](https://github.com/Tommymarvel)

## 🙏 Acknowledgments

- Lendsqr for the opportunity and design specifications
- Faker.js for mock data generation
- Lucide React for icon library
- The React and Vite communities

---

**Note**: This project was built as part of the Lendsqr Frontend Engineering Assessment to demonstrate proficiency in modern web development practices, responsive design, and user interface implementation.
