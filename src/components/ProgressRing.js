import React, { useMemo, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { WorkoutContext } from '../context/WorkoutContext'; // <-- import context

const TOTAL_SEGMENTS = 10;
const RADIUS = 80;
const STROKE_WIDTH = 20;

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
};

const ProgressRing = () => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const { completed } = useContext(WorkoutContext); // <-- get from context
  const completedWorkouts = (completed[today] || []).length;

  const arcs = [];
  const anglePerSegment = 180 / TOTAL_SEGMENTS;
  const centerX = 100;
  const centerY = 100;

  for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;
    const isFilled = i < completedWorkouts;

    arcs.push(
      <Path
        key={i}
        d={describeArc(centerX, centerY, RADIUS, startAngle, endAngle)}
        stroke={isFilled ? '#000' : '#999'}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="round"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Activities</Text>

      <Svg height="200" width="200">
        {arcs}
      </Svg>

      <View style={styles.centerText}>
        <Text style={styles.countText}>{completedWorkouts}/{TOTAL_SEGMENTS}</Text>
        <Text style={styles.label}>Workout</Text>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 5, // remove horizontal padding
    borderRadius: 16,
    width: screenWidth * 0.95, // expand to 95% width
    alignSelf: 'center',
    marginTop: 20,
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
  },
  centerText: {
    position: 'absolute',
    top: 120,
    alignItems: 'center',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
});

export default ProgressRing;
