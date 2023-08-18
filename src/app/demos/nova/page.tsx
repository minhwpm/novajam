import HeroC from "@/components/sections/HeroC/HeroC"
import TabPT from "@/components/sections/TabPT/TabPT"
import CTA from "@/components/sections/CTA/CTA"
import { ButtonVariant } from "@/components/elements/Button/Button"
import CardList from "@/components/sections/CardList/CardList"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import getPage from "@/utils/contentful/graphql/getPage"
import Sections from "@/components/sections/Sections/Sections"

const defaultPageData = {
  sections: {
    heroSection: {
      title: "Among the nation's best.",
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/hero.webp",
      },
      buttons: [
        {
          text: "Schedule Your Appointment Now",
          type: "standard" as ButtonVariant
        },
      ],
    },
    contentSection: {
      title: "Care when you need it, where you need it.",
      sections: [
        {
          title: "Same-day Appointments",
          content: "For primary care & selected specialties, see provider schedules & make your own appointment online, even if you’re new to RUSH.",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/cta-grid--icon-3.png",
          },
          button: {
            text: "Schedule Online",
            url: "/schedule-online",
            type: "alternate",
          }
        },
        {
          title: "RUSH On Demand",
          content: "Get quick care without an appointment for common conditions and everyday health concerns with RUSH On Demand. We have many convenient ways to see a provider, including online virtual visits.",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/cta-grid--icon-2.png",
          },
          button: {
            text: "Get Care Today",
            url: "/get-care-today",
            type: "alternate",
          }
        },
        {
          title: "New Northwest Indiana Location",
          content: "RUSH Munster offers Northwest Indiana access to top health care providers in primary care and over a dozen specialties.",
          media: {
            type: "icon",
            src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/location-icon.png",
          },
          button: {
            text: "Learn More",
            url: "/locations",
            type: "alternate",
          }
        },
      ]
    },
    featureSection: {
      title: "Built for you.",
      content: "The new Joan and Paul Rubschlager Building is a destination for state-of-the-art outpatient care in cancer, neurosciences, digestive diseases and more. Read stories that highlight what RUSH means to its patients, providers, employees and community — and illustrate how the Rubschlager Building is supporting RUSH in providing excellent patient care, in 2023 and beyond.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/building.webp",
        altText: "Built for you"
      },
      button: {
        url: "",
        text: "Read Their Stories",
        type: "standard" as ButtonVariant

      }
    },
    presentationSection1: {
      sections: [
        {
          title: "Quality Care",
          subtitle: "Top honors for quality and safety",
          content: "From our No. 2 ranking in the country for quality to \"A\" grades for patient safety, our hospitals are consistently recognized for excellence.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/quality-care.webp"
          },
          button: {
            text: "Learn more",
            url: "demos/nova/solutions/on-demand",
            type: "link-btn" as ButtonVariant
          }
        },
        {
          title: "Research & Innovation",
          subtitle: "Leaders in research and clinical trials",
          content: "As one of the leading academic health systems in the nation, RUSH is uncovering novel treatments through research and clinical trials.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/research-and-innovation.webp"
          },
          button: {
            text: "Learn more",
            url: "demos/nova/solutions/shared",
            type: "link-btn" as ButtonVariant

          }
        },
        {
          title: "Education",
          subtitle: "Transforming health care education",
          content: "RUSH University is training the next generation of health care providers through opportunities in clinical care, community service and leading-edge research.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/education.webp"
          },
          button: {
            text: "Learn more",
            url: "/demos/nova/solutions/education",
            type: "link-btn" as ButtonVariant

          }
        },
        {
          title: "Health Equity",
          subtitle: "Committed to our community",
          content: "Through our efforts to dismantle health barriers and address social disparities of health, RUSH is recognized as a national leader in health equity.",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/health-equity.webp",
          },
          button: {
            text: "Learn more",
            url: "/demos/nova/solutions/health-equity",
            type: "link-btn" as ButtonVariant
          }
        },
      ]
    },
    
    contentSection2: {
      title: "RUSH Stories",
      sections: [
        {
          label: "Awards, Rankings and Recognitions",
          title: "Newsweek Honors RUSH Programs for Excellence in Delivery of Care",
          content: "Cancer Center, Surgicenter, Children's Hospital, maternity program recognized",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/vizient-2022-feature_2.jpg",
          },
          url: "/stories",
        },
        {
          label: "Skin",
          title: "What Is Mohs Micrographic Surgery? 8 FAQs About Mohs",
          content: "Procedure for removing skin cancer has a high success rate and shorter recovery",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/mohs-surgery-feature.jpg",
          },
          url: "/stories",
        },
        {
          label: "Patient Stories",
          title: "Mike’s Story: Choosing Knee Replacement",
          content: "‘Nonstop’ pain motivated landscaper Mike Taylor to choose joint replacement surgery",
          media: {
            type: "image",
            src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/Mike-Taylor-771x434.gif"
          },
          url: "/stories",
        },
      ]
    },
    featureSection2: {
      title: "Giving to RUSH",
      subtitle: "Your gift to RUSH improves health.",
      media: {
        type: "image",
        src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/nova/research-and-innovation-2.webp",
        altText: "Researcher"
      },
      button: {
        url: "",
        text: "Learn More",
        type: "standard" as ButtonVariant

      }
    },
    cta: {
      title: "STAY CONNECTED",
      button: {
        text: "Subscribe to our mailing list",
        url: "/subscribe",
        type: "outline" as ButtonVariant,
      }
    }
  }
}

export default async function Home() {
  try {
    const data = await getPage("/demos/nova")
    return <Sections data={data.content} />
    const { heroSection, presentationSection1, featureSection, featureSection2, contentSection, contentSection2, cta } = defaultPageData.sections
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        <HeroC data={heroSection} />
        <CardList data={contentSection} />
        <FeatureB data={featureSection} />
        <TabPT data={presentationSection1} />
        <CardList data={contentSection2} />
        <FeatureB data={featureSection2} mediaPosition="right" variant="alternate"/>
      </main>
    )
  } catch (e) {
    return (
      <main>
        404 Error Page
      </main>
    )
  }

}
