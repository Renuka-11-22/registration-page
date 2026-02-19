
export interface User {
  id?: number;
  uid: string;
  uname: string;
  email: string;
  phone: string;
  password?: string; // Hashed password
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SessionData {
  userId: string;
  expires: number;
}
