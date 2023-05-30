"use client";

import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";
import Image from 'next/image';

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
    src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/hero.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAN9FPeAHjviZaSK63MoSTLJHNLfFATAYbIw%2BZYmwdYvrAiAdT4PtMh22PhNmClT0d%2F5LrPWT9XiACRhFjiJT%2BUuBKyrxAgiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDExNjM3MTExNzg3NCIMTD1vQ8ks5v8xFcNjKsUC027n2fj0FmpOG%2Bj9Fqs1FVmStYpxJ66oVFTm3tpDwqLYSpu32JaKb6nnrdKa8V%2BEhbchIsi%2Bwj57HLltCAMrD2GkZOv2chvFIt9Etc%2BJ59ShyUXRFSYacv%2BNsUjZrqjPW4nBWAV%2Bcwc%2F4bOHy1Nvhswl5Bdv654WZ0zR1ZoyRpMmYI23tpcaYbXYhoPMwi9%2F924gtk9t241OUw50d61lCLt2ocoJG4Dwv8We4O%2Bqg9B2n4yVdmfFs1aZHH%2BJtPOXo%2BNhlepTDaMWr4U0oQmd9LMmOTeTZr3IoFsBCqWEdXvf%2FTnfvzeUtrhBSACnZ39RSVeXQGGCWfeR4%2FNX%2Bw7ziFLqf51wh7j5AgusvQ5SHnTaqne7eKyOaS3NrZTIJu0gkGGdQ%2BNjXu22afe8ik8LvFK9LUVKIRSQF27y1c463kHW7bYGlDD519ajBjqzAr6CfrTSnAfWJFW446R7d4X71V2q0Oq%2BxYLTEMS%2FgibwZMXy0kJaGLwIBuh0%2FMBEjoeoRngJ%2F1ZjX65OoX4XbVjtDADGyT5R7XDa8Sfc9YpvaaATXy%2Bia%2BAXAY0DWr4TIOUJrqZc39HTDA5KlbL3jqFzrsL1uQuLm4u%2BkZgT3nM%2BF06eRby%2BkPz4GbvBBS4bmlnVmFdCopr8%2Bsv7m9QwGqUzxo6SoK00UwQ79RH9Q1sUnrC%2FMXI6yNCKU9gLfo2V1RGeoTPvBiKc2IPfEAT7vLaeVnRJwDJs9YKNy7w7Vz86jncB4Wbi4wmY78LQobWpTHMZgn0ChMnxlaXzoM8fTWDkk0SYQC58kGMY5Ry5FIjanqhHBSRwyXBQZKJbDr5S0Jchs8PcYAEDvTggl%2Bpnn9TcSZ0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230530T094054Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARWGCCK4ZNWKAMTPZ%2F20230530%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=750ca1a269c18de7826f91813d760df3899468838a687356863dd81b00d0a347",
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
        {media?.type === "image" && (
          <Image
            className={classNames("w-full object-cover", animationClasses)} 
            src={media.src}
            alt={title}
            width={500}
            height={500}
          />
        )}
        {media?.type === "video" && (
          <video className={classNames(animationClasses)} src={media.src} />
        )}
      </div>
    </section>
  );
};

export default FeaturesHero;
