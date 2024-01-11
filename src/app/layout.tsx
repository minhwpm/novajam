import { Analytics } from '@vercel/analytics/react';
import { Params } from "@/helpers/types"
import { CustomProvider } from '@/redux/CustomProvider';
import { Metadata } from 'next';
import '@/app/css/globals.css'

export const metadata: Metadata = {
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
    <html lang="en" className="scroll-smooth">
      <body className="text-neutral-800">
        <CustomProvider>
          {children}
          <Analytics />
        </CustomProvider>
      </body>
    </html>
  );
}