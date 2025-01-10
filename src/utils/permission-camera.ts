import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export const checkAndRequestPermissions = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
        ],
      );
    }
  } else if (Platform.OS === 'ios') {
    const cameraPermission = await Camera.getCameraPermissionStatus();

    if (cameraPermission === 'authorized') {
      console.log('Camera permission granted');
    } else if (cameraPermission === 'denied') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required. Please enable it in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Go to Settings',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ],
      );
    } else {
      await Camera.requestCameraPermission();
    }
  }
};
