import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useSetting = () => {
  const { t } = useTranslation();
  const dataSetting = useMemo(() => {
    return [
      {
        icon: 'ic-crop',
        switch: true,
        title: t('text.allow'),
      },
      {
        icon: 'ic-camera',
        switch: true,
        title: t('text.start_camera'),
      },
      {
        icon: 'ic-delete',
        switch: true,
        title: t('text.confirm_on'),
      },
      {
        icon: 'ic-send',
        switch: true,
        title: t('text.show_walkthrough'),
      },
      {
        icon: 'ic-privacy',
        title: t('text.privacy'),
      },
      {
        icon: 'ic-condition',
        title: t('text.term'),
      },
    ];
  }, []);
  return {dataSetting};
};
