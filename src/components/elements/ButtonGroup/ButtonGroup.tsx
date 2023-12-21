import { AlignmentType, ButtonType } from "@/helpers/types"
import classNames from "classnames"
import Button from "../Button/Button"

export const ButtonGroup: React.FC<{data: Array<ButtonType>, alignment?: AlignmentType}> = ({ data, alignment }) => {
  return (
    <div
      className={classNames("md:mt-2 lg:mt-5", {
        "flex justify-center": alignment === "center",
      })}
    >
      {data.map(button => (
        <Button
          key={button.id}
          url={button.url}
          variant={button.buttonVariant}
          openNewTab={button.openNewTab}
        >
          {button.text}
        </Button>
      ))}
    </div>
  )
}