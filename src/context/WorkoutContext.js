import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WorkoutContext = createContext();

const STORAGE_KEY = '@completed_workouts';
const todayKey = () => new Date().toISOString().slice(0, 10);

export const WorkoutProvider = ({ children }) => {
  const [completed, setCompleted] = useState({});

  // Load completed workouts from AsyncStorage on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setCompleted(JSON.parse(data));
      } catch (e) {
        // Optionally handle error
      }
    };
    load();
  }, []);

  // Save completed workouts to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const markWorkoutDone = useCallback((workoutName) => {
    setCompleted((prev) => {
      const date = todayKey();
      const prevForDate = prev[date] || [];
      if (prevForDate.includes(workoutName)) return prev;
      const updated = {
        ...prev,
        [date]: [...prevForDate, workoutName],
      };
      return updated;
    });
  }, []);

  const loadCompleted = useCallback((data) => {
    setCompleted(data || {});
  }, []);

  return (
    <WorkoutContext.Provider value={{ completed, markWorkoutDone, loadCompleted }}>
      {children}
    </WorkoutContext.Provider>
  );
};
