import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 7;

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDatesAroundToday = () => {
  const today = new Date();
  const result = [];

  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = days[date.getDay()];
    const dateNum = String(date.getDate()).padStart(2, '0');

    result.push({
      key: i.toString(),
      day,
      dateNum,
      isToday: i === 0,
    });
  }

  return result;
};

const DayList = () => {
  const [dates, setDates] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    const list = getDatesAroundToday();
    setDates(list);

    // Scroll to the center item on mount
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: 3, animated: true });
    }, 100);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, item.isToday && styles.activeCard]}>
      <Text style={[styles.dayText, item.isToday && styles.activeDay]}>
        {item.day}
      </Text>
      <View style={[styles.circle, item.isToday && styles.activeCircle]}>
        <Text style={[styles.dateText, item.isToday && styles.activeDate]}>
          {item.dateNum}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dates}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // Set your desired height here
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dayText: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  dateText: {
    color: '#000',
    fontWeight: '600',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCard: {
    backgroundColor: '#fff',
  },
  activeDay: {
    color: '#000',
  },
  activeCircle: {
    backgroundColor: '#000',
  },
  activeDate: {
    color: '#fff',
  },
});

export default DayList;
