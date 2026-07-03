// app/hospital.tsx
import BottomNav from '@/components/common/BottomNav';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// ===== Clinic Data =====
const clinics = [
  {
    id: '1',
    name: 'Myeikta Veterinary Clinic',
    address: 'No. (16) Than Thu Mar street, 24 quarter, Thuwunna, Thingangyun, Yangon',
    phone: '+95 9 45000 7088',
    rating: 4.8,
    reviews: 230,
    openingHours: '10:30 AM - 7:00 PM (Mon-Sat)',
    closed: true,
    closesTomorrow: 'Opens tomorrow 10:30',
    latitude: 16.8420,
    longitude: 96.1900,
    image: require('@/assets/images/cat2.jpg'),
    services: ['Vaccination', 'Surgery', 'Dental Care', 'Emergency', 'X-Ray', 'Ultrasound'],
  },
  {
    id: '2',
    name: 'Pawsitive Care Hospital',
    address: '123 Main St, San Francisco, CA',
    phone: '(415) 555-0199',
    rating: 4.9,
    reviews: 320,
    openingHours: '8:00 AM - 7:00 PM (Mon-Sat)',
    closed: false,
    closesTomorrow: null,
    latitude: 16.8410,
    longitude: 96.1800,
    image: require('@/assets/images/cat2.jpg'),
    services: ['Emergency', 'Surgery', 'Dental', 'X-Ray', 'Ultrasound', 'Pharmacy'],
  },
  {
    id: '3',
    name: 'Yangon Veterinary Hospital',
    address: '123 Kabar Aye Pagoda Rd, Bahan, Yangon',
    phone: '+95 1 555 0199',
    rating: 4.6,
    reviews: 180,
    openingHours: '9:00 AM - 6:00 PM (Mon-Fri)',
    closed: false,
    closesTomorrow: null,
    latitude: 16.8240,
    longitude: 96.1580,
    image: require('@/assets/images/cat2.jpg'),
    services: ['Wellness Exams', 'Surgery', 'Pharmacy', 'Laboratory'],
  },
  {
    id: '4',
    name: 'Golden Gate Veterinary',
    address: '456 Oak St, San Francisco, CA',
    phone: '(415) 555-0188',
    rating: 4.6,
    reviews: 180,
    openingHours: '9:00 AM - 6:00 PM (Mon-Fri)',
    closed: false,
    closesTomorrow: null,
    latitude: 16.8300,
    longitude: 96.1700,
    image: require('@/assets/images/cat2.jpg'),
    services: ['Vaccinations', 'Surgery', 'Dental Care', 'Emergency'],
  },
];

