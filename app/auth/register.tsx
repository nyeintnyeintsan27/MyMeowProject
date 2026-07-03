// app/register.tsx
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !phoneNo || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Registered successfully!');
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setPhoneNo('');
    setAddress('');
    Alert.alert('Cancelled', 'Registration form has been cleared');
  };

  const handleBackToHome = () => {
    router.replace('/');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/cat2.jpg')}
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
            {/* ===== TITLE BAR ===== */}
            <View style={styles.titleBarContainer}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.titleBarText}>Register Page</Text>
              <View style={styles.titleBarPlaceholder} />
            </View>

            <View style={styles.overlay}>
              <View style={styles.card}>
                {/* Logo and Register Title */}
                <Text style={styles.title}>Register Here</Text>
                {/* ===== FORM SECTION ===== */}
                <View style={styles.formSection}>
                  {/* Full Name - ဘေးချင်းကပ် */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Full Name :</Text>
                      <TextInput
                        style={[styles.input, styles.inputWithLabel]}
                        placeholder="Enter your full name"
                        placeholderTextColor="#999"
                        value={fullName}
                        onChangeText={setFullName}
                      />
                    </View>
                  </View>

                  {/* Email - ဘေးချင်းကပ် */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Email :</Text>
                      <TextInput
                        style={[styles.input, styles.inputWithLabel]}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>
                  </View>

                  {/* Password - ဘေးချင်းကပ် */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Password :</Text>
                      <TextInput
                        style={[styles.input, styles.inputWithLabel]}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  {/* Phone No - ဘေးချင်းကပ် */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Phone No :</Text>
                      <TextInput
                        style={[styles.input, styles.inputWithLabel]}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#999"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* Address - ဘေးချင်းကပ် */}
                  <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Address :</Text>
                      <TextInput
                        style={[styles.input, styles.inputWithLabel, styles.addressInput]}
                        placeholder="Enter your address"
                        placeholderTextColor="#999"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={3}
                      />
                    </View>
                  </View>

                  {/* Buttons Row */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, styles.registerButton]}
                      onPress={handleRegister}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#4A6572" />
                      ) : (
                        <Text style={styles.buttonText}>Register</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={handleCancel}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* ===== FORM SECTION ပြီးဆုံး ===== */}
              </View>

              {/* ===== Back to Home ===== */}
              <TouchableOpacity onPress={handleBackToHome} style={styles.backToHomeContainer}>
                <Text style={styles.backToHomeText}>« Back to Home Page</Text>
              </TouchableOpacity>
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
  // ===== TITLE BAR =====
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
    paddingBottom: 24,
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
  // ===== LOGO & TITLE =====
  emoji: {
    fontSize: 52,
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7E8D96',
    marginBottom: 20,
    fontWeight: '400',
  },
  // ===== FORM SECTION =====
  formSection: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A6572',
    width: 90,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fbf5ea',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#9FDCFF',
  },
  inputWithLabel: {
    flex: 1,
  },
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButton: {
    backgroundColor: '#9FDCFF',
    borderWidth: 1,
    borderColor: '#feebc5',
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  buttonText: {
    color: '#4A6572',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // ===== Back to Home =====
  backToHomeContainer: {
    marginTop: 16,
    padding: 8,
  },
  backToHomeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});