// components/CustomImage.tsx
import { useState } from 'react';
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
  loading?: 'eager' | 'lazy' | undefined;
}

export default function CustomImage({ src, alt, width, height, className, srcerr, unoptimized ,priority, loading }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className + ` ${isError ? 'opacity-60 bg-white/20' : ''}`}
      unoptimized={unoptimized}
      priority={priority}
      onError={() => {
        setImgSrc(srcerr);
        setIsError(true);
      }}
      loading={loading}
    />
  );
}
