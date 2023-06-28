import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100","200", "300","400", "600", "700"]
})

export const metadata = {
  title: 'Celestial',
  description: 'Celestial theme - Saas',
}

const headerData = {
  logo: {
    text: "Celestial",
    src: "",
  },
  nav: [
    {
      title: "HOME",
      url: "/demos/saas/"
    },
    {
      title: "FAQ",
      url: "/demos/saas/faq"
    },
    {
      title: "CONTACT",
      url: "/demos/saas/contact"
    },
    {
      title: "RESOURCES",
      content: [
        {
          title: "Blog",
          url: "/demos/saas/blog",
        },
        {
          title: "Docs",
          url: "/demos/saas/docs"
        },
        {
          title: "Help center",
          url: "/demos/saas/help-center"
        },
      ]
    }
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
