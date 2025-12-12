/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // gray-200
        ring: 'var(--color-ring)', // green-800
        background: 'var(--color-background)', // cream
        foreground: 'var(--color-foreground)', // gray-900
        primary: {
          DEFAULT: 'var(--color-primary)', // green-800
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // brown
          foreground: 'var(--color-secondary-foreground)' // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // goldenrod
          foreground: 'var(--color-accent-foreground)' // gray-900
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red
          foreground: 'var(--color-destructive-foreground)' // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // green
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange
          foreground: 'var(--color-warning-foreground)' // gray-900
        },
        error: {
          DEFAULT: 'var(--color-error)', // red
          foreground: 'var(--color-error-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-200
          foreground: 'var(--color-muted-foreground)' // gray-600
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-900
        },
        trust: {
          DEFAULT: 'var(--color-trust)', // sage-green
          foreground: 'var(--color-trust-foreground)' // white
        },
        cta: {
          DEFAULT: 'var(--color-cta)', // dark-green
          foreground: 'var(--color-cta-foreground)' // white
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        accent: ['Dancing Script', 'cursive']
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h1': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'organic-sm': '0 4px 20px rgba(45, 80, 22, 0.08)',
        'organic-md': '0 8px 40px rgba(45, 80, 22, 0.12)',
        'organic-lg': '0 12px 60px rgba(45, 80, 22, 0.15)'
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'grow': 'grow 2s ease-out forwards'
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' }
        },
        grow: {
          'from': { strokeDashoffset: '1000' },
          'to': { strokeDashoffset: '0' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}