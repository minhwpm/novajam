"use client";
import Section from "@/components/elements/Section/Section";
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview";
import classNames from "classnames";
import { AlignmentType, CardListType, CardType } from "@/helpers/types";
import PagePreview from "../PagePreview/PagePreview";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/elements/Carousel/Carousel";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview";
import { Statistics } from "@/components/elements/Statistics/Statistics";
import { ContentPiece } from "@/components/elements/ContentPiece/ContentPiece";
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ContentItem: React.FC<{
  data: CardType;
  alignment: AlignmentType;
}> = ({ data, alignment }) => {
  switch (data.contentType) {
    case "blog":
      return <BlogPreview data={data} />;
    case "page":
      return <PagePreview data={data} />;
    case "link":
      return (
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
      );
    case "expert":
      return <ExpertPreview data={data} layout="vertical" />;
    case "statistics":
      return <Statistics data={data} />;
    case "contentpiece":
      return <ContentPiece data={data} alignment={alignment} />;
    case "pricingplan":
      return <PricingPlan data={data} />;
  }
};

const CardList: React.FC<{ data: CardListType }> = ({ data }) => {
  const {
    heading,
    label,
    subheading,
    content,
    layout,
    size = 3,
    alignment,
    htmlid,
  } = data;
  return (
    <Section
      label={label}
      heading={heading}
      subheading={subheading}
      id={htmlid}
    >
      {layout === "grid" && (
        <div
          className={classNames(
            "grid gap-8",
            { "lg:grid-cols-2": size >= 2 },
            { "lg:grid-cols-3": size === 3 },
            { "grid-cols-2 lg:grid-cols-4": size === 4 },
            { "grid-cols-2 md:grid-cols-3 lg:grid-cols-5": size === 5 }
          )}
        >
          {content.map((item) => (
            <ContentItem key={item.id} data={item} alignment={alignment} />
          ))}
        </div>
      )}
      {layout === "carousel" && (
        <div className={classNames("relative group/cardlist")}>
          <Carousel
            navigation={{
              enabled: true,
              nextEl: ".cardlist-btn-next",
              prevEl: ".cardlist-btn-prev",
            }}
            pagination={{
              enabled: true,
              clickable: true,
            }}
            slidesPerView={size}
            slides={content.map((item) => (
              <div key={item.id} className="pb-8">
                <ContentItem data={item} alignment={alignment} />
              </div>
            ))}
          >
            <div className="cardlist-btn-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-14 h-14 rounded-full bg-primary-500 bg-opacity-80 text-white items-center justify-center opacity-0 flex group-hover/cardlist:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowLeft size={30} />
            </div>
            <div className="cardlist-btn-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-14 h-14 rounded-full bg-primary-500 bg-opacity-80 text-white items-center justify-center opacity-0 flex group-hover/cardlist:opacity-100 transition-opacity duration-500 ease-in-out">
              <AiOutlineArrowRight size={30} />
            </div>
          </Carousel>
        </div>
      )}
      {layout === "masonry" && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 768: size - 1, 1024: size }}
        >
          <Masonry columnsCount={3} gutter="20px">
            {content.map((item) => (
              <div key={item.id} className="">
                <ContentItem data={item} alignment={alignment} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Section>
  );
};

export default CardList;
