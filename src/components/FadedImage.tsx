import React from 'react';
import './FadedImage.css';

interface FadedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FadedImage: React.FC<FadedImageProps> = ({ src, alt, className }) => {
  return (
    <div className={`faded-image-container ${className || ''}`}>
      <img src={src} alt={alt} className="faded-image" />
    </div>
  );
};

export default FadedImage;