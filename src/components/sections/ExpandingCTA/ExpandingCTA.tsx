'use client'
import { useState } from "react";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import Button from "@/components/elements/Button/Button";

const defaultData = {
  "title": "Grow your sales through outstanding customer service",
  "subtitle": "Get your 7-day trial. No credit card required. Free plan available.",
  "button": {
    "text": "Get started for free",
    "url": "/register",
  }
}

interface CTAProps {
  data?: {
    title: string
    subtitle?: string
    button: {
      text: string
      url?: string
    }
  }
}

const ExpandingCTA = ({ data = defaultData }: CTAProps) => {
  const { title, subtitle, button } = data;
  // @TODO expanding width on scrolling
  const [w, setW] = useState(70)

  const [ref, isVisible] = useInView({
    threshold: 0.5,
    onEnter: (entry, observer) => {
      console.log(entry, observer);
    },
    // onLeave: () => setStart(false),
  });
  // console.log("isVisible", isVisible)
  return (
    <section className="px-5 lg:px-20 xl:px-32">
      <div ref={ref} className={classNames(
          "bg-blue-950 mx-auto px-5 py-16 lg:py-20 xl:py-32 lg:w-[70%] lg:will-change-[width]",
          {"lg:animate-expandingWidth": isVisible},
          {"lg:animate-shrinkingWidth": !isVisible},
        )}
      >
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl leading-snug lg:leading-snug text-center text-gray-300 mb-8">
            {title}
          </h2>
          <p className="text-xl text-blue-200 text-center mb-12">
            {subtitle}
          </p>
          <Button variant="primary" size="lg" url={button.url}>
            {button.text}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ExpandingCTA