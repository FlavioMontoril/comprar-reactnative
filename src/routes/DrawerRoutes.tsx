import Home from '@/app/Home'
import { Product } from '@/app/Product'
import { MaterialIcons } from '@expo/vector-icons'
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer'

export type DrawerRoutesList = {
    home: undefined,
    product: undefined | { id: string },
}
export type DrawerRoutesProps<T extends keyof DrawerRoutesList> =
    DrawerScreenProps<DrawerRoutesList, T>

const Drawer = createDrawerNavigator<DrawerRoutesList>()

export function DrawerRoutes() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#2C46B1",
                drawerInactiveTintColor: '#444444',
                //  drawerShowLabel: false,
            }}
        >
            <Drawer.Screen
                name='home'
                component={Home}
                options={{
                    drawerLabel: "Início",
                    drawerIcon: ({ color, size }) => <MaterialIcons name='home' size={size} color={color} />
                }}
            />
            <Drawer.Screen
                name='product'
                component={Product}
                options={{
                    drawerLabel: 'Produto',
                    drawerIcon: ({ color, size }) => <MaterialIcons name='add-circle' size={size} color={color} />
                }}
            />
        </Drawer.Navigator>
    )
}