import { TextAlignmentType, ButtonType } from "@/lib/types"
import classNames from "classnames"
import { Button } from "../Button/Button"

export const ButtonGroup: React.FC<{data: Array<ButtonType>, alignment?: TextAlignmentType, size?: "sm" | "base" | "lg"}> = ({ data, alignment, size }) => {
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
          data={button}
          size={size ?? "base"}
        >
          {button.text}
        </Button>
      ))}
    </div>
  )
}