import classNames from 'classnames';
import { Metadata, ResolvingMetadata } from 'next';
import { FooterType, NavigationType, PageType } from '@/helpers/types';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import { generateColorClassnames } from '@/helpers/utils';
import { generateFontClassnames } from '@/helpers/fonts';
import { getPage } from '@/helpers/query/getPage';
import { getNavigation } from '@/helpers/query/getNavigation';
import { getFooter } from '@/helpers/query/getFooter';
import styles from '@/app/styles/theme.module.css';

export async function generateMetadata(
  { params }: { params: { slug: Array<string> } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const data = await getPage(`/${params.slug!.join('/')}`);
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
      images: [data?.seo?.ogImage ?? '', ...previousImages],
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: Array<string> };
}) {
  let navigation, footer, page, fontTheme, colorTheme, borderRadiusTheme;
  while (
    params.slug!.length >= 0 &&
    (!navigation || !footer || !fontTheme || !colorTheme || !borderRadiusTheme)
  ) {
    if (!navigation)
      navigation = (await getNavigation(
        `/${params.slug!.join('/')}`,
      )) as unknown as NavigationType;
    if (!footer)
      footer = (await getFooter(
        `/${params.slug!.join('/')}`,
      )) as unknown as FooterType;
    if (!fontTheme || !colorTheme || !borderRadiusTheme) {
      page = (await getPage(
        `/${params.slug!.join('/')}`,
      )) as unknown as PageType;
      if (page) {
        fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
        colorTheme = generateColorClassnames(
          page.colorPrimary,
          page.colorSecondary,
        );
        borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
      }
    }
    params.slug!.pop();
  }

  return (
    <div
      className={classNames(
        'flex flex-col justify-between',
        fontTheme,
        styles[borderRadiusTheme ?? ''],
        styles[colorTheme?.primaryColor ?? ''],
        styles[colorTheme?.secondaryColor ?? ''],
      )}
    >
      {navigation && <Navigation data={navigation as NavigationType} />}
      {children}
      {footer && <Footer data={footer as FooterType} />}
    </div>
  );
}
