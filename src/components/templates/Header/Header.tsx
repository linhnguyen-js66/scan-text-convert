import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { IconByVariant } from '@/components/atoms';

type Props = {
  isBack?: boolean;
  onSearch?: () => void;
  presetTitle?: TextStyle
  styleHeader?: ViewStyle;
  title?: string;
};
const Header = (props: Props) => {
  const { colors, fonts, gutters, layout } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { isBack = true, onSearch, presetTitle, styleHeader, title = '' } = props;
  const onTouchSearch = useCallback(() => {
    if (typeof onSearch == 'function') {
      onSearch();
      return;
    }
    navigate(Paths.SearchScreen);
  }, [navigate, onSearch]);

  if (title) {
    return (
      <View style={[gutters.padding_16]}>
        {isBack && (
          <TouchableOpacity activeOpacity={0.5} onPress={() => goBack()}>
            <IconByVariant
              color={colors.alias_comp_button_primary}
              height={24}
              path="ic-back"
            />
          </TouchableOpacity>
        )}

        <View
          style={styleHeader ?? [
            layout.absolute,
            { top: 16, zIndex: -10 },
            layout.flex_1,
            layout.selfCenter,
          ]}
        >
          <Text style={presetTitle ?? [fonts.size_16, fonts.bold]}>{title}</Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={[
        gutters.padding_16,
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
      ]}
    >
      <Text
        style={[
          { color: colors.alias_comp_button_primary },
          fonts.semibold,
          fonts.size_24,
        ]}
      >
        Solid Scanner
      </Text>
      <TouchableOpacity onPress={onTouchSearch}>
        <IconByVariant color={colors.alias_subtle_emphasis} path="ic-search" />
      </TouchableOpacity>
    </View>
  );
};
export default Header;
