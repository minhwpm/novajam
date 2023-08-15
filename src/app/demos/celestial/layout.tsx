import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter'

const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100","200", "300","400", "600", "700"]
})

export const metadata = {
  title: 'Celestial',
  description: 'Celestial - Saas',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // @TODO get slug instead of "Celestiall" 
  const header = await getHeader("Celestial")
  const footer = await getFooter("Celestial")
  return (
    <html lang="en">
      <body className={font.className}>
        <Header 
          data={header} 
          navAlignment="center" 
        />
        {children}
        <Footer data={footer} />
        <Analytics />
      </body>
    </html>
  )
}
