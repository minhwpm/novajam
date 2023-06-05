import Image from "next/image"
import classNames from "classnames";
import Button from "@/components/elements/Button/Button";

interface Props {
  data: {
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
  }
  aspectRatio?: "video" | "5/2"
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
    src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/hero.webp",
  },
};

const ImageHero = ( { data = dummyData, aspectRatio = "video" } ) => {
  const { title, subtitle, button, media } = data
  return (
    <div className="relative ">
      <Image
        className={classNames("w-full object-cover",
          { "aspect-5/2": aspectRatio === "5/2" },
          { "aspect-video": aspectRatio === "video" },
        )} 
        src={media.src}
        alt={title}
        width={500}
        height={400}
        priority={true}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center w-full">
        <h1 className="text-4xl lg:text-6xl font-bold mb-5">
          {title}
        </h1>
        <p className="text-lg lg:text-2xl font-semibold mb-10">
          {subtitle}
        </p>
        <Button variant="primary" size="lg" url={button.url}>
          {button.text}
        </Button>
      </div>
    </div>
  )
}

export default ImageHero