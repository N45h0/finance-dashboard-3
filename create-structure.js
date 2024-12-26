const fs = require('fs');
const path = require('path');

// Función para crear directorios recursivamente
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Creado directorio: ${dirPath}`);
  }
};

// Función para crear un archivo
const createFile = (filePath, content = '') => {
  const dir = path.dirname(filePath);
  createDirectory(dir);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Creado archivo: ${filePath}`);
  }
};

// Estructura del proyecto
const projectStructure = {
  // Archivos en la raíz
  root: [
    '.env',
    '.env.production',
    '.eslintrc.js',
    '.gitignore',
    '.prettierrc',
    'cypress.json',
    'Dockerfile',
    'firebase.json',
    'jest.config.js',
    'nginx.conf',
    'package.json',
    'README.md',
    'docker-compose.yml'
  ],
  
  // Carpeta public
  public: [
    'index.html',
    'manifest.json',
    'robots.txt',
    '.htaccess',
    'cloudflare-verify.html'
  ],
  
  // Carpeta src y sus subcarpetas
  src: {
    root: [
      'App.js',
      'index.js',
      'setupTests.js',
      'serviceWorkerRegistration.js'
    ],
    auth: [
      'AuthContext.jsx',
      'AuthGuard.jsx',
      'AuthProvider.jsx',
      'LoginForm.jsx',
      'ResetPasswordForm.jsx',
      'ForgotPasswordForm.jsx',
      'useAuth.js'
    ],
    'components/common': [
      'LoadingOverlay.jsx',
      'ErrorBoundary.jsx',
      'ConfirmationDialog.jsx'
    ],
    'components/layout': [
      'MainLayout.jsx',
      'TopBar.jsx',
      'NavTabs.jsx'
    ],
    'components/dashboard': [
      'DashboardView.jsx',
      'DashboardGrid.jsx',
      'SummaryCard.jsx',
      'TrendsChart.jsx',
      'MonthlyPayments.jsx',
      'PaymentDistribution.jsx',
      'UpcomingPayments.jsx',
      'QuickActions.jsx'
    ],
    'components/loans': [
      'LoanList.jsx',
      'LoanCard.jsx',
      'LoanDetails.jsx',
      'LoanPaymentForm.jsx',
      'LoanStatus.jsx',
      'LoanFilters.jsx'
    ],
    'components/services': [
      'ServiceList.jsx',
      'ServiceCard.jsx',
      'ServiceDetails.jsx',
      'ServicePaymentForm.jsx',
      'ServiceStatus.jsx',
      'ServiceFilters.jsx'
    ],
    'components/accounts': [
      'AccountList.jsx',
      'AccountCard.jsx',
      'AccountDetails.jsx',
      'AccountTransactions.jsx'
    ],
    config: [
      'constants.js',
      'theme.js'
    ],
    data: [
      'accounts.js',
      'loans.js',
      'services.js'
    ],
    hooks: [
      'useForm.js',
      'useNotifications.js',
      'useResponsive.js',
      'useCache.js',
      'usePayments.js',
      'useHolderData.js'
    ],
    providers: [
      'StoreProvider.js'
    ],
    routes: [
      'AppRoutes.jsx',
      'PrivateRoute.jsx'
    ],
    services: [
      'SyncService.js',
      'CacheService.js',
      'NetworkService.js',
      'ExportService.js'
    ],
    store: [
      'index.js'
    ],
    'tests/unit': [
      'loans.test.js',
      'services.test.js',
      'accounts.test.js',
      'utils.test.js'
    ],
    'tests/integration': [
      'loan-flow.test.js',
      'service-flow.test.js',
      'account-flow.test.js',
      'auth-flow.test.js'
    ],
    utils: [
      'formatters.js',
      'calculations.js',
      'dateUtils.js',
      'validators.js',
      'transformers.js',
      'errorHandler.js'
    ]
  },
  
  // GitHub Workflows
  '.github/workflows': [
    'main.yml',
    'cpanel-deploy.yml'
  ],
  
  // Docs
  docs: [
    'INSTALLATION.md',
    'COMPONENTS.md'
  ],
  
  // Storybook
  '.storybook': [
    'main.js',
    'preview.js'
  ]
};

// Función principal para crear la estructura
const createProjectStructure = () => {
  console.log('🚀 Iniciando creación de estructura del proyecto...\n');

  // Crear archivos de la raíz
  projectStructure.root.forEach(file => {
    createFile(file);
  });

  // Crear archivos de public
  projectStructure.public.forEach(file => {
    createFile(path.join('public', file));
  });

  // Crear estructura de src
  Object.entries(projectStructure.src).forEach(([dir, files]) => {
    if (dir === 'root') {
      files.forEach(file => {
        createFile(path.join('src', file));
      });
    } else {
      files.forEach(file => {
        createFile(path.join('src', dir, file));
      });
    }
  });

  // Crear GitHub Workflows
  projectStructure['.github/workflows'].forEach(file => {
    createFile(path.join('.github/workflows', file));
  });

  // Crear Docs
  projectStructure.docs.forEach(file => {
    createFile(path.join('docs', file));
  });

  // Crear Storybook
  projectStructure['.storybook'].forEach(file => {
    createFile(path.join('.storybook', file));
  });

  console.log('\n✨ Estructura del proyecto creada exitosamente!');
};

// Ejecutar el script
createProjectStructure();
