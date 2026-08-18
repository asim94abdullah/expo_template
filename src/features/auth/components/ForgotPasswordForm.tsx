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
import { isRequired, isValidEmail } from '@/src/utils/validation';

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();

  async function handleSubmit() {
    clearError();

    if (!isRequired(email) || !isValidEmail(email)) {
      setEmailError('Enter a valid email address');
      return;
    }

    setEmailError(undefined);

    try {
      await forgotPassword({ email: email.trim() });
      Alert.alert('Check your email', 'If an account exists, a reset link has been sent.');
    } catch (submitError) {
      Alert.alert(
        'Request failed',
        submitError instanceof Error ? submitError.message : 'Please try again',
      );
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
          <Header
            title="Forgot password"
            subtitle="Enter your email and we'll send a reset link."
          />

          <View style={styles.form}>
            <Input
              label="Email"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="Send reset link" loading={isLoading} onPress={handleSubmit} />
          </View>

          <Link href={ROUTES.signIn} asChild>
            <Pressable>
              <Text style={styles.link}>Back to Sign In</Text>
            </Pressable>
          </Link>
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
});
