import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FitProfile, UserMeasurements, SizeRecommendation } from '@/types';
import { generateId } from '@/lib/utils';

interface FitProfileState {
    profile: FitProfile | null;
    createProfile: (measurements: UserMeasurements) => void;
    updateProfile: (measurements: Partial<UserMeasurements>) => void;
    addRecommendation: (productId: string, productName: string, recommendation: SizeRecommendation) => void;
    clearProfile: () => void;
}

export const useFitProfileStore = create<FitProfileState>()(
    persist(
        (set) => ({
            profile: null,

            createProfile: (measurements) => {
                const profile: FitProfile = {
                    id: generateId(),
                    ...measurements,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    recommendationHistory: [],
                };
                set({ profile });
            },

            updateProfile: (measurements) => {
                set((state) => {
                    if (!state.profile) return state;
                    return {
                        profile: {
                            ...state.profile,
                            ...measurements,
                            updatedAt: new Date().toISOString(),
                        },
                    };
                });
            },

            addRecommendation: (productId, productName, recommendation) => {
                set((state) => {
                    if (!state.profile) return state;
                    return {
                        profile: {
                            ...state.profile,
                            recommendationHistory: [
                                {
                                    productId,
                                    productName,
                                    recommendation,
                                    date: new Date().toISOString(),
                                },
                                ...state.profile.recommendationHistory.slice(0, 19), // Keep last 20
                            ],
                            updatedAt: new Date().toISOString(),
                        },
                    };
                });
            },

            clearProfile: () => set({ profile: null }),
        }),
        {
            name: 'fit-profile-storage',
        }
    )
);
