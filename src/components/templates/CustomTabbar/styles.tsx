import { useMemo } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

const HEIGHT_BOTTOM_BAR = 68;
const K_SCREEN_WIDTH = Dimensions.get('window').width;
const K_IS_IOS = Platform.OS == 'ios';
export const useStyle = () => {
  // state
  const { colors } = useTheme();
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        center: {
          backgroundColor: colors.alias_comp_button_primary,
          height: 44,
        },
        centerBtnContainer: {
          alignItems: 'center',
          height: 64,
          justifyContent: 'center',
          width: 64,
        },
        container: {
          backgroundColor: colors.purple100,
          bottom: 0,
          left: 0,
          paddingVertical: 16,
          position: 'absolute',
          right: 0
        },
        ic_bottom_bar: {
          height:
            (K_SCREEN_WIDTH * HEIGHT_BOTTOM_BAR) / 375 + (K_IS_IOS ? 3 : 9),
          width: K_SCREEN_WIDTH,
        },
        ic_bottom_bar_wrap: {
          height:
            (K_SCREEN_WIDTH * HEIGHT_BOTTOM_BAR) / 375 + (K_IS_IOS ? 3 : 9),
          width: K_SCREEN_WIDTH,
        },
        ic_qr: { height: 94, width: 94 },
        qr_wrap: { height: 64, width: 64 },
      }),
    [],
  );
};
