import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Nunito } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import classNames from 'classnames';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import { Params } from "@/utils/types"
import { CustomProvider } from '@/redux/CustomProvider';
import HeaderB from '@/components/sections/HeaderB/HeaderB';

const font = Nunito({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "700", "900"]
})

export const metadata = {
  title: 'Bluebiz',
  description: 'Multipurpose NextJS Theme',
}

export default async function Layout({
  children,
  params
} : {
  children: React.ReactNode
  params: Params
}) {
  // header = await getHeader(`/${params.slug.join('/')}`)
  // footer = await getFooter(`/${params.slug.join('/')}`)
  return (
    <html lang="en">
      <body className={classNames(font.className)}>
        <CustomProvider>
          {/* {header && <HeaderB data={header} variant="alternate" navAlignment="right" /> } */}
          {children}
          {/* {footer && <Footer data={footer} /> } */}
          <Analytics />
        </CustomProvider>
      </body>
    </html>
  )
}