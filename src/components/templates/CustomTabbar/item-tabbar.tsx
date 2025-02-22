// import { isIos, K_SIZE_12, K_SIZE_SCALE_24 } from '@common';
// import { Block } from '@components/block';
// import { Button } from '@components/button';
// import { Spacer } from '@components/spacer';
// import { Text } from '@components/version-2';

// import { Space } from '@foundation';
// import { useI18nHook } from '@hooks';
import type { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import type {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

// import { useTheme } from '@react-navigation/native';
//import { selectAppConfig } from '@redux-selector/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/theme';
import useAppState from '@/hooks/useAppState';
import { Paths } from '@/navigation/paths';

import { IconByVariant } from '@/components/atoms';

//import { useSelector } from 'react-redux';
// import { useColors } from 'src/app/s-v2';

interface Props {
  index: number;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
}

function ItemTabbar(props: Props) {
  const animationRef = useRef<Lottie>(null);
  const { index, navigation, state } = props;
  const { t } = useTranslation();
  const isFocused = useMemo(() => state.index === index, [state]);
  const { currentAppState } = useAppState();
  const { colors, gutters, layout } = useTheme();
  const isIos = Platform.OS == 'ios';
  const styles = useStyleTabbar();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const configIconTabbar = {
    HomeScreen: 'ic-home',
    SettingScreen: 'ic-setting',
  };
  const _onPress = useCallback(() => {
    const route = state.routes[index];
    const event = navigation.emit({
      canPreventDefault: true,
      target: route.key,
      type: 'tabPress',
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, { merge: true });
    }
  }, [state, navigation, isFocused]);

  useEffect(() => {
    if (currentAppState !== 'active' && isFocused && isIos) {
      animationRef.current?.play(100, 100);
    }
  }, [currentAppState, isFocused]);

  useEffect(() => {
    if (!index) {
      setTimeout(() => {
        animationRef.current?.play(100, 100);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      animationRef.current?.play(0, 100);
    } else {
      animationRef.current?.play(0, 0);
    }
  }, [isFocused]);

  const _routeName = useMemo(() => {
    const routeName = state.routeNames[index];
    return routeName;
  }, [state.routeNames]);

  const _renderIcon = useCallback(() => {
    if (_routeName === Paths.CameraScreen) {
      return <View />;
    }
    return (
      <View>
        <IconByVariant
          color={isFocused ? colors.alias_comp_button_primary : colors.gray800}
          height={24}
          path={configIconTabbar?.[_routeName]}
          width={24}
        />
        {isFocused ? <View style={[styles.underline]} /> : null}
      </View>
    );
  }, [
    _routeName,
    colors.alias_comp_button_primary,
    colors.gray800,
    configIconTabbar,
    isFocused,
    styles.underline,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      disabled={_routeName === Paths.CameraScreen}
      hitSlop={{ left: 16, right: 16 }}
      onPress={_onPress}
      style={[layout.flex_1]}
    >
      <View
        style={[layout.itemsCenter, layout.flex_1, gutters.paddingVertical_12]}
      >
        {_renderIcon()}
      </View>
    </TouchableOpacity>
  );
}

export default ItemTabbar;

const useStyleTabbar = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        underline: {
          backgroundColor: colors.alias_comp_button_primary,
          borderRadius: 3,
          height: 5,
          marginTop: 8,
        },
      }),
    [],
  );
};
