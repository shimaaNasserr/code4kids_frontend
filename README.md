# React + Vite
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Component Architecture
src/
├── components/        # Reusable UI components
│   ├── NavBar/       # Navigation component
│   ├── Footer/       # Footer component
│   └── Common/       # Shared components
├── pages/            # Page components
│   ├── Home/         # Landing page
│   ├── Courses/      # Course catalog
│   ├── Games/        # Interactive games
│   ├── Dashboard/    # Role-based dashboards
│   └── Profile/      # User profiles
├── context/          # React contexts
├── routes/           # Routing configuration
├── apis/             # API integration
└── services/         # Utility services

State Management
React Context API for global state
Local component state for UI interactions
Authentication context for user sessions
Language context for internationalization

Responsive Design
Mobile-first approach
Bootstrap grid system
Custom CSS media queries
Touch-friendly interactions
