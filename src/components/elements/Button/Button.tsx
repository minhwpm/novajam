import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { ButtonVariant } from "@/helpers/types";
import { BsArrowRight } from "react-icons/bs";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  url?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "base" | "lg";
  type?: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
  openNewTab?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = "base",
    variant = "standard",
    url,
    children,
    onClick,
    type = "button",
    disabled = false,
    openNewTab = false,
    className,
  } = props;
  if (variant === "link") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <Link
          className={classNames(
            "relative left-0 group inline-block text-primary-500 text-lg hover:text-primary-600 hover:left-1 transition-all duration-500",
            { "py-2": size === "base" },
            { "py-3 text-lg": size === "lg" },
            { "opacity-30 pointer-events-none cursor-not-allowed": disabled },
            className
          )}
          href={url ?? "#"}
        >
          {children}
          <BsArrowRight
            className="inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-500 ease"
            size={20}
          />
        </Link>
      </button>
    );
  }
  const classes = classNames(
    "!border-2 relative inline-flex justify-center items-center text-center rounded-assets bottom-0 hover:bottom-1 transition-all duration-500 ease",
    {
      "border-primary-500 bg-primary-500 hover:bg-primary-400 hover:border-primary-400 text-white": variant === "standard",
    },
    {
      "border-secondary-500 bg-secondary-500 hover:bg-secondary-400 hover:border-secondary-400 text-white":
        variant === "alternate",
    },
    { "border-neutral-900 bg-neutral-900 text-white hover:bg-primary-500 hover:border-primary-500": variant === "black" },
    {
      "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white":
        variant === "outline",
    },
    {
      "border-black text-black hover:bg-black hover:text-white":
        variant === "outline-black",
    },
    {
      "border-white text-white hover:bg-white hover:text-neutral-800 drop-shadow-lg":
        variant === "outline-white",
    },
    { "px-4 py-1.5 min-w-[120px] text-base lg:px-6 lg:py-2.5 lg:min-w-[130px] lg:text-lg font-semibold": size === "base" },
    { "px-6 py-2.5 min-w-[160px] lg:px-8 lg:py-3.5 lg:min-w-[200px] lg:text-lg font-semibold": size === "lg" },
    { "opacity-30 pointer-events-none cursor-not-allowed": disabled }
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <Link
        className={classNames(classes, className)}
        href={url ?? "#"}
        target={openNewTab ? "_blank" : "_self"}
      >
        {children}
      </Link>
    </button>
  )
}