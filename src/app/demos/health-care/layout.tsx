import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Merriweather } from 'next/font/google'
import Header from '@/components/sections/Header/Header';

const font = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ["300","400", "700", "900"]
})

export const metadata = {
  title: 'AQUA',
  description: 'AQUA theme - Clinic',
}
const headerData = {
  logo: {
    text: "AQUA",
    src: "",
  },
  nav: [
    {
      title: "Home",
      url: "/demos/health-care"
    },
    {
      title: "About",
      url: "/demos/health-care/about"
    },
    {
      title: "Departments",
      url: "/demos/health-care/departments"
    },
    {
      title: "Doctors",
      url: "/demos/health-care/doctors"
    },
    {
      title: "Contacts",
      url: "/demos/health-care/contacts"
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