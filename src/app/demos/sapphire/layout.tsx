import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_Pro, Playfair_Display } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';

const font = Source_Sans_Pro({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400"]
})

const fontHeading = Playfair_Display({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500"],
  variable: "--font-heading"
})

export const metadata = {
  title: 'Sapphire',
  description: 'Sapphire theme - Hair & Beauty Salon',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("Sapphire")
  const footer = await getFooter("Sapphire")
  return (
    <html lang="en">
      <body className={classNames(font.className, fontHeading.variable)}>
        {header && <Header data={header} /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}
