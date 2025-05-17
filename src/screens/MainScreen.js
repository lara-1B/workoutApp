import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import DayList from '../components/DayList';
import Images from '../services/Images'; 
import ProgressRing from '../components/ProgressRing'
import CalorieList from '../components/CalorieList';
import GreetingsComponent from '../components/GreetingsComponent';
const MainScreen = () => {
  return (
    <ImageBackground
      source={Images.splash4}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.text}>Training Plan</Text>
          <DayList />
          <GreetingsComponent />
          <ProgressRing />
          <CalorieList />
         
        </ScrollView>
        <Navbar />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40, 
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },
});

export default MainScreen;
