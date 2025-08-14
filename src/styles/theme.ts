export const theme = {
  colors: {
    black: '#000',
    white: '#FFF',
    accentYellow: '#FFE34D',
    lavender: '#C7B8FF',
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Montserrat, sans-serif',
  },
} as const;

export type Theme = typeof theme;
