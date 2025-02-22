import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

export const useStyleCamera = () => {
  const { backgrounds, layout, borders, colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        btn_camera: {
          backgroundColor: colors.alias_on_surface,
          borderColor: colors.gray200,
          borderRadius: 100,
          borderWidth: 5,
          height: 64,
          width: 64,
        },
        btn_dele: {
          alignItems: 'center',
          backgroundColor: colors.red500,
          borderRadius: 100,
          height: 40,
          justifyContent: 'center',
          width: 40,
        },
        btn_gallery: {
          alignItems: 'center',
          backgroundColor: colors.alias_on_surface,
          borderColor: colors.gray200,
          borderRadius: 100,
          height: 44,
          justifyContent: 'center',
          width: 44,
        },
        camera_contain: {
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: colors.alias_on_surface,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 32,
          position: 'absolute',
          width: '100%',
          zIndex: 88,
        },
        scan: {
          backgroundColor: colors.alias_comp_button_primary,
          borderRadius: 8,
          alignItems:'center',
          flexDirection:"row",
          padding: 16
        },
        ct_gallery: {},
        ic_dele: {},
      }),
    [],
  );
};
