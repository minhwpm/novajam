import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { ButtonVariant } from "@/helpers/types";
import { GoArrowRight } from "react-icons/go";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  url?: string;
  withArrow?: boolean;
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
    variant = "primary",
    url,
    withArrow = false,
    children,
    onClick,
    type = "button",
    disabled = false,
    openNewTab = false,
    className,
  } = props;
  if (variant === "ghost") {
    return (
      <button type={type} onClick={onClick} disabled={disabled}>
        {url ? (
          <Link
            className={classNames(
              "relative left-0 group inline-block text-primary-600 hover:left-1 transition-all duration-500",
              { "px-2": size === "base" },
              { "px-4 font-medium lg:text-lg": size === "lg" },
              { "opacity-30 pointer-events-none cursor-not-allowed": disabled },
              className
            )}
            href={url}
          >
            {children}
            {withArrow && (
              <GoArrowRight
                className="inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-500 ease"
                size={20}
              />
            )}
          </Link>
        ) : (
          <span
            className={classNames(
              "relative left-0 group inline-block text-primary-600 hover:left-1 transition-all duration-500",
              { "px-2": size === "base" },
              { "px-4 font-medium lg:text-lg": size === "lg" },
              { "opacity-30 pointer-events-none cursor-not-allowed": disabled },
              className
            )}
          >
            {children}
            {withArrow && (
              <GoArrowRight
                className="inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-200 ease"
                size={20}
              />
            )}
          </span>
        )}
      </button>
    );
  }
  const classes = classNames(
    "!border relative inline-flex justify-center items-center text-center rounded-assets bottom-0 hover:bottom-1 transition-all duration-500 ease",
    {
      "border-primary-600 bg-primary-600 hover:bg-primary-500 hover:border-primary-500 text-white":
        variant === "primary",
    },
    {
      "border-secondary-400 bg-secondary-400 hover:bg-secondary-300 hover:border-secondary-300 text-neutral-800":
        variant === "secondary",
    },
    { "border-neutral-800 bg-neutral-800 text-white hover:bg-neutral-900 hover:border-neutral-900": variant === "black" },
    {
      "border-neutral-50 bg-neutral-50 hover:bg-white hover:border-white":
        variant === "white",
    },
    {
      "border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white":
        variant === "outline",
    },
    {
      "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white":
        variant === "outline-black",
    },
    {
      "border-white text-white hover:bg-white hover:text-neutral-800 drop-shadow-lg":
        variant === "outline-white",
    },
    {
      "px-5 py-2 min-w-[100px] lg:min-w-[120px] text-smd 2xl:text-base font-medium":
        size === "base",
    },
    {
      "px-6 py-2.5 min-w-[130px] lg:min-w-[160px] font-medium xl:text-lg":
        size === "lg",
    },
    { "opacity-30 pointer-events-none cursor-not-allowed": disabled }
  );

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {url ? (
        <Link
          className={classNames("group", classes, className)}
          href={url}
          target={openNewTab ? "_blank" : "_self"}
        >
          {children}
          {withArrow && (
            <GoArrowRight
              className={classNames(
                "inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-300 ease",
                {
                  "text-primary-600 group-hover:text-white": variant === "outline",
                },
                {
                  "text-neutral-800 group-hover:text-white": variant === "outline-black",
                },
                {
                  "text-white group-hover:text-neutral-800": variant === "outline-white",
                }
              )}
              size={20}
            />
          )}
        </Link>
      ) : (
        <span className={classNames(classes, className)}>
          {children}
          {withArrow && (
            <GoArrowRight
              className="inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-300 ease"
              size={20}
            />
          )}
        </span>
      )}
    </button>
  );
};
