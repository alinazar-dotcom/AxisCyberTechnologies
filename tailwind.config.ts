import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neon Cyberpunk Colors
        'neon-purple': '#DD00FF',
        'neon-cyan': '#00FFFF',
        'neon-pink': '#FF0099',
        'neon-green': '#00FF9D',
        'neon-orange': '#FF7A00',
        
        // Brand colors (legacy)
        'brand-cyan': '#00E5FF',
        'brand-magenta': '#B900FF',
        'brand-orange': '#FF7A00',
        
        // Background colors
        'bg-primary': '#05060A',
        'bg-secondary': '#0A0A14',
        'bg-tertiary': '#0D0D1A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'neon-purple-sm': '0 0 20px rgba(221, 0, 255, 0.3)',
        'neon-purple-md': '0 0 30px rgba(221, 0, 255, 0.3)',
        'neon-purple-lg': '0 0 40px rgba(221, 0, 255, 0.6)',
        'neon-purple-xl': '0 20px 60px rgba(221, 0, 255, 0.6)',
        
        'neon-cyan-sm': '0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-cyan-md': '0 0 30px rgba(0, 255, 255, 0.3)',
        'neon-cyan-lg': '0 0 40px rgba(0, 255, 255, 0.6)',
        'neon-cyan-xl': '0 20px 60px rgba(0, 255, 255, 0.6)',
        
        'neon-pink-sm': '0 0 20px rgba(255, 0, 153, 0.3)',
        'neon-pink-md': '0 0 30px rgba(255, 0, 153, 0.3)',
        'neon-pink-lg': '0 0 40px rgba(255, 0, 153, 0.6)',
        'neon-pink-xl': '0 20px 60px rgba(255, 0, 153, 0.6)',
        
        'neon-green-sm': '0 0 20px rgba(0, 255, 157, 0.3)',
        'neon-green-md': '0 0 30px rgba(0, 255, 157, 0.3)',
        'neon-green-lg': '0 0 40px rgba(0, 255, 157, 0.6)',
        'neon-green-xl': '0 20px 60px rgba(0, 255, 157, 0.6)',
      },
      dropShadow: {
        'neon-purple': '0 0 20px rgba(221, 0, 255, 0.8)',
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.8)',
        'neon-pink': '0 0 20px rgba(255, 0, 153, 0.8)',
        'neon-green': '0 0 20px rgba(0, 255, 157, 0.8)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        neonPulse: {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 10px currentColor) brightness(1)',
          },
          '50%': { 
            filter: 'drop-shadow(0 0 30px currentColor) brightness(1.5)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
