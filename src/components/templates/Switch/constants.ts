// dimensions
export const WIDTH = 36;
export const MARGIN = 4;
export const TRACK_HEIGHT = 16;
// colors
// export const ON_COLOR = Colors.color_secondary_500;
export const ON_TRACK_COLOR = 'rgba(52, 199, 89, 0.4)';
export const OFF_TRACK_COLOR = 'rgba(0, 0, 0, 0.3)';
// export const OFF_COLOR = Colors.color_300;
export const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.05)';
export const SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';

// ios
export const THUMB_SIZE_IOS = 14;

export const OFF_POSITION_IOS = MARGIN / 2;
export const ON_POSITION_IOS = WIDTH - THUMB_SIZE_IOS - MARGIN - MARGIN / 2;
export const BORDER_RADIUS_IOS = 20;

// android
export const THUMB_SIZE_ANDROID = 20;
export const OFF_POSITION_ANDROID = -THUMB_SIZE_ANDROID / 3;
export const ON_POSITION_ANDROID = WIDTH - THUMB_SIZE_ANDROID * 0.75;
export const BORDER_RADIUS_ANDROID = (THUMB_SIZE_ANDROID * 3) / 4;
