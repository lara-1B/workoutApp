import { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkoutContext } from '../context/WorkoutContext'; 

const Timer = ({ workoutName }) => {
  const [seconds, setSeconds] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); 
  const timerRef = useRef(null);
  const { markWorkoutDone } = useContext(WorkoutContext); // <-- get from context

  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);

      // Save workout log to AsyncStorage
      const saveLog = async () => {
        const log = {
          date: new Date().toISOString(),
          workoutName: workoutName || 'Unknown',
          completed: true,
        };
        try {
          const prev = await AsyncStorage.getItem('@workout_logs');
          let logs = [];
          if (prev) {
            logs = JSON.parse(prev);
          }
          logs.push(log);
          await AsyncStorage.setItem('@workout_logs', JSON.stringify(logs));
        } catch (e) {
          // Optionally handle error
        }
      };
      saveLog();

      if (workoutName) {
        markWorkoutDone(workoutName);
      }
    }
  }, [seconds, workoutName, markWorkoutDone]);

  const handleLeftButton = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setSeconds(45);
    setIsRunning(false);
    setHasStarted(false);
  };

  const getLeftButtonText = () => {
    if (!hasStarted) return 'Start';
    return isRunning ? 'Pause' : 'Resume';
  };

  return (
    <View style={styles.container}>
      {seconds > 0 ? (
        <>
          <Text style={styles.timer}>{`00:${seconds.toString().padStart(2, '0')}s`}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleLeftButton} style={styles.button}>
              <Text style={styles.buttonText}>{getLeftButtonText()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStop} style={styles.button}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.congrats}>
          <Text style={styles.congratsText}>You finished The workout </Text>
          <Text style={styles.congratsText}>Well Done !</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ddd',
    borderRadius: 12,
  },
  timer: {
    fontSize: 102,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  congrats: {
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 26,
    fontWeight: '400',
    marginTop: 10,
    color: 'green',
  },
});

export default Timer;
