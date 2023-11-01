import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/helpers/contentful/graphql/getHeader';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import getPage from '@/helpers/contentful/graphql/getPage';
import { Params } from "@/helpers/types"
import { generateThemeClassnames } from '@/helpers/utils';
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
      if (!header) header = await getHeader(`/${slug.join('/')}`)
      if (!footer) footer = await getFooter(`/${slug.join('/')}`)
      if (!pageThemeClassNames) {
        const page = await getPage(`/${slug.join('/')}`)
        if (page && (!page.fontMain || !page.colorPrimary)) {
          pageThemeClassNames = generateThemeClassnames({
            fontMain: page.fontMain, 
            fontHeading: page.fontHeading, 
            colorPrimary: page.colorPrimary,
            colorSecondary: page.colorSecondary
          })
        }
      }
      slug.pop()
    }
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