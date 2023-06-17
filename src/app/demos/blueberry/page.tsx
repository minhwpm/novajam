'use client'

import ImageHero from "@/components/elements/ImageHero/ImageHero"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import TabPT from "@/components/blueberry/TabPT/TabPT"
import ScrollingPresentation from "@/components/sections/ScrollingPresentation/ScrollingPresentation"
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
    presentationSection1: {
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
    },
    presentationSection2: {
      label: "BLUEBERRY CURRICULUM",
      title: "Core Components",
      subtitle: "At GrapeSEED, we know a variety of teaching tools are needed to assist children when learning a language. Every curriculum component has a purpose, and together, they make a rich language learning opportunity. \n Learn how each curriculum component contributes to the GrapeSEED experience.",
      slides: [
        {
          label: "",
          title: "ACTION ACTIVITIES",
          subtitle: "",
          content: "Action Activities teach specific actions with a physical response—the principle behind Total Physical Response (TPR). By requiring this response, Action Activities help students to begin thinking in English, and they can respond physically to English before their verbal abilities have developed.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_action-activity.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "SONGS",
          subtitle: "",
          content: "Songs are a fun and effective way to teach vocabulary and expressions. All Songs are designed to introduce vocabulary and language functions within the learning objectives. When combined with pictures and gestures, students` understanding of the new concepts will increase when they hear similar phrases repeated in other contexts.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_songs.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "SHARED READING: POEMS & BIG BOOKS",
          subtitle: "",
          content: "Shared Reading teaches phonics principles, such as phoneme and phonogram awareness, and the concepts of print. Poems introduce a new letter and teach students to recognize a sound at the beginning, middle, and end of words. Big Books teach proper pronunciation, natural expression, high frequency words, and basic vocabulary.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_big-book.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "CHANTS",
          subtitle: "",
          content: "Chants contain most of the critical expressions necessary for communicating in English and provide a natural context for learning most language functions. Chants are designed to be learned in the same style as a regular conversation, helping students from speaking in an awkward monotone.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_chants.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "STORIES & STORY DICTIONARIES",
          subtitle: "",
          content: "Stories provide an opportunity for daily repetition and expand students` vocabulary and language functions with various sentence structures. Each Unit comes with a Story Dictionary, which reviews words and language functions from the previous Unit. Reading Stories facilitates discussions and allows for comprehension questions that build students` confidence and communicative ability.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp",
          },
          url: ""
        },
        {
          label: "",
          title: "VOCABULARY PICTURE CARDS",
          subtitle: "",
          content: "Vocabulary Picture Cards are important for teaching new vocabulary words and make it easy to learn the meaning of nouns, adjectives, and opposites. They also allow for quick assessment of student progress on proper pronunciation and natural intonation.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_vocabulary-picture-card.webp",
          },
          url: ""
        },
        // {
        //   label: "",
        //   title: "PHONOGRAM CARDS",
        //   subtitle: "",
        //   content: "Learning phonograms and understanding how they come together to make words lays the foundation for future reading skills. Phonogram Cards allow students to focus on specific English sounds. Students will air write and learn the stroke order, name, and sound of each letter of the alphabet.",
        //   media: {
        //     type: "image",
        //     src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseedbaby.webp",
        //   },
        //   url: ""
        // },
        // {
        //   label: "",
        //   title: "",
        //   subtitle: "",
        //   content: "",
        //   media: {
        //     type: "image",
        //     src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/grapeseedbaby.webp",
        //   },
        //   url: ""
        // }
      ]
    }
  }
}

export default function Home() {
  const { heroSection, presentationSection1, presentationSection2 } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <ImageHero data={heroSection} />
      
      <Section
        className="min-h-screen py-16"
        title={presentationSection1.title}
      >
        <TabPT data={presentationSection1.slides} />
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
              className="w-full h-full object-cover object-left -scale-x-100 "
              src="https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp"
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

      <Section
        className="py-20 lg:py-32"
        label={presentationSection2.label}
        title={presentationSection2.title}
        subtitle={presentationSection2.subtitle}
      >
        <ScrollingPresentation data={presentationSection2.slides} />
      </Section>
    </main>
  )
}
