import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/sections/Header/Header';
import getHeader from '@/helpers/contentful/graphql/getHeader';
import getFooter from '@/helpers/contentful/graphql/getFooter';
import Footer from '@/components/sections/Footer/Footer';
import { Poppins_Font } from '@/helpers/fonts';
import classNames from 'classnames';

export const metadata = {
  title: 'BLUEBIZ',
  description: 'Multipurpose Modular ReactJS - NextJS Theme',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("/")
  const footer = await getFooter("/")
  return (
    <div className={classNames(Poppins_Font.className)}>
      {header && <Header data={header} /> }
      {children}
      {footer && <Footer data={footer} /> }
      <Analytics />
    </div>
  )
}