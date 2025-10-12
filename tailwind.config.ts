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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'], // Custom font family for the hero title
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        landing: {
          background: {
            start: "hsl(var(--landing-background-start))",
            end: "hsl(var(--landing-background-end))",
          },
          text: {
            primary: "hsl(var(--landing-text-primary))",
          },
          button: {
            mac: {
              foreground: "hsl(var(--landing-button-mac-foreground))",
            },
            gradient: {
              start: "hsl(var(--landing-button-gradient-start))",
              end: "hsl(var(--landing-button-gradient-end))",
              "hover-start": "hsl(var(--landing-button-gradient-hover-start))",
              "hover-end": "hsl(var(--landing-button-gradient-hover-end))",
            },
            cta: {
              background: {
                start: "hsl(var(--landing-cta-background-start))",
                end: "hsl(var(--landing-cta-background-end))",
              },
              text: {
                primary: "hsl(var(--landing-cta-text-primary))",
                secondary: "hsl(var(--landing-cta-text-secondary))",
              },
              floating: {
                DEFAULT: "hsl(var(--landing-cta-floating-bg))",
                border: "hsl(var(--landing-cta-floating-border))",
                text: "hsl(var(--landing-cta-floating-text))",
              },
            },
          },
          card: {
            background: "hsl(var(--landing-card-background))",
            border: "hsl(var(--landing-card-border))",
          },
          cookie: {
            background: "hsl(var(--landing-cookie-background))",
            foreground: "hsl(var(--landing-cookie-foreground))",
          },
          icon: {
            DEFAULT: "hsl(var(--landing-icon-color))",
          },
          logo: {
            text: "hsl(var(--landing-logo-text))",
            bg: "hsl(var(--landing-logo-bg))",
            fg: "hsl(var(--landing-logo-fg))",
          },
          cta: {
            background: {
              start: "hsl(var(--landing-cta-background-start))",
              end: "hsl(var(--landing-cta-background-end))",
            },
            text: {
              primary: "hsl(var(--landing-cta-text-primary))",
              secondary: "hsl(var(--landing-cta-text-secondary))",
            },
            floating: {
              DEFAULT: "hsl(var(--landing-cta-floating-bg))",
              border: "hsl(var(--landing-cta-floating-border))",
              text: "hsl(var(--landing-cta-floating-text))",
            },
          },
        },
        undetectable: {
          background: {
            start: "hsl(var(--undetectable-background-start))",
            end: "hsl(var(--undetectable-background-end))",
          },
          card: {
            background: "hsl(var(--undetectable-card-background))",
            border: "hsl(var(--undetectable-card-border))",
          },
          badge: {
            visible: {
              DEFAULT: "hsl(var(--undetectable-badge-visible-bg))",
              foreground: "hsl(var(--undetectable-badge-visible-fg))",
            },
            invisible: {
              DEFAULT: "hsl(var(--undetectable-badge-invisible-bg))",
              foreground: "hsl(var(--undetectable-badge-invisible-fg))",
            },
          },
          text: {
            primary: "hsl(var(--undetectable-text-primary))",
            secondary: "hsl(var(--undetectable-text-secondary))",
            muted: "hsl(var(--undetectable-text-muted))",
          },
        },
        pricing: {
          DEFAULT: "hsl(var(--pricing-bg))",
          card: {
            DEFAULT: "hsl(var(--pricing-card-bg))",
            border: "hsl(var(--pricing-card-border))",
          },
          text: {
            primary: "hsl(var(--pricing-text-primary))",
            secondary: "hsl(var(--pricing-text-secondary))",
          },
          button: {
            DEFAULT: "hsl(var(--pricing-button-default-bg))",
            foreground: "hsl(var(--pricing-button-default-fg))",
          },
          toggle: {
            DEFAULT: "hsl(var(--pricing-toggle-bg))",
            active: {
              DEFAULT: "hsl(var(--pricing-toggle-active-bg))",
              foreground: "hsl(var(--pricing-toggle-active-fg))",
            },
          },
          feature: {
            check: "hsl(var(--pricing-feature-check))",
            cross: "hsl(var(--pricing-feature-cross))",
            "coming-soon": "hsl(var(--pricing-feature-coming-soon))",
          },
        },
        uiLightBlue: { // New color for light bluish backgrounds
          DEFAULT: "hsl(var(--ui-light-blue-bg))",
        },
        uiDarkBlue: { // New color for darker bluish backgrounds (for dark mode consistency)
          DEFAULT: "hsl(var(--ui-dark-blue-bg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(5deg)" },
          "50%": { transform: "translateY(0) rotate(0deg)" },
          "75%": { transform: "translateY(10px) rotate(-5deg)" },
        },
        "fade-in-up": { // New keyframe for fade-in-up animation
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards", // New animation
      },
      boxShadow: {
        'button-glow-default': '0 0 5px rgba(59, 130, 246, 0.2)', // Subtle default glow (blue-500)
        'button-glow-hover': '0 0 20px rgba(59, 130, 246, 0.6)', // More pronounced on hover
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;