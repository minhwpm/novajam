import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Nunito } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
// import styles from './nova.module.css'
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import { Params } from "@/utils/types"

const font = Nunito({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "700", "900"]
})

export const metadata = {
  title: 'Bluebiz',
  description: 'Multipurpose NextJS Theme',
}


export default async function Layout({
  children,
  params
} : {
  children: React.ReactNode
  params: Params
}) {
  console.log(params, JSON.stringify(children, null, 4))
  const header = await getHeader(`/${params.slug.join('/')}`)
  const footer = await getFooter(`/${params.slug.join('/')}`)
  return (
    <html lang="en">
      <body className={classNames(font.className)}>
        {header && <Header data={header} variant="alternate" navAlignment="right" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}