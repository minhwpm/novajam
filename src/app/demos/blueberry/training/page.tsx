import HeroC from "@/components/sections/HeroC/HeroC"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import Image from "next/image"
import CTA from "@/components/sections/CTA/CTA"
import { ButtonVariant } from "@/components/elements/Button/Button"
import Feature from "@/components/sections/Feature/Feature"

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
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/BlueBERRY.webp",
          },
          link: {
            text: "Learn more",
            url: "/solutions/blueberry"
          }
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
          link: {
            text: "Learn more",
            url: "/solutions/blueberry"
          }
        },
        {
          label: "FOR 0-36 MONTHS",
          title: "BlueBERRY Baby",
          subtitle: "",
          content: "BlueBERRY Baby is a series of bilingual picture books for infants and toddlers. BlueBERRY Baby books provide a solid foundation for language learning in both English and the home language.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/BlueBERRYbaby.webp",
          },
          link: {
            text: "Learn more",
            url: ""
          }
        }

      ]
    },
    presentationSection2: {
      label: "BLUEBERRY CURRICULUM",
      title: "Core Components",
      subtitle: "At BlueBERRY, we know a variety of teaching tools are needed to assist children when learning a language. Every curriculum component has a purpose, and together, they make a rich language learning opportunity. \n Learn how each curriculum component contributes to the BlueBERRY experience.",
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
      ]
    },
    featureSection: {
      title: "Teacher Training",
      content: "Foundation Training prepares teachers to use the BlueBERRY curriculum and provides the foundational knowledge and skills necessary to effectively use the materials. BlueBERRY Essentials is an on-demand, online training course designed to equip teachers with the basics of teaching BlueBERRY. The video-based training covers the theories and design that are foundational to BlueBERRY and `how to teach` the key components of the BlueBERRY curriculum, including real classroom examples and tips from BlueBERRY Coaches.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/teacher_taining.webp",
        altText: "Top tech success"
      }
    },
    featureSection2: {
      title: "Implementation Support",
      content: "Teacher support is focused on ensuring fidelity of implementation of the BlueBERRY curriculum. Support includes coaching, co-teaching, lesson video analysis, and professional learning sessions. Teachers have unlimited access to a comprehensive video library and online courses that serve as professional development resources, focused on implementing the BlueBERRY curriculum for impact. Content covers topics such as basic How to Effectively Teach modules to the Master Teacher series.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp",
        altText: "Top tech success"
      }
    },
    cta: {
      title: "Ready to Start Your Journey?",
      button: {
        text: "CONTACT US",
        url: "/contact",
        type: "outline" as ButtonVariant,
      }
    }
  }
}

export default function Home() {
  const { heroSection, featureSection, featureSection2, cta } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <Feature data={featureSection} mediaPosition="right" variant="alternate" />
      <Feature data={featureSection2} variant="alternate" />
      <CTA data={cta} />
    </main>
  )
}
