import classNames from 'classnames';
import { Metadata } from 'next';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import { getNavigation } from '@/lib/query/getNavigation';
import { getFooter } from '@/lib/query/getFooter';
import { getPage } from '@/lib/query/getPage';
import { generateColorClassnames, generateFontClassnames } from '@/lib/utils';
import styles from '@/app/styles/theme.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPage('/');
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    keywords: data?.seo?.focusKeywords,
    robots: {
      index: !data?.seo?.noindex,
      follow: !data?.seo?.nofollow,
    },
    alternates: {
      canonical: data?.seo?.canonicalUrl,
    },
    openGraph: {
      title: data?.seo?.metaTitle,
      description: data?.seo?.metaDescription,
      images: [data?.seo?.ogImage ?? ''],
    },
  };
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigation('/');
  const footer = await getFooter('/');
  const page = await getPage('/');
  let fontTheme, colorTheme, borderRadiusTheme;
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
      )}
    >
      {navigation && <Navigation data={navigation} />}
      {children}
      {footer && <Footer data={footer} />}
    </div>
  );
}
