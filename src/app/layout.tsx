import './globals.css'
import { Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';

const font = Quicksand({
  subsets: ['latin'],
  display: 'swap'
})

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
