import React from "react"
import Link from "next/link"

export interface ButtonProps {
  children: React.ReactNode
  url?: string
  clickHandler?: () => void
  className?: string
}

export const Button: React.FC<ButtonProps> = ({children, url, clickHandler, className}) => {
  if (url) {
    return (
      <Link className={className} href={url}>
        {children}
      </Link>
    )
  }
  return (
    <button className={className} onClick={clickHandler}>
      {children}
    </button>
  )
}
