import { Purchase } from "./cart";

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