import { Analytics } from '@vercel/analytics/react';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import Footer from '@/components/sections/Footer/Footer';
import { Inter_Font } from '@/helpers/fonts';
import classNames from 'classnames';
import getNavigation from '@/helpers/contentful/graphql/getNavigation';
import Navigation from '@/components/sections/Navigation/Navigation';

export const metadata = {
  title: 'BLUEBIZ',
  description: 'Multipurpose Modular ReactJS - NextJS Theme',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = await getNavigation("/")
  const footer = await getFooter("/")
  return (
    <div className={classNames(Inter_Font.className)}>
      {navigation && <Navigation data={navigation} /> }
      {children}
      {footer && <Footer data={footer} /> }
      <Analytics />
    </div>
  )
}