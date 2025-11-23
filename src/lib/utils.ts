import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount)
}

// Format date
export function formatDate(date: string): string {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

// Calculate discount percentage
export function calculateDiscount(original: number, discounted: number): number {
    return Math.round(((original - discounted) / original) * 100)
}

// Generate random ID
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Convert height from cm to feet/inches
export function cmToFeetInches(cm: number): string {
    const totalInches = cm / 2.54
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return `${feet}'${inches}"`
}

// Convert weight from kg to lbs
export function kgToLbs(kg: number): number {
    return Math.round(kg * 2.20462)
}

// Truncate text
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
}

// Calculate average rating
export function calculateAverageRating(reviews: { rating: number }[]): number {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
}
