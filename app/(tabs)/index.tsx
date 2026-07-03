// app/(tabs)/index.tsx (Home Page)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/common/BottomNav';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const categories = [
    { id: '1', title: 'Feeding', icon: '🍽️', color: 'rgba(255,229,180,0.85)' },
    { id: '2', title: 'Training', icon: '🎯', color: 'rgba(180,229,255,0.85)' },
    { id: '3', title: 'Health', icon: '🏥', color: 'rgba(255,180,180,0.85)' },
    { id: '4', title: 'Grooming', icon: '✂️', color: 'rgba(180,255,180,0.85)' },
  ];

  const catPosts = [
    { id: '1', title: 'About of Cat', image: '🐱' },
    { id: '2', title: 'About of Cat', image: '🐈' },
    { id: '3', title: 'About of Cat', image: '🐱' },
    { id: '4', title: 'About of Cat', image: '🐈' },
    { id: '5', title: 'About of Cat', image: '🐱' },
    { id: '6', title: 'About of Cat', image: '🐈' },
    { id: '7', title: 'About of Cat', image: '🐱' },
    { id: '8', title: 'About of Cat', image: '🐈' },
  ];

  return (
    <ImageBackground
      source={require('@/assets/images/cat2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* ===== HEADER (width 100%) ===== */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View style={styles.headerLeft} />
                <Text style={styles.pageTitle}>Home Page</Text>
                <TouchableOpacity style={styles.notificationButton}>
                  <Ionicons name="notifications-outline" size={26} color="#4A6572" />
                  <View style={styles.notificationBadge} />
                </TouchableOpacity>
              </View>
            </View>

            {/* ===== CATEGORIES (၄ခုတန်း) ===== */}
            <View style={styles.categoriesContainer}>
              {categories.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.categoryItem, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ===== SEARCH BAR ===== */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search ......"
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={24} color="#4A6572" />
              </TouchableOpacity>
            </View>

            {/* ===== CAT POSTS (၈ခု) ===== */}
            <View style={styles.postsGrid}>
              {catPosts.map((item) => (
                <View key={item.id} style={styles.postCard}>
                  <View style={styles.postImage}>
                    <Text style={styles.postEmoji}>{item.image}</Text>
                  </View>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <TouchableOpacity style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>View More</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* ===== BOTTOM NAVIGATION ===== */}
          <BottomNav activeTab="Home" />
        </View>
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
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 20,
  },
  // ===== HEADER (width 100%) =====
  header: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 42,
    paddingBottom: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#9FDCFF',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: '100%',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerLeft: {
    width: 40,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A6572',
    textAlign: 'center',
    flex: 1,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
    borderWidth: 1,
    borderColor: '#fff',
  },
  // ===== CATEGORIES (၄ခုတန်း) =====
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryItem: {
    width: (width - 48) / 4,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4A6572',
    textAlign: 'center',
  },
  // ===== SEARCH BAR =====
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9FDCFF',
    marginBottom: 16,
    paddingHorizontal: 12,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: '#333',
  },
  searchIcon: {
    padding: 8,
  },
  // ===== CAT POSTS (Grid) =====
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  postCard: {
    width: (width - 44) / 2,  // ၂ခုတန်း
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9FDCFF',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(251,245,234,0.8)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  postEmoji: {
    fontSize: 48,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A6572',
    marginBottom: 8,
  },
  viewMoreButton: {
    backgroundColor: '#9FDCFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#feebc5',
  },
  viewMoreText: {
    fontSize: 12,
    color: '#4A6572',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 10,
  },
});