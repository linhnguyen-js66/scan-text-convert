import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useI18n, useUser } from '@/hooks';

import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import { useHome } from './useHome';

function Example() {
  const { t } = useTranslation();

  const {
    backgrounds,
    colors,
    components,
    fonts,
    gutters,
    layout,
    borders,
  } = useTheme();
  const { dataBtn, fetchOneUserQuery, onChangeTheme } = useHome();

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={fetchOneUserQuery.refetch}
    >
      <ScrollView style={[layout.flex_1]}>
        <View style={[layout.justifyCenter, layout.itemsCenter, layout.flex_1]}>
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path={'tom'}
              resizeMode={'contain'}
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View
          style={[
            gutters.paddingHorizontal_32,
            gutters.marginTop_40,
            layout.flex_1,
          ]}
        >
          <View style={[gutters.marginTop_40, layout.flex_1]}>
            <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
              {t('screen_example.xinchao')}
            </Text>
          </View>
          <View style={[gutters.marginTop_16]}>
            {dataBtn.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item?.onPress}
                style={[
                  layout.flex_1,
                  backgrounds.purple100,
                  gutters.padding_16,
                  dataBtn?.length - 1 != index && gutters.marginBottom_16,
                  { borderRadius: 16 },
                  layout.row,
                  layout.itemsCenter,
                ]}
                testID="change-theme-button"
              >
                <IconByVariant path={item?.icon} stroke={colors.purple500} />
                <Text style={[fonts.size_16, fonts.purple500, gutters.marginLeft_16]}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
