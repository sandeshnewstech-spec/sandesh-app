import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  withSequence,
  Easing,
  interpolate,
  withDelay,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type LoaderType =
  | 'samsung'
  | 'pulsingDots'
  | 'rotatingSquare'
  | 'wave'
  | 'circular'
  | 'bouncing'
  | 'draggable'
  | 'morphing'
  | 'orbital';

interface LoaderProps {
  type: LoaderType;
  size?: number;
  color?: string;
  secondaryColor?: string;
  style?: ViewStyle;
}

const Loader: React.FC<LoaderProps> = ({
  type,
  size = 60,
  color = '#3b82f6',
  secondaryColor = '#8b5cf6',
  style,
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'samsung':
        return <SamsungLoader size={size} color={color} />;
      case 'pulsingDots':
        return <PulsingDots size={size} color={color} />;
      case 'rotatingSquare':
        return <RotatingSquare size={size} color={color} />;
      case 'wave':
        return <WaveLoader size={size} color={color} />;
      case 'circular':
        return <CircularProgress size={size} color={color} />;
      case 'bouncing':
        return <BouncingBall size={size} color={color} />;
      case 'draggable':
        return <DraggableSpinner size={size} color={color} />;
      case 'morphing':
        return <MorphingShapes size={size} color={color} />;
      case 'orbital':
        return <OrbitalLoader size={size} color={color} secondaryColor={secondaryColor} />;
      default:
        return <SamsungLoader size={size} color={color} />;
    }
  };

  return (
    <View style={[styles.loaderWrapper, style]}>
      {renderLoader()}
    </View>
  );
};

// Samsung-style Loader
const SamsungLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const dots = Array(8).fill(0);
  const animations = dots.map(() => useSharedValue(0));

  useEffect(() => {
    animations.forEach((anim, i) => {
      anim.value = withDelay(
        i * 100,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
          ),
          -1
        )
      );
    });
  }, []);

  const dotSize = size / 8 + 3;
  const radius = size / 2 - dotSize;

  return (
    <View style={[styles.samsungContainer, { width: size, height: size }]}>
      {animations.map((anim, i) => {
        const angle = (i * 360) / 8;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        const animStyle = useAnimatedStyle(() => ({
          opacity: interpolate(anim.value, [0, 1], [0.2, 1]),
          transform: [
            { scale: interpolate(anim.value, [0, 1], [0.4, 1]) },
          ],
        }));

        return (
          <Animated.View
            key={i}
            style={[
              styles.samsungDot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: color,
                left: size / 2 + x - dotSize / 2,
                top: size / 2 + y - dotSize / 2,
              },
              animStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

// Pulsing Dots Loader
const PulsingDots: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const dots = [0, 1, 2];
  const animations = dots.map(() => useSharedValue(0));

  useEffect(() => {
    animations.forEach((anim, i) => {
      anim.value = withDelay(
        i * 200,
        withRepeat(
          withSequence(
            withSpring(1, { damping: 2, stiffness: 100 }),
            withSpring(0, { damping: 2, stiffness: 100 })
          ),
          -1
        )
      );
    });
  }, []);

  const dotSize = size / 4;

  return (
    <View style={styles.dotsRow}>
      {animations.map((anim, i) => {
        const animStyle = useAnimatedStyle(() => ({
          transform: [{ scale: interpolate(anim.value, [0, 1], [0.5, 1.5]) }],
          opacity: interpolate(anim.value, [0, 1], [0.3, 1]),
        }));

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: color,
              },
              animStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

// Rotating Square Loader
const RotatingSquare: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.square,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 8,
        },
        animStyle,
      ]}
    />
  );
};

// Wave Loader
const WaveLoader: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const bars = Array(5).fill(0);
  const animations = bars.map(() => useSharedValue(0));

  useEffect(() => {
    animations.forEach((anim, i) => {
      anim.value = withDelay(
        i * 100,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 500 }),
            withTiming(0, { duration: 500 })
          ),
          -1
        )
      );
    });
  }, []);

  const barWidth = size / 8;
  const maxHeight = size;

  return (
    <View style={[styles.waveContainer, { height: maxHeight }]}>
      {animations.map((anim, i) => {
        const animStyle = useAnimatedStyle(() => ({
          height: interpolate(anim.value, [0, 1], [maxHeight * 0.2, maxHeight]),
          opacity: interpolate(anim.value, [0, 1], [0.3, 1]),
        }));

        return (
          <Animated.View
            key={i}
            style={[
              styles.bar,
              {
                width: barWidth,
                backgroundColor: color,
                borderRadius: barWidth / 2,
              },
              animStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

// Circular Progress Loader
const CircularProgress: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const borderWidth = size / 10;

  return (
    <Animated.View
      style={[
        styles.circularSegment,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          borderColor: color,
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        },
        animStyle,
      ]}
    />
  );
};

// Bouncing Ball Loader
const BouncingBall: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const ballSize = size / 2;

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withSpring(-size * 0.6, { damping: 5, stiffness: 100 }),
        withSpring(0, { damping: 5, stiffness: 100 })
      ),
      -1
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 300 }),
        withTiming(1, { duration: 300 })
      ),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scaleX: interpolate(translateY.value, [-size * 0.6, 0], [1, scale.value]) },
      { scaleY: interpolate(translateY.value, [-size * 0.6, 0], [1, scale.value]) },
    ],
  }));

  return (
    <View style={[styles.ballContainer, { height: size }]}>
      <Animated.View
        style={[
          styles.ball,
          {
            width: ballSize,
            height: ballSize,
            borderRadius: ballSize / 2,
            backgroundColor: color,
          },
          animStyle,
        ]}
      />
      <View
        style={[
          styles.shadow,
          {
            width: ballSize,
            height: ballSize / 4,
            borderRadius: ballSize / 2,
          },
        ]}
      />
    </View>
  );
};

