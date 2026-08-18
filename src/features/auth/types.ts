export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;
};
