/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Monochrome theme classes
    'text-white',
    'text-gray-400',
    'text-gray-600',
    'border-white',
    'border-gray-400',
    'border-gray-600',
    'hover:bg-white',
    'hover:bg-gray-400',
    'hover:text-black',
    // Safelist for glow classes
    'glow-white',
    'glow-gray',
  ],
  theme: {
  	extend: {
  		colors: {
  		    // True black theme colors
  		    'brand-background': '#000',
  		    'brand-text': '#FFF',
            'brand-gold': '#FDEC25', // Accent yellow
            'brand-lavender': '#B580B5',
            'brand-cucumber': '#038264',
            'brand-lemon': '#FDEC25',
            'brand-dark': '#000',
            // Remove rainbow colors, keep monochrome
            'glow-white': '#FFF',
            'glow-gray': '#808080',
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
  				'Quicksand',
  				'sans-serif'
  			],
  			body: [
  				'Times',
  				'serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		  maxWidth: {
  		    '6xl': '1088px', // 20% smaller than 1360px
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
