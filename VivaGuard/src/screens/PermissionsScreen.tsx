import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';

interface PermissionsScreenProps {
  navigation: any;
}

const PermissionsScreen: React.FC<PermissionsScreenProps> = ({ navigation }) => {
  const handleEnableAll = async () => {
    const permissions = Platform.select({
      ios: [
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.IOS.CONTACTS,
      ],
      android: [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.READ_CONTACTS,
      ],
    });

    if (!permissions) return;

    try {
      const results = await requestMultiple(permissions);
      console.log('Permission results:', results);
      // Navigate to next screen (Home placeholder or similar)
      navigation.navigate('Login');
    } catch (error) {
      console.error('Permission request error:', error);
      Alert.alert('Error', 'Could not request permissions. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.miniShieldSquare}>
            <Text style={styles.miniShieldText}>🛡️</Text>
          </View>
          <Text style={styles.headerTitle}>VivaGuard</Text>
        </View>
        <Text style={styles.stepText}>Step 2 of 3</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Central Icon Container */}
        <View style={styles.centerIconContainer}>
          <View style={styles.greyShieldSquare}>
            <Text style={styles.largeShieldIcon}>🛡️</Text>
          </View>
        </View>

        {/* Heading & Subtitle */}
        <Text style={styles.heading}>Safety Permissions</Text>
        <Text style={styles.subtitle}>
          To keep you safe and connected, VivaGuard requires access to the following features on your device.
        </Text>

        {/* Permission Cards */}
        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>📍</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardDescription}>
              Used for real-time monitoring and setting up safe zones. We only track when safety modes are active.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>🎤</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Microphone</Text>
            <Text style={styles.cardDescription}>
              Enables instant keyword detection for voice-activated SOS triggers during emergencies.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>👥</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Contacts</Text>
            <Text style={styles.cardDescription}>
              Allows you to select and notify your trusted loved ones automatically when you need help.
            </Text>
          </View>
        </View>

        {/* Dark Banner */}
        <View style={styles.darkBanner}>
          <View style={styles.encryptionBadge}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.encryptionText}>Your data is encrypted and private</Text>
          </View>
        </View>

        {/* Enable All Button */}
        <TouchableOpacity style={styles.enableButton} onPress={handleEnableAll}>
          <Text style={styles.enableButtonText}>Enable All →</Text>
        </TouchableOpacity>

        {/* Configure Manually Link */}
        <TouchableOpacity style={styles.manualLink}>
          <Text style={styles.manualLinkText}>Configure manually</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
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
  miniShieldSquare: {
    width: 24,
    height: 24,
    backgroundColor: '#1E3A8A',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  miniShieldText: {
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  stepText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  centerIconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  greyShieldSquare: {
    width: 80,
    height: 80,
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeShieldIcon: {
    fontSize: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  darkBanner: {
    width: '100%',
    height: 160,
    backgroundColor: '#334155',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  encryptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  lockIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  encryptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  enableButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  enableButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  manualLink: {
    marginBottom: 30,
  },
  manualLinkText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
});

export default PermissionsScreen;
