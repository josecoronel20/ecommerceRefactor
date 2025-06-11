# Ecommerce Frontend

## 📋 Descripción
Frontend de un ecommerce moderno desarrollado con Next.js, React y Tailwind CSS, implementando las mejores prácticas de desarrollo y una experiencia de usuario optimizada.

## 🛠 Stack Tecnológico
- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado Global**: Zustand
- **Formularios**: React Hook Form + Zod
- **Componentes UI**: Shadcn
- **Fetching**: SWR
- **Autenticación**: JWT

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd ecommerceRefactor/frontend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con las variables necesarias
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: http://localhost:3000

## 📁 Estructura del Proyecto
```
frontend/
├── src/
│   ├── app/          # Rutas y páginas de la aplicación
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Custom hooks
│   └── lib/          # Utilidades y configuraciones
├── public/           # Archivos estáticos
└── styles/          # Estilos globales
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Producción
npm run start
```

## 🎨 UI/UX

### Componentes UI
- Utilizamos Radix UI para componentes accesibles y personalizables
- Implementación de componentes con Tailwind CSS
- Sistema de diseño consistente y responsive

### Características
- Diseño responsive
- Modo oscuro/claro
- Animaciones suaves
- Accesibilidad (WCAG)
- Optimización de rendimiento

## 🔐 Autenticación y Estado

### Gestión de Estado
- Zustand para estado global
- SWR para fetching y caché
- React Hook Form para formularios

### Seguridad
- JWT para autenticación
- Protección de rutas
- Validación de formularios con Zod

## 🧪 Testing
- Configuración de Jest
- Pruebas unitarias
- Pruebas de integración

## 📦 Dependencias Principales

### Producción
- next: ^14.1.0
- react: ^18.2.0
- tailwindcss: ^3.3.0
- zustand: ^5.0.4
- swr: ^2.3.3
- react-hook-form: ^7.56.4
- zod: ^3.25.56

### Desarrollo
- typescript: ^5
- @types/react: ^18
- @types/node: ^20
- tailwindcss: ^3.3.0

## 📝 Notas Adicionales
- Implementación de SEO optimizado
- Optimización de imágenes
- Lazy loading de componentes
- Manejo de errores global
- Interceptores de API
