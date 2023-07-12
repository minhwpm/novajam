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
  title: 'NOVA',
  description: 'NOVA theme - Clinic',
}
const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/rush/nova_logo.png",
    altText: "RUSH",
  },
  nav: [
    {
      title: "Doctors",
      url: "/demos/rush/doctors"
    },
    {
      title: "Services",
      content: [
        {
          title: "Primary Care",
          url: "/demos/rush/primary-care",
        },
        {
          title: "Cancer Care",
          url: "/demos/rush/cancer-care"
        },
        {
          title: "Digestive Diseases",
          url: "/demos/rush/digestive-diseases"
        },
        {
          title: "Heart & Vascular Care",
          url: "/demos/rush/heart-vascular-care"
        },
      ]
    },
    {
      title: "About",
      url: "/demos/rush/about"
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