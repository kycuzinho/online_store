import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';
import WishListProvider from '@/providers/WishListProvider';
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Bit&Volt',
  description: 'Online Store for PAP',
  icons: 'banner-image.png'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)', 
            color: '#fff',
        }
      }}/>
        <WishListProvider>
          <CartProvider>
            <div className='flex flex-col min-h-screen  bg-sky-100'>
              <NavBar/>
              <main className='flex-grow'>
                {children}
                <Analytics />
              </main>

              <Footer/>
            </div>
          </CartProvider>
        </WishListProvider>

      </body>
    </html>
  )
}
