import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Contact {
  id: string;
  initials: string;
  name: string;
  phone: string;
  color: string;
}

const ContactsScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', initials: 'MK', name: 'Michael Kovic', phone: '+1 (555) 123-4567', color: '#4299E1' },
    { id: '2', initials: 'EL', name: 'Elena Lopez', phone: '+1 (555) 987-6543', color: '#A0AEC0' },
    { id: '3', initials: 'DW', name: 'David Wilson', phone: '+1 (555) 246-8135', color: '#ED8936' },
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleSaveContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      Alert.alert('Error', 'Please enter both name and phone number.');
      return;
    }

    const initials = newName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const colors = ['#4299E1', '#A0AEC0', '#ED8936', '#48BB78', '#9F7AEA'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newContact: Contact = {
      id: Date.now().toString(),
      initials: initials || '?',
      name: newName,
      phone: newPhone,
      color: randomColor,
    };

    setContacts([newContact, ...contacts]);
    setNewName('');
    setNewPhone('');
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Trusted Contacts</Text>
          <Text style={styles.subtitle}>Manage who is notified during emergencies.</Text>
        </View>

        {/* Add New Contact Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.addIcon}>👤+</Text>
            <Text style={styles.cardTitle}>Add New Contact</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Sarah Jenkins"
              placeholderTextColor="#A0AEC0"
              value={newName}
              onChangeText={setNewName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor="#A0AEC0"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
            <Text style={styles.saveButtonText}>💾 Save Contact</Text>
          </TouchableOpacity>
        </View>

        {/* Contacts List */}
        <View style={styles.listContainer}>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactRow}>
              <View style={[styles.avatar, { backgroundColor: contact.color }]}>
                <Text style={styles.avatarText}>{contact.initials}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteContact(contact.id)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating SOS Button */}
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={[styles.tabIcon, styles.tabIconActive]}>👥</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>📍</Text>
          <Text style={styles.tabLabel}>Safe Zones</Text>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for tab bar and SOS button
  },
  titleSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addIcon: {
    fontSize: 20,
    color: '#3182CE',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A365D',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  saveButton: {
    backgroundColor: '#1A365D',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#718096',
  },
  deleteIcon: {
    fontSize: 22,
    color: '#E53E3E',
    padding: 5,
  },
  sosButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#C53030',
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
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
  tabItemActive: {
    // Optional: add subtle background to active tab if needed
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

export default ContactsScreen;
