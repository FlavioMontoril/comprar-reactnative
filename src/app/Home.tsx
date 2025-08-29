import { ButtonIcon } from "@/components/ButtonIcon";
import { Title } from "@/components/Title";
import { DrawerRoutesProps } from "@/routes/DrawerRoutes";
import { stylesHome } from "@/Styles/style-home";
import { Image, View } from "react-native";

export default function Home({ navigation }: DrawerRoutesProps<"home">) {

    return (
        <View style={stylesHome.conteiner}>

            <View style={stylesHome.header}>
                <ButtonIcon icon='menu' onPress={() => navigation.toggleDrawer()} />
                <Title>
                    Home
                </Title>
                <ButtonIcon icon='add-circle' onPress={() => navigation.navigate('product', { id: "7" })} />
            </View>

            <View style={stylesHome.content}>
                <Image
                    style={stylesHome.logoHome}
                    source={require('@/assets/logo.png')}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}