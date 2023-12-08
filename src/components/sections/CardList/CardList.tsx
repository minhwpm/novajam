"use client";
import Section from "@/components/elements/Section/Section";
import BlogPreview from "@/components/elements/BlogPreview/BlogPreview";
import classNames from "classnames";
import { AlignmentType, CardListType, CardType } from "@/helpers/types";
import PagePreview from "../PagePreview/PagePreview";
import Link from "next/link";
import Image from "next/image";
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview";
import { Statistics } from "@/components/elements/Statistics/Statistics";
import { ContentPiece } from "@/components/elements/ContentPiece/ContentPiece";
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css"
import Button from "@/components/elements/Button/Button";


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
    seeAllLink,
    content,
    layout,
    size,
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
      {seeAllLink && 
        <div className="flex justify-end">
          <Button
          size="lg"
          variant="link"
          url={seeAllLink.url}>
            {seeAllLink.text}
          </Button>
        </div>
      }
      {layout === "grid" && (
        <div
          className={classNames(
            "grid gap-8 mt-5",
            { "sm:grid-cols-2": size === "XL" },
            { "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": size === "L" },
            {
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4":
                size === "M",
            },
            {
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5":
                size === "S",
            }
          )}
        >
          {content.map((item) => (
            <ContentItem key={item.id} data={item} alignment={alignment} />
          ))}
        </div>
      )}
      {layout === "carousel" && (
        <Swiper
          className="mt-5"
          spaceBetween={25}
          navigation={{
            enabled: true,
          }}
          pagination={{
            enabled: true,
          }}
          slidesPerView="auto"
          freeMode={true}
          modules={[Pagination, Navigation, FreeMode]}
        >
          {content.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{
                width: "80%",
                maxWidth: classNames(
                  { "460px": size === "XL" },
                  { "368px": size === "L" },
                  { "276px": size === "M" },
                  { "184px": size === "S" }
                ),
              }}
            >
              <ContentItem data={item} alignment={alignment} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {layout === "masonry" && (
        <ResponsiveMasonry
          className="mt-5"
          columnsCountBreakPoints={{
            320: 1,
            768: 2,
            1024: parseInt(
              classNames(
                { 5: size === "S" },
                { 4: size === "M" },
                { 3: size === "L" },
                { 2: size === "XL" }
              )
            ),
          }}
        >
          <Masonry columnsCount={3} gutter="25px">
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
