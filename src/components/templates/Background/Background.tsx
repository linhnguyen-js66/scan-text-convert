import type { ViewProps } from 'react-native';

import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

import { AssetByVariant, IconByVariant } from '@/components/atoms';

interface BackgroundProps extends ViewProps {
  backgroundColor?: string;
  isLinear?: boolean;
}
const BackgroundApp = (props: BackgroundProps) => {
  const { colors, layout } = useTheme();
  const {
    backgroundColor = colors.alias_on_surface,
    children,
    isLinear,
  } = props;
  const styles = useStyleBg();
  if (isLinear) {
    return (
      <View style={[layout.flex_1]}>
        <View style={styles.elipseLeft}>
          <AssetByVariant
            path={'ic-elipse-2'}
            resizeMode={'contain'}
            style={styles.border}
          />
        </View>
        <View style={styles.elipseRight}>
          <AssetByVariant
            path={'ic-elipse'}
            resizeMode={'contain'}
            style={styles.border}
          />
        </View>
        {children}
      </View>
    );
  }
  return (
    <View style={[layout.relative, layout.flex_1]}>
      {children}
      <View style={[layout.absolute, { backgroundColor, top: 0, zIndex: -88 }]}>
        <AssetByVariant
          path={'background'}
          resizeMode={'contain'}
          style={[layout.fullWidth, layout.fullHeight]}
        />
      </View>
    </View>
  );
};
export default BackgroundApp;

const useStyleBg = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        border: {
          borderRadius: '100%',
        },
        elipseLeft: {
          left: -32,
          position: 'absolute',
          top: -100,
          zIndex: -1
        },
        elipseRight: {
          bottom: -100,
          position: 'absolute',
          right: -32,
          zIndex: -1
        },
      }),
    [],
  );
};
