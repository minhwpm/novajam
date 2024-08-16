import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { ButtonType } from "@/lib/types";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";

export const Button: React.FC<{
  data: ButtonType;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "base" | "lg";
  type?: "submit" | "button" | "reset" | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
}> = ({
  size = "lg",
  type,
  data,
  onClick,
  children,
  className,
  disabled,
  fullWidth,
}) => {
  const {
    text,
    url,
    buttonVariant = "primary",
    withArrow = false,
    openNewTab = false,
    icon,
  } = data;

  const renderIcon = () =>
    icon && (
      <Image
        className={classNames(
          "object-contain",
          { "w-4 h-4 mr-2": size === "sm" || size === "base" },
          { "w-5 h-5 mr-2.5": size === "lg" },
          {
            "group-hover:brightness-100 group-hover:invert transition-all duration-500 ease":
              buttonVariant === "outline-white",
          }
        )}
        src={icon.url}
        alt={icon.title}
        width={icon.width}
        height={icon.height}
      />
    );

  const renderButtonContent = () => (
    <>
      {renderIcon()}
      {children ? children : text}
      {withArrow && (
        <GoArrowRight
          className={classNames(
            "inline-block relative bottom-0.5 left-2 group-hover:left-4 transition-all duration-300 ease",
            { "text-primary-600": buttonVariant === "ghost" },
            {
              "text-primary-600 group-hover:text-white":
                buttonVariant === "outline",
            },
            {
              "text-neutral-800 group-hover:text-white":
                buttonVariant === "outline-black",
            },
            {
              "text-white group-hover:text-neutral-800":
                buttonVariant === "outline-white",
            }
          )}
          size={20}
        />
      )}
    </>
  );
  const ghostVariantClasses = classNames(
    "w-full relative left-0 inline-block font-medium hover:left-1 transition-all duration-500 ease",
    { "px-2 py-2 text-sm": size === "sm" },
    { "px-3 py-3 text-base": size === "base" },
    { "px-4 py-4 xl:text-lg": size === "lg" },
    { "opacity-20 pointer-events-none cursor-not-allowed": disabled },
    className
  )
  const otherVariantClasses = classNames(
    "w-full relative border inline-flex justify-center items-center text-center rounded-theme-button bottom-0 hover:bottom-1 transition-all duration-500 ease",
    {
      "border-primary-600 bg-primary-600 hover:bg-primary-700 hover:border-primary-700 text-white":
        buttonVariant === "primary",
      "border-secondary-400 bg-secondary-400 hover:bg-secondary-300 hover:border-secondary-300 text-neutral-800":
        buttonVariant === "secondary",
      "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-950 hover:border-neutral-950":
        buttonVariant === "black",
      "border-neutral-50 bg-neutral-50 hover:bg-white hover:border-white text-neutral-800":
        buttonVariant === "white",
      "border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white":
        buttonVariant === "outline",
      "border-neutral-900 text-neutral-800 hover:bg-neutral-950 hover:text-white":
        buttonVariant === "outline-black",
      "border-white text-white hover:bg-white hover:text-neutral-800 drop-shadow-lg":
        buttonVariant === "outline-white",
      "px-4 py-2 min-w-[100px] lg:min-w-[120px] text-sm font-medium":
        size === "sm",
      "px-6 py-3 min-w-[100px] lg:min-w-[120px] text-base font-medium":
        size === "base",
      "px-8 py-4 min-w-[130px] lg:min-w-[160px] xl:text-lg font-medium":
        size === "lg",
      "opacity-20 pointer-events-none cursor-not-allowed": disabled
    },
    className,
  );

  const renderButton = () => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={text}
      className={classNames({ "w-full": fullWidth })}
    >
      {url ? (
        <Link
          className={classNames("group", [
            buttonVariant === "ghost"
              ? ghostVariantClasses
              : otherVariantClasses,
          ])}
          href={url}
          target={openNewTab ? "_blank" : "_self"}
        >
          {renderButtonContent()}
        </Link>
      ) : (
        <span
          className={classNames("group", [
            buttonVariant === "ghost"
              ? ghostVariantClasses
              : otherVariantClasses,
          ])}
        >
          {renderButtonContent()}
        </span>
      )}
    </button>
  );

  return renderButton();
};