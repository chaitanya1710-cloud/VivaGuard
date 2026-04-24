import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.shieldContainer}>
        <View style={styles.shieldTop} />
        <View style={styles.shieldBottom} />
      </View>
      <Text style={styles.vivaGuardText}>VivaGuard</Text>
      <View style={styles.systemSecureContainer}>
        <View style={styles.greenDot} />
        <Text style={styles.systemSecureText}>System Secure</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  shieldContainer: {
    width: 80,
    height: 90,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  shieldTop: {
    width: 80,
    height: 50,
    backgroundColor: '#1E3A8A',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  shieldBottom: {
    width: 80,
    height: 40,
    backgroundColor: '#1E3A8A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    transform: [{ skewX: '10deg' }, { skewX: '-10deg' }],
  },
  vivaGuardText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 50,
  },
  systemSecureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  systemSecureText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default SplashScreen;
