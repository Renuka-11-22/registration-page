
import { User } from '../types';

// This service simulates interaction with a PostgreSQL database (like Aiven).
// In a real environment, these would be API calls to a Flask backend.
const DB_KEY = 'mock_postgresql_users';

export const getUsers = (): User[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push({ ...user, id: Date.now() });
  localStorage.setItem(DB_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserByUid = (uid: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.uid === uid);
};

export const initializeDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify([]));
  }
};

initializeDB();
