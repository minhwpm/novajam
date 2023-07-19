import Section from "@/components/elements/Section/Section"
import ContentPreview from "@/components/elements/ContentPreview/ContentPreview"
import GridBox from "@/components/elements/GridBox/GridBox"
import classNames from "classnames"

interface SectionProps {
  title: string
  label?: string
  content?: string
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
  variant?: "standard" | "alternate"
}

const ContentB: React.FC<ContentProps> = ({ data, variant = "standard" }) => {
  const { title, label, subtitle, sections } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
      className={classNames({"bg-secondary-50": variant === "alternate"})}
    >
      <div className="grid md:grid-cols-3 gap-9">
        {sections.map((section) => (
          <ContentPreview key={section.title} data={section} textAlign="left" />
        ))}
      </div>
    </Section>
  )
}

export default ContentB