import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SplashImage = ({
  image,
  showSkip,
  onSkip,
  showStart,
  onStart,
  header,
  description,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={image}
        style={styles.background}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {showSkip && (
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Bottom Section with Wave and Text */}
        <View style={styles.bottomContainer}>
          <Svg height={80} width="100%" viewBox="0 0 1440 320" style={styles.wave}>
            <Path
              fill="#fff"
              d="M0,160L60,160C120,160,240,160,360,181.3C480,203,600,245,720,234.7C840,224,960,160,1080,122.7C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </Svg>

          <View style={styles.textContent}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {showStart && (
          <TouchableOpacity onPress={onStart} style={styles.startButton}>
            <Text style={styles.startText}>Let's Start</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    width,
    height,
    alignSelf: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#fff',
    fontWeight: '600',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wave: {
    marginTop: -1,
  },
  textContent: {
    paddingHorizontal: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  startButton: {
    position: 'absolute',
    top: height / 2 - 28,
    right: 0,
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  startText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SplashImage;
