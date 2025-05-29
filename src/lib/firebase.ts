import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADkHT0KzmFk8YNgKx_xwManCRt7dWZYjc",
  authDomain: "ecommercerefactor-b044d.firebaseapp.com",
  projectId: "ecommercerefactor-b044d",
  storageBucket: "ecommercerefactor-b044d.firebasestorage.app",
  messagingSenderId: "679240972316",
  appId: "1:679240972316:web:7c0d2e570f92b77f0f07d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 