import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Size } from '@/types';

interface CartState {
    items: CartItem[];
    addToCart: (product: Product, size: Size, recommendedSize?: Size) => void;
    removeFromCart: (productId: string, size: Size) => void;
    updateQuantity: (productId: string, size: Size, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, size, recommendedSize) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id && item.size === size
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id && item.size === size
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { product, size, quantity: 1, recommendedSize }],
                    };
                });
            },

            removeFromCart: (productId, size) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.product.id === productId && item.size === size)
                    ),
                }));
            },

            updateQuantity: (productId, size, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId, size);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId && item.size === size
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
