import classNames from "classnames";
import Link from "next/link"
import Image from "next/image";
import { useInView } from "react-hook-inview";
import { LinkType } from "@/helpers/types";

export const ImageLink: React.FC<{
  data: LinkType
  animate?: boolean
}> = ({ data, animate }) => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.2,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames(
        "flex p-4 rounded-assets",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        }
      )}
    >
      <Link href={data.url}>
        {data.image ? (
          <Image
            src={data.image.url}
            alt={data.text}
            width={data.image.width}
            height={data.image.height}
          />
        ) : (
          data.text
        )}
      </Link>
    </div>
  )
}