import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import getHeader from '@/utils/contentful/graphql/getHeader';

const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100","200", "300","400", "600", "700"]
})

export const metadata = {
  title: 'Celestial',
  description: 'Celestial theme - Saas',
}

const footerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/celestial_logo.png",
    altText: "Celestial"
  },
  copyright: "© Bluebiz 2023 | All rights reserved.",
  sns: [
    {
      url: "",
      icon: {
        url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/facebook.png",
        altText: ""
      }
    },
    {
      url: "",
      icon: {
        url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/twitter.png",
        altText: ""
      }
    },
    {
      url: "",
      icon: {
        url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/linkedin.png",
        altText: ""
      }
    }
  ],
  sections: [
    {
      title: "PRODUCT",
      links: [
        {
          text: "Pricing",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/celestial/pricing"
        },
      ]
    },
    {
      title: "INTEGRATIONS",
      links: [
        {
          text: "Pricing",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/celestial/pricing"
        },
      ]
    },
    {
      title: "RESOURCES",
      links: [
        {
          text: "Pricing",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/celestial/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/celestial/pricing"
        },
      ]
    }
  ]
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = await getHeader("Celestiall")
  return (
    <html lang="en">
      <body className={font.className}>
        <Header 
          data={header} 
          navAlignment="center" 
        />
        {children}
        <Footer data={footerData} />
        <Analytics />
      </body>
    </html>
  )
}
