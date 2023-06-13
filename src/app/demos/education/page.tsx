'use client'

import ImageHero from "@/components/elements/ImageHero/ImageHero"
import Accordion from "@/components/elements/Accordion/Accordion"
import Card from "@/components/elements/Card/Card"
import FlexBox from "@/components/elements/FlexBox/FlexBox"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import Testimonials from "@/components/sections/Testimonials/Testimonials"
import { ButtonVariant } from "@/components/elements/Button/Button"

const defaultPageData = {
  sections: {
    heroSection: {
      label: "",
      title: "Inspiring Tomorrows Leaders",
      subtitle: "The Future Belongs To Those Who See Possibilities Today",
      buttons: [
        {
          text: "Find a course",
          url: "/register",
          type: "primary" as ButtonVariant
        },
        {
          text: "Apply now",
          url: "/apply",
          type: "secondary" as ButtonVariant
        }
      ],
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/home_main_slider_bg.jpg"
      },
    },
    featuresSection: {
      title: "Inspired By Excellence & Innovation",
      subtitle: "We Offer A Wide Range Of High Quality Of Teaching And Extra-Curricular Activities.",
      sections: [
        {
          title: "Physics",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_physics_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/physics"
        },
        {
          title: "Music Production",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_music_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/music-production"
        },
        {
          title: "Graphic Design",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_graphic_design_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/graphic-design"
        },
        {
          title: "Economics",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_economics_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/economics"
        },
        {
          title: "Sports Science",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_sports_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/sports-science"
        },
        {
          title: "Biology",
          content: "Our modern institution is interested in cultivating an environment where young students can come together and learn in a creative and flexible environment. We work collaboratively with our students to achieve outstanding results.",
          image: {
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/university/course_biology_portfolio_feat.jpg",
            altText: "",
          },
          url: "/demos/education/biology"
        },
      ]
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
    testimonialsSection: {
      title: "What Students Are Saying",
      subtitle: "",
      sections: [
        {
          title: "",
          content: "Cras vel dolor ut arcu tristique luctus. Duis vitae egestas nulla. Duis faucibus, arcu eget interdum aliquet, orci risus volutpat erat, quis sodales neque arcu quis elit. Nunc sodales lacus sapien, eu pharetra massa lacinia iaculis.",
          source: "LEE MILLER, Physics Student",
        },
        {
          title: "",
          content: "Maecenas congue dictum pretium. Sed nec sem sit amet neque egestas porttitor. Proin scelerisque commodo purus, pellentesque aliquet mauris faucibus a.",
          source: "EMERY BURNS, Design Student",
        },
        
      ]
    }
  }
}

export default function Home() {
  const { heroSection, featuresSection, eventSection, testimonialsSection } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <ImageHero data={heroSection} />
      
      <Section
        title={featuresSection.title}
        subtitle={featuresSection.subtitle}
      >
        <GridBox gap={9} columns={3} >
          {featuresSection.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="3/2" border imagePosition="top" />
          ))}
        </GridBox>
      </Section>

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

      <Section framed={false}>
        <Testimonials data={testimonialsSection} />
      </Section>

      <section className="px-4 lg:px-32 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-semibold mb-10 text-center">
            Frequently asked questions
          </h2>
          <Accordion />
        </div>
      </section>
    </main>
  )
}
