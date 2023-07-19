import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Source_Sans_Pro, Playfair_Display } from 'next/font/google'
import Header from '@/components/sections/Header/Header';
import Footer from '@/components/sections/Footer/Footer';
import { ButtonVariant } from '@/components/elements/Button/Button';
import classNames from 'classnames';

const font = Source_Sans_Pro({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400"]
})

const fontHeading = Playfair_Display({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500"],
  variable: "--font-heading"
})

export const metadata = {
  title: 'Sapphire',
  description: 'Sapphire theme - Hair & Beauty Salon',
}

const headerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/sapphire_logo.png",
    altText: "Sapphire"
  },
  nav: [
    {
      title: "Services",
      content: [
        {
          title: "Hair Style",
          url: "/demos/sapphire/blog",
        },
        {
          title: "Nail Treatment",
          url: "/demos/sapphire/docs"
        },
        {
          title: "Facial Care",
          url: "/demos/sapphire/facial-care"
        },
        {
          title: "Skin Care",
          url: "/demos/sapphire/skin-care"
        },
        {
          title: "Tanning",
          url: "/demos/sapphire/tanning"
        },
        {
          title: "Auroma Therapy",
          url: "/demos/sapphire/auroma-therapy"
        },
      ]
    },
    {
      title: "Pricing",
      url: "/demos/sapphire/pricing"
    },
    {
      title: "Gallery",
      url: "/demos/sapphire/gallery"
    },
    {
      title: "About",
      url: "/demos/sapphire/about"
    },
  ],
  button: {
    text: "Appointment",
    url: "/demos/sapphire/book-appointment",
    type: "outline-black" as ButtonVariant
  }
}

const footerData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/sapphire_logo.png",
    altText: "Sapphire"
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
          url: "/demos/sapphire/pricing"
        },
        {
          text: "Gallery",
          url: "/demos/sapphire/gallery"
        },
        {
          text: "Career Opportunities",
          url: "/demos/sapphire/career-opportunities"
        },
        {
          text: "About Sapphire",
          url: "/demos/sapphire/about"
        },
        {
          text: "Contact Us",
          url: "/demos/sapphire/contact"
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
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
        <Analytics />
      </body>
    </html>
  )
}
