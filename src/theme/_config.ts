import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Dimensions } from 'react-native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  alias_comp_button_primary: '#2F4FCD',
  alias_error_lighter: '#FFA5A5',
  alias_on_surface: '#ffff',
  alias_subtle_emphasis: '#313131',
  alias_surface: '#9A9A9A',
  alias_surface_subtle: '#ADADAD',
  gray100: '#DFDFDF',
  gray200: '#A1A1A1',
  gray400: '#4D4D4D',
  gray50: '#EFEFEF',
  gray800: '#303030',
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
  purple500: '#44427D',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

const colorsDark = {
  alias_comp_button_primary: '#728DF8',
  alias_error_lighter: '#FFA5A5',
  alias_on_background: '#DDDBFF',
  alias_on_surface: '#0000',
  alias_subtle_emphasis: '#E0E0E0',
  alias_surface: '#2A2A2A',
  alias_surface_subtle: '#3A3A3A',
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray50: '#EFEFEF',
  gray800: '#E0E0E0',
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',
  transparent: 'transparent',
} as const;

const sizes = [4, 8, 12, 16, 24, 32, 40, 80] as const;
export const K_FULL_WIDTH_SCREEN = Dimensions.get("screen").width
export const K_FULL_HEIGHT_SCREEN = Dimensions.get("screen").height
export const K_FULL_WIDTH_WINDOW = Dimensions.get("window").width
export const K_FULL_HEIGHT_WINDOW = Dimensions.get("window").height
export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 8, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
