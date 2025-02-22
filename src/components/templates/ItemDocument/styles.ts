import { useTheme } from "@/theme"
import { useMemo } from "react"
import { StyleSheet } from "react-native"

export const useStyleItemDocument = () => {
    const {colors} = useTheme();
    return useMemo(() => StyleSheet.create({
        item:{
            backgroundColor: colors.gray200,
             height: 77,
             width: 50,
        },
        shadow: {
            elevation: 6, // Dành cho Android
            shadowColor: colors.gray400, // Màu của shadow
            shadowOffset: { height: 2, width: 0 }, // Độ lệch shadow
            shadowOpacity: 0.25, // Độ mờ của shadow
            shadowRadius: 10, // Độ tán của shadow
          },
    }), [])
}