import '../globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Lato } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import getHeader from '@/utils/contentful/graphql/getHeader';
import getFooter from '@/utils/contentful/graphql/getFooter';
import Footer from '@/components/sections/Footer/Footer';

const font = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "300","400", "700", "900"]
})

export const metadata = {
  title: 'Bluebiz',
  description: 'Multipurpose Modular ReactJS - NextJS Theme',
}

const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/bluebiz_logo.png",
    altText: "BlueBiz",
  },
  nav: [
    {
      title: "Demos",
      content: [
        {
          title: "SaaS",
          url: "/demos/celestial",
        },
        {
          title: "Education",
          url: "/demos/education"
        },
        {
          title: "Health Care",
          url: "/demos/health-care"
        },
        {
          title: "Ecommerce",
          url: "/demos/ecommerce"
        },
        {
          title: "Beauty Hair Salon",
          url: "/demos/salon"
        },
        {
          title: "Financial Services",
          url: "/demos/financial-services"
        }
      ]
    },
    {
      title: "Docs",
      url: "/docs"
    },
    {
      title: "Blog",
      url: "/blog"
    },
    {
      title: "Help center",
      url: "/help-center"
    },
    {
      title: "Contact",
      url: "/contact"
    }
  ],
  isLoginEnabled: false
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("/")
  const footer = await getFooter("/")
  return (
    <html lang="en">
      <body className={font.className}>
        {header && <Header data={header} navAlignment="center" /> }
        {children}
        {footer && <Footer data={footer} /> }
        <Analytics />
      </body>
    </html>
  )
}