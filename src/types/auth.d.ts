
// Defines the shape of auth state which is used to type ReduxSlice i.e AuthSlice.ts
export interface AuthState {
  isAuthenticated: boolean;
  name: string | null;
  email: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  phone?: string | null; // optional
}

// Same for payload
export interface AuthPayload {
  message: string;
  name: string;
  email: string;
  token: string;
}
