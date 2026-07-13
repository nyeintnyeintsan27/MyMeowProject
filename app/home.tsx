// app/home.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

interface PetType {
  id: number;
  name: string;
}

interface PetBreed {
  id: number;
  name: string;
  origin: string;
  avg_lifespan: number;
  avg_weight: number;
  description: string;
  image_url: string;
  pet_type_id: number;
  pet_type_name: string;
}

interface PetBreedInfo {
  id: number;
  blood_types: string;
  diet_type: string;
  diet_description: string;
  habitat: string;
  lifespan_years: number;
  weight_range: string;
  gestation_period: string;
  social_behavior: string;
  pet_breed_id: number;
}

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPetType, setSelectedPetType] = useState<number | null>(null);
  const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [petBreeds, setPetBreeds] = useState<PetBreed[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<PetBreed[]>([]);
  const [loading, setLoading] = useState(true);

  // Detail Popup States
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<PetBreed | null>(null);
  const [breedInfo, setBreedInfo] = useState<PetBreedInfo | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Categories
  const categories = [
    { id: '1', title: t('categories.feeding') || 'Feeding', icon: '🍽️', color: 'rgba(255,229,180,0.85)' },
    { id: '2', title: t('categories.training') || 'Training', icon: '🎯', color: 'rgba(180,229,255,0.85)' },
    { id: '3', title: t('categories.health') || 'Health', icon: '🏥', color: 'rgba(255,180,180,0.85)' },
    { id: '4', title: t('categories.grooming') || 'Grooming', icon: '✂️', color: 'rgba(180,255,180,0.85)' },
  ];

  // Language Switch
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'my' : 'en';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterBreeds();
  }, [selectedPetType, petBreeds, search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Error', 'Please login first');
        router.replace('/auth/login');
        return;
      }

      // 1. Fetch Pet Types (for filter)
      const typesResponse = await fetch(`${API_URL}/pet-types`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const typesData = await typesResponse.json();
      setPetTypes(typesData.data || []);

      // 2. Fetch Pet Breeds (with images)
      const breedsResponse = await fetch(`${API_URL}/pet-breeds`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const breedsData = await breedsResponse.json();
      setPetBreeds(breedsData.data || []);

    } catch (error: any) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filterBreeds = () => {
    let filtered = petBreeds;

    if (selectedPetType !== null) {
      filtered = filtered.filter(breed => breed.pet_type_id === selectedPetType);
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(breed =>
        breed.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBreeds(filtered);
  };

  // ===== Handle View Detail =====
  const handleViewDetail = async (breed: PetBreed) => {
    setSelectedBreed(breed);
    setDetailModalVisible(true);
    setDetailLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');

      // Fetch Pet Breed Info
      const infoResponse = await fetch(`${API_URL}/pet-breed-info/breed/${breed.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const infoData = await infoResponse.json();

      if (infoData.data && infoData.data.length > 0) {
        setBreedInfo(infoData.data[0]);
      } else {
        setBreedInfo(null);
      }
    } catch (error) {
      console.error('Error fetching breed info:', error);
      setBreedInfo(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // ===== Close Detail Popup =====
  const closeDetailPopup = () => {
    setDetailModalVisible(false);
    setSelectedBreed(null);
    setBreedInfo(null);
  };

  const handleCategoryPress = (title: string) => {
    setSelectedPetType(null);
    setModalVisible(false);
  };

  const getPetTypeName = (id: number) => {
    const type = petTypes.find(t => t.id === id);
    return type?.name || 'Unknown';
  };

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
                <Text style={styles.pageTitle}>🐾 {t('home.title')}</Text>
                <View style={styles.headerRight}>
                  {/* Language Switch Button - Near Notification Bell */}
                  <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
                    <Text style={styles.langButtonText}>
                      {i18n.language === 'en' ? '🇲🇲' : '🇬🇧'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={26} color="#4A6572" />
                    <View style={styles.notificationBadge} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ===== CATEGORIES ===== */}
            <View style={styles.categoriesContainer}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.categoryItem, { backgroundColor: item.color }]}
                  onPress={() => handleCategoryPress(item.title)}
                >
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ===== SEARCH BAR + FILTER ICON ===== */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={t('home.search')}
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
                {t('home.filter')}: <Text style={styles.filterLabelValue}>
                  {selectedPetType !== null
                    ? getPetTypeName(selectedPetType)
                    : t('common.allTypes')}
                </Text>
              </Text>
            </View>

            <Text style={styles.CategoryListText}>{t('home.title')}</Text>

            {/* ===== LOADING ===== */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#9FDCFF" />
                <Text style={styles.loadingText}>{t('common.loading')}</Text>
              </View>
            ) : filteredBreeds.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{t('common.noData')}</Text>
              </View>
            ) : (
              /* ===== PET BREEDS GRID ===== */
              <View style={styles.postsGrid}>
                {filteredBreeds.map((item) => (
                  <View key={item.id} style={[styles.postCard, { width: CARD_WIDTH }]}>
                    <View style={[styles.imageWrapper, { width: CARD_WIDTH - 24, height: CARD_WIDTH - 24 }]}>
                      {item.image_url ? (
                        <Image
                          source={{ uri: item.image_url }}
                          style={styles.postImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <Text style={styles.placeholderText}>🐾</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.postTitle} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.postSubtitle}>{item.pet_type_name || 'Unknown'}</Text>
                    {item.origin && (
                      <Text style={styles.postOrigin}>📍 {item.origin}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.viewMoreButton}
                      onPress={() => handleViewDetail(item)}
                    >
                      <Text style={styles.viewMoreText}>{t('home.viewMore')}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* ===== FILTER MODAL (Pet Types) ===== */}
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
                  <Text style={styles.modalTitle}>{t('home.selectPetType')}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#4A6572" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    selectedPetType === null && styles.filterOptionActive
                  ]}
                  onPress={() => {
                    setSelectedPetType(null);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedPetType === null && styles.filterOptionTextActive
                  ]}>
                    {t('common.allTypes')}
                  </Text>
                  {selectedPetType === null && (
                    <Ionicons name="checkmark" size={20} color="#feebc5" />
                  )}
                </TouchableOpacity>

                {petTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.filterOption,
                      selectedPetType === type.id && styles.filterOptionActive
                    ]}
                    onPress={() => {
                      setSelectedPetType(type.id);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      selectedPetType === type.id && styles.filterOptionTextActive
                    ]}>
                      {type.name}
                    </Text>
                    {selectedPetType === type.id && (
                      <Ionicons name="checkmark" size={20} color="#feebc5" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>

          {/* ===== DETAIL POPUP MODAL ===== */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={detailModalVisible}
            onRequestClose={closeDetailPopup}
          >
            <View style={styles.detailOverlay}>
              <View style={styles.detailContainer}>
                {/* Close Button */}
                <TouchableOpacity style={styles.detailCloseButton} onPress={closeDetailPopup}>
                  <Ionicons name="close" size={28} color="#4A6572" />
                </TouchableOpacity>

                {detailLoading ? (
                  <View style={styles.detailLoadingContainer}>
                    <ActivityIndicator size="large" color="#9FDCFF" />
                    <Text style={styles.detailLoadingText}>{t('common.loading')}</Text>
                  </View>
                ) : selectedBreed ? (
                  <ScrollView
                    style={styles.detailScroll}
                    contentContainerStyle={styles.detailScrollContent}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    bounces={true}
                    alwaysBounceVertical={false}
                    decelerationRate="normal"
                    scrollEventThrottle={16}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    scrollIndicatorInsets={{ right: 4 }}
                  >
                    {/* Image */}
                    <View style={styles.detailImageContainer}>
                      {selectedBreed.image_url ? (
                        <Image
                          source={{ uri: selectedBreed.image_url }}
                          style={styles.detailImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.detailPlaceholderImage}>
                          <Text style={styles.detailPlaceholderText}>🐾</Text>
                        </View>
                      )}
                    </View>

                    {/* Breed Name */}
                    <Text style={styles.detailName}>{selectedBreed.name}</Text>
                    <Text style={styles.detailPetType}>
                      {selectedBreed.pet_type_name || 'Unknown'}
                    </Text>

                    {/* Stats */}
                    <View style={styles.detailStatsRow}>
                      {selectedBreed.origin && (
                        <View style={styles.detailStatItem}>
                          <Text style={styles.detailStatValue}>📍</Text>
                          <Text style={styles.detailStatLabel}>{selectedBreed.origin}</Text>
                        </View>
                      )}
                      {selectedBreed.avg_lifespan ? (
                        <View style={styles.detailStatItem}>
                          <Text style={styles.detailStatValue}>{selectedBreed.avg_lifespan}</Text>
                          <Text style={styles.detailStatLabel}>{t('home.years')}</Text>
                        </View>
                      ) : null}
                      {selectedBreed.avg_weight ? (
                        <View style={styles.detailStatItem}>
                          <Text style={styles.detailStatValue}>{selectedBreed.avg_weight}</Text>
                          <Text style={styles.detailStatLabel}>kg</Text>
                        </View>
                      ) : null}
                    </View>

                    {/* Description */}
                    {selectedBreed.description && (
                      <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>{t('home.description')}</Text>
                        <Text style={styles.detailSectionText}>{selectedBreed.description}</Text>
                      </View>
                    )}

                    {/* Breed Info */}
                    {breedInfo && (
                      <View style={styles.detailInfoContainer}>
                        <Text style={styles.detailInfoTitle}>{t('home.additionalInfo')}</Text>

                        {breedInfo.blood_types && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.bloodTypes')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.blood_types}</Text>
                          </View>
                        )}

                        {breedInfo.diet_type && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.diet')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.diet_type}</Text>
                          </View>
                        )}

                        {breedInfo.diet_description && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.dietDetails')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.diet_description}</Text>
                          </View>
                        )}

                        {breedInfo.habitat && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.habitat')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.habitat}</Text>
                          </View>
                        )}

                        {breedInfo.weight_range && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.weightRange')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.weight_range}</Text>
                          </View>
                        )}

                        {breedInfo.gestation_period && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.gestation')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.gestation_period}</Text>
                          </View>
                        )}

                        {breedInfo.social_behavior && (
                          <View style={styles.detailInfoRow}>
                            <Text style={styles.detailInfoLabel}>{t('home.socialBehavior')}:</Text>
                            <Text style={styles.detailInfoValue}>{breedInfo.social_behavior}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {/* Bottom Spacer */}
                    <View style={styles.detailBottomSpacer} />
                  </ScrollView>
                ) : null}
              </View>
            </View>
          </Modal>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A6572',
    textAlign: 'center',
    flex: 1,
  },
  langButton: {
    padding: 4,
  },
  langButtonText: {
    fontSize: 22,
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
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 40,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A6572',
    textAlign: 'center',
    marginBottom: 2,
  },
  postSubtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 2,
  },
  postOrigin: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 6,
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
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
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

  // ===== DETAIL POPUP STYLES =====
  // ===== DETAIL POPUP STYLES =====
detailOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
},
detailContainer: {
  backgroundColor: '#d0f4c7',
  borderRadius: 24,
  borderColor: '#9FDCFF',
  borderWidth: 2,
  width: '100%',
  maxWidth: 420,
  height: height * 0.82,
  paddingTop: 20,
  paddingHorizontal: 16,
  paddingBottom: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 10,
  position: 'relative',
},
detailScroll: {
  flex: 1,
  marginRight: -4,
},
detailScrollContent: {
  paddingBottom: 40,
  paddingRight: 8,
},
detailBottomSpacer: {
  height: 20,
},
detailCloseButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
  backgroundColor: 'rgba(255,255,255,0.95)',
  borderRadius: 20,
  padding: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
detailLoadingContainer: {
  padding: 40,
  alignItems: 'center',
},
detailLoadingText: {
  marginTop: 10,
  color: '#666',
},
detailImageContainer: {
  width: '100%',
  height: 200,
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  marginBottom: 12,
},
detailImage: {
  width: '100%',
  height: '100%',
},
detailPlaceholderImage: {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e8e8e8',
},
detailPlaceholderText: {
  fontSize: 60,
},
detailName: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#1a1a2e',
  textAlign: 'center',
},
detailPetType: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
  marginBottom: 10,
},
detailStatsRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#f5f5f5',
  borderRadius: 12,
  padding: 12,
  marginVertical: 8,
},
detailStatItem: {
  alignItems: 'center',
},
detailStatValue: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#4A6572',
},
detailStatLabel: {
  fontSize: 10,
  color: '#888',
  marginTop: 2,
},
detailSection: {
  marginTop: 12,
},
detailSectionTitle: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#1a1a2e',
  marginBottom: 4,
},
detailSectionText: {
  fontSize: 12,
  color: '#333',
  lineHeight: 26,
  textAlign: 'justify',
},
detailInfoContainer: {
  marginTop: 12,
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  padding: 14,
  marginBottom: 8,
},
detailInfoTitle: {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#1a1a2e',
  marginBottom: 8,
},
detailInfoRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 4,
},
detailInfoLabel: {
  width: 110,
  fontSize: 12,
  fontWeight: '700',
  color: '#555',
},
detailInfoValue: {
  flex: 1,
  fontSize: 12,
  color: '#333',
  lineHeight: 22,
},
});


