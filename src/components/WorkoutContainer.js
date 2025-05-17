import React, { useState, useMemo, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import WorkoutList from './WorkoutList';
import WorkoutModal from './WorkoutModal';
import { hiitWorkouts } from '../services/WorkoutData';
import { WorkoutContext } from '../context/WorkoutContext'; // <-- import context

const WorkoutContainer = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { completed } = useContext(WorkoutContext); // <-- get from context
  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const completedToday = completed[todayKey] || [];

  const handleWorkoutPress = (workout) => {
    setSelectedWorkout(workout);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <FlatList
        data={hiitWorkouts}
        renderItem={({ item }) => (
          <WorkoutList
            name={item.name}
            calories={item.calories}
            description={item.description}
            icon={item.icon}
            onPress={() => handleWorkoutPress(item)}
            done={completedToday.includes(item.name)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />

      <WorkoutModal
        visible={modalVisible}
        workout={selectedWorkout}
        onClose={() => setModalVisible(false)}
        done={selectedWorkout && completedToday.includes(selectedWorkout.name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default WorkoutContainer;
