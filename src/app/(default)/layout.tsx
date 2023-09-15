import '../globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Quicksand, League_Spartan } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';

const font = Quicksand({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
})

const fontHeading = League_Spartan({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading"
})

export const metadata = {
  title: 'BLUEBIZ',
  description: 'Multipurpose Modular ReactJS - NextJS Theme',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("/")
  const footer = await getFooter("/")
  return (
    <html lang="en">
      <body className={classNames(font.className, fontHeading.variable)}>
        {header && <Header data={header} navAlignment="center" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}