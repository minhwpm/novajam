import React from "react"
import Link from "next/link"
import classNames from "classnames"

export type ButtonVariant = "standard" | "alternate" | "outline" | "outline-black" | "outline-white"
export interface ButtonProps {
  children: React.ReactNode
  url?: string
  clickHandler?: () => void
  variant: ButtonVariant
  size?: "base" | "lg"
  borderRadius?: "base" | "full"
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size = "base", variant = "standard", borderRadius, url, children, clickHandler } = props
  const classes = classNames(
    "cursor-pointer inline-block hover:animate-poop transition-all duration-500",
    {"bg-primary-500 hover:bg-primary-600 text-white" : variant === "standard"},
    {"bg-secondary-500 hover:bg-secondary-600 text-white" : variant === "alternate"},
    {"border-3 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white" : variant === "outline"},
    {"border-3 border-black text-black hover:bg-black hover:text-white" : variant === "outline-black"},
    {"border-3 border-white text-white hover:bg-primary-500" : variant === "outline-white"},
    {"px-6 py-2": size === "base"},
    {"px-10 py-3 text-lg font-semibold": size === "lg"},
    {"rounded": borderRadius === "base"},
    {"rounded-full": borderRadius === "full"},
  )

  if (url) {
    return (
      <Link className={classes} href={url}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} onClick={clickHandler}>
      {children}
    </button>
  )
}

export default Button