import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/src/components/Button/Button';
import { Header } from '@/src/components/Header/Header';
import { Input } from '@/src/components/Input/Input';
import { COLORS } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { isRequired, isValidEmail, isValidPassword } from '@/src/utils/validation';

type FormErrors = {
  email?: string;
  password?: string;
};

export function SignInForm() {
  const { signIn, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!isRequired(email) || !isValidEmail(email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!isValidPassword(password)) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    clearError();

    if (!validate()) {
      return;
    }

    try {
      await signIn({ email: email.trim(), password });
    } catch (submitError) {
      Alert.alert('Sign in failed', submitError instanceof Error ? submitError.message : 'Please try again');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Header title="Welcome back" subtitle="Sign in to continue to your account." />

          <View style={styles.form}>
            <Input
              label="Email"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="Sign In" loading={isLoading} onPress={handleSubmit} />

            <Link href={ROUTES.forgotPassword} asChild>
              <Pressable>
                <Text style={styles.link}>Forgot Password?</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href={ROUTES.signUp} asChild>
              <Pressable>
                <Text style={styles.link}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: SPACING.lg,
    gap: SPACING.xl,
    justifyContent: 'center',
  },
  form: {
    gap: SPACING.md,
  },
  error: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
  },
  link: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
