import dayjs from 'dayjs';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Animated, Text, View } from 'react-native';

import { useTheme } from '@/theme';

import { useStyleHome } from '../styles';

interface Iprops {
  index: number;
  item: unknown;
}
const Component = (props: Iprops) => {
  const { index, item } = props;
  const { borders, colors, gutters, layout } = useTheme();
  const styles = useStyleHome();
  const { t } = useTranslation();
  const compareIsToday = useMemo(() => {
    if (item?.timeScan && dayjs(item?.timeScan).isSame(dayjs())) {
      return t('text.today');
    }
    return "";
  }, [item?.timeScan, t]);
  return (
    <Animated.View
      key={index}
      style={[
        layout.flex_1,
        borders.rounded_16,
        styles.shadow,
        borders.w_1,
        borders.gray100,
      ]}
    >
      <View
        style={[
          { height: 240 * 0.65 },
          borders.roundedTop_16,
          { backgroundColor: colors.gray200 },
        ]}
      ></View>
      <View
        style={[
          { height: 240 * 0.35 },
          borders.roundedBottom_16,
          { backgroundColor: colors.alias_on_surface },
          gutters.padding_16,
        ]}
      >
        <View style={[layout.flex_1]}>
          <Text>Scan {dayjs().format('DD:MM:YYYY HH:mm:ss')}</Text>
        </View>
        <View style={[layout.row, layout.flex_1, layout.justifyBetween]}>
          <Text> {compareIsToday}</Text>
          <Text> 1 {t('text.page')}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const SlideItem = memo(Component, isEqual);
export default SlideItem;
