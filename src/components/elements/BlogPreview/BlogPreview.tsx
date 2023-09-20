import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { BlogType } from "@/utils/types"
import { usePathname } from "next/navigation"

interface Props {
  data: BlogType
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const Card: React.FC<Props> = ({
  data,
  aspectRatio = "video",
}) => {
  const { title, summary, slug, media, topics } = data
  const pathname = usePathname()
  console.log("Pathname: " + pathname)
  return (
    <div className={classNames(
      "basis-[80%] md:basis-[40%] lg:basis-[28%] shrink-0 grow hover:shadow-lg hover:-translate-y-4 transform transition-transform duration-500",
    )}>
      <Link href={`${pathname}/blog/${slug}`}>
        <div className={classNames(
          { "aspect-video" : aspectRatio === "video"},
          { "aspect-square" : aspectRatio === "square"},
          { "aspect-3/4" : aspectRatio === "3/4"},
          { "aspect-4/3" : aspectRatio === "4/3"},
          { "aspect-3/2" : aspectRatio === "3/2"}
        )}>
          <Image 
            className={classNames(
              "w-full h-full object-cover",
            )}
            src={media?.url ?? '/bluebiz_square.webp'}
            width={500} 
            height={500} 
            alt={media?.title ?? title}
          />
        </div>
        <div className={classNames(
          "w-full p-5",
        )}>
          <div className="text-xs uppercase tracking-widest flex flex-wrap gap-3">
            {topics && topics.length > 0 && topics.map((topic, idx) => (
              <div key={idx}>{topic}</div>
            ))}
          </div>
          <h4 className="text-lg lg:text-xl font-semibold mt-1">
            {title}
          </h4>
          {summary && 
            <p className="text-slate-700 lg:text-lg mt-2 line-clamp-3">
              {summary}
            </p>
          }
        </div>
      </Link>
    </div>
  )
}

export default Card