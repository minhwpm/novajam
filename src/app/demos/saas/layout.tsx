import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import { ButtonVariant } from '@/components/elements/Button/Button';

const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100","200", "300","400", "600", "700"]
})

export const metadata = {
  title: 'Celestial',
  description: 'Celestial theme - Saas',
}

const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/celestial_logo.png",
    altText: "Celestial"
  },
  nav: [
    {
      title: "HOME",
      url: "/demos/saas/"
    },
    {
      title: "FAQ",
      url: "/demos/saas/faq"
    },
    {
      title: "CONTACT",
      url: "/demos/saas/contact"
    },
    {
      title: "RESOURCES",
      content: [
        {
          title: "Blog",
          url: "/demos/saas/blog",
        },
        {
          title: "Docs",
          url: "/demos/saas/docs"
        },
        {
          title: "Help center",
          url: "/demos/saas/help-center"
        },
      ]
    }
  ],
  button: {
    text: "Get started for free",
    url: "/demos/saas/register",
    type: "standard" as ButtonVariant
  }
}

const footerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/celestial_logo.png",
    altText: "Celestial"
  },
  copyright: "© Celestial 2023 | All rights reserved.",
  sns: [
    {
      url: "",
      icon: {
        url: "",
        altText: ""
      }
    },
    {
      url: "",
      icon: {
        url: "",
        altText: ""
      }
    },
    {
      url: "",
      icon: {
        url: "",
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
          url: "/demos/saas/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/saas/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/saas/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/saas/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/saas/pricing"
        },
      ]
    },
    {
      title: "INTEGRATIONS",
      links: [
        {
          text: "Pricing",
          url: "/demos/saas/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/saas/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/saas/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/saas/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/saas/pricing"
        },
      ]
    },
    {
      title: "RESOURCES",
      links: [
        {
          text: "Pricing",
          url: "/demos/saas/pricing"
        },
        {
          text: "Live Chat",
          url: "/demos/saas/pricing"
        },
        {
          text: "Chatbots",
          url: "/demos/saas/pricing"
        },
        {
          text: "Helpdesk",
          url: "/demos/saas/pricing"
        },
        {
          text: "Celestial AI",
          url: "/demos/saas/pricing"
        },
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header data={headerData} navAlignment="center" />
        {children}
        <Analytics />
        <Footer data={footerData} />
      </body>
    </html>
  )
}
