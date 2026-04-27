import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tpma: {
          blue: '#5A5BF5',
          dark: '#29303E',
          white: '#FFFFFF',
          black: '#262626',
          gold: '#FFCF60',
          coral: '#FF6B60',
        },
      },
      fontFamily: {
        cirka: ['Cirka', 'Georgia', 'serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
