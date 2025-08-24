import { FilterStatus } from "@/types/FilterStatus";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";

type FilterProps = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean,
}

export function Filterstatus({ status, isActive, ...rest }: FilterProps) {
    return (
        <TouchableOpacity
            style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
            activeOpacity={0.3}
            {...rest}
        >
            <StatusIcon status={status}/>
            <Text
                style={styles.title}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}