import { TextAlignmentType, ButtonType } from "@/helpers/types"
import classNames from "classnames"
import { Button } from "../Button/Button"

export const ButtonGroup: React.FC<{data: Array<ButtonType>, alignment?: TextAlignmentType, size?: "base" | "lg"}> = ({ data, alignment, size }) => {
  return (
    <div
      className={classNames("flex flex-row flex-wrap gap-4",
        { "justify-center": alignment === "center" },
        { "justify-end": alignment === "end" }
      )}
    >
      {data.map(button => (
        <Button
          key={button.id}
          url={button.url}
          withArrow={button.withArrow}
          variant={button.buttonVariant}
          size={size ?? "base"}
          openNewTab={button.openNewTab}
        >
          {button.text}
        </Button>
      ))}
    </div>
  )
}