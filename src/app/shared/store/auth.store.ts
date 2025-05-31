// src/app/shared/store/auth.store.ts
import { signal } from '@angular/core';
import { User } from '../models/user.model';

const adminUser: User = {
  username: 'admin',
  password: 'admin123', // idéalement pour test seulement, jamais en clair en prod !
  role: 'admin',
};

export const isAuthenticated = signal(false);
export const currentUser = signal<User | null>(null);

export function login(username: string, password: string): boolean {
  if (username === adminUser.username && password === adminUser.password) {
    currentUser.set(adminUser);
    isAuthenticated.set(true);
    return true;
  }
  isAuthenticated.set(false);
  currentUser.set(null);
  return false;
}

export function logout() {
  currentUser.set(null);
  isAuthenticated.set(false);
}
