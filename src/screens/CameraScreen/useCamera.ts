import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { checkAndRequestPermissions } from '@/utils/permission-camera';

export const useCamera = () => {
  const cameraRef = useRef<Camera>();
  const [photo, setPhoto] = useState<string>('');
  useEffect(() => {
    checkAndRequestPermissions();
  }, []);
  const takeThePhoto = useCallback(async () => {
    const photo = await cameraRef.current?.takePhoto();

    photo?.path && setPhoto(photo?.path);
  }, []);
  const _onDelete = useCallback(() => {
    setPhoto('');
  }, []);

  const onConvertImage = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: photo,
      } as unknown);

      // const response = await postData<{ text: string }>(
      //   '/upload/',
      //   formData,
      //   true // ✅ Cờ này cho biết gửi dưới dạng FormData
      // );

      Alert.alert('OCR thành công!', response.data.text);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể nhận diện văn bản.');
    }
  }, [photo]);
  console.log(photo);
  return {
    _onDelete,
    cameraRef,
    checkAndRequestPermissions,
    onConvertImage,
    photo,
    takeThePhoto,
  };
};
