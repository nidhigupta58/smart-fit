import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem, Product } from '@/types';

interface WishlistState {
    items: WishlistItem[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addToWishlist: (product) => {
                set((state) => {
                    const exists = state.items.some((item) => item.product.id === product.id);
                    if (exists) return state;

                    return {
                        items: [...state.items, { product, addedAt: new Date().toISOString() }],
                    };
                });
            },

            removeFromWishlist: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },

            isInWishlist: (productId) => {
                return get().items.some((item) => item.product.id === productId);
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
