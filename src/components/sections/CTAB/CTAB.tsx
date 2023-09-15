'use client'
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import Button from "@/components/elements/Button/Button"
import Section from "@/components/elements/Section/Section";
import { ButtonVariant } from "@/utils/types";

interface CTAProps {
  data: {
    title: string
    content?: string
    buttons?: Array<{
      text: string
      url?: string
      type: ButtonVariant
    }>
  }
}

const CTAB: React.FC<CTAProps> = ({ data }) => {
  const { title, content, buttons } = data;
  // @TODO expanding width on scrolling
  // const [w, setW] = useState(70)

  const [ref, isVisible] = useInView({
    threshold: 0.5,
    onEnter: (entry, observer) => {
      console.log(entry, observer);
    },
    // onLeave: () => setStart(false),
  });
  // console.log("isVisible", isVisible)
  return (
    <Section>
      <div ref={ref} className={classNames(
          "bg-primary-950 mx-auto px-5 py-16 lg:py-20 xl:py-32 lg:w-[70%] lg:will-change-[width]",
          {"lg:animate-expandingWidth": isVisible},
          {"lg:animate-shrinkingWidth": !isVisible},
        )}
      >
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <h3 className="text-4xl lg:text-5xl leading-snug lg:leading-snug text-center text-gray-300">
            {title}
          </h3>
          {content && (
            <p className="text-xl text-primary-200 text-center mt-8">
              {content}
            </p>
          )}
          <div className="mt-12">
            {buttons?.map(button => (
              <Button key={button.text} variant={button.type ?? "alternate"} size="lg" url={button.url}>
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default CTAB