import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const tabToScreen = {
  Home: 'Main',
  Workouts: 'Workout',
  Account: 'Account',
};

const Navbar = ({ current }) => {
  const navigation = useNavigation();

  const handlePress = (tab) => {
    const screen = tabToScreen[tab];
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Home')}>
        <Ionicons
          name={current === 'Home' ? 'home' : 'home-outline'}
          size={36}
          color="#fff"
        />
        <Text style={[styles.label, current === 'Home' && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Workouts')}>
        <Ionicons
          name={current === 'Workouts' ? 'barbell' : 'barbell-outline'}
          size={36}
          color="#fff"
        />
        <Text style={[styles.label, current === 'Workouts' && styles.activeLabel]}>Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handlePress('Account')}>
        <Ionicons
          name={current === 'Account' ? 'person' : 'person-outline'}
          size={36}
          color="#fff"
        />
        <Text style={[styles.label, current === 'Account' && styles.activeLabel]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(30,30,30,0.85)',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    color: '#fff',
    marginTop: 4,
    fontWeight: 'bold',
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  activeLabel: {
    color: '#fff',
    fontWeight: '900',
    opacity: 1,
    fontSize: 17,
  },
});

export default Navbar;
