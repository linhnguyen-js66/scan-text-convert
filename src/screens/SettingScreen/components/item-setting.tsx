import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native';

import { useTheme } from '@/theme';

import { IconByVariant } from '@/components/atoms';
import { Switch } from '@/components/templates/Switch/Switch';

interface Item {
  index: number;
  item: unknown;
  lengthData: number;
}
const Component = (props: Item) => {
  const { borders, colors, gutters, layout, fonts } = useTheme();
  const { item, index, lengthData } = props;
  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_24,
        borders.w_1,
        borders.gray100,
        borders.rounded_16,
        index == lengthData - 1 ? {} : gutters.marginBottom_8,
      ]}
    >
      <View style={[layout.row, layout.itemsCenter, layout.flex_1]}>
        <IconByVariant
          color={colors.alias_comp_button_primary}
          height={24}
          path={item?.icon}
          width={24}
        />
        <View style={[layout.flex_1, gutters.marginLeft_12]}>
          <Text
            style={[fonts.size_16, { color: colors.alias_subtle_emphasis }]}
          >
            {item?.title}
          </Text>
        </View>
      </View>
      {item?.switch && <Switch onToggle={() => {}} value={true} />}
    </View>
  );
};

const ItemSetting = memo(Component, isEqual);
export default ItemSetting;
