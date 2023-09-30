'use client'

import Section from "@/components/elements/Section/Section"
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import classNames from "classnames"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"
import FeaturePreview from "@/components/elements/FeaturePreview/FeaturePreview"
import { CardListType, CardType } from "@/utils/types"
import PagePreview from "../PagePreview/PagePreview"
import Link from "next/link"
import Image from "next/image"
import Carousel from "@/components/elements/Carousel/Carousel"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
  data: CardListType
}

const ContentItem: React.FC<{data: CardType}> = ({data}) => {
  switch(data.contentType){
    case "product": 
      return <ProductPreview data={data} />
    case "feature":
      return <FeaturePreview data={data} />
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
    {/* @TODO render Expert, Service Card */}
  }
}

const CardList: React.FC<Props> = ({ data}) => {
  const { title, label, subtitle, content, layout } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      {layout === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              nextEl: '.custom-swiper-btn-next',
              prevEl: '.custom-swiper-btn-prev'
            }}
            slides={content.map((item) => (
              <div key={item.id} className={classNames("mx-4")}>
                <ContentItem data={item} />
              </div>
            ))}
            slidesPerView={4}
            // freeMode={{
            //   enabled: true,
            // }}
          >
            <div className="custom-swiper-btn-prev cursor-pointer w-14 h-14 rounded-full bg-white border border-black items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 flex group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowLeft size={30} />
            </div>
            <div className="custom-swiper-btn-next cursor-pointer w-14 h-14 rounded-full bg-white border border-black items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 flex group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowRight size={30} />
            </div>
          </Carousel>
        </div>
      )}
    </Section>
  )
}

export default CardList