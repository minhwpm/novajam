import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Inter({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata = {
  title: 'FlyHyer',
  description: 'FlyHyer theme - Personalised Aviation',
}
const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/bluebiz_logo.png",
    altText: "FlyHyer",
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
        <Header data={headerData} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}