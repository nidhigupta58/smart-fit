import { cn } from '@/lib/utils';
import type { FitResult } from '@/types';

interface FitIndicatorProps {
  fitResult: FitResult;
  className?: string;
}

export function FitIndicator({ fitResult, className }: FitIndicatorProps) {
  // Calculate fill level (0-5)
  const getFillLevel = (): number => {
    switch (fitResult) {
      case 'tight':
        return 5;
      case 'slightly tight':
        return 4;
      case 'perfect':
        return 3;
      case 'slightly loose':
        return 2;
      case 'loose':
        return 1;
      default:
        return 3;
    }
  };

  const fillLevel = getFillLevel();

  // Color based on fit result
  const getColor = (): string => {
    switch (fitResult) {
      case 'perfect':
        return 'bg-green-500';
      case 'slightly tight':
      case 'slightly loose':
        return 'bg-blue-500';
      case 'tight':
      case 'loose':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const color = getColor();

  return (
    <div className={cn('space-y-1', className)}>
      {/* Visual indicator */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600 min-w-[50px]">Tight</span>
        <div className="flex gap-1 flex-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                'h-3 flex-1 rounded-full transition-all duration-300',
                level <= fillLevel ? color : 'bg-gray-200'
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-600 min-w-[50px] text-right">Loose</span>
      </div>

      {/* Text result */}
      <div className="text-center">
        <span className="text-sm font-medium capitalize text-gray-700">
          {fitResult === 'perfect' ? '✓ ' : ''}
          {fitResult}
        </span>
      </div>
    </div>
  );
}
