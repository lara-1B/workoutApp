import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import Images from '../services/Images';

const AccountScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    bmi: '',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('@user_data');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (e) {
        console.error('Failed to load user data', e);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const height = parseFloat(userData.height);
      const weight = parseFloat(userData.weight);
      const bmi = height && weight ? (weight / ((height / 100) ** 2)).toFixed(2) : '';
      const newUserData = { ...userData, bmi };
      await AsyncStorage.setItem('@user_data', JSON.stringify(newUserData));
      setUserData(newUserData);
      setEditing(false);
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <ImageBackground
      source={Images.splash4}
      style={styles.background}
      blurRadius={6}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'transparent' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.topRow}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editIconBtn}>
              <Ionicons name={editing ? 'close' : 'create-outline'} size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Ionicons name="person-circle-outline" size={90} color="#fff" />
            </View>
            {editing ? (
              <TextInput
                style={styles.inputName}
                placeholder="Name"
                placeholderTextColor="#666"
                value={userData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            ) : (
              <Text style={styles.name}>{userData.name || 'Your Name'}</Text>
            )}
          </View>

          <View style={styles.infoSection}>
            {editing ? (
              <>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your age"
                  placeholderTextColor="#666"
                  value={String(userData.age)}
                  keyboardType="number-pad"
                  onChangeText={(text) => handleChange('age', text)}
                />
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your height in cm"
                  placeholderTextColor="#666"
                  value={String(userData.height)}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('height', text)}
                />
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your weight in kg"
                  placeholderTextColor="#666"
                  value={String(userData.weight)}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('weight', text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>Age</Text>
                <Text style={styles.infoText}>{userData.age}</Text>
                <View style={styles.divider} />
                <Text style={styles.label}>Height (cm)</Text>
                <Text style={styles.infoText}>{userData.height}cm</Text>
                <View style={styles.divider} />
                <Text style={styles.label}>Weight (kg)</Text>
                <Text style={styles.infoText}>{userData.weight}kgs</Text>
                <View style={styles.divider} />
                <Text style={styles.label}>BMI</Text>
                <Text style={styles.infoText}>{userData.bmi || '—'}</Text>
              </>
            )}
          </View>

          {editing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Navbar />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: 'transparent',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  editIconBtn: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 6,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  inputName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  infoSection: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    padding: 18,
    gap: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoText: {
    color: '#ddd',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  input: {
    color: '#fff',
    fontSize: 17,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingVertical: 4,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  divider: {
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  saveButton: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  saveText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  label: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
    marginTop: 8,
    letterSpacing: 0.2,
  },
});

export default AccountScreen;
