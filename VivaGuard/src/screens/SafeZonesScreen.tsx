import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_DEFAULT } from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

interface SafeZone {
  id: string;
  name: string;
  radius: number;
  address: string;
  active: boolean;
  icon: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const SafeZonesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [radius, setRadius] = useState(250);
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(false);

  const [savedZones, setSavedZones] = useState<SafeZone[]>([
    {
      id: '1',
      name: 'Home',
      radius: 250,
      address: '124 Oak Lane',
      active: true,
      icon: '🏠',
      coordinate: { latitude: 37.78825, longitude: -122.4324 },
    },
    {
      id: '2',
      name: 'Main Office',
      radius: 150,
      address: 'Downtown Corporate Plaza',
      active: false,
      icon: '🏢',
      coordinate: { latitude: 37.78525, longitude: -122.4354 },
    },
    {
      id: '3',
      name: 'Central Park',
      radius: 500,
      address: 'North Entrance',
      active: false,
      icon: '🌲',
      coordinate: { latitude: 37.79125, longitude: -122.4384 },
    },
  ]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: searchQuery,
          format: 'json',
          limit: 1,
        },
        headers: {
          'User-Agent': 'VivaGuard/1.0',
        },
      });

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        const mockLocation = {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          address: result.display_name,
        };
        
        setSelectedLocation(mockLocation);
        setIsAdding(true);
        
        mapRef.current?.animateToRegion({
          latitude: mockLocation.latitude,
          longitude: mockLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      } else {
        Alert.alert('Not Found', 'Location not found. Please try a different search.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      Alert.alert('Error', 'Failed to search location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmZone = () => {
    if (!selectedLocation) return;

    const newZone: SafeZone = {
      id: Date.now().toString(),
      name: selectedLocation.address.split(',')[0],
      radius: radius,
      address: selectedLocation.address,
      active: false,
      icon: '📍',
      coordinate: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    };

    setSavedZones([newZone, ...savedZones]);
    setIsAdding(false);
    setSelectedLocation(null);
    setSearchQuery('');
    Alert.alert('Success', 'Safe Zone added successfully!');
  };

  const handleDeleteZone = (id: string) => {
    setSavedZones(savedZones.filter(zone => zone.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoIcon}>🛡️</Text>
          <Text style={styles.logoText}>VivaGuard</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {savedZones.map(zone => (
            <React.Fragment key={zone.id}>
              <Circle
                center={zone.coordinate}
                radius={zone.radius}
                fillColor="rgba(26, 54, 93, 0.2)"
                strokeColor="rgba(26, 54, 93, 0.5)"
                strokeWidth={2}
              />
              {zone.active && (
                <Marker coordinate={zone.coordinate}>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>🏠 Home Active</Text>
                  </View>
                </Marker>
              )}
            </React.Fragment>
          ))}
          
          {selectedLocation && (
            <React.Fragment>
              <Circle
                center={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                radius={radius}
                fillColor="rgba(59, 130, 246, 0.2)"
                strokeColor="rgba(59, 130, 246, 0.5)"
                strokeWidth={2}
              />
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
              >
                <View style={styles.dotMarker} />
              </Marker>
            </React.Fragment>
          )}
        </MapView>

        {/* Floating Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonIcon}>🎯</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonIcon}>🥞</Text>
          </TouchableOpacity>
        </View>

        {/* Search Overlay */}
        <View style={styles.searchOverlay}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search address..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Confirm Add Zone Overlay */}
        {isAdding && selectedLocation && (
          <View style={styles.addZoneCard}>
            <Text style={styles.addZoneTitle}>Mark as Safe Zone?</Text>
            <Text style={styles.addZoneAddress}>{selectedLocation.address}</Text>
            <View style={styles.radiusControl}>
              <Text style={styles.radiusLabel}>Radius: {radius}m</Text>
              {/* Using a custom slider look since we avoid external libraries */}
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${((radius - 50) / 450) * 100}%` }]} />
              </View>
              <View style={styles.radiusButtons}>
                <TouchableOpacity onPress={() => setRadius(Math.max(50, radius - 50))} style={styles.radBtn}>
                  <Text style={styles.radBtnText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadius(Math.min(500, radius + 50))} style={styles.radBtn}>
                  <Text style={styles.radBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.addZoneActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsAdding(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmZone}>
                <Text style={styles.confirmBtnText}>Save Zone</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Saved Safe Zones</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Safe Zone</Text>
          </TouchableOpacity>
        </View>

        {savedZones.map((zone) => (
          <View key={zone.id} style={[styles.zoneCard, zone.active && styles.activeZoneCard]}>
            <View style={styles.zoneIconContainer}>
              <Text style={styles.zoneIcon}>{zone.icon}</Text>
            </View>
            <View style={styles.zoneInfo}>
              <View style={styles.zoneNameRow}>
                <Text style={styles.zoneName}>{zone.name}</Text>
                {zone.active && <View style={styles.greenDot} />}
              </View>
              <Text style={styles.zoneDetails}>{zone.radius}m Radius • {zone.address}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteZone(zone.id)}>
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👥</Text>
          <Text style={styles.tabLabel}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabIcon, styles.tabIconActive]}>📍</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Safe Zones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A365D',
  },
  settingsIcon: {
    fontSize: 24,
  },
  mapContainer: {
    height: height * 0.45,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  activeBadge: {
    backgroundColor: '#1A365D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dotMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#1A365D',
  },
  mapControls: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  mapButton: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapButtonIcon: {
    fontSize: 20,
  },
  searchOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 75,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addZoneCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  addZoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 5,
  },
  addZoneAddress: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 15,
  },
  radiusControl: {
    marginBottom: 15,
  },
  radiusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 10,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#1A365D',
    borderRadius: 2,
  },
  radiusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radBtn: {
    backgroundColor: '#EDF2F7',
    width: 40,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A365D',
  },
  addZoneActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  cancelBtnText: {
    color: '#718096',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#1A365D',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  addButton: {
    backgroundColor: '#1A365D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  zoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeZoneCard: {
    borderColor: '#1A365D',
    borderWidth: 2,
  },
  zoneIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  zoneIcon: {
    fontSize: 24,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginRight: 8,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#48BB78',
  },
  zoneDetails: {
    fontSize: 12,
    color: '#718096',
  },
  deleteIcon: {
    fontSize: 22,
    color: '#E53E3E',
    padding: 5,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  tabIconActive: {
    color: '#1A365D',
  },
  tabLabel: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  tabLabelActive: {
    color: '#1A365D',
    fontWeight: '600',
  },
});

export default SafeZonesScreen;
