"use client";

import React, { useState } from 'react';
import StyledButton from './StyledButton'; // Reusing the base styled button

// Shopping Cart Icon SVG provided by the user
const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 141 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0.5" y="0.5" width="140" height="44" stroke="black"/>
    <line x1="11" y1="22" x2="32" y2="22" stroke="black"/>
    <path d="M42 29.5C42.5523 29.5 43 29.0523 43 28.5C43 27.9477 42.5523 27.5 42 27.5C41.4477 27.5 41 27.9477 41 28.5C41 29.0523 41.4477 29.5 42 29.5Z" fill="black"/>
    <path d="M49 29.5C49.5523 29.5 50 29.0523 50 28.5C50 27.9477 49.5523 27.5 49 27.5C48.4477 27.5 48 27.9477 48 28.5C48 29.0523 48.4477 29.5 49 29.5Z" fill="black"/>
    <path d="M39.49 15.902C39.4674 15.7887 39.4062 15.6867 39.3168 15.6134C39.2275 15.5402 39.1155 15.5001 39 15.5H37V16.5H38.59L40.51 26.098C40.5326 26.2113 40.5938 26.3133 40.6832 26.3866C40.7725 26.4598 40.8845 26.4999 41 26.5H50V25.5H41.41L41.01 23.5H50C50.1137 23.5 50.2241 23.4612 50.3128 23.39C50.4015 23.3188 50.4633 23.2195 50.488 23.1085L51.622 18H50.5985L49.599 22.5H40.81L39.49 15.902Z" fill="black"/>
    <path d="M47.793 17.793L46 19.586V15.5H45V19.586L43.207 17.793L42.5 18.5L45.5 21.5L48.5 18.5L47.793 17.793Z" fill="black"/>
    <path d="M63.0739 28.1591C62.358 28.1591 61.7178 28.0303 61.1534 27.7727C60.589 27.5114 60.142 27.1496 59.8125 26.6875C59.483 26.2254 59.3087 25.6932 59.2898 25.0909H60.3636C60.3826 25.5152 60.5133 25.8864 60.7557 26.2045C60.9981 26.5189 61.3201 26.7652 61.7216 26.9432C62.1231 27.1174 62.5701 27.2045 63.0625 27.2045C63.6004 27.2045 64.0739 27.1042 64.483 26.9034C64.8958 26.7027 65.2178 26.428 65.4489 26.0795C65.6837 25.7273 65.8011 25.3295 65.8011 24.8864C65.8011 24.4167 65.6818 24.0019 65.4432 23.642C65.2045 23.2822 64.8617 23.0019 64.4148 22.8011C63.9716 22.6004 63.4413 22.5 62.8239 22.5H62.142V21.5455H62.8239C63.3277 21.5455 63.7727 21.4545 64.1591 21.2727C64.5492 21.0871 64.8561 20.8277 65.0795 20.4943C65.303 20.161 65.4148 19.7689 65.4148 19.3182C65.4148 18.8902 65.3182 18.5133 65.125 18.1875C64.9318 17.8617 64.6591 17.6061 64.3068 17.4205C63.9583 17.2348 63.5511 17.142 63.0852 17.142C62.6345 17.142 62.2216 17.2292 61.8466 17.4034C61.4716 17.5777 61.1686 17.8239 60.9375 18.142C60.7102 18.4602 60.589 18.8371 60.5739 19.2727H59.5455C59.5606 18.6667 59.7273 18.1345 60.0455 17.6761C60.3674 17.214 60.7936 16.8542 61.3239 16.5966C61.858 16.3352 62.4489 16.2045 63.0966 16.2045C63.7822 16.2045 64.375 16.3447 64.875 16.625C65.375 16.9053 65.7614 17.2784 66.0341 17.7443C66.3106 18.2064 66.4489 18.7159 66.4489 19.2727C66.4489 19.9356 66.2689 20.5038 65.9091 20.9773C65.5492 21.447 65.0644 21.7727 64.4545 21.9545V22.0284C65.197 22.1761 65.7803 22.5057 66.2045 23.017C66.6326 23.5246 66.8466 24.1477 66.8466 24.8864C66.8466 25.5076 66.6837 26.0663 66.358 26.5625C66.0322 27.0549 65.5852 27.4451 65.017 27.733C64.4527 28.017 63.8049 28.1591 63.0739 28.1591ZM69.6932 28L74.9943 17.392V17.3182H68.8864V16.3636H76.108V17.3636L70.8125 28H69.6932ZM81.6207 28.1591C80.973 28.1591 80.3935 28.0284 79.8821 27.767C79.3745 27.5019 78.9692 27.1383 78.6662 26.6761C78.367 26.214 78.2079 25.6856 78.1889 25.0909H79.2173C79.2514 25.7083 79.4938 26.2159 79.9446 26.6136C80.3954 27.0076 80.9541 27.2045 81.6207 27.2045C82.1397 27.2045 82.6018 27.0814 83.0071 26.8352C83.4124 26.5852 83.7287 26.2443 83.956 25.8125C84.187 25.3769 84.3026 24.8864 84.3026 24.3409C84.2988 23.7727 84.1757 23.2727 83.9332 22.8409C83.6908 22.4053 83.3613 22.0644 82.9446 21.8182C82.5317 21.572 82.0677 21.4489 81.5526 21.4489C81.1624 21.4451 80.7798 21.5095 80.4048 21.642C80.0298 21.7746 79.7173 21.9451 79.4673 22.1534L78.4048 22.017L79.1037 16.3636H84.8537V17.3182H79.9957L79.5298 21.2102H79.5866C79.8442 20.9943 80.1567 20.8182 80.5241 20.6818C80.8954 20.5455 81.2874 20.4773 81.7003 20.4773C82.3859 20.4773 83.0014 20.642 83.5469 20.9716C84.0961 21.3011 84.5298 21.7557 84.848 22.3352C85.17 22.911 85.331 23.5739 85.331 24.3239C85.331 25.0587 85.17 25.7159 84.848 26.2955C84.5298 26.8712 84.0904 27.3258 83.5298 27.6591C82.973 27.9924 82.3366 28.1591 81.6207 28.1591ZM87.7884 28V19.2727H88.7713V20.6136H88.8622C89.0365 20.1629 89.3262 19.8087 89.7315 19.5511C90.1406 19.2898 90.6312 19.1591 91.2031 19.1591C91.8054 19.1591 92.2997 19.3011 92.6861 19.5852C93.0762 19.8655 93.3679 20.2519 93.5611 20.7443H93.6349C93.8319 20.2595 94.152 19.875 94.5952 19.5909C95.0421 19.303 95.5838 19.1591 96.2202 19.1591C97.0308 19.1591 97.6709 19.4148 98.1406 19.9261C98.6103 20.4337 98.8452 21.1761 98.8452 22.1534V28H97.8338V22.1534C97.8338 21.464 97.6577 20.947 97.3054 20.6023C96.9531 20.2576 96.4891 20.0852 95.9134 20.0852C95.2467 20.0852 94.7334 20.2898 94.3736 20.6989C94.0137 21.108 93.8338 21.6269 93.8338 22.2557V28H92.7997V22.0625C92.7997 21.4716 92.6349 20.9943 92.3054 20.6307C91.9759 20.267 91.5118 20.0852 90.9134 20.0852C90.5118 20.0852 90.1501 20.1837 89.8281 20.3807C89.5099 20.5777 89.258 20.8523 89.0724 21.2045C88.8906 21.553 88.7997 21.9545 88.7997 22.4091V28H87.7884ZM102.534 16.3636V28H101.523V16.3636H102.534Z" fill="black"/>
    <line x1="109" y1="22" x2="130" y2="22" stroke="black"/>
  </svg>
);

