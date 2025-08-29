import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type ButtonProps = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
}
export function ButtonIcon({ icon, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity {...rest}>
            <MaterialIcons color={"#2c4681"} name={icon} size={30} />
        </TouchableOpacity>
    )
}