"use client";
import { useEffect, useRef } from "react";
import { useBottleNexus } from '../contexts/BottleNexusContext';

interface BottleNexusButtonProps {
  id: number;
  onCartOpen?: () => void;
}

export const BottleNexusButton: React.FC<BottleNexusButtonProps> = ({ id, onCartOpen: _onCartOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { instance, isInitialized } = useBottleNexus();

  // Effect to create the hidden Bottle Nexus button
  useEffect(() => {
    if (!isInitialized || !instance || !containerRef.current) {
      return;
    }

    // Only create the component if the container is empty
    if (containerRef.current.innerHTML === '') {
      try {
        instance.createComponent({
          currentScript: containerRef.current,
          token: "1955e908-edcb-11ee-bf2c-0242ac110002",
          id: id,
          options: {
            iframe: true,
            layout: "basic",
            behavior: "none", // We handle the cart opening ourselves
            buttonText: "ADD TO CART", // This text won't be visible
          },
        });
        console.log(`Hidden BottleNexus button created for product ${id}`);
      } catch (e) {
        console.error(`Failed to create BottleNexus button for id: ${id}`, e);
      }
    }
  }, [id, isInitialized, instance]);

  // Function for our custom button to trigger the hidden one
  const handleCustomClick = () => {
    if (containerRef.current) {
      const iframe = containerRef.current.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        const buttonInIframe = iframe.contentWindow.document.querySelector('.shopify-buy__btn');
        if (buttonInIframe) {
          (buttonInIframe as HTMLElement).click();
        } else {
          console.error("Bottle Nexus button not found inside iframe. It might not have loaded yet.");
        }
      } else {
        console.error("Bottle Nexus iframe not found.");
      }
    }
  };

  return (
    <div className="bottle-nexus-wrapper w-full max-w-xs mx-auto">
      {/* This is OUR button. It is fully styled and visible. */}
      <button
        onClick={handleCustomClick}
        className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-light tracking-wider text-sm"
      >
        ADD TO CART
      </button>

      {/* This is the REAL Bottle Nexus button. It is hidden from view. */}
      <div 
        ref={containerRef} 
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          opacity: 0,
          pointerEvents: 'none' // Ensures it can't be accidentally clicked
        }}
        data-product-id={id}
        aria-hidden="true"
      />
    </div>
  );
};
