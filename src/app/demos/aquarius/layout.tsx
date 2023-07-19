import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Proza_Libre, Cormorant_Garamond } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import { ButtonVariant } from '@/components/elements/Button/Button';
import classNames from 'classnames';

const font = Proza_Libre({
  subsets: ['latin'],
  display: 'swap',
  weight: ["400"]
})

const fontHeading = Cormorant_Garamond({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500", "700"],
  variable: "--font-heading"
})

export const metadata = {
  title: 'Aquarius',
  description: 'Aquarius theme - Comestic E-commerce',
}

const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/aquarius_logo.png",
    altText: "Aquarius"
  },
  nav: [
    {
      title: "SALE",
      content: [
        {
          title: "Summer Limited Hot Deal",
          url: "/demos/aquarius/summer-limited-hot-deal",
        },
        {
          title: "Vitamin C Premium Program",
          url: "/demos/aquarius/vitamin-c-premium-program"
        },
      ]
    },
    {
      title: "New Products",
      url: "/demos/aquarius/new-products"
    },
    {
      title: "Skin Care",
      content: [
        {
          title: "Sunscreen",
          url: "/demos/aquarius/sunscreen"
        },
        {
          title: "Cleanser",
          url: "/demos/aquarius/cleanser",
        },
        {
          title: "Toner",
          url: "/demos/aquarius/toner"
        },
        {
          title: "Serum",
          url: "/demos/aquarius/serum"
        },
        {
          title: "Moisturizer",
          url: "/demos/aquarius/moisturizer"
        },
      ]
    },
    {
      title: "Body Care",
      content: [
        {
          title: "Hair Essence",
          url: "/demos/aquarius/hair-essence",
        },
        {
          title: "Body Scrub",
          url: "/demos/aquarius/body-scrub"
        },
        {
          title: "Body Lotion",
          url: "/demos/aquarius/body-lotion"
        },
        {
          title: "Hand Cream",
          url: "/demos/aquarius/hand-cream"
        },
      ]
    },
    {
      title: "Beauty Tips",
      url: "/demos/aquarius/beauty-tips"
    },
  ],
}

const footerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/aquarius/aquarius_logo.png",
    altText: "Aquarius"
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
      title: "RESOURCES",
      links: [
        {
          text: "Pricing",
          url: "/demos/aquarius/pricing"
        },
        {
          text: "Gallery",
          url: "/demos/aquarius/gallery"
        },
        {
          text: "Career Opportunities",
          url: "/demos/aquarius/career-opportunities"
        },
        {
          text: "About Aquarius",
          url: "/demos/aquarius/about"
        },
        {
          text: "Contact Us",
          url: "/demos/aquarius/contact"
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
      <body className={classNames(font.className, fontHeading.variable)}>
        <Header data={headerData} variant="alternate" />
        {children}
        <Footer data={footerData} />
        <Analytics />
      </body>
    </html>
  )
}
