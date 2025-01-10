import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Camera, useCameraDevice } from 'react-native-vision-camera';

import { SafeScreen } from '@/components/templates';

const CameraScreen = () => {
  //const device = useCameraDevice('back');
//   if (device == null) {
//     return <Text>Loading camera...</Text>;
//   }

  return (
    <SafeScreen>
      <View>
        {/* <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        /> */}
      </View>
    </SafeScreen>
  );
};

export default CameraScreen;
