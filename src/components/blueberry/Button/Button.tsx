import React from "react"
import classNames from "classnames"
import  * as CoreBtn from "@/components/elements/Button/Button"

export type ButtonVariant = "standard" | "outline" | "outline-black" | "outline-white"
export interface ButtonProps extends CoreBtn.ButtonProps {
  variant: ButtonVariant
  size?: "sm" | "base" | "lg"
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size = "base", variant = "primary" } = props
  const classes = classNames(
    "cursor-pointer rounded-3xl inline-block transition-all duration-500",
    {"border-3 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white" : variant === "outline"},
    {"border-3 border-black text-black hover:bg-black hover:text-white" : variant === "outline-black"},
    {"border-3 border-white text-white hover:bg-indigo-500" : variant === "outline-white"},
    {"bg-indigo-500 hover:bg-indigo-600 text-white" : variant === "standard"},
    {"px-6 py-2": size === "base"},
    {"px-10 py-3 text-lg": size === "lg"},
  )

  return <CoreBtn.Button className={classes} {...props} />
}

export default Button