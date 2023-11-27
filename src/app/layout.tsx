import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Params } from "@/helpers/types"
import { CustomProvider } from '@/redux/CustomProvider';

export const metadata = {
  title: 'Bluebiz',
  description: 'Multipurpose NextJS Theme',
  openGraph: {
    images: [{
      url: '/bluebiz_square.webp'
    }]
  }
}

export default async function Layout({
  children,
} : {
  children: React.ReactNode
  params: Params
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, height=device-height" />
      </head>
      <body>
        <CustomProvider>
          {children}
          <Analytics />
        </CustomProvider>
      </body>
    </html>
  )
}