import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { IconByVariant } from '@/components/atoms';

import ItemTabbar from './item-tabbar';
import { useStyle } from './styles';

export const CustomTabbar = (props: BottomTabBarProps) => {
  const { navigation, state } = props;
  const styles = useStyle();
  const { borders, colors, fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();
  const _onPressCenter = useCallback(() => {
    navigation.navigate(Paths.CameraScreen);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={[
          layout.row,
          layout.flex_1,
          layout.justifyAround
        ]}
      >
        {state.routes.map((route, index) => {
          return (
            <ItemTabbar
              key={route?.key}
              state={state}
              index={index}
              navigation={navigation}
            />
          );
        })}
      </View>
      <View
        style={[layout.absolute, layout.z10, layout.selfCenter, {bottom: 32}]}
      >
        <TouchableOpacity
          onPress={_onPressCenter}
          style={[
            styles.center,
            layout.itemsCenter,
            layout.row,
            borders.rounded_8,
            gutters.paddingVertical_8,
            gutters.paddingHorizontal_24,
          ]}
        >
          <IconByVariant
            color={colors.alias_on_surface}
            height={16}
            path="ic-plus"
            style={[gutters.marginRight_8]}
            width={16}
          />
          <Text
            style={[
              fonts.medium,
              fonts.size_16,
              { color: colors.alias_on_surface },
            ]}
          >
            {t('text.scan').toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
