import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red';
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  color = 'blue',
  showPercentage = false,
  animated = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600'
  };

  const bgColorClasses = {
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    yellow: 'bg-yellow-200',
    red: 'bg-red-200'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden ${bgColorClasses[color]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs text-gray-600 text-right">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Indeterminate Progress Bar
interface IndeterminateProgressBarProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red';
  className?: string;
}

export const IndeterminateProgressBar: React.FC<IndeterminateProgressBarProps> = ({
  size = 'md',
  color = 'blue',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative ${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
          style={{
            width: '30%',
            animation: 'shimmer 2s infinite'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 