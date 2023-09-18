import RichText from "@/components/elements/RichText/RichText"
import Image from "next/image"
import CardList from "../CardList/CardList"

const BlogDetails = ({ data }) => {
  const { title, summary, content, media } = data
  return (
    <div>
      <article className="container m-auto my-10 flex flex-col gap-y-10">
        <h1 className="font-heading text-5xl font-bold mt-10">
          {title}
        </h1>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-slate-600">
              {summary}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 aspect-16/9">
            <Image  
              className="w-full h-full object-cover"
              src={media.url}
              alt={media.title}
              width={media.width}
              height={media.height}
            />
          </div>
          <div className="lg:col-span-1">
            <div>
              PUBLISHED

            </div>
            <div>
              AUTHOR

            </div>
            <div>
              CATEGORY
            </div>
            <div>
              TOPICS
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 mb-10">
            <RichText htmlString={content} />
          </div>
        </div>
        <div>
          <p>ABOUT THE AUTHOR</p>
          {/* @TODO implement <Author /> */}
        </div>
        
      </article>
      <div className="bg-primary-50 py-14">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-wider">
            DISCOVER MORE
          </h2>
        </div>
        {/* @TODO implement <CardList /> */}
      </div>
    </div>
  )
}

export default BlogDetails