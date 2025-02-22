import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

import { useTheme } from '@/theme';
import { K_FULL_WIDTH_SCREEN } from '@/theme/_config';

import { IconByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import Header from '@/components/templates/Header/Header';
import ImageLoader from '@/components/templates/ImageLoader';

import { useStyleCamera } from './styles';
import { useCamera } from './useCamera';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const { colors, fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();
  const { _onDelete, cameraRef, onConvertImage, photo, takeThePhoto } =
    useCamera();
  const styles = useStyleCamera();
  if (device == null) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <SafeScreen>
      <Header title={t('screen_example.scan')} />
      <View
        style={[layout.flex_1, { backgroundColor: colors.alias_on_surface }]}
      >
        {photo ? (
          <ImageLoader
            resizeMode="contain"
            source={{ uri: photo }}
            style={{ height: '100%', width: K_FULL_WIDTH_SCREEN }}
          />
        ) : (
          <Camera
            device={device}
            isActive={true}
            photo={true}
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
          />
        )}

        <View style={styles.camera_contain}>
          <View style={styles.ic_dele}>
            <TouchableOpacity
              onPress={_onDelete}
              style={photo ? styles.btn_dele : {}}
            >
              <IconByVariant
                color={photo ? colors.alias_on_surface : colors.gray800}
                height={28}
                path="ic-delete"
                width={28}
              />
            </TouchableOpacity>
          </View>
          <View>
            {photo ? (
              <TouchableOpacity onPress={onConvertImage} style={styles.scan}>
                <Text
                  style={[fonts.size_16, { color: colors.alias_on_surface }]}
                >
                  {t('text.convert')}
                </Text>
                <IconByVariant
                  color={colors.alias_on_surface}
                  height={24}
                  path="ic-convert"
                  style={[gutters.marginLeft_8]}
                  width={24}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={takeThePhoto}
                style={styles.btn_camera}
              />
            )}
          </View>
          <View style={styles.ct_gallery}>
            <TouchableOpacity style={styles.btn_gallery}>
              <IconByVariant
                color={colors.gray800}
                height={28}
                path="ic-gallery"
                width={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default CameraScreen;
