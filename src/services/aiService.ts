import type { UserMeasurements, SizeRecommendation, Product, Size, FitResult, OutfitCombo, Review } from '@/types';

/**
 * AI Service for size recommendations and outfit suggestions
 * This implementation uses a rule-based algorithm for demo purposes
 * Can be easily replaced with real AI API (OpenAI/Gemini) by updating the functions
 */

// BMI-based size calculation
function calculateBMI(height: number, weight: number): number {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

// Get size based on measurements
function getSizeFromMeasurements(
    measurements: UserMeasurements,
    product: Product
): Size {
    const bmi = calculateBMI(measurements.height, measurements.weight);
    const { bodyType, fitPreference } = measurements;

    // Base size determination from BMI
    let baseSize: Size;
    if (bmi < 18.5) {
        baseSize = 'S';
    } else if (bmi < 22) {
        baseSize = 'M';
    } else if (bmi < 25) {
        baseSize = 'L';
    } else if (bmi < 28) {
        baseSize = 'XL';
    } else {
        baseSize = 'XXL';
    }

    // Adjust based on body type
    if (bodyType === 'athletic' || bodyType === 'mesomorph') {
        // Muscular build might need one size up for comfort
        if (fitPreference === 'slim') {
            // Keep base size for slim fit
        } else if (fitPreference === 'relaxed' || fitPreference === 'oversized') {
            baseSize = getSizeLarger(baseSize);
        }
    } else if (bodyType === 'ectomorph') {
        // Lean build might go slightly smaller
        if (fitPreference === 'slim') {
            baseSize = getSizeSmaller(baseSize);
        }
    } else if (bodyType === 'endomorph' || bodyType === 'apple') {
        // Rounder build might need one size up
        if (fitPreference !== 'slim') {
            baseSize = getSizeLarger(baseSize);
        }
    }

    // Adjust based on fit preference
    if (fitPreference === 'oversized') {
        baseSize = getSizeLarger(baseSize);
    } else if (fitPreference === 'slim') {
        // Already handled above
    }

    // Ensure the size is available in the product
    if (!product.availableSizes.includes(baseSize)) {
        // Find closest available size
        const sizeOrder: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
        const baseIndex = sizeOrder.indexOf(baseSize);

        for (let i = 0; i < sizeOrder.length; i++) {
            const checkSize = sizeOrder[baseIndex + (i % 2 === 0 ? i : -i)];
            if (checkSize && product.availableSizes.includes(checkSize)) {
                baseSize = checkSize;
                break;
            }
        }
    }

    return baseSize;
}

function getSizeLarger(size: Size): Size {
    const sizeOrder: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const index = sizeOrder.indexOf(size);
    return index < sizeOrder.length - 1 ? sizeOrder[index + 1] : size;
}

function getSizeSmaller(size: Size): Size {
    const sizeOrder: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const index = sizeOrder.indexOf(size);
    return index > 0 ? sizeOrder[index - 1] : size;
}

function getFitResult(
    measurements: UserMeasurements
): FitResult {
    const { fitPreference } = measurements;

    if (fitPreference === 'slim') {
        return 'perfect';
    } else if (fitPreference === 'oversized') {
        return 'slightly loose';
    } else if (fitPreference === 'relaxed') {
        return 'perfect';
    } else {
        return 'perfect';
    }
}

function getFitScore(fitResult: FitResult): number {
    switch (fitResult) {
        case 'perfect':
            return 95;
        case 'slightly loose':
        case 'slightly tight':
            return 80;
        case 'loose':
        case 'tight':
            return 60;
        default:
            return 70;
    }
}

/**
 * Get AI-powered size recommendation
 * In production, this would call OpenAI/Gemini API
 */
export async function getSizeRecommendation(
    measurements: UserMeasurements,
    product: Product
): Promise<SizeRecommendation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const recommendedSize = getSizeFromMeasurements(measurements, product);
    const fitResult = getFitResult(measurements);
    const fitScore = getFitScore(fitResult);

    // Generate advice based on measurements and product
    let advice = `Based on your ${measurements.bodyType} body type and ${measurements.fitPreference} fit preference, `;

    if (fitResult === 'perfect') {
        advice += `size ${recommendedSize} will give you the perfect fit you're looking for.`;
    } else if (fitResult === 'slightly loose') {
        advice += `size ${recommendedSize} will give you a comfortable, slightly relaxed fit.`;
    } else if (fitResult === 'slightly tight') {
        advice += `size ${recommendedSize} will give you a snug, tailored fit.`;
    }

    // Alternative sizes
    const alternativeSizes: Size[] = [];
    const sizeSmaller = getSizeSmaller(recommendedSize);
    const sizeLarger = getSizeLarger(recommendedSize);

    if (sizeSmaller !== recommendedSize && product.availableSizes.includes(sizeSmaller)) {
        alternativeSizes.push(sizeSmaller);
    }
    if (sizeLarger !== recommendedSize && product.availableSizes.includes(sizeLarger)) {
        alternativeSizes.push(sizeLarger);
    }

    // Confidence level
    let confidence: 'high' | 'medium' | 'low' = 'high';
    if (!measurements.chest || !measurements.waist) {
        confidence = 'medium';
    }

    return {
        recommendedSize,
        fitResult,
        confidence,
        advice,
        alternativeSizes,
        fitScore,
    };
}

