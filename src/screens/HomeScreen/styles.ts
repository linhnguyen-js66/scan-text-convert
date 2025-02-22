import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyleHome = () => {
    const {colors} = useTheme()
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: '100%',
          width: '100%',
        },
        item_carousel: {
          alignItems: 'center',
          height: 242,
          width: '100%',
        },
        overlay: {
          alignItems: 'center',
          bottom: 0,
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        },
        overlayText: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        },
        overlayTextContainer: {
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 10,
          justifyContent: 'center',
          minHeight: 40,
          minWidth: 40,
          padding: 10,
        },
      }),
    [],
  );
};
