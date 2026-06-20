/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",       // Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",// Components folder
    "./src/**/*.{js,ts,jsx,tsx,mdx}",       // Src folder fallback
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}