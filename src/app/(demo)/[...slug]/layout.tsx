import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/helpers/contentful/graphql/getHeader';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import { Params } from "@/helpers/types"
import { Montserrat_Font } from '@/helpers/fonts';
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
    <div className={classNames(Montserrat_Font.className, styles["nova-color-settings"])}>
      {header && <Header data={header} /> }
      {children}
      {footer && <Footer data={footer} /> }
      <Analytics />
    </div>
  )
}