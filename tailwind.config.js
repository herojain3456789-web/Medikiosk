/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hospital: {
          bg: '#F8FAFC',        // Slate-50: Crisp, clean hospital background
          surface: '#FFFFFF',   // Pure White card background
          surfaceSubtle: '#F1F5F9', // Slate-100: Soft gray for tables/drawers
          border: '#E2E8F0',    // Slate-200: Clean light border
          borderHover: '#CBD5E1', // Slate-300
          navy: '#0F172A',      // Slate-900: Deep clinical navy
          navyLight: '#1E293B', // Slate-800: Secondary navy
          slate: '#334155',     // Slate-700
          textMuted: '#64748B', // Slate-500: Readable neutral text
          blue: '#0284C7',      // Sky-600: Medical primary blue
          blueHover: '#0369A1', // Sky-700
          blueLight: '#E0F2FE', // Sky-100: Soft blue chip background
          teal: '#0D9488',      // Teal-600: Secondary medical teal
          tealLight: '#CCFBF1', // Teal-100
          green: '#16A34A',     // Green-600: Success status
          greenLight: '#DCFCE7', // Green-100
          amber: '#D97706',     // Amber-600: Warning status
          amberLight: '#FEF3C7', // Amber-100
          red: '#DC2626',       // Red-600: Clinical Red Flag Triage
          redLight: '#FEE2E2',  // Red-100: Red flag background
          redDark: '#991B1B',   // Red-800
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'kiosk': '12px',
        'kiosk-lg': '16px',
        'kiosk-xl': '20px',
      },
      boxShadow: {
        'kiosk-sm': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
        'kiosk': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'kiosk-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
