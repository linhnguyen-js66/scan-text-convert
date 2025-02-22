import React, { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import { View } from 'react-native';

import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';
import BackgroundApp from '@/components/templates/Background/Background';
import Header from '@/components/templates/Header/Header';

import ItemSetting from './components/item-setting';
import { useSetting } from './useSetting';

const Component = () => {
  const { colors, fonts, layout, gutters } = useTheme();
  const { dataSetting } = useSetting();
  const renderItem = useCallback(
    (item, index) => (
      <ItemSetting
        index={index}
        item={item}
        key={index}
        lengthData={dataSetting?.length}
      />
    ),
    [],
  );
  return (
    <SafeScreen>
      <BackgroundApp>
        <Header
          isBack={false}
          presetTitle={[
            { color: colors.alias_comp_button_primary },
            fonts.semibold,
            fonts.size_24,
          ]}
          styleHeader={[layout.itemsStart]}
          title="Settings"
        />
        <View style={[layout.flex_1, gutters.padding_16]}>
          {dataSetting.map((item, index) => renderItem(item, index))}
        </View>
      </BackgroundApp>
    </SafeScreen>
  );
};

const SettingScreen = memo(Component, isEqual);
export default SettingScreen;
