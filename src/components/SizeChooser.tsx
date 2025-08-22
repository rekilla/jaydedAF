import { useEffect, useRef, useState } from "react";
import { ensureBottleNexus, mountBnCreateComponent } from "../lib/bn";

type SizeConfig = {
  id375: number;
  id750: number;
  token: string;
  options375: Record<string, any>;
  options750: Record<string, any>;
  /**
   * Visual theme for the trigger button only:
   * - "dark": white outline/text, hover fill white (for dark backgrounds)
   * - "light": black outline/text, hover fill black (for light backgrounds)
   */
  variant?: "dark" | "light";
};

export default function SizeChooser({
  id375,
  id750,
  token,
  options375,
  options750,
  variant = "dark",
}: SizeConfig) {
  console.log('[BN] SizeChooser mounted', { id375, id750, hasToken: !!token });
  const [open, setOpen] = useState(false);

  const slot375Ref = useRef<HTMLDivElement | null>(null);
  const slot750Ref = useRef<HTMLDivElement | null>(null);
  const once375 = useRef(false);
  const once750 = useRef(false);

  useEffect(() => {
    console.log('[BN] SizeChooser open state', open);


    (async () => {
      console.log('[BN] Ensuring BottleNexus...');
      await ensureBottleNexus();
      console.log('[BN] BottleNexus ensured');

      // Only mount if not already mounted and elements exist
      if (!once750.current && slot750Ref.current && slot750Ref.current.children.length === 0) {
        once750.current = true;
        console.log('[BN] Mounting 750ML button', { id: id750 });
        mountBnCreateComponent(slot750Ref.current, {
          token,
          id: id750,
          options: options750,
        });
      }
      if (!once375.current && slot375Ref.current && slot375Ref.current.children.length === 0) {
        once375.current = true;
        console.log('[BN] Mounting 375ML button', { id: id375 });
        mountBnCreateComponent(slot375Ref.current, {
          token,
          id: id375,
          options: options375,
        });
      }
    })();
  }, [open, id375, id750, token]);

  return (
    <div className={`bn-chooser ${open ? "open" : ""} ${variant === "light" ? "bn-theme-light" : ""}`}>
      <button
        className="bn-purchase"
        onClick={() => { console.log('[BN] PURCHASE clicked'); setOpen((v) => !v) }}
        aria-expanded={open}
        type="button"
      >
        PURCHASE
      </button>

      <div className="bn-sizes" aria-hidden={!open}>
        <div className="bn-size">
          {/* BottleNexus will render the 750ML button here */}
          <div ref={slot750Ref} />
        </div>
        <div className="bn-size">
          {/* BottleNexus will render the 375ML button here */}
          <div ref={slot375Ref} />
        </div>
      </div>
    </div>
  );
}