import dayjs from 'dayjs';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import layout from '@/theme/layout';

import { SafeScreen } from '@/components/templates';
import Header from '@/components/templates/Header/Header';

const Component = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <SafeScreen>
      <Header title={t('text.scan') + ` ${dayjs().format('DD:MM:YYYY')}`} />
      <View style={[{ backgroundColor: colors.gray50 }, layout.flex_1]}>
        <View >

        </View>
      </View>
    </SafeScreen>
  );
};

const DetailScreen = memo(Component, isEqual);
export default DetailScreen;
