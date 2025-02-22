import type { SwitchProps } from './type';

import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';

import { useInterpolate, useMix, useSharedTransition } from '@/utils/animated';
import { execFunc, sizeScale } from '@/utils/common';

const styles = StyleSheet.create({
  track: {
    width: sizeScale(40),
    height: sizeScale(20),
    borderRadius: sizeScale(10),
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    borderRadius: sizeScale(10),
  },
});

export const Switch = ({
  onToggle,
  value: overwriteValue,
  disable = false,
  initialValue = false,
  color,
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
    [sizeScale(2), sizeScale(20)],
    Extrapolation.CLAMP,
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
  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray200, color ?? colors.alias_comp_button_primary],
    ),
    opacity: opacity.value,
  }));

  const animatedThumbStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        [
          colors.alias_comp_button_primary,
          colors.alias_comp_button_primary,
          'transparent',
        ],
      ),
      transform: [{ translateX: translateX.value }],
    }),
    [colors],
  );

  const hitSlopSpace = 10;

  // render
  return (
    <TouchableWithoutFeedback
      disabled={disable}
      hitSlop={{
        bottom: hitSlopSpace,
        left: hitSlopSpace,
        right: hitSlopSpace,
        top: hitSlopSpace,
      }}
      onPress={_onToggle}
    >
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
          <IconByVariant
            color={colors.alias_on_surface}
            height={sizeScale(16)}
            path="ic-switch"
            width={sizeScale(16)}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
