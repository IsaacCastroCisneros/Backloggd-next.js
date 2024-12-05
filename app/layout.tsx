import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalContext from './context/GlobalContext'
import Msg from './components/Msg'
import Navbar from './components/Navbar/Navbar'
import Popup from './components/Popup'
import '@fortawesome/fontawesome-svg-core/styles.css';
import "reflect-metadata";



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en" className="bg-bg">
      <body className="relative">
        <GlobalContext>
          <Popup />
          <Msg />
          <Navbar/>
          <main className="custom-container pb-[1rem] block">{children}</main>
        </GlobalContext>
      </body>
    </html>
  );
}
