import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTAB from "@/components/sections/CTAB/CTAB"
import HeroB from "@/components/sections/HeroB/HeroB"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import Timeline from "@/components/sections/Timeline/Timeline"
import Section from "@/components/elements/Section/Section"
import { ButtonVariant } from "@/components/elements/Button/Button"
import ContentB from "@/components/sections/ContentB/ContentB"
import Feature from "@/components/sections/Feature/Feature"

const defaultPageData = {
  sections: {
    hero: {
      label: "WELCOME TO CELESTIAL SAAS",
      title: "Turn your website visitors into customers with",
      subtitle: "",
      slidingTexts: [
        { text: "ticketing"},
        { text: "live chat"},
        { text: "chatbots"},
      ],
      buttons: [
        {
          text: "Get started now",
          type: "standard" as ButtonVariant
        },
      ],
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/hero.webp",
      }
    },
    contentSection: {
      title: "Automate your business with plug-and-play chatbots workflows",
      subtitle: "Achieve more with less effort. Explore 35+ chatbot templates for sales, support, and customer service",
      sections: [
        {
          title: "New visitor discounts",
          content: "Encourage new visitors to make a purchase with a custom welcome discount."
        },
        {
          title: "Reduce abandoned carts",
          content: "Convince customers to complete a purchase by offering them a price reduction when they view their carts.",
        },
        {
          title: "Recommend products",
          content: "Increase your average order value by recommending products based on user activity.",
        },
        {
          title: "FAQ for online store",
          content: "Provide answers regarding shipping, order status, product availability, and more.",
        },
        {
          title: "Reduce abandoned carts",
          content: "Convince customers to complete a purchase by offering them a price reduction when they view their carts.",
        },
        {
          title: "Recommend products",
          content: "Increase your average order value by recommending products based on user activity.",
        },
      ]
    },
    presentationSection: {
      label: "",
      title: "Chatbots can reduce your customer support team’s workload",
      subtitle: "Reduce your customer support team’s duties, so your agents can focus on more complex issues.",
      sections: [
        {
          label: "",
          title: "Automate answers to repetitive questions",
          subtitle: "",
          content: "Include chatbots in your conversation to step in and handle the most repetitive actions like checking order status and processing returns.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature1.webp",
          },
        },
        {
          label: "",
          title: "Easily segment users",
          subtitle: "",
          content: "Easily group website visitors and customers based on their behavior to send them personalized messages.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature2.webp",
          },
        },
        {
          label: "",
          title: "Notify operators about specific actions",
          subtitle: "",
          content: "Notify operators when the customer closes the chat window, wants to leave the website, or wants to set up a conversation with a human agent.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/feature3.webp",
          },
        }
        
      ]
    },
    presentationSection2: {
      label: "",
      title: "Make customer experience your competitive advantage",
      subtitle: "",
      sections: [
        {
          label: "",
          title: "Start conversations, win loyal customers",
          subtitle: "",
          content:
          "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f1.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Automate answers and workflows in minutes",
          subtitle: "",
          content:
          "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f2.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "Turn visitors into paying customers",
          subtitle: "",
          content:
          "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f3.webp",
          },
          url: ""
        },
      ]
    },
    featureSection: {
      title: "Grow with a customer experience solution tailored to your business: Tidio+",
      content: "Access custom limits for agent seats and chatbots. Unlock premium features. Simplify your customer service with Tidio AI. Work with a dedicated team to automate your business.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/tidio-plus.webp",
        altText: "Top tech success"
      },
      button: {
        url: "",
        text: "Discover Celestial+",
        type: "link-btn" as ButtonVariant
      }
    },
    featureSection2: {
      title: "Why online stores love Tidio",
      content: "“We were searching for something that would give us the possibility to use automations as well as human interactions — and Tidio was the best solution for that.”",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/saas/ad-hoc-atelier.webp",
        altText: "Top tech success"
      },
      button: {
        url: "",
        text: "Read their story",
        type: "link-btn" as ButtonVariant
      }
    },
    cta: {
      title: "Grow your business plan with Bluebiz",
      subtitle: "Easy-to-setup > Easy-to-use > Easy-to-scale with 6-month support services.",
      button: {
        text: "Buy now",
        url: "/checkout",
        type: "standard" as ButtonVariant
      }
    }
  }
}

export default function Home() {

  const { hero, contentSection, presentationSection, presentationSection2, featureSection, featureSection2, cta } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <HeroB data={hero} />
      {/* <Timeline /> */}
      <AccordionPT data={presentationSection} />
      <ScrollingPT data={presentationSection2} />
      <ContentB data={contentSection} />
      <Feature data={featureSection} />
      <Feature data={featureSection2} mediaPosition="right"/>
      <Testimonials />
      <CTAB data={cta}/>
    </main>
  )
}
