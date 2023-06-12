'use client'

import ImageHero from "@/components/elements/ImageHero/ImageHero"
import Card from "@/components/elements/Card/Card"
import FlexBox from "@/components/elements/FlexBox/FlexBox"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import Image from "next/image"

const dummyData = {
  sections: {
    heroSection: {
      label: "",
      title: "English for Children",
      subtitle: "Build a bright future",
      media: {
        type: "video",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/apple-seed/hero_video.mp4",
      },
    },
    eventSection: {
      title: "Discory New Events",
      subtitle: "Our Modern Institution is interested in cultivating an environment where young students can come together and learn in a creative environment.",
      sections: [
        {
          title: "Politics Seminar",
          content: "November 6 @ 8:00 am",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/politics_seminar_event_feat.jpg",
            altText: "",
          },
          url: ""
        },
        {
          title: "Business Seminar",
          content: "July 1 @ 8:00 am",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/business_seminar_event_feat.jpg",
            altText: "",
          },
          url: ""
        },
        {
          title: "Student Fund Raiser",
          content: "September 9 @ 8:00 am",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/student_fundraiser_event_feat.jpg",
            altText: "",
          },
          url: ""
        },
        {
          title: "English Seminar",
          content: "October 17 @ 8:00 am",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/english_seminar_event_feat.jpg",
            altText: "",
          },
          url: ""
        },
      ]
    },
  }
}

export default function Home() {
  const { heroSection, eventSection, testimonialsSection } = dummyData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <ImageHero data={heroSection} />
      
      <Section
        title={eventSection.title}
        subtitle={eventSection.subtitle}
        framed={false}
      >
        <FlexBox className="px-4 lg:px-32" gap={9} horizontalScrollable>
          {eventSection.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="video" shadow imagePosition="overlay" />
          ))}
        </FlexBox>
      </Section>

      <Section framed={false} className="bg-red-50">
        <GridBox columns={2} gap={0}>
          <div className="p-4 md:p-8 lg:p-20 xl:p-32">
            <h2 className="text-5xl lg:text-6xl leading-snug lg:leading-snug font-bold max-w-4xl my-5 text-red-700">Teacher Training</h2>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-lime-500">Foundation Training</h3>
            <p className="text-lg mb-3">Foundation Training prepares teachers to use the AppleSEED curriculum and provides the foundational knowledge and skills necessary to effectively use the materials.</p>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-lime-500">AppleSEED Essentials</h3>
            <p className="text-lg mb-3">AppleSEED Essentials is an on-demand, online training course designed to equip teachers with the basics of teaching AppleSEED. The video-based training covers the theories and design that are foundational to AppleSEED and `how to teach` the key components of the AppleSEED curriculum, including real classroom examples and tips from AppleSEED Coaches.</p>
          </div>
          <div className="">
            <Image
              className="w-full h-full aspect-square object-cover object-right"
              src="https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/apple-seed/teacher_taining.webp"
              alt="Teacher Training"
              width={500}
              height={500}
             />
          </div>
        </GridBox>
      </Section>

      <Section framed={false} className="bg-red-50">
        <GridBox columns={2} gap={0}>
          <div className="">
            <Image
              className="w-full h-full object-cover object-right"
              src="https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/apple-seed/teacher_taining.webp"
              alt="Teacher Training"
              width={500}
              height={500}
             />
          </div>
          <div className="p-4 md:p-8 lg:p-20 xl:p-32">
            <h2 className="text-5xl lg:text-6xl leading-snug lg:leading-snug font-bold max-w-4xl my-5 text-red-700">Implementation Support</h2>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-lime-500">Teacher Support & Lesson Video Analysis</h3>
            <p className="text-lg mb-3">Teacher support is focused on ensuring fidelity of implementation of the GrapeSEED curriculum. Support includes coaching, co-teaching, lesson video analysis, and professional learning sessions.</p>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-lime-500">Teacher Professional Development & Training Site</h3>
            <p className="text-lg mb-3">Teachers have unlimited access to a comprehensive video library and online courses that serve as professional development resources, focused on implementing the GrapeSEED curriculum for impact. Content covers topics such as basic How to Effectively Teach modules to the Master Teacher series.</p>
          </div>
        </GridBox>
      </Section>
    </main>
  )
}
