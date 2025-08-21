const BN_SRC = "https://buybutton.bottlenexus.com/buybutton.min.js";

let bnPromise: Promise<void> | null = null;

export function ensureBottleNexus(): Promise<void> {
  if (window.BottleNexus) {
    console.debug("[BN] window.BottleNexus already present");
    return Promise.resolve();
  }
  if (bnPromise) {
    console.debug("[BN] Reusing existing loader promise");
    return bnPromise;
  }

  console.debug("[BN] Creating loader promise and ensuring single script tag");
  bnPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src^="${BN_SRC}"]`) as HTMLScriptElement | null;
    if (existing) {
      console.debug("[BN] Found existing script tag, waiting for load");
      existing.addEventListener("load", () => {
        console.debug("[BN] Script loaded (existing tag)");
        resolve();
      }, { once: true });
      existing.addEventListener("error", () => {
        console.error("[BN] Script error (existing tag)");
        reject(new Error("BottleNexus failed to load"));
      }, { once: true });
      return;
    }
    const s = document.createElement("script");
    s.async = true;
    s.defer = true;
    // No Date.now cache-buster — we want exactly one script tag
    s.src = BN_SRC;
    s.onload = () => {
      console.debug("[BN] Script loaded (injected tag)");
      resolve();
    };
    s.onerror = () => {
      console.error("[BN] Script error (injected tag)");
      reject(new Error("BottleNexus failed to load"));
    };
    console.debug("[BN] Injecting script tag", { src: BN_SRC });
    document.head.appendChild(s);
  });

  return bnPromise;
}

/**
 * Injects an inline script that uses document.currentScript so BottleNexus
 * can render the buy button right where we place this script.
 */
export function mountBnCreateComponent(
  container: HTMLElement,
  cfg: { token: string; id: number; options: Record<string, any> }
) {
  if (!cfg?.token) {
    console.error("[BN] Missing token for id", cfg?.id);
  }
  console.debug("[BN] Mount start", { id: cfg.id, hasToken: !!cfg.token, container });

  const script = document.createElement("script");
  script.type = "text/javascript";
  // Inline script uses document.currentScript; add retries + logs for robustness
  const js = `
    (function (currentScript) {
      var tries = 0;
      function BottleNexusInit() {
        if (window.BottleNexus && typeof BottleNexus.init === 'function') {
          try {
            console.debug("[BN inline] creating component", { id: ${cfg.id} });
            BottleNexus.init().createComponent({
              currentScript: currentScript,
              token: '${cfg.token}',
              id: ${cfg.id},
              options: ${JSON.stringify(cfg.options)}
            });
          } catch (e) {
            console.error("[BN inline] createComponent error", e);
          }
        } else if (tries < 120) { // retry up to ~30s (250ms * 120)
          tries++;
          setTimeout(BottleNexusInit, 250);
        } else {
          console.error("[BN inline] BottleNexus not available after retries for id ${cfg.id}");
        }
      }
      BottleNexusInit();
    })(document.currentScript);
  `;
  // Set using text rather than innerHTML to avoid escaping issues
  script.appendChild(document.createTextNode(js));
  container.appendChild(script);
  console.debug("[BN] Inline script appended", { id: cfg.id });
}