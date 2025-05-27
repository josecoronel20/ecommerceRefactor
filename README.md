# Violet Shop 🛍️

E-commerce moderno construido con Next.js 14 y TypeScript.

## Características Principales ✨

- 🔐 Autenticación JWT
- 🛒 Carrito de compras persistente
- 👤 Perfil de usuario personalizable
- 📱 Diseño responsive
- 🎨 UI moderna con Tailwind CSS
- 🔄 Estado global con Zustand

## Tecnologías 🛠️

### Frontend
- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **Formularios**: React Hook Form
- **UI Components**: Shadcn
- **Iconos**: Lucide React
- **Autenticación**: JWT

### Backend
- **API**: Next.js API Routes
- **Base de Datos**: JSON (db.json)
- **File System**: fs/promises

### Dependencias Principales
```json
{
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.9",
    "@radix-ui/react-dialog": "^1.1.13",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-slider": "^1.3.4",
    "@radix-ui/react-slot": "^1.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.510.0",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.56.4",
    "tailwind-merge": "^3.3.0",
    "tailwindcss-animate": "^1.0.7",
    "zustand": "^5.0.4"
  }
}
```

## Instalación 🚀

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/violet-shop.git

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

## Estructura del Proyecto 📁

```
src/
├── app/          # Rutas y páginas
├── components/   # Componentes UI
├── store/        # Estado global
├── types/        # Tipos TypeScript
└── db.json       # Base de datos
```

## API Endpoints 🌐

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Detalles de producto

## Estado Global 📊

```typescript
interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}
```

## Seguridad 🔒

- Autenticación JWT
- Validación de formularios
- Protección de rutas
- Sanitización de datos

## Contribuir 🤝

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto 📧

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)

Link del Proyecto: [https://github.com/tu-usuario/violet-shop](https://github.com/tu-usuario/violet-shop)
