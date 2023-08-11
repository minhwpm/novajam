import { ButtonVariant } from '@/utils/types';

export const CelestialHeaderData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/celestial_logo.png",
    altText: "Celestial"
  },
  menu: [
    {
      text: "HOME",
      url: "/demos/celestial/"
    },
    {
      text: "FAQ",
      url: "/demos/celestial/faq"
    },
    {
      text: "CONTACT",
      url: "/demos/celestial/contact"
    },
    {
      title: "RESOURCES",
      menu: [
        
      ]
    }
  ],
  button: {
    text: "Get started for free",
    url: "/demos/celestial/register",
    type: "alternate" as ButtonVariant
  }
}
