
import { User } from '../types';
import * as db from './dbService';

// Mimics the behavior of Flask sessions and Werkzeug hashing.
const SESSION_KEY = 'auth_session_id';

// Simple SHA-256 Hashing simulation (since we're in a frontend environment)
// In a real Flask app, you'd use `generate_password_hash` and `check_password_hash`.
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const register = async (userData: User): Promise<{ success: boolean; message: string }> => {
  if (db.findUserByEmail(userData.email)) {
    return { success: false, message: 'Email already exists' };
  }
  if (db.findUserByUid(userData.uid)) {
    return { success: false, message: 'User ID already exists' };
  }

  const hashedPassword = await hashPassword(userData.password!);
  db.saveUser({ ...userData, password: hashedPassword });
  
  return { success: true, message: 'Registration successful' };
};

export const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
  const user = db.findUserByEmail(email);
  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  const hashedPassword = await hashPassword(password);
  if (user.password !== hashedPassword) {
    return { success: false, message: 'Invalid credentials' };
  }

  // Set session
  localStorage.setItem(SESSION_KEY, user.uid);
  const { password: _, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword };
};

export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = async (): Promise<User | null> => {
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) return null;

  const user = db.findUserByUid(uid);
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
