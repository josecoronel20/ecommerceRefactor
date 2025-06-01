export interface Purchase {
  id: string;
  date: string;
  products: ApiProduct[];
  total: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ApiProduct {
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

export interface User {
  id: number;
  user: string;
  nickname?: string;
  email: string;
  image?: string;
  password: string;
  purchases?: Purchase[];
}

export interface Users {
  users: User[];
}

export interface UserRegister {
  user: string;
  email: string;
  password: string;
}

export interface UserLogin {
  user: string;
  password: string;
}

export interface LoginUserResponse {
  user: User;
  token: string;
}

// Cart
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (_item: CartItem) => void;
  removeItem: (_id: number) => void;
  clearCart: () => void;
}

export interface CartActions {
  addItem: (_item: CartItem) => void;
  removeItem: (_id: number) => void;
  clearCart: () => void;
  updateItemQuantity: (_id: number, _quantity: number) => void;
}
