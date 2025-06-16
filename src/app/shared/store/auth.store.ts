// src/app/shared/store/auth.store.ts
import { signal } from '@angular/core';
import { User } from '../models/user.model';
import { UserModels } from '../models/user.models';

const adminUser: User = {
  username: 'admin',
  password: 'admin123', // idéalement pour test seulement, jamais en clair en prod !
  role: 'admin',
};

 const JWT_TOKEN_KEY = 'jwt_token';
 const USER_DATA_KEY = 'USER_CONMECT'; // Correspond à la clé utilisée dans le code
 const apiBaseUrl = 'http://localhost:8081/app';

// Initialisation avec vérification du localStorage
const storedToken = typeof localStorage !== 'undefined' ? localStorage.getItem(JWT_TOKEN_KEY) : null;
const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem(USER_DATA_KEY) : null;
export const isAuthenticated = signal(!!storedToken);
export const currentUser = signal<User | null>(storedUser ? JSON.parse(storedUser) : null);

// Fonction pour vérifier si une session est active
export function checkSession(): void {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const userData = localStorage.getItem(USER_DATA_KEY);
  
  if (token && userData) {
    isAuthenticated.set(true);
    currentUser.set(JSON.parse(userData));
  } else {
    isAuthenticated.set(false);
    currentUser.set(null);
  }
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);

     
      localStorage.setItem(JWT_TOKEN_KEY, data.token); // Save the JWT token
      const user: UserModels = {
        id: "00",
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        role: data.role,
        // Essaie plusieurs propriétés possibles pour l'image
        imageUrl: data.imageUrl || data.image || data.photo || data.avatar || data.matricule ||'',
      };
      console.log('User data stored:', user); // Log pour débogage
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      currentUser.set(data.user);
      isAuthenticated.set(true);
      return true;
    } else {
      isAuthenticated.set(false);
      currentUser.set(null);
      return false;
    }
  } catch (error) {
    console.error('Login failed:', error);
    isAuthenticated.set(false);
    currentUser.set(null);
    return false;
  }
}

export function logout() {
  localStorage.removeItem(JWT_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  currentUser.set(null);
  isAuthenticated.set(false);
}
