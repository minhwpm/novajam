import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import styles from './nova.module.css'
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import { Params } from '@/utils/types';

const font = Inter({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata = {
  title: 'BLUEBIZ',
  description: 'NOVA theme - Clinic',
}


export default async function Layout({
  children,
  params
} : {
  children: React.ReactNode
  params: Params
}) {
  // console.log(params, JSON.stringify(children, null, 4))
  const header = await getHeader("/demos/nova")
  const footer = await getFooter("/demos/nova")
  return (
    <html lang="en">
      <body className={classNames(font.className, styles["color-settings"])}>
        {header && <Header data={header} variant="alternate" navAlignment="right" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}