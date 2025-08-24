// import { ProductProps } from "@/types/FilterStatus";
// import { create } from "zustand";

// interface ProductPropsStore {
//     products: ProductProps[],
//     addProduct: (data: ProductProps) => void,
// }

// export const useProductStore = create<ProductPropsStore>((set) => {

//     function handleAddProduct(data: ProductProps) {
//         set((prev) => {
//             const exist = prev.products.some(item => item.id === data.id)
//             return { products: exist ? prev.products : [...prev.products, data], }
//         })
//     }
//     return {
//         products: [],
//         addProduct: handleAddProduct,
//     }
// })

import { ProductProps } from "@/types/FilterStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProductPropsStore {
    products: ProductProps[];
    addProduct: (data: ProductProps) => void;
}

export const useProductStore = create<ProductPropsStore>()(
    persist(
        (set) => ({
            products: [],

            addProduct: (data: ProductProps) =>
                set((prev) => {
                    const exists = prev.products.some((item) => item.id === data.id);
                    return {
                        products: exists ? prev.products : [...prev.products, data],
                    };
                }),
        }),
        {
            name: "product-storage", // chave no AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
