import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [sosActive, setSosActive] = useState(false);
  const audioLevel = useRef(new Animated.Value(0.4)).current;
  const sosProgress = useRef(new Animated.Value(0)).current;

  // Animate audio level bar for visual effect
  useEffect(() => {
    const animateAudio = () => {
      Animated.sequence([
        Animated.timing(audioLevel, {
          toValue: Math.random() * 0.8 + 0.2,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(audioLevel, {
          toValue: Math.random() * 0.8 + 0.2,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(() => animateAudio());
    };
    animateAudio();
  }, []);

  const handleSOSPressIn = () => {
    Animated.timing(sosProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setSosActive(true);
        Alert.alert('SOS ACTIVATED', 'Emergency services and trusted contacts have been notified.');
      }
    });
  };

  const handleSOSPressOut = () => {
    Animated.timing(sosProgress, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🛡️</Text>
          <Text style={styles.headerTitle}>VivaGuard</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.headerRightIcon}>⏸️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.headerRightIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Monitoring Active Card */}
        <View style={styles.activeCard}>
          <View style={styles.activeIconContainer}>
            <Text style={styles.activeShieldIcon}>🛡️</Text>
            <Text style={styles.activeHeartIcon}>❤️</Text>
          </View>
          <Text style={styles.activeTitle}>Monitoring Active</Text>
          <Text style={styles.activeSubtitle}>Your safety net is live</Text>
        </View>

        {/* Ambient Audio Monitoring Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Ambient Audio Monitoring</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.greenDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
          <View style={styles.audioBarContainer}>
            <Animated.View 
              style={[
                styles.audioBarFill, 
                { width: audioLevel.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  }) 
                }
              ]} 
            />
          </View>
        </View>

        {/* Info Cards Row */}
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard]}>
            <View style={styles.smallIconContainer}>
              <Text style={styles.smallIcon}>👥</Text>
            </View>
            <Text style={styles.cardInfoTitle}>Trusted Contacts</Text>
            <Text style={styles.cardInfoValue}>3 Active</Text>
          </View>
          <View style={[styles.card, styles.halfCard]}>
            <View style={[styles.smallIconContainer, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.smallIcon}>📍</Text>
            </View>
            <Text style={styles.cardInfoTitle}>Safe Zone</Text>
            <Text style={styles.cardInfoValue}>Home</Text>
          </View>
        </View>

        {/* Map Preview */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
             {/* Mocking a map with lines */}
             <View style={styles.mapLine} />
             <View style={[styles.mapLine, { transform: [{ rotate: '90deg' }] }]} />
             <Text style={styles.mapPin}>📍</Text>
          </View>
          <View style={styles.addressBadge}>
            <View style={styles.blueDot} />
            <Text style={styles.addressText}>1240 Terrace Street, SF</Text>
          </View>
        </View>

        {/* SOS Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPressIn={handleSOSPressIn}
          onPressOut={handleSOSPressOut}
          style={styles.sosButton}
        >
          <Animated.View 
            style={[
              styles.sosProgress, 
              { width: sosProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }) 
              }
            ]} 
          />
          <View style={styles.sosContent}>
            <Text style={styles.sosIcon}>✳️</Text>
            <Text style={styles.sosText}>HOLD TO SOS</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabIcon, styles.tabIconActive]}>🏠</Text>
          <Text style={[styles.tabText, styles.tabTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👥</Text>
          <Text style={styles.tabText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📍</Text>
          <Text style={styles.tabText}>Safe Zones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: '#1E3A8A',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  headerRightIcon: {
    fontSize: 22,
    color: '#64748B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space for SOS button
  },
  activeCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  activeIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeShieldIcon: {
    fontSize: 40,
  },
  activeHeartIcon: {
    position: 'absolute',
    fontSize: 16,
    bottom: 28,
  },
  activeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },
  activeSubtitle: {
    fontSize: 14,
    color: '#15803D',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  audioBarContainer: {
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
  },
  audioBarFill: {
    height: '100%',
    backgroundColor: '#1E3A8A',
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfCard: {
    width: '48%',
    marginBottom: 0,
  },
  smallIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  smallIcon: {
    fontSize: 20,
  },
  cardInfoTitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  cardInfoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#1E293B', // Dark background for map
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mapPin: {
    fontSize: 40,
  },
  addressBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 8,
  },
  addressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  sosButton: {
    height: 70,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sosProgress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  sosContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sosIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 10,
  },
  sosText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
    color: '#94A3B8',
    marginBottom: 4,
  },
  tabIconActive: {
    color: '#1E3A8A',
  },
  tabText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
});

export default HomeScreen;
