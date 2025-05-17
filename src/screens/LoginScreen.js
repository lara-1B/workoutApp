import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Images from '../services/Images';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@user_data');
        if (storedData) {
          navigation.replace('Main');
        }
      } catch (e) {
        // Optionally handle error
      }
    };
    checkUserData();
  }, [navigation]);

  const calculateBMI = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  };

  const handleSave = async () => {
    if (!name || !age || !weight || !height) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
      Alert.alert('Error', 'Please enter valid numbers for age, weight, and height');
      return;
    }

    const bmi = calculateBMI(weightNum, heightNum);

    const userData = {
      name,
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      bmi: bmi.toFixed(2),
    };

    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <ImageBackground
      source={Images.splash3}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={6}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>WELCOME</Text>

          <View style={styles.glassCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#fff"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#fff"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Height (cm)"
                  placeholderTextColor="#fff"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Weight (kg)"
                  placeholderTextColor="#fff"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Create your Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: 20,
    height:'80%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 2,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
    height: 48,
    minHeight: 48,
    maxHeight: 52,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
    width: '100%',
    minWidth: 0,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
    marginTop: 8,
    letterSpacing: 0.2,
  },
});

export default LoginScreen;
