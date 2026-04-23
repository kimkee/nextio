// components/CustomImage.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  srcerr: string;
  alt: string;
  width: number;
  height: number;
  unoptimized?: boolean;
  priority?: boolean;
  className?: string;
  classNameErr?: string;
  loading?: 'eager' | 'lazy' | undefined;
}

export default function CustomImage({ src, alt, width, height, className, srcerr, unoptimized = true, priority, loading, classNameErr = 'opacity-60 bg-white/20' }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  // Sync src prop changes
  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  // Handle image load to detect YouTube placeholder (gray image)
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    // YouTube returns a 120x90 image if the thumbnail is not available.
    // hqdefault should be 480x360.
    if (src.includes('ytimg.com') && target.naturalWidth <= 120) {
      if (srcerr) {
        setImgSrc(srcerr);
        setIsError(true);
      }
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className + ` ${isError ? classNameErr : ''}`}
      unoptimized={unoptimized}
      priority={priority}
      onError={() => {
        setImgSrc(srcerr);
        setIsError(true);
      }}
      onLoad={handleLoad}
      loading={loading}
    />
  );
}
