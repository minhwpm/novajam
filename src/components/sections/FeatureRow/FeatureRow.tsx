import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";

const sections = [
  {
    id: 0,
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fstart-conversation.png&w=3840&q=75",
    content: {
      title: "Start conversations, win loyal customers",
      description: "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
    }
  },
  {
    id: 1,
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fautomate-answers.png&w=3840&q=75",
    content: {
      title: "Automate answers and workflows in minutes",
      description: "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
    }
  },
  {
    id: 2,
    img: "https://www.tidio.com/_next/image/?url=%2Fimages%2Ffrontpage%2Fsection-slider%2Fvisitors.png&w=3840&q=75",
    content: {
      title: "Turn visitors into paying customers",
      description: "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
    }
  },
]

const FeatureRow = () => {
  const [ visibleId, setVisibleId ] = useState(0);
  const ref = React.useRef(null)
  
  return (
    <section className="">
      <h2 className="text-5xl text-center font-semibold mb-16">
        Make customer experience your competitive advantage
      </h2>
      <div className="flex">
        <div className="relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {sections.map(section => (
                <div key={section.id} className={classNames(
                  "img-wrapper transition-opacity duration-300",
                  { "is-visible opacity-100 h-full overflow-visible ": visibleId == section.id},
                  { "is-invisible h-0 opacity-10 max-h-full relative overflow-hidden": visibleId != section.id}
                )}>
                  {/* @TODO use Next/Image */}
                  <img className="h-full object-cover" src={section.img} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {sections.map(section => (
            <FeatureContentItem key={section.id} section={section} setVisibleId={setVisibleId} />
          ))}
        </div>
      </div>
      
    </section>
  )
}

export default FeatureRow