import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import WorkoutContainer from '../components/WorkoutContainer';
import Navbar from '../components/Navbar';
import Images from '../services/Images';

const WorkoutScreen = () => {
  return (
    <ImageBackground
      source={Images.splash4}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <WorkoutContainer />
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
    flexGrow: 1,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
});

export default WorkoutScreen;
