/** @type {import('tailwindcss').Config} */
module.exports = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gradient: {
          from: "hsl(var(--gradient-from))",
          to: "hsl(var(--gradient-to))",
        },
        warm: "hsl(var(--warm-accent))",
        cool: "hsl(var(--cool-accent))",
      },
      boxShadow: {
        'glow': '0 0 20px hsl(var(--primary) / 0.3)',
        'glow-lg': '0 0 40px hsl(var(--primary) / 0.6)',
        'soft': '0 4px 20px hsl(var(--foreground) / 0.1)',
        'card': '0 8px 30px hsl(var(--foreground) / 0.12)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.foreground'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'underline',
              textDecorationColor: theme('colors.primary.DEFAULT') + '60',
              textUnderlineOffset: '3px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              '&:hover': {
                textDecorationColor: theme('colors.primary.DEFAULT'),
                color: theme('colors.gradient.to'),
                transform: 'translateY(-1px)',
              },
            },
            h1: {
              fontSize: theme('fontSize.3xl[0]'),
              fontWeight: '800',
              background: `linear-gradient(135deg, ${theme('colors.gradient.from')}, ${theme('colors.gradient.to')})`,
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: theme('lineHeight.tight'),
            },
            h2: {
              fontSize: theme('fontSize.2xl[0]'),
              fontWeight: '700',
              color: theme('colors.foreground'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              fontSize: theme('fontSize.xl[0]'),
              fontWeight: '600',
              color: theme('colors.foreground'),
            },
            code: {
              backgroundColor: theme('colors.muted.DEFAULT'),
              padding: theme('spacing.1'),
              borderRadius: theme('borderRadius.sm'),
              fontSize: theme('fontSize.sm[0]'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      textColor: ["hover"],
      boxShadow: ["hover"],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
