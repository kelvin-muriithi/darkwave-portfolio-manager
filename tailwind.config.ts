
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					blue: '#00F0FF',
					purple: '#9442FE',
					pink: '#FF00E5',
					green: '#00FF94',
					yellow: '#FFDE59'
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Manrope', 'sans-serif'],
				mono: ['Roboto Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'glow': {
					'0%, 100%': { 
						'text-shadow': '0 0 8px rgba(0, 240, 255, 0.7), 0 0 12px rgba(0, 240, 255, 0.5)'
					},
					'50%': { 
						'text-shadow': '0 0 16px rgba(0, 240, 255, 0.9), 0 0 24px rgba(0, 240, 255, 0.7)'
					}
				},
				'pulse-neon': {
					'0%, 100%': { 
						'box-shadow': '0 0 8px rgba(0, 240, 255, 0.7), 0 0 12px rgba(0, 240, 255, 0.5)',
						'border-color': 'rgba(0, 240, 255, 0.7)'
					},
					'50%': { 
						'box-shadow': '0 0 16px rgba(0, 240, 255, 0.9), 0 0 24px rgba(0, 240, 255, 0.7)',
						'border-color': 'rgba(0, 240, 255, 0.9)'
					}
				},
				'blur-in': {
					'0%': { opacity: '0', filter: 'blur(10px)' },
					'100%': { opacity: '1', filter: 'blur(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-delayed': 'fade-in 0.6s ease-out 0.2s forwards',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
				'glow': 'glow 2s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'blur-in': 'blur-in 0.6s ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
				'gradient-dark': 'linear-gradient(180deg, #121212 0%, #1E1E1E 100%)',
				'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
			},
			boxShadow: {
				'neon-blue': '0 0 8px rgba(0, 240, 255, 0.5), 0 0 16px rgba(0, 240, 255, 0.3)',
				'neon-purple': '0 0 8px rgba(148, 66, 254, 0.5), 0 0 16px rgba(148, 66, 254, 0.3)',
				'neon-pink': '0 0 8px rgba(255, 0, 229, 0.5), 0 0 16px rgba(255, 0, 229, 0.3)',
				'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
			},
			backdropBlur: {
				'xs': '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
