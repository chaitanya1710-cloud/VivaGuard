import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const [sensitivity, setSensitivity] = useState(1); // 0: Low, 1: Medium, 2: High
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [vibration, setVibration] = useState(true);

  const sensitivityLabels = ['Low', 'Medium', 'High'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.shieldIcon}>🛡️</Text>
          <Text style={styles.headerTitle}>VivaGuard</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.headerRightIcon}>🎚️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Keyword Section */}
        <Text style={styles.sectionTitle}>Keyword</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            Record a custom phrase that triggers an emergency alert even when your phone is locked.
          </Text>
          <View style={styles.keywordActions}>
            <TouchableOpacity style={styles.recordButton}>
              <Text style={styles.recordIcon}>🎤</Text>
              <Text style={styles.recordText}>Record Phrase</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playIcon}>▶️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoBadge}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>Current keyword: "Help Me Viva"</Text>
          </View>
        </View>

        {/* Sensitivity Section */}
        <Text style={styles.sectionTitle}>Sensitivity</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            Adjust how sensitive the voice recognition should be in loud environments.
          </Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${(sensitivity / 2) * 100}%` }]} />
              <TouchableOpacity 
                style={[styles.sliderThumb, { left: `${(sensitivity / 2) * 100}%` }]} 
                activeOpacity={1}
              />
            </View>
            <View style={styles.sliderOverlay}>
              {[0, 1, 2].map((val) => (
                <TouchableOpacity 
                  key={val} 
                  style={styles.sliderPoint} 
                  onPress={() => setSensitivity(val)}
                />
              ))}
            </View>
          </View>
          <View style={styles.sliderLabels}>
            {sensitivityLabels.map((label, index) => (
              <Text 
                key={label} 
                style={[
                  styles.sliderLabel, 
                  sensitivity === index && styles.sliderLabelActive
                ]}
              >
                {label}
              </Text>
            ))}
          </View>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Text style={styles.rowIcon}>🔊</Text>
              </View>
              <View>
                <Text style={styles.rowTitle}>Sound alerts</Text>
                <Text style={styles.rowSubtitle}>Play chime when armed</Text>
              </View>
            </View>
            <Switch
              value={soundAlerts}
              onValueChange={setSoundAlerts}
              trackColor={{ false: '#E2E8F0', true: '#1E3A8A' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={[styles.row, styles.noBorder]}>
            <View style={styles.rowLeft}>
              <View style={styles.iconContainer}>
                <Text style={styles.rowIcon}>📳</Text>
              </View>
              <View>
                <Text style={styles.rowTitle}>Vibration</Text>
                <Text style={styles.rowSubtitle}>Haptic feedback on trigger</Text>
              </View>
            </View>
            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{ false: '#E2E8F0', true: '#1E3A8A' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* About Section */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.aboutHeader}>
            <View style={styles.aboutShield}>
              <Text style={styles.aboutShieldIcon}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.aboutTitle}>VivaGuard Premium</Text>
              <Text style={styles.aboutSubtitle}>Version 4.2.1-stable</Text>
            </View>
          </View>
          <Text style={styles.aboutDescription}>
            Designed for institutional-grade reliability, VivaGuard provides a persistent safety layer for individuals in high-risk environments. Our mission is to deliver calm, dependable security through intuitive technology.
          </Text>
          <TouchableOpacity style={styles.aboutRow}>
            <Text style={styles.aboutRowText}>Privacy Policy</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.aboutRow, styles.noBorder]}>
            <Text style={styles.aboutRowText}>Terms of Service</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabText}>Home</Text>
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
          <Text style={[styles.tabIcon, styles.tabIconActive]}>⚙️</Text>
          <Text style={[styles.tabText, styles.tabTextActive]}>Settings</Text>
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
  shieldIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  headerRightIcon: {
    fontSize: 22,
    color: '#64748B',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 20,
  },
  keywordActions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  recordButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 12,
  },
  recordIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  recordText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
  },
  infoBadge: {
    backgroundColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    width: '100%',
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1E3A8A',
    top: -8,
    marginLeft: -10,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 2,
  },
  sliderOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  sliderPoint: {
    width: 40,
    height: '100%',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  sliderLabelActive: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutShield: {
    width: 56,
    height: 56,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aboutShieldIcon: {
    fontSize: 28,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  aboutSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  aboutDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 20,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  aboutRowText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  chevron: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 22,
    color: '#94A3B8',
    marginBottom: 4,
  },
  tabIconActive: {
    color: '#1E3A8A',
  },
  tabText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1E3A8A',
  },
});

export default SettingsScreen;
