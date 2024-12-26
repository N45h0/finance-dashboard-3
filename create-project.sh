# create-project.sh
#!/bin/bash

# Crear toda la estructura de directorios
mkdir -p public src/{auth,components/{common,layout,dashboard,loans,services,accounts},config,data,hooks,providers,routes,services,store,tests/{unit,integration},utils} docs .storybook .github/workflows

# Crear todos los archivos básicos de configuración
echo '# Finance Dashboard
Sistema de gestión financiera personal' > README.md

echo 'REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development' > .env

echo 'node_modules/
build/
.env.local
.DS_Store
*.log' > .gitignore

# Crear package.json con las dependencias necesarias
echo '{
  "name": "finance-dashboard-3",
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
    "serve": "^14.2.1",
    "zustand": "^4.4.7"
  },
  "scripts": {
    "start": "serve -s build",
    "dev": "react-scripts start",
    "build": "CI=false DISABLE_ESLINT_PLUGIN=true react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}' > package.json

# Crear archivos de GitHub Actions para despliegue
mkdir -p .github/workflows
echo 'name: Deploy to DirectAdmin cPanel
on:
  push:
    branches: [ main ]

jobs:
  web-deploy:
    name: Deploy
    runs-on: ubuntu-latest
    
    steps:
    - name: Get latest code
      uses: actions/checkout@v3
    
    - name: Use Node.js 16
      uses: actions/setup-node@v3
      with:
        node-version: "16"
        
    - name: Build Project
      run: |
        npm install
        npm run build
        
    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.DIRECTADMIN_SERVER }}
        username: ${{ secrets.DIRECTADMIN_USERNAME }}
        password: ${{ secrets.DIRECTADMIN_PASSWORD }}
        local-dir: ./build/
        server-dir: domains/pay2.alvy.site/public_html/' > .github/workflows/deploy.yml

# Instalar dependencias
npm install

# Añadir todo al control de versiones
git add .
git commit -m "Initial project setup"
git push origin main
