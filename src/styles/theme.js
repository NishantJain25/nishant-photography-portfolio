// Design System - Single Source of Truth
export const theme = {
  // Colors
  colors: {
    // Primary palette
    primary: {
      50: "#f0f4ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },

    // Neutral palette
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a",
    },

    // Semantic colors
    white: "#ffffff",
    black: "#000000",

    // Background colors
    background: {
      primary: "#fafafa",
      secondary: "#ffffff",
      dark: "#171717",
    },

    // Text colors
    text: {
      primary: "#171717",
      secondary: "#525252",
      tertiary: "#737373",
      inverse: "#ffffff",
    },
  },

  // Typography
  typography: {
    // Font families
    fontFamily: {
      primary:
        '"Archivo", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      heading:
        '"Archivo", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      body: '"Archivo", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },

    // Font sizes (rem based for accessibility)
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
      "8xl": "6rem", // 96px
      "9xl": "8rem", // 128px
      "10xl": "10rem", // 160px
    },

    // Font weights
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Line heights
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    // Letter spacing
    letterSpacing: {
      tightest: "-0.1em",
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  // Spacing (rem based)
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// CSS Variables for global access
export const cssVariables = {
  // Colors
  "--color-primary-500": theme.colors.primary[500],
  "--color-primary-600": theme.colors.primary[600],
  "--color-neutral-50": theme.colors.neutral[50],
  "--color-neutral-900": theme.colors.neutral[900],
  "--color-white": theme.colors.white,
  "--color-black": theme.colors.black,

  // Typography
  "--font-family-primary": theme.typography.fontFamily.primary,
  "--font-size-base": theme.typography.fontSize.base,
  "--font-weight-normal": theme.typography.fontWeight.normal,
  "--font-weight-medium": theme.typography.fontWeight.medium,
  "--line-height-normal": theme.typography.lineHeight.normal,

  // Spacing
  "--spacing-4": theme.spacing[4],
  "--spacing-6": theme.spacing[6],
  "--spacing-8": theme.spacing[8],

  // Border radius
  "--border-radius-lg": theme.borderRadius.lg,
  "--border-radius-full": theme.borderRadius.full,

  // Shadows
  "--shadow-lg": theme.shadows.lg,
};

export default theme;
