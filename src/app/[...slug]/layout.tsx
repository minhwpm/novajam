import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import { Params } from "@/utils/types"
import { CustomProvider } from '@/redux/CustomProvider';
import HeaderB from '@/components/sections/HeaderB/HeaderB';
import styles from "./styles.module.css"
import fonts from '@/utils/fonts';

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
  // console.log(params, JSON.stringify(children, null, 4))
  let header, footer
  let slug = [...params.slug]
  // console.log("[...slug] Params:", params)
  // console.log("[...slug] STYLE:", styles)
  while(!header && slug.length > 0) {
    header = await getHeader(`/${slug.join('/')}`)
    footer = await getFooter(`/${slug.join('/')}`)
    slug.pop()
  }
  return (
    <html>
      <body className={classNames(fonts.Quicksand.className, styles["nova-color-settings"])}>
        {header && <Header data={header} variant="alternate" navAlignment="right" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}