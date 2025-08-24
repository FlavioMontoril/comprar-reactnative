import { FilterStatus } from "@/types/FilterStatus";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { Trash2 } from "lucide-react-native";

interface ItemData {
    status: FilterStatus,
    description: string,
}

type ItemProps = {
    data: ItemData,
    onRemove: () => void,
    onStatus: () => void,
}

export function Item({ data, onStatus, onRemove  }: ItemProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
                <StatusIcon status={data.status}></StatusIcon>
            </TouchableOpacity>
            <Text style={styles.description}>
                {data.description}
            </Text>

            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color="#828282" />
            </TouchableOpacity>
        </View>
    )
}