import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import { ButtonVariant } from '@/components/elements/Button/Button';
import Footer from '@/components/sections/Footer/Footer';

const font = Inter({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "500", "600", "700", "800"]
})

export const metadata = {
  title: 'NOVA',
  description: 'NOVA theme - Clinic',
}
const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/rush/nova_logo.png",
    altText: "RUSH",
  },
  nav: [
    {
      title: "Services",
      content: [
        {
          title: "Primary Care",
          url: "/demos/rush/primary-care",
        },
        {
          title: "Cancer Care",
          url: "/demos/rush/cancer-care"
        },
        {
          title: "Digestive Diseases",
          url: "/demos/rush/digestive-diseases"
        },
        {
          title: "Heart & Vascular Care",
          url: "/demos/rush/heart-vascular-care"
        },
      ]
    },
    {
      title: "Doctors",
      url: "/demos/rush/doctors"
    },
    {
      title: "About",
      url: "/demos/rush/about"
    },
  ],
  button: {
    text: "Get Care Today",
    url: "/on-demand",
    type: "alternate" as ButtonVariant
  }
}
const footerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/rush/nova_logo.png",
    altText: "Nova"
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
      title: "QUICK LINKS",
      links: [
        {
          text: "Career Opportunities",
          url: "/demos/nova/career-opportunities"
        },
        {
          text: "About NOVA",
          url: "/demos/nova/about"
        },
        {
          text: "News",
          url: "/demos/nova/news"
        },
        {
          text: "Health & Wellness",
          url: "/demos/nova/health-and-wellness"
        },
        {
          text: "Contact Us",
          url: "/demos/nova/contact-us"
        },
      ]
    },
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
        <Header data={headerData} variant="alternate" navAlignment="right" />
        {children}
        <Footer data={footerData} />
        <Analytics />
      </body>
    </html>
  )
}