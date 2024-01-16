import classNames from 'classnames';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import getNavigation from '@/helpers/contentful/graphql/getNavigation';
import getPage from '@/helpers/contentful/graphql/getPage';
import { generateFontClassnames } from '@/helpers/fonts';
import { generateColorClassnames } from '@/helpers/utils';
import styles from "@/app/(dynamic)/[...slug]/styles.module.css";

export const metadata = {
  title: 'BLUEBIZ',
  description: 'Multipurpose Modular ReactJS - NextJS Theme',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = await getNavigation("/expert" )
  const footer = await getFooter("/expert")
  const page = await getPage("/blog");
  let fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  if (page) {
    fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
    colorTheme = generateColorClassnames(
      page.colorPrimary,
      page.colorSecondary
    );
    borderRadiusTheme = `${page.borderRadius}-border-radius-assets`;
    headingFontSizeTheme= `${page.headingFontSize}-heading-font-size`;
  }

  return (
    <div
      className={classNames(
        fontTheme,
        styles[borderRadiusTheme ?? ""],
        styles[headingFontSizeTheme ?? ""],
        styles[colorTheme?.primaryColor ?? ""],
        styles[colorTheme?.secondaryColor ?? ""]
      )}
    >
      {navigation && <Navigation data={navigation} /> }
      {children}
      {footer && <Footer data={footer} /> }
    </div>
  )
}