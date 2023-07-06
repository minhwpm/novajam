import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Lato } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "300","400", "700", "900"]
})

export const metadata = {
  title: 'FlyHyer',
  description: 'FlyHyer theme - Personalised Aviation',
}
const headerData = {
  logo: {
    text: "FlyHyer",
    src: "",
  },
  nav: [
    {
      title: "Solutions",
      url: "/demos/flyhyer/solutions"
    },
    {
      title: "About us",
      url: "/demos/flyhyer/about-us"
    },
    {
      title: "Contact",
      url: "/demos/flyhyer/contact"
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header data={headerData} variant="alternate" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}