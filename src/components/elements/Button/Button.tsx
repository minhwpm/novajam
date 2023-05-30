import React from "react"
import classNames from "classnames"
import Link from "next/link"

interface ButtonProps {
  children: React.ReactNode
  variant: "primary" | "secondary" | "border"
  url?: string
  size?: "sm" | "base" | "lg"
  clickHandler?: () => void
}

const Button = ({children, variant, url, size = "base", clickHandler}: ButtonProps) => {
  const classes = classNames(
    "rounded hover:animate-poop transition-all duration-500",
    {"border-2 border-black hover:bg-black hover:text-white" : variant === "border"},
    {"bg-blue-600 hover:bg-blue-700 text-white" : variant === "primary"},
    {"bg-orange-300 hover:bg-orange-400 hover:text-white" : variant === "secondary"},
    {"px-6 py-3": size === "base"},
    {"px-10 py-3 text-lg": size === "lg"},
  )
  if (url) {
    return (
      <Link href={url} className={classes}>
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