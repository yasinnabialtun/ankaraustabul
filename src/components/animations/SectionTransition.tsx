import { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
}

function SectionTransition({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 600,
}: SectionTransitionProps) {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    if (!hasIntersected) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'fade-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
        case 'fade-left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'fade-right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'scale':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case 'none':
          return baseClasses;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={targetRef}
      className={`${getAnimationClasses()} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default SectionTransition;
