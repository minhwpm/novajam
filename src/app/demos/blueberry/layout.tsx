import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Noto_Sans({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ["100", "300","400", "500", "700", "900"]
})

export const metadata = {
  title: 'Blueberry',
  description: 'Blueberry theme - English for Children',
}
const headerData = {
  logo: {
    text: "BlueBERRY",
    src: "",
  },
  nav: [
    {
      title: "INTRO",
      url: "/demos/apple-seed/intro"
    },
    {
      title: "CONTACT",
      url: "/demos/apple-seed/contact"
    },
    {
      title: "BLOG",
      url: "/demos/apple-seed/blog"
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