export default function HospitalScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const mapRef = useRef<MapView>(null);

  // ===== Get User Location =====
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  // ===== Filter Clinics for Map only (Search affects Map) =====
  const mapFilteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(search.toLowerCase()) ||
    clinic.address.toLowerCase().includes(search.toLowerCase())
  );

  // ===== Search handler - only affects Map =====
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 0 && mapFilteredClinics.length > 0) {
      const firstResult = mapFilteredClinics[0];
      mapRef.current?.animateToRegion({
        latitude: firstResult.latitude,
        longitude: firstResult.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    } else if (text.length === 0 && userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  // ===== Locate User =====
  const locateUser = () => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  // ===== Open Google Maps =====
  const openGoogleMaps = (latitude: number, longitude: number, name: string) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${name}&ll=${latitude},${longitude}`,
      android: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });
    Linking.openURL(url || '');
  };

  // ===== Call Phone =====
  const callPhone = (phone: string) => {
    const cleaned = phone.replace(/\s/g, '');
    Linking.openURL(`tel:${cleaned}`);
  };

  // ===== Render Clinic Card (Catalog List) =====
  const renderClinicCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.clinicCard}
      onPress={() => {
        setSelectedClinic(item);
        setShowDetail(true);
        mapRef.current?.animateToRegion({
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }}
    >
      <Image source={item.image} style={styles.clinicImage} resizeMode="cover" />
      <View style={styles.clinicInfo}>
        <View style={styles.clinicHeader}>
          <Text style={styles.clinicName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviews})</Text>
          </View>
        </View>
        
        <View style={styles.clinicDetailRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.clinicAddress} numberOfLines={1}>{item.address}</Text>
        </View>
        
        {item.closed ? (
          <View style={styles.closedContainer}>
            <Ionicons name="time-outline" size={14} color="#ff6b6b" />
            <Text style={styles.closedText}>Closed · {item.closesTomorrow}</Text>
          </View>
        ) : (
          <View style={styles.clinicDetailRow}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.clinicHours}>{item.openingHours}</Text>
          </View>
        )}
        
        <View style={styles.clinicActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openGoogleMaps(item.latitude, item.longitude, item.name)}
          >
            <Ionicons name="navigate-outline" size={16} color="#4A6572" />
            <Text style={styles.actionText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => callPhone(item.phone)}
          >
            <Ionicons name="call-outline" size={16} color="#4A6572" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* ===== MAP HEADER ===== */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 16.8420,
              longitude: 96.1900,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
          >
            {mapFilteredClinics.map((clinic) => (
              <Marker
                key={clinic.id}
                coordinate={{
                  latitude: clinic.latitude,
                  longitude: clinic.longitude,
                }}
                title={clinic.name}
                description={clinic.address}
                onPress={() => {
                  setSelectedClinic(clinic);
                  setShowDetail(true);
                }}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.marker}>
                    <Ionicons name="location" size={24} color="#ff3b30" />
                  </View>
                  <View style={styles.markerPulse} />
                </View>
              </Marker>
            ))}
          </MapView>
          
          {/* Map Overlay Buttons */}
          <TouchableOpacity style={styles.mapBackButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#4A6572" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.mapCenterButton}
            onPress={locateUser}
          >
            <Ionicons name="locate" size={24} color="#4A6572" />
          </TouchableOpacity>

          {/* Search Result Count on Map */}
          {search.length > 0 && (
            <View style={styles.resultCountBadge}>
              <Text style={styles.resultCountText}>
                {mapFilteredClinics.length} found
              </Text>
            </View>
          )}
        </View>

        {/* ===== SEARCH BAR (Only affects Map) ===== */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for nearby Vet Hospitals..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={handleSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* ===== CATALOG LIST (All clinics - unaffected by search) ===== */}
        <FlatList
          data={clinics}
          renderItem={renderClinicCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                All Clinics ({clinics.length})
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
          }
        />

        {/* ===== BOTTOM NAV ===== */}
        <BottomNav activeTab="Hospital" />
      </View>

      {/* ===== CLINIC DETAIL MODAL ===== */}
      {showDetail && selectedClinic && (
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDetail(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowDetail(false)}>
              <Ionicons name="close" size={24} color="#4A6572" />
            </TouchableOpacity>
            
            <Image source={selectedClinic.image} style={styles.modalImage} resizeMode="cover" />
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalBody}>
                <Text style={styles.modalName}>{selectedClinic.name}</Text>
                
                <View style={styles.modalRating}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.modalRatingText}>{selectedClinic.rating}</Text>
                  <Text style={styles.modalReviewText}>({selectedClinic.reviews} Reviews)</Text>
                </View>

                <View style={styles.modalDetail}>
                  <Ionicons name="location-outline" size={18} color="#4A6572" />
                  <Text style={styles.modalAddress}>{selectedClinic.address}</Text>
                </View>

                <View style={styles.modalDetail}>
                  <Ionicons name="call-outline" size={18} color="#4A6572" />
                  <TouchableOpacity onPress={() => callPhone(selectedClinic.phone)}>
                    <Text style={styles.modalPhone}>{selectedClinic.phone}</Text>
                  </TouchableOpacity>
                </View>

                {selectedClinic.closed ? (
                  <View style={[styles.modalDetail, { marginBottom: 8 }]}>
                    <Ionicons name="time-outline" size={18} color="#ff6b6b" />
                    <Text style={[styles.modalHours, { color: '#ff6b6b' }]}>
                      Closed · {selectedClinic.closesTomorrow}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.modalDetail}>
                    <Ionicons name="time-outline" size={18} color="#4A6572" />
                    <Text style={styles.modalHours}>{selectedClinic.openingHours}</Text>
                  </View>
                )}

                <Text style={styles.modalServicesTitle}>Services</Text>
                <View style={styles.servicesContainer}>
                  {selectedClinic.services.map((service: string, index: number) => (
                    <View key={index} style={styles.serviceTag}>
                      <Text style={styles.serviceText}>{service}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.modalActionBtn, styles.navigateBtn]}
                    onPress={() => openGoogleMaps(selectedClinic.latitude, selectedClinic.longitude, selectedClinic.name)}
                  >
                    <Ionicons name="navigate-outline" size={20} color="#fff" />
                    <Text style={styles.modalActionText}>Navigate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalActionBtn, styles.callBtn]}
                    onPress={() => callPhone(selectedClinic.phone)}
                  >
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={styles.modalActionText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  // ===== MAP =====
  mapContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapBackButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  mapCenterButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  resultCountBadge: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{ translateX: -40 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  resultCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // ===== MARKER =====
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
    position: 'absolute',
    top: 16,
    left: 16,
  },
  // ===== SEARCH =====
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: '#333',
  },
  // ===== LIST =====
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A6572',
  },
  viewAllText: {
    fontSize: 14,
    color: '#9FDCFF',
    fontWeight: '500',
  },
  // ===== CLINIC CARD =====
  clinicCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  clinicImage: {
    width: '100%',
    height: 140,
  },
  clinicInfo: {
    padding: 14,
  },
  clinicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  clinicName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A6572',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 2,
  },
  clinicDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  clinicHours: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  closedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  closedText: {
    fontSize: 13,
    color: '#ff6b6b',
    marginLeft: 6,
    fontWeight: '500',
  },
  clinicActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9FDCFF',
  },
  actionText: {
    fontSize: 12,
    color: '#4A6572',
    marginLeft: 6,
    fontWeight: '500',
  },
  // ===== MODAL =====
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width - 32,
    maxHeight: height * 0.85,
    overflow: 'hidden',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 4,
  },
  modalImage: {
    width: '100%',
    height: 160,
  },
  modalBody: {
    padding: 20,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A6572',
    marginBottom: 6,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalRatingText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  modalReviewText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 4,
  },
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  modalPhone: {
    fontSize: 14,
    color: '#4A6572',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  modalHours: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  modalServicesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6572',
    marginTop: 12,
    marginBottom: 8,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9FDCFF',
  },
  serviceText: {
    fontSize: 12,
    color: '#4A6572',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  modalActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  navigateBtn: {
    backgroundColor: '#4A6572',
  },
  callBtn: {
    backgroundColor: '#9FDCFF',
  },
  modalActionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});