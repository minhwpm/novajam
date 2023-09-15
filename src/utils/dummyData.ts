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
  buttons: [
    {
      text: "Get started for free",
      url: "/demos/celestial/register",
      type: "alternate" as ButtonVariant
    }
  ]
}

export const CelestialFooterData = {
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
  menu: [
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


export const NovaHeaderData = {
  logo: {
    url: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/rush/nova_logo.png",
    altText: "RUSH",
  },
  menu: [
    {
      title: "Services",
      menu: [
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
  buttons: [
    {
      text: "Get Care Today",
      url: "/on-demand",
      type: "alternate" as ButtonVariant
    }
  ]
}