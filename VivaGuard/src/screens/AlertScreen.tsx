import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const AlertScreen = ({ visible = true, onClose = () => {} }: { visible?: boolean; onClose?: () => void }) => {
  const [seconds, setSeconds] = useState(15);
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 15000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer);
  }, [visible]);

  const triggerAlert = () => {
    Alert.alert('ALERT SENT', 'Emergency services and contacts have been notified.');
    onClose();
  };

  const handleSafe = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.distressText}>DISTRESS DETECTED</Text>
          <View style={styles.audioStatus}>
            <Text style={styles.audioIcon}>🎤</Text>
            <Text style={styles.audioText}>AUDIO ANALYSIS ACTIVE</Text>
          </View>

          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerNumber}>{seconds}</Text>
              <Text style={styles.timerLabel}>SECONDS</Text>
            </View>
            {/* Simple progress ring implementation using borders */}
            <View style={styles.progressRingBackground} />
            <Animated.View 
              style={[
                styles.progressRing,
                {
                  transform: [
                    {
                      rotate: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['360deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          <View style={styles.confidenceCard}>
            <View style={styles.redDot} />
            <Text style={styles.confidenceText}>Screaming — 87% confidence</Text>
          </View>

          <Text style={styles.infoText}>
            Emergency services and emergency contacts will be notified when the timer reaches zero.
          </Text>

          <TouchableOpacity style={styles.safeButton} onPress={handleSafe}>
            <Text style={styles.safeButtonText}>I'M SAFE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.alertButton} onPress={triggerAlert}>
            <Text style={styles.alertButtonText}>SEND ALERT NOW</Text>
          </TouchableOpacity>

          <Text style={styles.voiceText}>Voice command "Cancel" to stop.</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 58, 138, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    padding: 30,
    alignItems: 'center',
  },
  distressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 8,
  },
  audioStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  audioIcon: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 6,
  },
  audioText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1,
  },
  timerContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  timerNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  timerLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  progressRingBackground: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: '#F1F5F9',
  },
  progressRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: '#EF4444',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  confidenceCard: {
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 10,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B91C1C',
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  safeButton: {
    backgroundColor: '#10B981',
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  safeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  alertButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  voiceText: {
    fontSize: 14,
    color: '#94A3B8',
  },
});

export default AlertScreen;
