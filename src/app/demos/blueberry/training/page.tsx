import HeroC from "@/components/sections/HeroC/HeroC"
import CTA from "@/components/sections/CTA/CTA"
import Feature from "@/components/sections/FeatureB/FeatureB"
import Subscription from "@/components/sections/Subscription/Subscription"
import CarouselPT from "@/components/sections/CarouselPT/CarouselPT"
import { ButtonVariant } from "@/utils/types"

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
      title: "Teacher Training & Support",
      subtitle: "GrapeSEED Coaches partner with teachers to ensure fidelity of implementation and maximum results. Our training services are designed to fully prepare and support teachers on their journey to student success. Depending on the region, teacher support and training is provided in-person or online.",
      sections: [
        {
          id: "action-activities",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_action-activity.webp",
          },
        },
        {
          id: "songs",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_songs.webp",
          },
        },
        {
          id:"shared-reading",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_big-book.webp",
          },
        },
        {
          id:"chants",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_chants.webp",
          },
        },
        {
          id: "stories",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_stories.webp",
          },
        },
        {
          id: "cards",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/blueberry/cc_vocabulary-picture-card.webp",
          },
          content: {
            title: "Vocabulary Picture Cards",
            body: "Vocabulary Picture Cards are important for teaching new vocabulary words and make it easy to learn the meaning of nouns, adjectives, and opposites. They also allow for quick assessment of student progress on proper pronunciation and natural intonation.",
          },
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
    subscription: {
      title: "Start your journey today",
      button: {
        text: "Subscribe",
        url: "/subscribe",
        type: "standard" as ButtonVariant,
      }
    }
  }
}

export default function Home() {
  const { heroSection, presentationSection, featureSection, featureSection2, subscription } = defaultPageData.sections
  return (
    <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
      <CarouselPT data={presentationSection} aspectRatio="video" />
      <Feature data={featureSection} mediaPosition="right" variant="alternate" />
      <Feature data={featureSection2} variant="alternate" />
      <Subscription data={subscription} />
    </main>
  )
}
