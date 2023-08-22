import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Montserrat } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import styles from './blueberry.module.css'
import classNames from 'classnames';
import Footer from '@/components/sections/Footer/Footer';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter'

const font = Montserrat({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ["100", "200", "300","400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: 'Blueberry',
  description: 'Blueberry theme - English for Children',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("/demos/blueberry")
  const footer = await getFooter("/demos/blueberry")
  return (
    <html lang="en">
      <body className={classNames(font.className, styles["color-settings"])}>
        <Header data={header} variant="alternate" />
        {children}
        <Footer data={footer} />
        <Analytics />
      </body>
    </html>
  )
}