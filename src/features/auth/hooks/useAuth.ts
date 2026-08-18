import {
  clearAuthError,
  forgotPassword,
  signIn,
  signOut,
  signUp,
} from '@/src/features/auth/authSlice';
import type {
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from '@/src/features/auth/types';
import { useAppDispatch } from '@/src/hooks/useAppDispatch';
import { useAppSelector } from '@/src/hooks/useAppSelector';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isHydrated, isLoading, error } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isHydrated,
    isAuthenticated: Boolean(token && user),
    isLoading,
    error,
    signIn: (payload: SignInPayload) => dispatch(signIn(payload)).unwrap(),
    signUp: (payload: SignUpPayload) => dispatch(signUp(payload)).unwrap(),
    forgotPassword: (payload: ForgotPasswordPayload) => dispatch(forgotPassword(payload)).unwrap(),
    signOut: () => dispatch(signOut()).unwrap(),
    clearError: () => dispatch(clearAuthError()),
  };
}
