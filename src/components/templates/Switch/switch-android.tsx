import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Animated, { Extrapolate, useAnimatedStyle } from 'react-native-reanimated';

import { useInterpolate, useInterpolateColor, useMix, useSharedTransition } from '@/utils/animated';
import { execFunc } from '@/utils/common';

import {
  BORDER_OFF_COLOR,
  BORDER_RADIUS_ANDROID,
  MARGIN,
  OFF_POSITION_ANDROID,
  OFF_TRACK_COLOR,
  ON_POSITION_ANDROID,
  ON_TRACK_COLOR,
  SHADOW_COLOR,
  THUMB_SIZE_ANDROID,
  TRACK_HEIGHT,
  WIDTH,
} from './constants';
import type { SwitchProps } from './type';
import { useTheme } from '@/theme';

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
  },
  track: {
    width: WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: BORDER_RADIUS_ANDROID,
    borderWidth: MARGIN / 2,
    borderColor: BORDER_OFF_COLOR,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE_ANDROID,
    top: -(THUMB_SIZE_ANDROID - TRACK_HEIGHT + MARGIN) / 2,
    height: THUMB_SIZE_ANDROID,
    borderColor: BORDER_OFF_COLOR,
    borderRadius: THUMB_SIZE_ANDROID / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const Switch = ({
  value: overwriteValue,
  onToggle,
  disable = false,
  initialValue = false,
}: Omit<SwitchProps, 'type'>) => {
  // state
  const [value, setValue] = useState<boolean>(initialValue);
  const { colors } = useTheme();

  // reanimated
  const progress = useSharedTransition(overwriteValue ?? value);
  const opacity = useMix(useSharedTransition(disable), 1, 0.5);
  const translateX = useInterpolate(
    progress,
    [0, 1],
    [OFF_POSITION_ANDROID, ON_POSITION_ANDROID],
    Extrapolate.CLAMP
  );
  const backgroundTrackColor = useInterpolateColor(
    progress,
    [0, 1],
    [OFF_TRACK_COLOR, ON_TRACK_COLOR]
  );
  const backgroundThumbColor = useInterpolateColor(
    progress,
    [0, 1],
    [colors.gray200, colors.alias_comp_button_primary]
  );

  // function
  const _onToggle = useCallback(() => {
    if (typeof overwriteValue === 'boolean') {
      execFunc(onToggle, overwriteValue);
    } else {
      execFunc(onToggle, !value);
      setValue((v) => !v);
    }
  }, [onToggle, overwriteValue, value]);

  // reanimated style
  const wrapAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundTrackColor.value as string,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundThumbColor.value as string,
    transform: [{ translateX: translateX.value }],
  }));

  // render
  return (
    <Animated.View style={[styles.wrap, wrapAnimatedStyle]}>
      <TouchableWithoutFeedback disabled={disable} onPress={_onToggle}>
        <Animated.View style={[styles.track, animatedTrackStyle]}>
          <Animated.View style={[styles.thumb, animatedThumbStyle]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
