/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Safelist only for dynamic flavor color classes used in HeroSection/NavArrows
    'text-yellow-400',
    'text-purple-500',
    'text-emerald-500',
    'border-yellow-400',
    'border-purple-500',
    'border-emerald-500',
    'hover:bg-yellow-400',
    'hover:bg-purple-500',
    'hover:bg-emerald-500',
    'hover:text-black',
    // Safelist for glow classes (if needed by script.js - keep for now)
    'glow-yellow',
    'glow-green',
    'glow-purple',
    // Removed patterns for CSS vars and Aurora as they seem unnecessary/handled
  ],
  theme: {
  	extend: {
  		colors: {
            // Add glow colors & Update yellow to new gold
            'glow-yellow': '#bfb23a', // New Gold
            'glow-green': '#34D399',
            'glow-purple': '#A78BFA',
            // Keep existing brand colors & Update gold
  			'brand-background': '#111111',
  			'brand-text': '#F5F5F5',
  			'brand-gold': '#bfb23a', // New Gold
  			'brand-lemon': '#FFD700', // Keep original lemon yellow distinct
  			'brand-lavender': '#8A2BE2',
  			'brand-cucumber': '#20B2AA',
  			'brand-dark': '#000000',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Playfair Display',
  				'serif'
  			],
  			body: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
        // Add keyframes and animation for Aurora
        keyframes: {
            aurora: {
              '0%, 100%': {
                'background-position': '50% 50%, 50% 50%',
              },
              '50%': {
                'background-position': '100% 100%, 0% 100%',
              },
            },
        },
        animation: {
            aurora: 'aurora 20s ease-in-out infinite',
        },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
