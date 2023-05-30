"use client";

import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";

interface Props {
  data?: {
    label: string;
    title: string;
    subtitle: string;
    button: {
      text: string;
      url: string;
    };
    media: {
      type: string;
      src: string;
    };
  };
}

const dummyData = {
  label: "FEATURES",
  title: "Unlock the full potential of a business platform",
  subtitle:
    "Bluebiz is a top-rated platform for small and medium businesses to grow sales through outstanding customer service.",
  button: {
    text: "Get started now",
    url: "/register",
  },
  media: {
    type: "image",
    src: "https://www.tidio.com/_next/image/?url=%2Fimages%2Fplaybooks%2Fprovide-in-store-shopping-experience%2Fhero%2Fhero-desktop.png&w=1920&q=75",
  },
};

const FeaturesHero = ({ data = dummyData }: Props) => {
  const { label, title, subtitle, button, media } = data;
  const [animated, setAnimated] = useState(false);
  const [ref, isVisible] = useInView({
    threshold: 0.3,
    onEnter: () => {
      // @TODO technical debt
      setTimeout(() => {
        setAnimated(true);
      }, 500);
    },
  });

  const animationClasses = classNames(
    { invisible: !animated },
    { visible: animated },
    { "animate-animationA delay-1000": isVisible && !animated }
  );

  // console.log("FeaturesHero")
  // console.log("isVisible", isVisible)
  // console.log("animated", animated)
  // console.log("----")

  return (
    <section
      ref={ref}
      className="px-4 lg:px-32 flex flex-col-reverse lg:flex-row gap-5 items-center"
    >
      <div className="lg:w-5/12">
        <p
          className={classNames(
            "uppercase font-bold text-blue-600 tracking-widest",
            animationClasses
          )}
        >
          {label}
        </p>
        <h1
          className={classNames(
            "text-4xl leading-snug md:text-5xl md:leading-snug font-bold my-8 ",
            animationClasses
          )}
        >
          {title}
        </h1>
        <p className={classNames("md:text-lg mb-10", animationClasses)}>
          {subtitle}
        </p>
        <div className={classNames(animationClasses)}>
          <Button variant="primary" size="lg" url={button.url}>
            {button.text}
          </Button>
        </div>
      </div>
      <div className="lg:w-7/12">
        {/* @TODO optimize Image */}
        {media?.type === "image" && (
          <img className={classNames(animationClasses)} src={media.src} />
        )}
        {media?.type === "video" && (
          <video className={classNames(animationClasses)} src={media.src} />
        )}
      </div>
    </section>
  );
};

export default FeaturesHero;
