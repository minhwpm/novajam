'use client'

import Section from "@/components/elements/Section/Section"
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import classNames from "classnames"
import ProductPreview from "@/components/elements/ProductPreview/ProductPreview"
import FeaturePreview from "@/components/elements/FeaturePreview/FeaturePreview"
import { ContentPreviewListType, ContentPreviewType } from "@/utils/types"
import PagePreview from "../PagePreview/PagePreview"

interface Props {
  data: ContentPreviewListType
}

const ContentItem: React.FC<{data: ContentPreviewType}> = ({data}) => {
  switch(data.contentType){
    case "product": 
      return <ProductPreview data={data} />
    case "feature":
      return <FeaturePreview data={data} />
    case "blog":
      return <BlogPreview data={data} />
    case "page":
      return <PagePreview data={data} />
    {/* @TODO render Service Card */}
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
      {layout === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item) => (
            <ContentItem key={item.id} data={item} />
          ))}
        </div>
      ) : (
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
    </Section>
  )
}

export default CardList