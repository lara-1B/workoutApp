import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WorkoutList = ({ name, calories, description, icon, onPress, done }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color="#ff7043" />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.calories}>{calories} kcal / 45s</Text>
      {done && (
        <Text style={styles.doneText}>Done Today</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: '48%', 
    backgroundColor: '#222',
    borderRadius: 15,
    marginVertical: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginBottom: 6,
    backgroundColor: '#fff2',
    borderRadius: 20,
    padding: 6,
    alignSelf: 'flex-start',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  description: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 6,
  },
  calories: {
    color: '#ff7043',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 'auto',
  },
  doneText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 6,
  },
});

export default WorkoutList;
