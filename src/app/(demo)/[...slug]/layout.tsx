import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import { Params } from "@/utils/types"
import fonts from '@/utils/fonts';
import styles from './styles.module.css'

export default async function Layout({
  children,
  params
} : {
  children: React.ReactNode
  params: Params
}) {
  // console.log(params, JSON.stringify(children, null, 4))
  let header, footer
  const slug = [...params.slug]
  try {
    while(!header && slug.length >= 0) {
      console.log(slug)
      header = await getHeader(`/${slug.join('/')}`)
      footer = await getFooter(`/${slug.join('/')}`)
      slug.pop()
    }
  } catch(e) {

    console.error(e)
  }
  return (
    <html lang="en">
      <body className={classNames(fonts.Quicksand.className, styles["nova-color-settings"])}>
        {header && <Header data={header} variant="minimal" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}