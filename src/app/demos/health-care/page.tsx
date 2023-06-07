'use client'

import ImageHero from "@/components/elements/ImageHero/ImageHero"
import Accordion from "@/components/elements/Accordion/Accordion"
import Card from "@/components/elements/Card/Card"
import FlexBox from "@/components/elements/FlexBox/FlexBox"
import GridBox from "@/components/elements/GridBox/GridBox"
import Section from "@/components/elements/Section/Section"
import Testimonials from "@/components/sections/Testimonials/Testimonials"
import { ButtonType } from "@/components/elements/ImageHero/ImageHero"

const dummyData = {
  sections: {
    heroSection: {
      label: "Welcome to Medilife Clinic",
      title: "The best specialists of the city expect you",
      subtitle: "",
      buttons: [
        {
          text: "MAKE AN APPOINTMENT",
          url: "#make-an-appointment",
          type: "primary" as ButtonType,
        },
        {
          text: "DEPARTMENTS",
          url: "/departments",
          type: "secondary" as ButtonType,
        }
      ],
      media: {
        type: "image",
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/health-care/main-bg.png",
      },
    },
    featuresSection: {
      title: "",
      subtitle: "",
      sections: [
        {
          title: "Qualified Doctors",
          content: "Experienced and devoted doctors are ready to help you with your problems.", 
          image: {
            src: "",
            altText: "",
          },
          url: ""
        },
        {
          title: "Emergency Care",
          content: "We are always ready to help you at the time you need help! Our emergency team is here for you!",
          image: {
            src: "",
            altText: "",
          },
          url: ""
        },
        {
          title: "24 Hours Service",
          content: "Anytime you need help, you may contact us and our receptionist will make an appointment for you.",
          image: {
            src: "",
            altText: "",
          },
          url: ""
        },
      ]
    },
    aboutSection: {
      label: "About us",
      title: "Clinic with innovative approach to treatment!",
      subtitle: "We provide the most full medical services, so every person could have the opportunity to receive qualitative medical help."

    },
    departmentsSection: {
      label: "Departments",
      title: "We provide assistance in various directions",
      subtitle: "",
      sections: [
        {
          title: "Pediatrics",
          content: "Our pediatric hospital utilizes state-of-the-art technology and employs a team of true experts.",
          image: {
            src: "https://source.unsplash.com/random/400x400?Pediatrics",
            altText: "",
          },
          url: ""
        },
        {
          title: "Neurology",
          content: "We utilize the latest advances in diagnostics and treatment to ensure the best outcomes.",
          image: {
            src: "https://source.unsplash.com/random/400x400?Neurology",
            altText: "",
          },
          url: ""
        },
        {
          title: "Urology",
          content: "We have expertise in sexual medicine, male and female urinary incontinence, erectile dysfunction.",
          image: {
            src: "https://source.unsplash.com/random/400x400?urinary",
            altText: "",
          },
          url: ""
        },
        {
          title: "Cardiology",
          content: "Your heart is in the best hands at our state-of-the-art cardiovascular institute.",
          image: {
            src: "https://source.unsplash.com/random/400x400?Cardiology",
            altText: "",
          },
          url: ""
        },
        {
          title: "Dental Care",
          content: "Medilife offers great dental care including cosmetic dental implants and emergency care.",
          image: {
            src: "https://source.unsplash.com/random/400x400?Dentalt-Care",
            altText: "",
          },
          url: ""
        },
        {
          title: "Pulmonary",
          content: "Our endoscopic procedures include bronchoscopy, thoracentesis, and chest tube insertion.",
          image: {
            src: "https://source.unsplash.com/random/400x400?Pulmonary",
            altText: "",
          },
          url: ""
        },
      ]
    },
    doctorsSection: {
      label: "Our Doctors",
      title: "We have the best specialists of the country",
      subtitle: "",
      sections: [
        {
          title: "Mike Rolson",
          content: "Pediatrician",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
        {
          title: "Mariah Yohanson",
          content: "Surgeon",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
        {
          title: "Thomas Karnegi",
          content: "Traumatologist",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
        {
          title: "Emilia Holand",
          content: "Cardiologist",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
        {
          title: "Daniel Henderson",
          content: "Dentist",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
        {
          title: "Matt Edinson",
          content: "Gastroenterologist",
          image: {
            src: "https://source.unsplash.com/random/400x400?Doctor%20Portrait",
            altText: "",
          },
          url: ""
        },
      ]
    },
    testimonialsSection: {
      title: "Don’t take our word for it, check what our patients say",
      subtitle: "",
      sections: [
        {
          title: "",
          content: "I wanted to thank everyone at this facility for the quality of care and compassion they showed during my stay. I went into the emergency room . The staff in every part of the hospital was friendly, they made me laugh which kept my spirits up.",
          source: "Antonio Valencia, Patient"
        },
        {
          title: "",
          content: "Today is my last day of infusion. But I know I will be back …not as a patient but a visitor. I have only positive things to say about the nurses at Medilife here in infusion and also on the 4th Floor. They all called me by my name when I walked in the door.",
          source: "Matheo Darmian, Patient",
        },
      ]
    },
    contactSection: {
      label: "Contact us",
      title: "Make an appointment and visit the polyclinic",
      subtitle: "",
      sections: [
        {
          title: "Los Angeles",
          content: "2566 Jim Rosa Lane, Suite 139 Los Angeles 94108 \n Email: info@mediclinic.com",
        },
        {
          title: "California",
          content: "2566 Jim Rosa Lane, Suite 139 California 94108",
        },
        {
          title: "New York",
          content: "2566 Jim Rosa Lane, Suite 139 New York 94108",
        },
        {
          title: "Washington",
          content: "2566 Jim Rosa Lane, Suite 139 Washington 94108",
        },
      ]
    }
  }
}

export default function Home() {
  const { heroSection, featuresSection, departmentsSection, doctorsSection, testimonialsSection, contactSection } = dummyData.sections
  return (
    <main className="flex flex-col min-h-screen gap-20 pb-24">
      <ImageHero data={heroSection} textAlignment="left" textDarkBackground />
      
      <Section
        title={featuresSection.title}
        subtitle={featuresSection.subtitle}
        className="xl:-mt-32"
      >
        <GridBox gap={9} columns={3} >
          {featuresSection.sections.map(section => (
            <Card key={section.title} data={section} border />
          ))}
        </GridBox>
      </Section>

      <Section
        label={departmentsSection.label}
        title={departmentsSection.title}
        subtitle={departmentsSection.subtitle}
        framed={false}
        className="bg-blue-50 pt-16 pb-24"
      >
        <GridBox gap={9} columns={2} >
          {departmentsSection.sections.map(section => (
            <Card key={section.title} data={section} aspectRatio="video" imagePosition="top" />
          ))}
        </GridBox>
      </Section>

      <Section
        label={doctorsSection.label}
        title={doctorsSection.title}
        subtitle={doctorsSection.subtitle}
        framed={false}
      >
        <FlexBox className="px-4 lg:px-32 py-4" gap={9} horizontalScrollable>
          {doctorsSection.sections.map(section => (
            <Card key={section.title} data={section} size="medium" aspectRatio="3/4" imagePosition="top" />
          ))}
        </FlexBox>

      </Section>

      <Section framed={false}>
        <Testimonials data={testimonialsSection} />
      </Section>

      <Section
        label={contactSection.label}
        title={contactSection.title}
        subtitle={contactSection.subtitle}
      >
        <FlexBox className="" gap={9}>
          <GridBox columns={2} gap={9}>
            {contactSection.sections.map(section => (
              <Card key={section.title} data={section} size="medium" />
            ))}
          </GridBox>
          <div>
            Form
          </div>
        </FlexBox>
      </Section>
    </main>
  )
}
