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
 const USER_DATA_KEY = 'user_data';
 const apiBaseUrl = 'http://localhost:8081/app';

export const isAuthenticated = signal(false);
export const currentUser = signal<User | null>(null);

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
      };
      localStorage.setItem('USER_CONMECT', JSON.stringify(user));
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
  currentUser.set(null);
  isAuthenticated.set(false);
}
