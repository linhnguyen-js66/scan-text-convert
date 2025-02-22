// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
import React, { memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import layout from '@/theme/layout';

import { AssetByVariant } from '@/components/atoms';
import { useStyleItemDocument } from './styles';

interface Iprops {
  item: any;
}
const Component = (props: Iprops) => {
  const { item } = props;
  const { borders, colors, fonts, gutters } = useTheme();
  const { t } = useTranslation();
  const styles = useStyleItemDocument()
  const compareIsToday = useMemo(() => {
    if (item?.timeScan && dayjs(item?.timeScan).isSame(dayjs())) {
      return t('text.today');
    }
    return dayjs(item?.timeScan).format('DD/MM/YYYY - HH:mm');
  }, [item?.timeScan, t]);
  return (
    <TouchableOpacity
      style={[
        borders.w_1,
        borders.rounded_16,
        gutters.padding_16,
        { borderColor: colors.alias_surface_subtle },
        layout.row,
        layout.itemsCenter,
      ]}
    >
      <View style={[styles.item, borders.rounded_4, styles.shadow]}>
        
      </View>
      <View style={[gutters.marginLeft_12, layout.flex_1]}>
        <Text style={[fonts.size_16, fonts.medium, gutters.marginBottom_8]}>
          Scan 01:11:2020 03:57:06
        </Text>
        <View style={[layout.row, layout.itemsCenter, layout.justifyBetween]}>
          <Text style={[fonts.size_12, { color: colors.alias_surface_subtle }]}>
            {compareIsToday}
          </Text>
          <Text
            style={[fonts.size_12, { color: colors.alias_subtle_emphasis }]}
          >
            2 pages
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ItemDocument = memo(Component, isEqual);
export default ItemDocument;
