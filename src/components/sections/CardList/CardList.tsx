import Section from "@/components/elements/Section/Section"
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import classNames from "classnames"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"
import { CardListType, CardType } from "@/utils/types"
import PagePreview from "../PagePreview/PagePreview"
import Link from "next/link"
import Image from "next/image"
import Carousel from "@/components/elements/Carousel/Carousel"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview"
import { Statistics } from "@/components/elements/Statistics/Statistics"
import { ContentPiece } from "@/components/elements/ContentPiece/ContentPiece"
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan"

interface Props {
  data: CardListType
}

const ContentItem: React.FC<{data: CardType}> = ({data}) => {
  switch(data.contentType){
    case "product": 
      return <ProductPreview data={data} />
    case "blog":
      return <BlogPreview data={data} />
    case "page":
      return <PagePreview data={data} />
    case "link":
      return (
        <Link href={data.url}>
          { data.image.url ? (
            <Image
              src={data.image.url}
              alt={data.text}
              width={data.image.width}
              height={data.image.height}
            />
          ) : data.text }
        </Link>
      )
    case "expert":
      return <ExpertPreview data={data} layout="column" />
    case "statistics":
      return <Statistics data={data} />
    case "contentpiece":
      return <ContentPiece data={data} />
    case "pricingplan":
      return <PricingPlan data={data} />

    {/* @TODO render Service (may be?) */}
  }
}

const CardList: React.FC<Props> = ({ data}) => {
  const { title, label, subtitle, content, layout, size = 3 } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      {layout === "grid" && (
        <div className={classNames(
          "grid gap-8",
          { "lg:grid-cols-2": size >= 2 },
          { "lg:grid-cols-3": size === 3 },
          { "grid-cols-2 lg:grid-cols-4": size === 4 },
          { "grid-cols-2 md:grid-cols-3 lg:grid-cols-5": size === 5}
        )}>
          {content.map((item) => (
            <ContentItem key={item.id} data={item} />
          ))}
        </div>
      )}
      { layout === "flex" && (
        <div className={classNames(
          "w-full flex gap-6 lg:gap-8 py-5", 
          { "overflow-x-scroll" : content.length >= 3},
          {"justify-center": content.length < 3}
        )}>
          {content.map((item) => (
            <div key={item.id} className={classNames("basis-[80%] md:basis-[40%] lg:basis-[28%] shrink-0 grow")}>
              <ContentItem data={item} />
            </div>
          ))}
        </div>
      )}
      {layout === "carousel" && (
        <div className="relative group">
          <Carousel
            navigation={{
              enabled: true,
              nextEl: '.cardlist-btn-next',
              prevEl: '.cardlist-btn-prev'
            }}
            pagination={{
              enabled: true,
            }}
            slides={content.map((item) => (
              <div key={item.id} className={classNames("")}>
                <ContentItem data={item} />
              </div>
            ))}
            slidesPerView={size}
          >
            <div className="cardlist-btn-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-14 h-14 rounded-full bg-primary-500 bg-opacity-50 text-white items-center justify-center opacity-0 flex group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowLeft size={30} />
            </div>
            <div className="cardlist-btn-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-14 h-14 rounded-full bg-primary-500 bg-opacity-50 text-white items-center justify-center opacity-0 flex group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowRight size={30} />
            </div>
          </Carousel>
        </div>
      )}
    </Section>
  )
}

export default CardList