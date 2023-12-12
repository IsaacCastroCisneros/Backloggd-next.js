import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:
    {
      mob:{'max':'1000px'},
      mob1:{'max':'500px'},
    },
    colors:
    {
     bg:"#16181c",
     text:"#8f9ca7",
     text2:"#cbd4dc",
     text3:"#ffffff99",
     text4:"#badefc",
     field:"#30394c",
     gray:"#3b4760",
     placeholder:"#7d8a96",
     border:"#a2b1e533",
     border2:"#242832",
     border3:"#454a6470",
     myPink:"#ea377a",
     myPink2:"#fc6399",
     gray2:"#262c3c",
     gray3:"#4a5e8d",
     gray4:"#ffffff78",
     gray5:"#262b36",
     myGreen:"#43b94f",
     myBlue:"#4b7bd4",
     myYellow:"#e69b3e",
     myRed:"#ea4747",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
