export interface Compra {
    id: string;
    fecha: string;
    productos: Producto[];
    total: number;
}

export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface ProductoApi {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    popular?: boolean;
    discount: number;
    quantity?: number;
  }
  

export interface Usuario {
    user: string;
    email: string;
    image?: string;
    password: string;
    compras?: Compra[];
}

export interface Usuarios {
    users: Usuario[];
}

