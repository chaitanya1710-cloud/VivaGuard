import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Signing in with:', email, password);
  };

  const handleCreateAccount = () => {
    console.log('Navigate to Create Account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Shield Logo Icon */}
          <View style={styles.logoContainer}>
            <View style={styles.logoSquare}>
              <View style={styles.shieldWhite}>
                <View style={styles.shieldTop} />
                <View style={styles.shieldBottom} />
              </View>
            </View>
          </View>

          {/* Heading and Subtitle */}
          <Text style={styles.heading}>Welcome to VivaGuard</Text>
          <Text style={styles.subtitle}>Your security and reliability anchor</Text>

          {/* White Card Container */}
          <View style={styles.card}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.icon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="name@company.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.icon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="........"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Create Account Button */}
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Info */}
          <View style={styles.footerContainer}>
            <Text style={styles.encryptionText}>
              Protected by industrial-grade encryption.
            </Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity><Text style={styles.footerLinkText}>Privacy Policy</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLinkText}>Terms of Service</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLinkText}>Support</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  logoSquare: {
    width: 80,
    height: 80,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldWhite: {
    width: 40,
    height: 45,
    alignItems: 'center',
    overflow: 'hidden',
  },
  shieldTop: {
    width: 34,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  shieldBottom: {
    width: 34,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#64748B',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1E293B',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#94A3B8',
    fontSize: 16,
  },
  createAccountButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  encryptionText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 15,
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerLinkText: {
    fontSize: 14,
    color: '#94A3B8',
    marginHorizontal: 10,
    marginBottom: 5,
  },
});

export default LoginScreen;
