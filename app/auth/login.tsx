// app/auth/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        Alert.alert('Info', 'Admin users please use web dashboard');
        router.replace('/home');
      } else {
        router.replace('/home');
      }

    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Reset password flow');
  };

  const handleGmailLogin = () => {
    Alert.alert('Gmail', 'Continue with Gmail');
  };

  const handlePhoneLogin = () => {
    Alert.alert('Phone', 'Continue with Phone');
  };

  const handleSignUp = () => {
    router.push('/auth/register');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/cat2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Title Bar */}
            <View style={styles.titleBarContainer}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.titleBarText}>Login Page</Text>
              <View style={styles.titleBarPlaceholder} />
            </View>

            <View style={styles.overlay}>
              <View style={styles.card}>
                <Text style={styles.emoji}>🐾</Text>
                <Text style={styles.title}>Meow Pet Pulse</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

                {/* Error Message */}
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                <View style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Your Email"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                      }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Your Password"
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setError('');
                      }}
                      secureTextEntry
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#4A6572" />
                    ) : (
                      <Text style={styles.loginButtonText}>Login</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>OR</Text>
                <View style={styles.separatorLine} />
              </View>

              <View style={styles.outsideSection}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGmailLogin}>
                  <Text style={styles.socialButtonText}>Continue with Gmail</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={handlePhoneLogin}>
                  <Text style={styles.socialButtonText}>Continue with Phone</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  titleBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 29,
    paddingBottom: 8,
    backgroundColor: '#9FDCFF',
    borderBottomWidth: 1,
    borderBottomColor: '#feebc5',
  },
  backButton: {
    padding: 8,
    width: 46,
  },
  backText: {
    fontSize: 28,
    color: '#4A6572',
    fontWeight: '300',
  },
  titleBarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A6572',
    letterSpacing: 0.5,
  },
  titleBarPlaceholder: {
    width: 44,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#9FDCFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7E8D96',
    marginBottom: 24,
    fontWeight: '400',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
    marginBottom: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fbf5ea',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#9FDCFF',
  },
  loginButton: {
    width: 140,
    backgroundColor: '#9FDCFF',
    paddingVertical: 14,
    marginHorizontal: 79,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#feebc5',
    marginBottom: 10,
    shadowColor: '#feebc5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#4A6572',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  forgotText: {
    color: '#d18d05',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  separatorText: {
    marginHorizontal: 15,
    color: '#9FDCFF',
    fontSize: 13,
    fontWeight: '500',
  },
  outsideSection: {
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  socialButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#9FDCFF',
  },
  socialButtonText: {
    color: '#4A6572',
    fontSize: 15,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  signupText: {
    color: '#9FDCFF',
    fontSize: 14,
  },
  signupLink: {
    color: '#feebc5',
    fontSize: 14,
    fontWeight: '700',
  },
});