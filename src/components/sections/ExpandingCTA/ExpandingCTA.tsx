import { useState } from "react";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import Button from "@/components/elements/Button/Button";

const content = {
  "title": "Grow your sales through outstanding customer service",
  "subtitle": "Get your 7-day trial. No credit card required. Free plan available.",
  "button": {
    "text": "Get started for free",
    "url": "/register",
  }
}

const ExpandingCTA = () => {
  const [w, setW] = useState(70)

  const [ref, isVisible] = useInView({
    threshold: 0.5,
    onEnter: (entry, observer) => {
      console.log(entry, observer);
    },
    // onLeave: () => setStart(false),
  });
  console.log("isVisible", isVisible)
  return (
    <section className="px-32">
      <div ref={ref} className={classNames(
          "bg-blue-950 py-32 w-[70%] mx-auto will-change-[width]",
          {"animate-expandingWidth": isVisible},
          {"animate-shrinkingWidth": !isVisible},
        )}
      >
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <h2 className="text-5xl leading-snug text-center text-gray-300 mb-8">
            {content.title}
          </h2>
          <p className="text-xl text-blue-200 text-center mb-12">
            {content.subtitle}
          </p>
          <Button variant="primary" size="lg" url={content.button.url}>
            {content.button.text}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ExpandingCTA