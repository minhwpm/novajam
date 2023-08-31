import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Proza_Libre, Cormorant_Garamond } from 'next/font/google'
import HeaderB from '@/components/sections/HeaderB/HeaderB';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import styles from './aquarius.module.css'
import { CustomProvider } from '@/redux/CustomProvider';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';

const font = Proza_Libre({
  subsets: ['latin'],
  display: 'swap',
  weight: ["400"]
})

const fontHeading = Cormorant_Garamond({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500", "700"],
  variable: "--font-heading"
})

export const metadata = {
  title: 'Aquarius',
  description: 'Aquarius theme - Comestic E-commerce',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("/demos/aquarius")
  const footer = await getFooter("/demos/aquarius")
  return (
    <html lang="en">
      <body className={classNames(font.className, fontHeading.variable, styles["color-settings"])}>
        <CustomProvider>
          { header  && <HeaderB
            data={header}
            variant="alternate"
          /> }
          {children}
          {footer && <Footer data={footer} /> }
          <Analytics />
        </CustomProvider>
      </body>
    </html>
  )
}
