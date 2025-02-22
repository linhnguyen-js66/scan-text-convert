import { Dimensions, Platform } from "react-native";

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

  const { height, width } = Dimensions.get('window');

  const baseScreenWith = 350;
  const baseScreenHeight = 680;
  
export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const execFunc = <Fn extends (...args: any[]) => any>(
  func?: Fn,
  ...args: Parameters<Fn>
) => {
  if (onCheckType(func, 'function')) {
    func(...args);
  }
};

export const sizeScale = (size = 11): number => {
    const scaleWidth = width / baseScreenWith;
    const scaleHeight = height / baseScreenHeight;
    const scale = Math.min(scaleWidth, scaleHeight);
    return Math.ceil(
      scale *
        (size +
          Platform.select({
            ios: 0,
            android: 0.5,
            default: 0,
          }))
    );
  };