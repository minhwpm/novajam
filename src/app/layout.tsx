import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import classNames from 'classnames';
import { Params } from "@/utils/types"
import { CustomProvider } from '@/redux/CustomProvider';
import fonts from '@/utils/fonts';

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
      <body className={classNames(fonts.Poppins.className)}>
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