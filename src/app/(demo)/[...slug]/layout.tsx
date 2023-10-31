import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/helpers/contentful/graphql/getHeader';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import getPage from '@/helpers/contentful/graphql/getPage';
import { Params } from "@/helpers/types"
import { getFontClassNames } from '@/helpers/fonts';
import styles from './styles.module.css'

export default async function Layout({
  children,
  params
} : {
  children: React.ReactNode
  params: Params
}) {
  // console.log(params, JSON.stringify(children, null, 4))
  const slug = [...params.slug]
  let header, footer, pageTheme, pageThemeClassNames
  try {
    while(slug.length > 0 && (!header || !footer || !pageTheme) ) {
      // console.log("SLUG", slug)
      if (!header) header = await getHeader(`/${slug.join('/')}`)
      if (!footer) footer = await getFooter(`/${slug.join('/')}`)
      if (!pageTheme) {
        console.log("HI HI HI!!!!!!!!!!!!!!")
        const page = await getPage(`/${slug.join('/')}`)
        const { fontMain, fontHeading, colorPrimary, colorSecondary } = page
        // console.log("PAGE DATA", "|", fontMain, fontHeading, colorPrimary, colorSecondary)
        // if (!fontMain && !colorPrimary) {
          pageTheme = {
            fontMain: fontMain,
            fontHeading: fontHeading,
            colorPrimary: colorPrimary,
            colorSecondary: colorSecondary
          }
          pageThemeClassNames = getFontClassNames(fontMain, fontHeading)
        // }
      }
      slug.pop()
    }
    // console.log("**** PAGE THEME", pageTheme, pageThemeClassNames)
  } catch(e) {
    console.error(e)
  }

  return (
    <div className={classNames(pageThemeClassNames, styles["custom-color-settings"])}>
      {header && <Header data={header} /> }
      {children}
      {footer && <Footer data={footer} /> }
      <Analytics />
    </div>
  )
  
}