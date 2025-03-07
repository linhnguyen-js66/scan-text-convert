import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useImageStyle = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: 'transparent',
          position: 'relative',
          overflow: 'hidden',
        },
        placeholder: {
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [colors]
  );
};
