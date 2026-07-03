import BottomNav from '@/components/common/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ===== FIXED CARD SIZE =====
const CARD_WIDTH = (width - 44) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.2; // 20% taller than width

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = [
    { id: '1', title: 'Feeding', icon: '🍽️', color: 'rgba(255,229,180,0.85)' },
    { id: '2', title: 'Training', icon: '🎯', color: 'rgba(180,229,255,0.85)' },
    { id: '3', title: 'Health', icon: '🏥', color: 'rgba(255,180,180,0.85)' },
    { id: '4', title: 'Grooming', icon: '✂️', color: 'rgba(180,255,180,0.85)' },
  ];

  const allPosts = [
    { id: '1', title: 'Abyssinian', image: require('@/assets/images/abyssinian.jpg'), type: 'Cat' },
    { id: '2', title: 'Bengal', image: require('@/assets/images/bengal.jpg'), type: 'Cat' },
    { id: '3', title: 'American Shorthair', image: require('@/assets/images/american-shorthair.jpg'), type: 'Cat' },
    { id: '4', title: 'Birman', image: require('@/assets/images/birman.jpg'), type: 'Cat' },
    { id: '5', title: 'Bombay', image: require('@/assets/images/bombay.jpg'), type: 'Cat' },
    { id: '6', title: 'British Shorthair', image: require('@/assets/images/british_shortair.jpg'), type: 'Cat' },
    { id: '7', title: 'Burmese', image: require('@/assets/images/burmese.jpg'), type: 'Cat' },
    { id: '8', title: 'Chartreux', image: require('@/assets/images/chartreux.jpg'), type: 'Cat' },
    { id: '9', title: 'Cornish', image: require('@/assets/images/cornish.jpg'), type: 'Cat' },
    { id: '10', title: 'Egyptian', image: require('@/assets/images/egyptian.jpg'), type: 'Cat' },
    { id: '11', title: 'Devon Rex', image: require('@/assets/images/devonRex.jpg'), type: 'Cat' },
    { id: '12', title: 'Bobtail', image: require('@/assets/images/bobtail.jpg'), type: 'Cat' },
    { id: '13', title: 'Himalayan', image: require('@/assets/images/himalayan.jpg'), type: 'Cat' },
    { id: '14', title: 'Korat', image: require('@/assets/images/korat.jpg'), type: 'Cat' },

    
    { id: '15', title: 'Afghan Hound', image: require('@/assets/images/afghan_hound.jpg'), type: 'Dog' },
    { id: '16', title: 'Akita', image: require('@/assets/images/akita.jpg'), type: 'Dog' },
    { id: '17', title: 'Alaskan Malamute', image: require('@/assets/images/alaskan_malamute.jpg'), type: 'Dog' },
    { id: '18', title: 'Eskimo Dog', image: require('@/assets/images/eskimo.jpg'), type: 'Dog' },
    { id: '19', title: 'American Bulldog', image: require('@/assets/images/bulldog.jpg'), type: 'Dog' },
    { id: '20', title: 'Australian Cattle Dog', image: require('@/assets/images/australian_cattle.jpg'), type: 'Dog' },
    { id: '21', title: 'American Staffordshire Terrier', image: require('@/assets/images/amstaff.jpg'), type: 'Dog' },
    { id: '22', title: 'Australian Shepherd', image: require('@/assets/images/australian_shepherd.jpg'), type: 'Dog' },
    { id: '23', title: 'Basenji', image: require('@/assets/images/basenji.jpg'), type: 'Dog' },
    { id: '24', title: 'Beagle', image: require('@/assets/images/beagle.jpg'), type: 'Dog' },
    { id: '25', title: 'Basset Hound', image: require('@/assets/images/basset_hound.jpg'), type: 'Dog' },
    { id: '26', title: 'Bernese Mountain Dog', image: require('@/assets/images/bernese.jpg'), type: 'Dog' },
    { id: '27', title: 'Belgian Malinois', image: require('@/assets/images/belgian.jpg'), type: 'Dog' },
    { id: '28', title: 'Border Collie', image: require('@/assets/images/collie.jpg'), type: 'Dog' },
    { id: '29', title: 'Bichon Frise', image: require('@/assets/images/bichon.jpg'), type: 'Dog' },
    { id: '30', title: 'Boston Terrier', image: require('@/assets/images/boston.jpg'), type: 'Dog' },
  ];

  const filterOptions = ['All', 'Cat', 'Dog'];
  
  const filteredPosts = selectedFilter === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.type === selectedFilter);

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
            {/* ===== HEADER ===== */}
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

            {/* ===== CATEGORIES ===== */}
            <View style={styles.categoriesContainer}>
              {categories.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.categoryItem, { backgroundColor: item.color }]}>
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ===== SEARCH BAR + FILTER ICON ===== */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search ......"
                placeholderTextColor="#999"
                value={search}
                onChangeText={setSearch}
              />
              <TouchableOpacity 
                style={styles.filterIcon}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="options-outline" size={24} color="#4A6572" />
              </TouchableOpacity>
            </View>

            {/* ===== FILTER LABEL ===== */}
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabelText}>
                Filter: <Text style={styles.filterLabelValue}>{selectedFilter}</Text>
              </Text>
            </View>

            <Text style={styles.CategoryListText}>Animal Category List</Text>

            {/* ===== CAT POSTS (Fixed Size) ===== */}
            <View style={styles.postsGrid}>
              {filteredPosts.map((item) => (
                <View key={item.id} style={[styles.postCard, { width: CARD_WIDTH }]}>
                  <View style={[styles.imageWrapper, { width: CARD_WIDTH - 24, height: CARD_WIDTH - 24 }]}>
                    <Image 
                      source={item.image}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.postTitle} numberOfLines={2}>{item.title}</Text>
                  <TouchableOpacity style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>View More</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* ===== FILTER MODAL ===== */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Filter Animals</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#4A6572" />
                  </TouchableOpacity>
                </View>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      selectedFilter === option && styles.filterOptionActive
                    ]}
                    onPress={() => {
                      setSelectedFilter(option);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedFilter === option && styles.filterOptionTextActive
                    ]}>
                      {option}
                    </Text>
                    {selectedFilter === option && (
                      <Ionicons name="checkmark" size={20} color="#feebc5" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

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
  // ===== HEADER =====
  header: {
    backgroundColor: '#9FDCFF',
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 42,
    paddingBottom: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#feebc5',
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
  // ===== CATEGORIES =====
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: -17,
    borderWidth: 1,
    borderColor: '#feebc5',
    paddingHorizontal: 16,
    backgroundColor: '#d0f4c7',
    paddingVertical: 24,
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
  // ===== SEARCH BAR + FILTER =====
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9FDCFF',
    marginBottom: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: '#333',
  },
  filterIcon: {
    padding: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    paddingLeft: 12,
  },
  // ===== FILTER LABEL =====
  filterLabelContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  filterLabelText: {
    fontSize: 13,
    marginHorizontal: -12,
    color: '#666',
  },
  filterLabelValue: {
    fontWeight: 'bold',
    color: '#4A6572',
  },
  CategoryListText: {
    fontSize: 16,
    color: '#4A6572',
    marginBottom: 18,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  // ===== CAT POSTS (Fixed Size) =====
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  postCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9FDCFF',
    marginBottom: 12,
    minHeight: 200,
  },
  imageWrapper: {
    backgroundColor: 'rgba(245,245,245,0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A6572',
    marginBottom: 8,
    textAlign: 'center',
    minHeight: 36,
  },
  viewMoreButton: {
    backgroundColor: '#9FDCFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#feebc5',
    minWidth: 80,
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 12,
    color: '#4A6572',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 10,
  },
  // ===== MODAL (Dropdown) =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A6572',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  filterOptionActive: {
    backgroundColor: '#9FDCFF',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#4A6572',
    fontWeight: 'bold',
  },
});