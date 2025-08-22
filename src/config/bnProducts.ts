export const BN_IDS = {
  lemon:    { "750": 7955, "375": 7958 },
  lavender: { "750": 7956, "375": 7959 },
  cucumber: { "750": 7957, "375": 7960 },
} as const;

export const baseOptions = {
  iframe: true,
  layout: "basic",
  behavior: "sidebar",
  buttonRadius: "0",
  buttonFontSize: 16,
  buttonWidth: 160,
  buttonAlignment: "center",
  buttonTextColor: "#FFFFFFFF",
  buttonBackground: "transparent",
  initialQuantity: 1,
  cartButtonRadius: 5,
  cartCheckoutBackgroundColor: "#000000ff",
  cartCheckoutBackgroundDisabledColor: "#9b9b9bff",
  cartCheckoutTextColor: "#FFFFFFFF",
  cartHeadingText: "Cart",
  cartCheckoutText: "CHECKOUT",
  cartEmptyText: "No products added",
  cartAdditionalInformationText: "",
  cartBackgroundColor: "#FEFEFEFF",
  cartTextColor: "#000000",
  showInput: false,
  utm: { source: "BuyButton" },
  donation: "no_donation",
  styles: {
    "[data-component='button']": {
      "width": "141px",
      "height": "45px",
      "background-color": "#FFFFFF",
      "border": "solid 1px #000000",
      "color": "#000000",
      "font-size": "14px",
      "font-weight": "500",
      "text-transform": "uppercase",
      "letter-spacing": "0.05em",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "gap": "8px",
    },
    "[data-component='button']:hover": {
      "background-color": "#000000",
      "color": "#FFFFFF",
      "border": "solid 1px #000000"
    },
  },
} as const;

export const opts = (size: "375ml" | "750ml") => ({ ...baseOptions, buttonText: size });