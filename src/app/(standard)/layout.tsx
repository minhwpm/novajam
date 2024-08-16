import classNames from 'classnames';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import getNavigation from '@/lib/query/getNavigation';
import getFooter from '@/lib/query/getFooter';
import getPage from '@/lib/query/getPage';
import { generateFontClassnames } from '@/lib/fonts';
import { generateColorClassnames } from '@/lib/utils';
import styles from "@/app/(dynamic)/[...slug]/styles.module.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = await getNavigation("/" )
  const footer = await getFooter("/")
  let fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  const page = await getPage("/");
  if (page) {
    fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
    colorTheme = generateColorClassnames(
      page.colorPrimary,
      page.colorSecondary
    );
    borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
    headingFontSizeTheme= `${page.headingFontSize}-heading-font-size`;
  }

  return (
    <div 
      className={classNames(
        "main",
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