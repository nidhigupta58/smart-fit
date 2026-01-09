export type BodyType =
    | 'athletic'
    | 'mesomorph'
    | 'ectomorph'
    | 'endomorph'
    | 'pear'
    | 'apple'
    | 'hourglass';

export type FitPreference = 'slim' | 'regular' | 'relaxed' | 'oversized';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'One Size' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '28' | '30' | '32' | '34' | '36' | '38' | '20mm' | '22mm';

export type FitResult = 'tight' | 'perfect' | 'loose' | 'slightly tight' | 'slightly loose';

export type Gender = 'men' | 'women' | 'unisex';

export type Category =
    | 'shirts'
    | 't-shirts'
    | 'jeans'
    | 'pants'
    | 'jackets'
    | 'hoodies'
    | 'dresses'
    | 'activewear'
    | 'sweaters'
    | 'shoes'
    | 'accessories'
    | 'skirts';

export interface UserMeasurements {
    height: number; // in cm
    weight: number; // in kg
    bodyType: BodyType;
    fitPreference: FitPreference;
    chest?: number; // optional, in cm
    waist?: number; // optional, in cm
    hips?: number; // optional, in cm
    gender?: Gender;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: Category;
    gender: Gender;
    sizes: Size[];
    availableSizes: Size[]; // sizes currently in stock
    rating: number;
    reviewCount: number;
    reviews: Review[];
    colors?: string[];
    material?: string;
    careInstructions?: string;
    featured?: boolean;
    new?: boolean;
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    size: Size;
    fitFeedback?: 'runs small' | 'true to size' | 'runs large';
    height?: number;
    weight?: number;
}

export interface SizeRecommendation {
    recommendedSize: Size;
    fitResult: FitResult;
    confidence: 'high' | 'medium' | 'low';
    advice: string;
    alternativeSizes: Size[];
    fitScore: number; // 0-100, where 100 is perfect fit
}

export interface CartItem {
    product: Product;
    size: Size;
    quantity: number;
    recommendedSize?: Size;
}

export interface WishlistItem {
    product: Product;
    addedAt: string;
}

export interface OutfitCombo {
    id: string;
    mainProduct: Product;
    matchingItems: Product[];
    totalPrice: number;
    description: string;
}

export interface FitProfile extends UserMeasurements {
    id: string;
    createdAt: string;
    updatedAt: string;
    recommendationHistory: {
        productId: string;
        productName: string;
        recommendation: SizeRecommendation;
        date: string;
    }[];
}

export interface Order {
    id: string;
    items: CartItem[];
    totalPrice: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

export interface ShippingAddress {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

// Body type descriptions for UI
export const BODY_TYPE_INFO: Record<BodyType, { label: string; description: string }> = {
    athletic: {
        label: 'Athletic',
        description: 'Well-proportioned, muscular build with broad shoulders'
    },
    mesomorph: {
        label: 'Mesomorph',
        description: 'Naturally muscular with medium frame'
    },
    ectomorph: {
        label: 'Ectomorph',
        description: 'Slim, lean build with narrow shoulders'
    },
    endomorph: {
        label: 'Endomorph',
        description: 'Rounder body type with slower metabolism'
    },
    pear: {
        label: 'Pear',
        description: 'Narrower upper body, wider hips and thighs'
    },
    apple: {
        label: 'Apple',
        description: 'Broader shoulders and chest, narrower hips'
    },
    hourglass: {
        label: 'Hourglass',
        description: 'Balanced proportions with defined waist'
    }
};

// Fit preference info
export const FIT_PREFERENCE_INFO: Record<FitPreference, { label: string; description: string }> = {
    slim: {
        label: 'Slim Fit',
        description: 'Close to body, tailored look'
    },
    regular: {
        label: 'Regular Fit',
        description: 'Comfortable, classic fit'
    },
    relaxed: {
        label: 'Relaxed Fit',
        description: 'Loose, comfortable wear'
    },
    oversized: {
        label: 'Oversized',
        description: 'Intentionally large, trendy fit'
    }
};
