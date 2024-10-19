import classNames from 'classnames';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import getNavigation from '@/helpers/query/getNavigation';
import getFooter from '@/helpers/query/getFooter';
import getPage from '@/helpers/query/getPage';
import { generateFontClassnames } from '@/helpers/fonts';
import { generateColorClassnames } from '@/helpers/utils';
import { NavigationType, FooterType, PageType } from '@/helpers/types';
import styles from '@/app/styles/theme.module.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = (await getNavigation('/')) as unknown as NavigationType;
  const footer = (await getFooter('/')) as unknown as FooterType;
  let fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  const page = (await getPage('/')) as unknown as PageType;
  if (page) {
    fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
    colorTheme = generateColorClassnames(
      page.colorPrimary,
      page.colorSecondary,
    );
    borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
    headingFontSizeTheme = `${page.headingFontSize}-heading-font-size`;
  }

  return (
    <div
      className={classNames(
        'flex flex-col justify-between min-h-screen',
        fontTheme,
        styles[borderRadiusTheme ?? ''],
        styles[headingFontSizeTheme ?? ''],
        styles[colorTheme?.primaryColor ?? ''],
        styles[colorTheme?.secondaryColor ?? ''],
        { 'overlay-nav': navigation?.layout === 'overlay' },
      )}
    >
      {navigation && <Navigation data={navigation} />}
      {children}
      {footer && <Footer data={footer} />}
    </div>
  );
}
