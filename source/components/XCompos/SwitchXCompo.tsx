import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useSharedValue, useAnimatedStyle, withSpring, withTiming, useDerivedValue, runOnJS } from 'react-native-reanimated';

interface Props {
  onValueChange?: (val: boolean) => void;
  value: boolean;
  size?: number;
  sty?: StyleProp<ViewStyle>;
  col?: string[];
  bgCol?: string[];
  disabled?: boolean;
};
const dCol = ["#8EA2BE", "#174D95"]; // default color;
const dBgCol = ["#E9EFFF", "#D4E5FD"]; // default background color;

const SwitchXCompo = ({ onValueChange, value, size = 28, sty, col = dCol, bgCol = dBgCol, disabled }: Props) => {
  const elevation = size * 0.08; // Calculate dynamic elevation based on size
  const styles = StyleSheet.create({
    "container": {
      "width": size * 1.8, // Adjusted width based on size prop
      "height": size,
      "borderRadius": size / 2,
      "justifyContent": 'center',
      "backgroundColor": '#E9EFFF',
    },
    "circle": {
      "width": size - size * 0.16, // Adjusted width based on size prop
      "height": size - size * 0.16,
      "borderRadius": size / 2,
      "backgroundColor": '#8EA2BE',
      "shadowColor": 'black',
      "shadowOffset": { width: 0, height: 2 },
      "shadowOpacity": 0.2,
      "shadowRadius": elevation / 2, // Set dynamic shadow radius based on elevation
      "elevation": elevation, // Set dynamic elevation
    }
  });

  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  const switchScale = useSharedValue(1);

  // Progress Value
  const progress = useDerivedValue(() => {
    return withTiming(value ? size - size * 0.16 : size * 0.12);
  });

  // useEffect for change the switchTranslate Value
  useEffect(() => {
    switchTranslate.value = value ? (size - size * 0.14) : (size * 0.08);
  }, [value, switchTranslate, size]);

  // Circle Animation
  const customSpringStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchTranslate.value,
      [0, size - size * 0.16],
      [col[0], col[1]]
    );


    return {
      "transform": [{
        "translateX": withSpring(switchTranslate.value, {
          "mass": 1,
          "damping": 15,
          "stiffness": 120,
          "overshootClamping": false,
          "restSpeedThreshold": 0.001,
          "restDisplacementThreshold": 0.001,
        })
      }, { "scale": switchScale.value }],
      backgroundColor
    };
  });

  const ctx = useSharedValue(0);
  const sConfig: any = { "mass": .1, "damping": 500, "stiffness": 700 };

  const pan = Gesture.Pan().runOnJS(true).onStart(() => {
    ctx.value = switchTranslate.value
    switchScale.value = withTiming(1.1);
  }).runOnJS(true).onUpdate(({ translationX }) => {
    var tX = translationX + ctx.value;
    tX = Math.max(tX, size * 0.12);
    tX = Math.min(tX, size - size * 0.16);
    switchTranslate.value = withSpring(tX, { ...sConfig, "stiffness": 900 })
  }).runOnJS(true).onEnd(({ x }) => {
    if (x > size - size * 0.16 / 2) {
      !value && onValueChange && runOnJS(onValueChange)(true);
      switchTranslate.value = withSpring(size - size * 0.16, sConfig)
    } else {
      value && onValueChange && runOnJS(onValueChange)(false);
      switchTranslate.value = withSpring(size * 0.12, sConfig)
    }
    switchScale.value = withTiming(1);
  });


  // Background Color Animation
  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchTranslate.value,
      [0, size - size * 0.16],
      [bgCol[0], bgCol[1]],
    );
    return { backgroundColor };
  });

  return (
    <GestureDetector gesture={pan}>
      <TouchableOpacity onPress={() => onValueChange && onValueChange(!value)} hitSlop={10} style={[{ opacity: disabled ? 0.5 : 1 }, sty]} disabled={disabled} activeOpacity={1}>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <Animated.View style={[styles.circle, customSpringStyles]} />
        </Animated.View>
      </TouchableOpacity>
    </GestureDetector>
  );
};

export default SwitchXCompo;