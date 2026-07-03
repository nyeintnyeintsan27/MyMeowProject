// app/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSkip = () => {
    Alert.alert('Skip', 'Continue as guest');
    router.replace('/(tabs)');
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      // Home tab ကို နှိပ်ရင် ဘာမှမဖြစ်ဘူး (ဒီမှာပဲရှိတယ်)
    } else if (tabName === 'Explore') {
      Alert.alert('Explore', 'Explore page coming soon!');
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/cat2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.pawIcon}>🐾</Text>
              <Text style={styles.title}>Meow Pet Pulse</Text>
              <Text style={styles.subtitle}>Health care for pet</Text>

              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLabel}>Login Here !</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipText}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ===== BOTTOM NAVIGATION ===== */}
          <View style={styles.bottomNav}>
            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => handleTabPress('Home')}
            >
              <Text style={[styles.navIcon, activeTab === 'Home' && styles.activeNavIcon]}>🏠</Text>
              <Text style={[styles.navLabel, activeTab === 'Home' && styles.activeNavLabel]}>Home</Text>
              {activeTab === 'Home' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem} 
              onPress={() => handleTabPress('Explore')}
            >
              <Text style={[styles.navIcon, activeTab === 'Explore' && styles.activeNavIcon]}>🔍</Text>
              <Text style={[styles.navLabel, activeTab === 'Explore' && styles.activeNavLabel]}>Explore</Text>
              {activeTab === 'Explore' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 400,
    padding: 35,
    paddingTop: 40,
    paddingBottom: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9FDCFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  pawIcon: {
    fontSize: 52,
    marginBottom: 17,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#242729',
    marginBottom: 30,
    fontWeight: '500',
  },
  loginLabel: {
    fontSize: 15,
    backgroundColor: '#feebc5',
    color: '#060606',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#9FDCFF',
    borderRadius: 10,
    fontFamily: 'Roboto',
  },
  skipText: {
    color: '#d18d05',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // ===== BOTTOM NAVIGATION =====
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#feebc5',
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navIcon: {
    fontSize: 26,
    color: '#666',
  },
  activeNavIcon: {
    color: '#feebc5',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 2,
  },
  activeNavLabel: {
    color: '#feebc5',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 3,
    backgroundColor: '#feebc5',
    borderRadius: 2,
  },
});