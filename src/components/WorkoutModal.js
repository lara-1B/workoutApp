import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import Timer from './Timer'; // import Timer

const WorkoutModal = ({ visible, onClose, workout, onStart, done }) => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!visible) setStarted(false); // reset started when modal closes
  }, [visible]);

  if (!workout) return null;

  const handleStart = () => {
    setStarted(true);
    if (onStart) onStart();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[
          styles.modalContent,
          started && styles.modalContentStarted // apply new style if started
        ]}>
          {/* Close (cross) button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={styles.header}>Workout</Text>
          <Text style={styles.name}>{workout.name}</Text>
          <Text style={styles.description}>{workout.description}</Text>
          <Text style={styles.duration}>Duration: 45 seconds</Text>

          {done && (
            <Text style={{ color: 'green', fontWeight: 'bold', marginTop: 8 }}>
              Already completed today!
            </Text>
          )}

          <Text style={styles.stepsHeader}>Steps:</Text>
          <ScrollView style={styles.stepsContainer}>
            {workout.steps?.map((step, index) => (
              <Text key={index} style={styles.stepItem}>
                {index + 1}. {step}
              </Text>
            ))}
          </ScrollView>
          {started && (
            <View style={{ marginTop: 20 }}>
              <Timer workoutName={workout?.name} />
            </View>
          )}

          {!started && !done && (
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: '#000a',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 6,
  },
  modalContent: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    padding: 24,
    width: '95%',
    height: '45%',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  modalContentStarted: {
    height: '60%', // new style for started state
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  duration: {
    fontSize: 14,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  stepsHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  stepsContainer: {
    alignSelf: 'stretch',
    marginTop: 6,
    marginBottom: 12,
  },
  stepItem: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WorkoutModal;
