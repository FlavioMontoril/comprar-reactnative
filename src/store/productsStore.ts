import { FilterStatus, ProductProps } from "@/types/FilterStatus";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

type UpdatedProduct = Omit<ProductProps, "id" | "description">

interface ProductPropsStore {
    products: ProductProps[];
    addProduct: (description: string) => void;
    removeProduct: (id: string) => void;
    clearProducts: () => void;
    updateStatusProduct: (id: string) => void;
}

export const useProductStore = create<ProductPropsStore>()(
    persist(
        (set) => ({
            products: [],

            addProduct: (description: string) =>
                set((prev) => {
                    const newProduct = {
                        id: uuid.v4() as string,
                        description,
                        status: FilterStatus.PENDING,
                    }
                    const exists = prev.products.some((item) => item.id === newProduct.id);
                    return {
                        products: exists ? prev.products : [...prev.products, newProduct],
                    };
                }),

            removeProduct: (id: string) =>
                set((prev) => ({ products: prev.products.filter(item => item.id !== id) })),

            clearProducts: () =>
                set(() => ({ products: [] })),

            updateStatusProduct: (id: string) =>
                set((prev) => ({
                    products: prev.products.map((item) => item.id === id ?
                        {
                            ...item,
                            status: item.status === FilterStatus.PENDING
                                ? FilterStatus.DONE : FilterStatus.PENDING
                        }
                        : item)
                }
                ))
        }),
        {
            name: "product-storage", // chave no AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
