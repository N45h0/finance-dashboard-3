#!/bin/bash

echo "🚀 Iniciando configuración completa del proyecto..."

# 1. Inicializar proyecto npm y crear package.json
echo "📦 Inicializando proyecto npm..."
npm init -y

# 2. Instalar dependencias
echo "📚 Instalando dependencias..."
npm install --save \
  react \
  react-dom \
  @mui/material \
  @mui/icons-material \
  @emotion/react \
  @emotion/styled \
  lucide-react \
  recharts \
  react-toastify \
  react-scripts \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest \
  web-vitals

# 3. Instalar dependencias de desarrollo
echo "🛠️ Instalando dependencias de desarrollo..."
npm install --save-dev \
  @babel/core \
  @babel/preset-react \
  @babel/preset-env \
  eslint \
  prettier \
  eslint-config-prettier \
  eslint-plugin-react \
  eslint-plugin-react-hooks

# 4. Configurar scripts en package.json
echo "⚙️ Configurando package.json..."
cat > package.json << EOF
{
  "name": "finance-dashboard",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.13.0",
    "@mui/icons-material": "^5.13.0",
    "lucide-react": "^0.302.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.3",
    "react-toastify": "^9.1.3",
    "react-scripts": "5.0.1",
    "web-vitals": "^3.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx}",
    "format": "prettier --write src/**/*.{js,jsx,css,md}"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# 5. Configurar ESLint
echo "🔍 Configurando ESLint..."
cat > .eslintrc.js << EOF
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
EOF

# 6. Configurar Prettier
echo "💅 Configurando Prettier..."
cat > .prettierrc << EOF
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
EOF

# 7. Configurar variables de entorno
echo "🔐 Configurando variables de entorno..."
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENV=development
EOF

cat > .env.production << EOF
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production
EOF

# 8. Configurar theme.js
echo "🎨 Configurando tema..."
cat > src/config/theme.js << EOF
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
EOF

# 9. Configurar componentes principales
echo "🏗️ Configurando componentes principales..."

# MainLayout.jsx
cat > src/components/layout/MainLayout.jsx << EOF
import React from 'react';
import { Box, Container } from '@mui/material';
import TopBar from './TopBar';
import NavTabs from './NavTabs';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <NavTabs />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
EOF

# TopBar.jsx
cat > src/components/layout/TopBar.jsx << EOF
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, Settings } from 'lucide-react';

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finance Dashboard
        </Typography>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
EOF

# NavTabs.jsx
cat > src/components/layout/NavTabs.jsx << EOF
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Home, CreditCard, FileText, Bank } from 'lucide-react';

const NavTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<Home size={20} />} label="Dashboard" />
        <Tab icon={<CreditCard size={20} />} label="Préstamos" />
        <Tab icon={<FileText size={20} />} label="Servicios" />
        <Tab icon={<Bank size={20} />} label="Cuentas" />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
EOF

# LoadingOverlay.jsx
cat > src/components/common/LoadingOverlay.jsx << EOF
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
EOF

# ErrorBoundary.jsx
cat > src/components/common/ErrorBoundary.jsx << EOF
import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            <AlertTitle>Algo salió mal</AlertTitle>
            Ha ocurrido un error en la aplicación.
            <Button
              color="inherit"
              size="small"
              onClick={() => window.location.reload()}
              sx={{ mt: 1 }}
            >
              Recargar página
            </Button>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
EOF

# 10. Configurar App.js principal
echo "🎯 Configurando App.js..."
cat > src/App.js << EOF
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './config/theme';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <MainLayout>
          <h1>Dashboard Content</h1>
        </MainLayout>
      </ErrorBoundary>
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
EOF

# 11. Configurar index.js
echo "📍 Configurando index.js..."
cat > src/index.js << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
EOF

# 12. Configurar .gitignore
echo "🙈 Configurando .gitignore..."
cat > .gitignore << EOF
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea
.vscode
EOF

# 13. Instalar dependencias
echo "📦 Instalando todas las dependencias..."
npm install

# 14. Inicializar git si no está inicializado
if [ ! -d .git ]; then
  echo "🔰 Inicializando repositorio git..."
  git init
  git add .
  git commit -m "Initial commit: Project setup"
fi

echo "✨ ¡Configuración completa! El proyecto está listo para desarrollo."
echo "Para iniciar el servidor de desarrollo, ejecuta: npm start"
