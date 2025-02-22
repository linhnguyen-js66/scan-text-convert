import type { RootStackParamList } from '@/navigation/types';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { CustomTabbar } from '@/components/templates/CustomTabbar';
import { CameraScreen, HomeScreen, IntroScreen } from '@/screens';
import DetailScreen from '@/screens/DetailScreen';
import SettingScreen from '@/screens/SettingScreen';

const BottomBar = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function TabBar() {
  const { colors } = useTheme();
  return (
    <BottomBar.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarActiveTintColor: colors.alias_comp_button_primary,
        tabBarBackground: () => {
          return null;
        },
        tabBarInactiveTintColor: colors.gray100,
        tabBarItemStyle: {
          backgroundColor: colors.transparent,
        },
      }}
      tabBar={(props) => <CustomTabbar {...props} />}
    >
      <BottomBar.Screen component={HomeScreen} name={Paths.HomeScreen} />
      <BottomBar.Screen component={SettingScreen} name={Paths.SettingScreen} />
    </BottomBar.Navigator>
  );
}

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={IntroScreen} name={Paths.IntroScreen} />
          <Stack.Screen
            component={CameraScreen}
            name={Paths.CameraScreen}
            // options={{ tabBarStyle: { display: 'none' } }}
          />
          <Stack.Screen component={DetailScreen} name={Paths.DetailScreen} />
          <Stack.Screen component={TabBar} name={Paths.MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#292663',
  tabBarInactiveTintColor: '#fff',
  tabBarItemStyle: {
    backgroundColor: 'white',
  },
  tabBarLabelStyle: {
    top: -6,
  },
  tabBarShowLabel: true,
};
