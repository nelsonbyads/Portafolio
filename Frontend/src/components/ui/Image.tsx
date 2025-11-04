import React from 'react';
import { cn } from '../../lib/utils';
import { useLazyImage } from '../../hooks/useLazyImage';
import Loading from './Loading';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  lazy?: boolean;
  placeholder?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback,
  lazy = true,
  placeholder,
  className,
  containerClassName,
  ...props
}) => {
  const { imgRef, imageSrc, isLoaded, isError, handleLoad, handleError } = useLazyImage(
    src,
    { rootMargin: '50px', threshold: 0.1 }
  );

  const displaySrc = isError && fallback ? fallback : imageSrc;
  const showPlaceholder = lazy && !imageSrc && !isError;

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          {placeholder || <Loading variant="skeleton" size="lg" />}
        </div>
      )}
      
      <img
        ref={lazy ? imgRef : undefined}
        src={lazy ? displaySrc || undefined : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading={lazy ? "lazy" : "eager"}
        {...props}
      />
      
      {isError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-zinc-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-zinc-500">Error al cargar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;

