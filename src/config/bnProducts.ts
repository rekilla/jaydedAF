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
      "background-color": "TRANSPARENT",
      "border": "solid 1px #FFFFFF",
      "color": "#FFFFFF"
    },
    "[data-component='button']:hover": {
      "background-color": "#FFFFFF",
      "color": "#000000",
      "border": "solid 1px #FFFFFF"
    },
  },
} as const;

export const opts = (text: string) => ({ ...baseOptions, buttonText: text });