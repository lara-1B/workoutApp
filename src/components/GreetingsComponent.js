import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

const GreetingsComponent = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await AsyncStorage.getItem('@user_data');
        if (data) {
          const user = JSON.parse(data);
          setName(user.name || '');
        }
      } catch (e) {
        // Optionally handle error
      }
    };
    fetchName();
  }, []);

  const timeOfDay = getTimeOfDay();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello,{ name ? <Text style={styles.name}> {name}</Text> : '' }
        <Text style={styles.subtle}>- what a fine </Text>
        <Text style={styles.timeOfDay}>{timeOfDay}</Text>
        <Text style={styles.subtle}>!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.95,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 22,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  name: {
    color: '#ff7043',
    fontWeight: '900',
    fontSize: 20,
  },
  subtle: {
    color: '#888',
    fontWeight: '400',
    fontSize: 20,
  },
  timeOfDay: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
    textTransform: 'capitalize',
  },
});

export default GreetingsComponent;
