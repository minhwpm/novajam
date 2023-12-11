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

const Button: React.FC<ButtonProps> = (props) => {
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
            "relative left-0 group inline-block text-blue-500 text-lg hover:text-blue-700 hover:left-1 transition-all duration-500",
            { "py-2": size === "base" },
            { "py-3 text-lg": size === "lg" },
            { "opacity-30 pointer-events-none cursor-not-allowed": disabled },
            className
          )}
          href={url ?? "#"}
          onClick={onClick}
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
    "relative inline-flex justify-center items-center text-center rounded-assets bottom-0 hover:bottom-1 transition-all duration-500 ease",
    {
      "bg-primary-500 hover:bg-primary-600 text-white": variant === "standard",
    },
    {
      "bg-secondary-500 hover:bg-secondary-600 text-white":
        variant === "alternate",
    },
    { "bg-neutral-900 text-white hover:bg-neutral-800": variant === "black" },
    {
      "!border-2 border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-white":
        variant === "outline",
    },
    {
      "!border-2 border-black text-black hover:bg-black hover:text-white":
        variant === "outline-black",
    },
    {
      "!border-2 border-white text-white hover:bg-white hover:text-neutral-800 drop-shadow-lg":
        variant === "outline-white",
    },
    { "px-6 py-2.5 min-w-[130px] font-semibold": size === "base" },
    { "px-8 py-3.5 min-w-[200px] text-lg font-semibold": size === "lg" },
    { "opacity-30 pointer-events-none cursor-not-allowed": disabled }
  );

  return (
    <button
      type={type}
      className={classNames(classes, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {url ? (
        <Link
          href={url}
          target={openNewTab ? "_blank" : "_self"}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
