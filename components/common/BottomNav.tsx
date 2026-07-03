// components/common/BottomNav.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';

type TabType = 'Home' | 'Explore' | 'Hospital' | 'Message' | 'Profile';

interface BottomNavProps {
  activeTab?: TabType;
}

export default function BottomNav({ activeTab = 'Home' }: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', icon: '🏠', route: '/(tabs)' },
    { name: 'Explore', icon: '🔍', route: '/(tabs)/explore' },
    { name: 'Hospital', icon: '🏥', route: '/(tabs)/hospital' },
    { name: 'Message', icon: '💬', route: '/(tabs)/message' },
    { name: 'Profile', icon: '👤', route: '/(tabs)/profile' },
  ];

  const handleTabPress = (tab: typeof tabs[0]) => {
    if (tab.route === pathname) return;
    router.push(tab.route as any);
  };

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={[
            styles.navIcon,
            activeTab === tab.name && styles.activeNavIcon
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.navLabel,
            activeTab === tab.name && styles.activeNavLabel
          ]}>
            {tab.name}
          </Text>
          {activeTab === tab.name && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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