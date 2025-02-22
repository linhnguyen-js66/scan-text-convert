import React, { memo, useCallback, useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { withSpring } from 'react-native-reanimated';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import PaginationDots from './components/pagination';
import { useIntro } from './useIntro';
import { useNavigation } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';
import BackgroundApp from '@/components/templates/Background/Background';

const Component = () => {
  const { backgrounds, borders, colors, fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();
  const {navigate} = useNavigation();
  const { scrollX, width } = useIntro();
  const renderFirstScene = useCallback(() => {
    return (
      <View style={[gutters.marginTop_80, layout.fullWidth]}>
        <View style={[layout.itemsCenter]}>
          <IconByVariant
            height={290}
            path={'ic-scan'}
            stroke={colors.alias_comp_button_primary}
            width={290}
          />
        </View>
        <View style={[gutters.marginTop_32, gutters.paddingHorizontal_32]}>
          <Text
            style={[
              fonts.size_24,
              fonts.bold,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_title')}
          </Text>
          <Text
            style={[
              gutters.marginTop_16,
              fonts.light,
              fonts.size_16,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_des')}
          </Text>
        </View>
      </View>
    );
  }, [
    colors.alias_comp_button_primary,
    colors.alias_subtle_emphasis,
    fonts.bold,
    fonts.light,
    fonts.size_16,
    fonts.size_24,
    gutters.marginTop_16,
    gutters.marginTop_32,
    gutters.marginTop_80,
    gutters.paddingHorizontal_32,
    layout.fullWidth,
    layout.itemsCenter,
    t,
  ]);
  const renderSecondScene = useCallback(() => {
    return (
      <View style={[gutters.marginTop_80, layout.fullWidth]}>
        <View style={[layout.itemsCenter]}>
          <IconByVariant
            height={290}
            path={'ic-camera'}
            stroke={colors.alias_comp_button_primary}
            width={290}
          />
        </View>
        <View style={[gutters.marginTop_32, gutters.paddingHorizontal_32]}>
          <Text
            style={[
              fonts.size_24,
              fonts.bold,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_second')}
          </Text>
          <Text
            style={[
              gutters.marginTop_16,
              fonts.light,
              fonts.size_16,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_second_des')}
          </Text>
        </View>
      </View>
    );
  }, [
    colors.alias_comp_button_primary,
    colors.alias_subtle_emphasis,
    fonts.bold,
    fonts.light,
    fonts.size_16,
    fonts.size_24,
    gutters.marginTop_16,
    gutters.marginTop_32,
    gutters.marginTop_80,
    gutters.paddingHorizontal_32,
    layout.fullWidth,
    layout.itemsCenter,
    t,
  ]);
  const renderThirdScene = useCallback(() => {
    return (
      <View style={[gutters.marginTop_80, layout.fullWidth]}>
        <View style={[layout.itemsCenter]}>
          <IconByVariant
            height={290}
            path={'ic-global'}
            stroke={colors.alias_comp_button_primary}
            width={290}
          />
        </View>
        <View style={[gutters.marginTop_32, gutters.paddingHorizontal_32]}>
          <Text
            style={[
              fonts.size_24,
              fonts.bold,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_third')}
          </Text>
          <Text
            style={[
              gutters.marginTop_16,
              fonts.light,
              fonts.size_16,
              { color: colors.alias_subtle_emphasis },
            ]}
          >
            {t('text.scan_third_des')}
          </Text>
        </View>
      </View>
    );
  }, [
    colors.alias_comp_button_primary,
    colors.alias_subtle_emphasis,
    fonts.bold,
    fonts.light,
    fonts.size_16,
    fonts.size_24,
    gutters.marginTop_16,
    gutters.marginTop_32,
    gutters.marginTop_80,
    gutters.paddingHorizontal_32,
    layout.fullWidth,
    layout.itemsCenter,
    t,
  ]);
  return (
    <SafeScreen>
     <BackgroundApp isLinear>
     <ScrollView
        horizontal
        onScroll={(event) => {
          scrollX.value = withSpring(event.nativeEvent.contentOffset.x / width);
        }}
        pagingEnabled
        scrollEventThrottle={16}
        //scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {renderFirstScene()}
        {renderSecondScene()}
        {renderThirdScene()}
      </ScrollView>
      <View style={[gutters.marginBottom_40]}>
        <PaginationDots currentIndex={scrollX} />
      </View>
      <View>
        <TouchableOpacity
        onPress={() => navigate(Paths.MainTab)}
          style={[
            borders.rounded_8,
            backgrounds.alias_comp_button_primary,
            layout.primary_size,
            gutters.marginHorizontal_32,
            layout.justifyBetween,
            layout.row,
            layout.itemsCenter,
            gutters.paddingHorizontal_32,
          ]}
        >
          <Text
            style={[
              fonts.uppercase,
              fonts.size_16,
              fonts.medium,
              { color: colors.alias_on_surface },
            ]}
          >
            {t('text.next')}
          </Text>
          <IconByVariant
            path={'ic-arrow-right'}
            stroke={colors.alias_on_surface}
            width={48}
          />
        </TouchableOpacity>
      </View>
     </BackgroundApp>
    </SafeScreen>
  );
};
const IntroScreen = memo(Component, isEqual);
export default IntroScreen;