/**
 * Get outfit combinations
 * In production, this would use AI to suggest matching items
 */
export async function getOutfitCombos(
    product: Product,
    allProducts: Product[]
): Promise<OutfitCombo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const combos: OutfitCombo[] = [];

    // Simple matching logic based on category and gender
    const matchingProducts = allProducts.filter(p =>
        p.id !== product.id &&
        (p.gender === product.gender || p.gender === 'unisex' || product.gender === 'unisex')
    );

    // Generate 2-3 outfit combinations
    const comboCount = Math.min(3, Math.floor(matchingProducts.length / 2));

    for (let i = 0; i < comboCount; i++) {
        const startIndex = i * 2;
        const items = matchingProducts.slice(startIndex, startIndex + 2);

        if (items.length >= 1) {
            const totalPrice = product.price + items.reduce((sum, item) => sum + item.price, 0);

            let description = `Perfect combo with ${product.name}`;
            if (items.length > 0) {
                description += ` and ${items.map(p => p.name).join(', ')}`;
            }

            combos.push({
                id: `combo-${product.id}-${i}`,
                mainProduct: product,
                matchingItems: items,
                totalPrice,
                description,
            });
        }
    }

    return combos;
}

/**
 * Summarize product reviews using AI
 * In production, this would call OpenAI/Gemini API
 */
export async function summarizeReviews(reviews: Review[]): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (reviews.length === 0) {
        return 'No reviews yet. Be the first to review!';
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const avgRatingRounded = Math.round(avgRating * 10) / 10;

    // Count fit feedback
    const fitFeedback = reviews
        .filter(r => r.fitFeedback)
        .reduce((acc, r) => {
            acc[r.fitFeedback!] = (acc[r.fitFeedback!] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    let summary = `Average rating: ${avgRatingRounded}/5 from ${reviews.length} reviews. `;

    // Add fit feedback summary
    if (Object.keys(fitFeedback).length > 0) {
        const mostCommonFit = Object.entries(fitFeedback).sort((a, b) => b[1] - a[1])[0];
        summary += `Most customers say this item ${mostCommonFit[0]}. `;
    }

    // Add positive sentiment
    const positiveReviews = reviews.filter(r => r.rating >= 4);
    if (positiveReviews.length > reviews.length * 0.7) {
        summary += 'Highly recommended by customers!';
    }

    return summary;
}

/* 
 * PRODUCTION API INTEGRATION EXAMPLE:
 * Uncomment and configure for real AI integration
 */

/*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for demo - use backend in production
});

export async function getSizeRecommendationAI(
  measurements: UserMeasurements,
  product: Product
): Promise<SizeRecommendation> {
  const prompt = `You are a fashion fit expert. Based on the following user data and product, recommend the best size:

User Profile:
- Height: ${measurements.height}cm
- Weight: ${measurements.weight}kg
- Body Type: ${measurements.bodyType}
- Fit Preference: ${measurements.fitPreference}
${measurements.chest ? `- Chest: ${measurements.chest}cm` : ''}
${measurements.waist ? `- Waist: ${measurements.waist}cm` : ''}
${measurements.hips ? `- Hips: ${measurements.hips}cm` : ''}

Product: ${product.name}
Category: ${product.category}
Available sizes: ${product.availableSizes.join(', ')}
Product Description: ${product.description}

Respond in JSON format:
{
  "recommendedSize": "M",
  "fitResult": "perfect" | "slightly loose" | "slightly tight",
  "confidence": "high" | "medium" | "low",
  "advice": "Brief explanation why this size is recommended",
  "alternativeSizes": ["S", "L"],
  "fitScore": 95
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result as SizeRecommendation;
}
*/
