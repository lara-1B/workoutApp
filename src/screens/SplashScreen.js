import React, { useRef } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import SplashImage from '../components/SplashImage';
import Images from '../services/Images'

const { width } = Dimensions.get('window');

const slides = [
    {
        image: Images.splash1,
        header: 'Get Fit, Stay Focused',
        description: 'Transform your body with our high-intensity interval training workouts.',
        showSkip: true,
        showStart: false,
    },
    {
        image: Images.splash2,
        header: 'Sweat Smarter',
        description: 'Our timer-based workouts help you maximize your results in minimal time.',
        showSkip: true,
        showStart: false,
    },
    {
        image: Images.splash3,
        header: 'Push Your Limits',
        description: 'Challenge yourself with our curated HIIT workouts and track your progress.',
        showSkip: true,
        showStart: false,
    },
    {
        image: Images.splash4,
        header: 'Start Your Fitness Journey',
        description: 'Get started today and see the results youve been working towards.',
        showSkip: false,
        showStart: true,
    },
];

const SplashScreen = ({ navigation }) => {
    const scrollRef = useRef(null);

    const handleSkip = () => {
        navigation.replace("Login");
    };

    const handleStart = () => {
        navigation.replace("Login");
    };

    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            scrollEventThrottle={16}
        >
            {slides.map((slide, index) => (
                <View key={index} style={{ width }}>
                    <SplashImage
                        image={slide.image}
                        header={slide.header}
                        description={slide.description}
                        showSkip={slide.showSkip}
                        onSkip={handleSkip}
                        showStart={slide.showStart}
                        onStart={handleStart}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default SplashScreen;
