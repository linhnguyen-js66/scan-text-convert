import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated"

export const useIntro = () => {
    const scrollX = useSharedValue(0);
    const { width } = Dimensions.get("window");
    return {scrollX, width}
}