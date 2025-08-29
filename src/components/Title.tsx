import { TextProps, Text } from "react-native";

export function Title({ children, ...rest }: TextProps) {
    return (
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#2c4681" }} {...rest}>
            {children}
        </Text>
    )
}