import classNames from 'classnames';
import { Metadata, ResolvingMetadata } from 'next';
import { NavigationType, FooterType } from '@/lib/types';
import { Navigation } from '@/components/sections/Navigation/Navigation';
import { Footer } from '@/components/sections/Footer/Footer';
import { generateColorClassnames, generateFontClassnames } from '@/lib/utils';
import { getPage } from '@/lib/query/getPage';
import { getNavigation } from '@/lib/query/getNavigation';
import { getFooter } from '@/lib/query/getFooter';
import styles from '@/app/styles/theme.module.css';

type Params = Promise<{ slug: string[] }>;
export async function generateMetadata(
  props: {
    params: Params;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const { slug } = await props.params;
  const data = await getPage(`/${slug!.join('/')}`);
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

// eslint-disable-next-line complexity
async function fetchPageData(slug: string[]): Promise<{
  navigation?: NavigationType;
  footer?: FooterType;
  fontTheme?: string;
  colorTheme?: { primaryColor: string; secondaryColor: string };
  borderRadiusTheme?: string;
}> {
  let navigation, footer, page, fontTheme, colorTheme, borderRadiusTheme;
  while (
    slug!.length >= 0 &&
    (!navigation || !footer || !fontTheme || !colorTheme || !borderRadiusTheme)
  ) {
    if (!navigation) navigation = await getNavigation(`/${slug!.join('/')}`);
    if (!footer) footer = await getFooter(`/${slug!.join('/')}`);
    if (!fontTheme || !colorTheme || !borderRadiusTheme) {
      page = await getPage(`/${slug!.join('/')}`);
      if (page) {
        fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
        colorTheme = generateColorClassnames(
          page.colorPrimary,
          page.colorSecondary,
        );
        borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
      }
    }
    slug!.pop();
  }
  return { navigation, footer, fontTheme, colorTheme, borderRadiusTheme };
}

export default async function Layout(props: {
  params: Params;
  children: React.ReactNode;
}) {
  const { slug } = await props.params;
  const { children } = props;
  const { navigation, footer, fontTheme, colorTheme, borderRadiusTheme } =
    await fetchPageData(slug);

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
