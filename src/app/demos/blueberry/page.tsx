'use client'

import ImageHero from "@/components/elements/ImageHero/ImageHero"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import TabPT from "@/components/blueberry/TabPT/TabPT"
import Image from "next/image"

const defaultPageData = {
  sections: {
    heroSection: {
      label: "",
      title: "English for Children",
      subtitle: "Build a bright future",
      media: {
        type: "video",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/hero_video.mp4",
      },
    },
    presentationSection: {
      label: "",
      title: "Our Solutions",
      subtitle: "",
      slides: [
        {
          label: "FOR AGES 4-12",
          title: "BlueBERRY",
          subtitle: "",
          content: "BlueBERRY is a research-aligned curriculum that follows the principles of Natural Language Acquisition to build English oral language and critical listening skills. It helps students gain confidence and English fluency by using the continual language acquisition processes of exposure, comprehension, use, and reinforcement.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseed.webp",
          },
          url: ""
        },
        {
          label: "FOR 36-48 MONTHS",
          title: "LittleBERRY",
          subtitle: "",
          content: "LittleBERRY is an English curriculum program that provides a first exposure for 3-year-olds. LittleSEED gives students an advantage in learning English by teaching them the most important sounds, vocabulary, and communicative expressions.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/littleseed.webp",
          },
          url: ""
        },
        {
          label: "FOR 0-36 MONTHS",
          title: "BlueBERRY Baby",
          subtitle: "",
          content: "BlueBERRY Baby is a series of bilingual picture books for infants and toddlers. GrapeSEED Baby books provide a solid foundation for language learning in both English and the home language.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseedbaby.webp",
          },
          url: ""
        }

      ]
    }
  }
}

export default function Home() {
  const { heroSection, presentationSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <ImageHero data={heroSection} />
      
      <Section
        className="min-h-screen py-16"
        title={presentationSection.title}
      >
        <TabPT data={presentationSection.slides} />
      </Section>

      <Section framed={false} className="bg-indigo-50">
        <GridBox columns={2} gap={0}>
          <div className="p-4 md:p-8 lg:p-20 xl:p-32">
            <h2 className="text-5xl lg:text-6xl leading-snug lg:leading-snug font-bold max-w-4xl my-5 text-red-700">Teacher Training</h2>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-indigo-400">Foundation Training</h3>
            <p className="text-lg mb-3">Foundation Training prepares teachers to use the BlueBERRY curriculum and provides the foundational knowledge and skills necessary to effectively use the materials.</p>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-indigo-400">BlueBERRY Essentials</h3>
            <p className="text-lg mb-3">BlueBERRY Essentials is an on-demand, online training course designed to equip teachers with the basics of teaching BlueBERRY. The video-based training covers the theories and design that are foundational to BlueBERRY and `how to teach` the key components of the BlueBERRY curriculum, including real classroom examples and tips from BlueBERRY Coaches.</p>
          </div>
          <div className="">
            <Image
              className="w-full h-full aspect-square object-cover object-right"
              src="https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/teacher_taining.webp"
              alt="Teacher Training"
              width={500}
              height={500}
             />
          </div>
        </GridBox>
      </Section>

      <Section framed={false} className="bg-indigo-50">
        <GridBox columns={2} gap={0}>
          <div className="">
            <Image
              className="w-full h-full object-cover object-right"
              src="https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/teacher_taining.webp"
              alt="Teacher Training"
              width={500}
              height={500}
             />
          </div>
          <div className="p-4 md:p-8 lg:p-20 xl:p-32">
            <h2 className="text-5xl lg:text-6xl leading-snug lg:leading-snug font-bold max-w-4xl my-5 text-red-700">Implementation Support</h2>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-indigo-400">Teacher Support & Lesson Video Analysis</h3>
            <p className="text-lg mb-3">Teacher support is focused on ensuring fidelity of implementation of the GrapeSEED curriculum. Support includes coaching, co-teaching, lesson video analysis, and professional learning sessions.</p>
            <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl my-3 text-indigo-400">Teacher Professional Development & Training Site</h3>
            <p className="text-lg mb-3">Teachers have unlimited access to a comprehensive video library and online courses that serve as professional development resources, focused on implementing the GrapeSEED curriculum for impact. Content covers topics such as basic How to Effectively Teach modules to the Master Teacher series.</p>
          </div>
        </GridBox>
      </Section>
    </main>
  )
}
