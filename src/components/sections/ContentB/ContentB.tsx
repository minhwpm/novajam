import Section from "@/components/elements/Section/Section"
import Card from "@/components/elements/Card/Card"
import GridBox from "@/components/elements/GridBox/GridBox"

interface SectionProps {
  title: string
  label?: string
  content: string
  media?: {
    type: string
    src: string
  }
}

interface ContentProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    sections: Array<SectionProps>
  }
}

const ContentB: React.FC<ContentProps> = ({ data }) => {
  const { title, label, subtitle, sections } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <GridBox columns={3}>
        {sections.map((section) => (
          <Card key={section.title} data={section} textAlign="center"/>
        ))}
      </GridBox>
    </Section>
  )
}

export default ContentB