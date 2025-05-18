## 💻 Tecnologías Utilizadas

- **Next.js 14**: Framework de React para renderizado del lado del servidor
- **TypeScript**: Tipado estático para mejor mantenibilidad y detección de errores
- **Zustand**: Gestión de estado global ligero y eficiente
- **Tailwind CSS**: Framework de CSS para diseño moderno y responsive
- **localStorage**: Persistencia de datos en el navegador

## 🏗️ Arquitectura

### Gestión de Estado
La aplicación utiliza Zustand para manejar tres stores diferentes:

1. **UserStore**: 
   - Manejo de autenticación
   - Persistencia de datos del usuario
   - Historial de compras
   - Sincronización con localStorage

2. **CartStore**:
   - Gestión del carrito de compras
   - Cálculo de totales
   - Persistencia de items seleccionados

3. **ProductStore**:
    - Manejo del fetching
    - Seteo de loading y error

### Persistencia de Datos y Manejo de Estado
Se implementó un sistema de persistencia basado en localStorage con inicialización directa del estado:

```typescript
const useUserStore = create<UserStore>((set) => {
    // Inicialización directa desde localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return {
        // Estado inicial con datos de localStorage
        user: user,
        users: users,
        token: token,
        // ... resto del estado
    };
});
```

### Funciones Principales del UserStore

1. **setToken(token: string)**:
   - Guarda el token en localStorage
   - Actualiza el estado global

2. **setUser(userForLogin: User)**:
   - Actualiza el usuario en la lista de usuarios
   - Actualiza el estado del usuario actual
   - Sincroniza con localStorage

3. **setUsers(users: User[])**:
   - Actualiza la lista completa de usuarios
   - Persiste en localStorage

4. **updateUser(currentUser: User)**:
   - Actualiza datos específicos de un usuario
   - Actualiza tanto el estado como localStorage
   - Mantiene la sincronización de datos

5. **logout()**:
   - Limpia el token
   - Resetea el estado del usuario

## 🔄 Flujo de Datos y Persistencia

1. **Inicialización**:
```typescript
// En la creación del store
const users = JSON.parse(localStorage.getItem("users") || "[]");
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");
```

2. **Actualización de Usuario**:
```typescript
// En updateUser
const updatedUsers = users.map(oldUser => 
    oldUser.user === currentUser.user ? currentUser : oldUser
);
localStorage.setItem("users", JSON.stringify(updatedUsers));
set({ user: currentUser, users: updatedUsers, error: null });
```

3. **Manejo de Compras**:
```typescript
// Actualización después de una compra
const updatedUser = {
    ...user,
    compras: [...user.compras, nuevaCompra]
};
updateUser(updatedUser);
```

## 🎯 Características Principales

- Autenticación de usuarios
- Carrito de compras 
- Historial de compras por usuario
- Interfaz responsive
- Manejo de errores 

## 🔧 Desafíos Técnicos y Soluciones

### 1. Persistencia y Estado Inicial
**Problema**: Valores iniciales nulos causaban problemas en la visualización del perfil.
**Solución**: Inicialización directa desde localStorage en la creación del store.

### 2. Sincronización de Datos
**Problema**: Inconsistencia entre estado global y localStorage.
**Solución**: Actualización simultánea en todas las operaciones de modificación de usuario.

### 3. Carrito de Compras
**Desafío**: Mantener el carrito actualizado con el estado del usuario.
**Solución**: Sistema de actualización inmediata usando updateUser.

## 📝 Estructura del Proyecto

```
src/
├── app/                  # Páginas de Next.js
├── components/          # Componentes reutilizables
├── store/              # Stores de Zustand
│   ├── useUserStore.ts
│   ├── useCartStore.ts
│   └── useProductStore.ts
├── types/              # Definiciones de tipos
└── hooks/              # Hooks personalizados
```

## 🚦 Estado Actual

- ✅ Autenticación funcional
- ✅ Persistencia de datos implementada
- ✅ Carrito de compras operativo
- ✅ Historial de compras funcionando
- 🔄 Mejoras continuas en UX/UI

## 🔜 Próximas Mejoras

1. Implementar validaciones más robustas
2. Agregar tests unitarios
3. Mejorar el manejo de errores
4. refactorizacion de codigo