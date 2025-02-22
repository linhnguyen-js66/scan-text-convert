import { useTheme } from '@/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

const PaginationDots = ({
  currentIndex,
}: {
  currentIndex: Animated.SharedValue<number>;
}) => {
  const dots = [0, 1, 2]; // Giả sử có 3 trang
const {colors} = useTheme()
  return (
    <View style={styles.container}>
      {dots.map((dotIndex) => {
        const animatedStyle = useAnimatedStyle(() => {
          const width = interpolate(
            currentIndex.value,
            [dotIndex - 1, dotIndex, dotIndex + 1],
            [8, 40, 8],
            'clamp',
          );

          const backgroundColor = interpolateColor(
            currentIndex.value,
            [dotIndex - 1, dotIndex, dotIndex + 1],
            [colors.alias_surface , colors.alias_comp_button_primary , colors.alias_surface],
          );

          return {
            backgroundColor,
            width,
          };
        });

        return (
          <Animated.View key={dotIndex} style={[styles.dot, animatedStyle]} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#ADADAD',
    borderRadius: 4,
    height: 8,
  },
});

export default PaginationDots;
