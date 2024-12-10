// components/CustomImage.tsx
import { useState } from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  srcerr: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CustomImage({ src, alt, width, height, className, srcerr }: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(srcerr)}
    />
  );
}
