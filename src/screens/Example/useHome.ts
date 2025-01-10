import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { useTheme } from '@/theme';
import { useUser } from '@/hooks';
import path from 'path';
import { Paths } from '@/navigation/paths';

export const useHome = () => {
  const { t } = useTranslation();
  const { changeTheme, variant } = useTheme();
  const navigate = useNavigation();
  const { useFetchOneQuery } = useUser();
  //   const { toggleLanguage } = useI18n();
  const dataBtn = useMemo(() => {
    return [
      {
        icon: 'send',
        onPress: () => {},
        title: t('screen_example.file'),
      },
      {
        icon: 'qr',
        onPress:  () => navigate.navigate(Paths.CameraScreen),
        title: t('screen_example.scan'),
      },
    ];
  }, [navigate, t]);

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('screen_example.hello_user', { name: fetchOneUserQuery.data.name }),
      );
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };
  return {
    dataBtn,
    fetchOneUserQuery,
    onChangeTheme,
  };
};
