import classNames from 'classnames';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import getNavigation from '@/helpers/query/getNavigation';
import getFooter from '@/helpers/query/getFooter';
import getPage from '@/helpers/query/getPage';
import { generateFontClassnames } from '@/helpers/fonts';
import { generateColorClassnames } from '@/helpers/utils';
import styles from '@/app/styles/theme.module.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation('/');
  const footer = await getFooter('/');
  let fontTheme, colorTheme, borderRadiusTheme;
  const page = await getPage('/');
  if (page) {
    fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
    colorTheme = generateColorClassnames(
      page.colorPrimary,
      page.colorSecondary,
    );
    borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
  }

  return (
    <div
      className={classNames(
        'flex flex-col justify-between min-h-screen',
        fontTheme,
        styles[borderRadiusTheme ?? ''],
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
