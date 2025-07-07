"use client";
import { useEffect, useRef } from "react";

interface BottleNexusButtonProps {
  id: number;
  onCartOpen?: () => void;
}

export const BottleNexusButton: React.FC<BottleNexusButtonProps> = ({ id, onCartOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const initializeButton = () => {
      if (!containerRef.current) return;
      
      if (!(window as any).BottleNexus) {
        setTimeout(initializeButton, 100);
        return;
      }

      try {
        // Create a script tag inside the container to act as currentScript
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = `
          (function() {
            var currentScript = document.currentScript;
            var instance = window.BottleNexus.init();
            
            // Store instance for later use
            window.BottleNexusInstance = instance;
            
            instance.createComponent({
              currentScript: currentScript,
              token: "1955e908-edcb-11ee-bf2c-0242ac110002",
              id: ${id},
              options: {
                iframe: true,
                layout: "basic",
                behavior: "sidebar",
                buttonText: "ADD TO CART",
                cartCheckoutText: "CHECKOUT",
                utm: { source: "BuyButton" }
              }
            });
            
            // Debug: Log when button is created
            console.log('BottleNexus button created for product ${id}');
            
            // Listen for add to cart events
            if (instance.cart) {
              instance.cart.on('add', function(event) {
                console.log('Product added to cart:', event);
                window.dispatchEvent(new CustomEvent('bottlenexus:cart:add', { detail: event }));
              });
              
              instance.cart.on('open', function() {
                console.log('Cart opened');
                window.dispatchEvent(new CustomEvent('bottlenexus:cart:open'));
              });
              
              instance.cart.on('update', function(cart) {
                console.log('Cart updated:', cart);
                window.dispatchEvent(new CustomEvent('bottlenexus:cart:update', { detail: cart }));
              });
            }
          })();
        `;
        
        containerRef.current.appendChild(script);
        scriptRef.current = script;
        
        console.log(`BottleNexus button initialized for product ${id}`);
      } catch (e) {
        console.error(`Failed to create BottleNexus button for id: ${id}`, e);
      }
    };

    // Start initialization
    const timer = setTimeout(initializeButton, 1000);

    return () => {
      clearTimeout(timer);
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.remove();
      }
    };
  }, [id]);

  return (
    <div 
      ref={containerRef} 
      className="bottle-nexus-button-container"
      data-product-id={id}
    />
  );
};