interface SizeAddToCartButtonProps {
  productId: number;
  size: string; // e.g., "375ml", "750ml"
  inStock?: boolean;
  onClick?: () => void; // Optional click handler for parent components
}

export const SizeAddToCartButton: React.FC<SizeAddToCartButtonProps> = ({
  productId,
  size,
  inStock = true,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock || isLoading) return;

    setIsLoading(true);
    // Simulate adding to cart
    try {
      console.log(`Product ${productId}, size ${size} added to cart! (Simulated)`);
      // In a real application, you would dispatch an action to your cart context
      // or make an API call here.
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        if (onClick) onClick(); // Call any passed-in click handler
      }, 500); // Simulate network delay
    }
  };

  // Styling based on Figma details
  const buttonClasses = `
    w-[141px] h-[45px]
    border border-black
    bg-white text-black
    font-medium text-[14px] tracking-wider uppercase
    flex items-center justify-center gap-2
    hover:bg-gray-100 // Assuming a subtle hover effect
  `;

  if (!inStock) {
    return (
      <StyledButton
        disabled
        className="opacity-40 cursor-not-allowed bg-gray-100 border-gray-300 text-gray-500"
        showDashes={false}
        responsive={false}
      >
        <span className="flex items-center gap-2">
          <ShoppingCartIcon className="w-4 h-4" />
          {size}
        </span>
      </StyledButton>
    );
  }

  return (
    <StyledButton // Removed motion.div wrapper
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`relative ${buttonClasses}`}
      showDashes={false}
      responsive={false}
      variant="secondary" // Using secondary variant for white background, black text, black border
    >
      <span className={`transition-opacity flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ShoppingCartIcon className="w-4 h-4" />
        {size}
      </span>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-black border-t-transparent
                           rounded-full animate-spin" />
        </div>
      )}
    </StyledButton>
  );
};