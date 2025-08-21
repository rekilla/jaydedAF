declare global {
  interface Window {
    BottleNexus?: {
      init: () => {
        createComponent: (opts: any) => void;
        setConfig?: (cfg: any) => any;
      };
    };
  }
}
export {};