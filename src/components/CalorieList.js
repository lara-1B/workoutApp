import React, { useContext, useMemo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WorkoutContext } from '../context/WorkoutContext';
import { hiitWorkouts } from '../services/WorkoutData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WEEK_STORAGE_KEY = '@calorie_week_start';

const getWeekStart = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
  const sunday = new Date(now);
  sunday.setHours(0, 0, 0, 0);
  sunday.setDate(now.getDate() - dayOfWeek);
  return sunday.toISOString().slice(0, 10);
};

const getWeekDates = (weekStart) => {
  const weekDates = [];
  const start = new Date(weekStart);
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    weekDates.push(d.toISOString().slice(0, 10));
  }
  return weekDates;
};

const CalorieList = () => {
  const { completed } = useContext(WorkoutContext);
  const [weekStart, setWeekStart] = useState(getWeekStart());

  // On mount, check if stored weekStart is current, else reset
  useEffect(() => {
    const checkWeek = async () => {
      try {
        const stored = await AsyncStorage.getItem(WEEK_STORAGE_KEY);
        const current = getWeekStart();
        if (stored !== current) {
          await AsyncStorage.setItem(WEEK_STORAGE_KEY, current);
          setWeekStart(current);
        } else {
          setWeekStart(stored || current);
        }
      } catch (e) {
        setWeekStart(getWeekStart());
      }
    };
    checkWeek();
  }, []);

  // Map workout names to calories for quick lookup
  const calorieMap = useMemo(() => {
    const map = {};
    hiitWorkouts.forEach(w => { map[w.name] = w.calories; });
    return map;
  }, []);

  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);
  let totalCalories = 0;
  let dailyCalories = [];

  weekDates.forEach(date => {
    const workouts = completed[date] || [];
    const calories = workouts.reduce((sum, name) => sum + (calorieMap[name] || 0), 0);
    dailyCalories.push({ date, calories });
    totalCalories += calories;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calories Burned This Week</Text>
      <View style={styles.totalRow}>
        <Text style={styles.total}>{totalCalories}</Text>
        <Text style={styles.totalUnit}>kcal</Text>
      </View>
      <View style={styles.list}>
        {dailyCalories.map(({ date, calories }) => (
          <View key={date} style={[styles.row, calories > 0 && styles.rowActive]}>
            <Text style={[styles.date, calories > 0 && styles.dateActive]}>
              {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </Text>
            <Text style={[styles.calories, calories > 0 && styles.caloriesActive]}>
              {calories > 0 ? `+${calories}` : '0'} kcal
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderRadius: 18,
    padding: 18,
    marginVertical: 16,
    width: screenWidth * 0.95,
    maxWidth: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  total: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff7043',
    marginRight: 6,
    letterSpacing: 1,
  },
  totalUnit: {
    fontSize: 18,
    color: '#ff7043',
    fontWeight: '600',
    marginBottom: 4,
  },
  list: {
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  rowActive: {
    backgroundColor: 'rgba(255,112,67,0.13)',
  },
  date: {
    color: '#bbb',
    fontSize: 16,
    fontWeight: '500',
  },
  dateActive: {
    color: '#fff',
    fontWeight: '700',
  },
  calories: {
    color: '#bbb',
    fontSize: 16,
    fontWeight: '500',
  },
  caloriesActive: {
    color: '#ff7043',
    fontWeight: '700',
  },
});

export default CalorieList;
