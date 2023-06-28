'use client'

import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"

const dummyData = [
  {
    title: "How do I add live chat to a website?",
    content: "First, find 5 minutes of your spare time—this is how long adding a free live chat to your website takes. Next, create your Tidio account and connect it with your website by installing a WordPress plugin or Shopify Store app. Alternatively, paste your Tidio public key into any HTML website. That’s all!"
  },
  {
    title: "How long will it take to implement live chat on my website?",
    content: "The installation process takes about 5 minutes and you can add the live chat widget to your website right away. You may want to set your avatar, customize the look of your plugin, and change some of the default messages. All this shouldn’t add up to more than 15 minutes. Now you and your team can start to support your customers in real time!"
  },
  {
    title: "Is live chat free?",
    content: "Tidio offers a free live chat plugin with unlimited contacts and conversations. It is the most advanced free live chat software available on the market. You can use the freemium version tools as long as you want. There is no catch."
  },
  {
    title: "How long can I use the premium live chat features with Tidio Live Chat free trial?",
    content: "You’ll be able to use premium features such as Live Typing Preview and detailed Visitors List for 7 days. After this time, you can still use our service for free with unlimited customer contact and conversation options. Once your business grows along with your need to offer more help to your customer base, you can upgrade your plan to get the tools you need and give your customers all the support they require."
  },
  {
    title: "Do I have to be available on online chat support all the time?",
    content: "No. You can set your own Do-Not-Disturb schedule and be available only during specific days or hours. Also, you don’t need an agent to be available 24/7. Our software features automatic messages and auto-responses to frequently asked questions. After some time, you’ll see which tools work best for your website, and the type of service or product you offer."
  },
]

const Accordion = ({ data = dummyData}) => {

  return (
    <RadixAccordion.Root className="w-full lg:w-2/3" type="multiple">
      {data.map((item, idx) => (
        <RadixAccordion.Item key={item.title} value={`item-${idx}`} className="mb-6 text-lg overflow-hidden">
          <RadixAccordion.Trigger className="AccordionTrigger w-full flex justify-between text-primary-600 font-medium py-4">
            {item.title}
            <FontAwesomeIcon className="AccordionChevron" icon={faChevronDown} width={18} size="lg" />
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className="AccordionContent">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}

    </RadixAccordion.Root>
  )
}

export default Accordion