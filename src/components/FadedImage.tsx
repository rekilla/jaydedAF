import React, { useState, useEffect } from 'react';
import './FadedImage.css';

interface FadedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const FadedImage: React.FC<FadedImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Preload image for better performance
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`faded-image-container ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`faded-image ${isLoaded ? 'faded-in' : ''}`}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default FadedImage;