// Draggable Spinner
const DraggableSpinner: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );
  }, []);

  const pan = Gesture.Pan()
    .onStart(() => {
      savedRotation.value = rotation.value % 360;
    })
    .onUpdate((e) => {
      const angle = Math.atan2(e.translationY, e.translationX) * (180 / Math.PI);
      rotation.value = savedRotation.value + angle;
    });

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const borderWidth = size / 10;

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: borderWidth / 2,
          },
          animStyle,
        ]}
      >
        <View
          style={[
            styles.spinnerSegment,
            {
              width: size - borderWidth,
              height: size - borderWidth,
              borderRadius: (size - borderWidth) / 2,
              borderWidth: borderWidth,
              borderColor: color,
              borderTopColor: 'transparent',
              borderLeftColor: 'transparent',
            },
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

// Morphing Shapes
const MorphingShapes: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const morph = useSharedValue(0);

  useEffect(() => {
    morph.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(morph.value, [0, 1], [size / 8, size / 2]),
    transform: [
      { rotate: `${interpolate(morph.value, [0, 1], [0, 180])}deg` },
      { scale: interpolate(morph.value, [0, 1], [1, 1.2]) },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.morphShape,
        {
          width: size,
          height: size,
          backgroundColor: color,
        },
        animStyle,
      ]}
    />
  );
};

// Orbital Loader
const OrbitalLoader: React.FC<{
  size: number;
  color: string;
  secondaryColor: string;
}> = ({ size, color, secondaryColor }) => {
  const rotation = useSharedValue(0);
  const orbitals = [0, 1, 2];

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );
  }, []);

  const centerSize = size / 4;
  const dotSize = size / 8;
  const orbitRadius = size / 2 - dotSize;

  return (
    <View style={[styles.orbitalContainer, { width: size, height: size }]}>
      <View
        style={[
          styles.orbitalCenter,
          {
            width: centerSize,
            height: centerSize,
            borderRadius: centerSize / 2,
            backgroundColor: secondaryColor,
          },
        ]}
      />
      {orbitals.map((_, i) => {
        const animStyle = useAnimatedStyle(() => ({
          transform: [
            { rotate: `${rotation.value + i * 120}deg` },
            { translateX: orbitRadius },
          ],
        }));

        return (
          <Animated.View
            key={i}
            style={[
              styles.orbitalDot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: color,
              },
              animStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  samsungContainer: {
    position: 'relative',
  },
  samsungDot: {
    position: 'absolute',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  dot: {},
  square: {},
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bar: {},
  circularSegment: {},
  ballContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ball: {},
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
  },
  spinner: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(100,116,139,0.2)',
  },
  spinnerSegment: {},
  morphShape: {},
  orbitalContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitalCenter: {
    position: 'absolute',
  },
  orbitalDot: {
    position: 'absolute',
  },
});

export default Loader;