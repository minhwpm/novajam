import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { ButtonType } from "@/helpers/types";
// import { GoArrowRight } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";

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
          { 
            "w-5 h-5 mr-2": size === "sm" || size === "base",
            "w-7 h-7 mr-2.5": size === "lg",
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
        <IoIosArrowRoundForward
          className={classNames(
            "inline-block ml-4 relative left-1 group-hover:left-2 transition-all duration-300 ease",
            {
              "text-primary-600 group-hover:text-slate-100":
                buttonVariant === "outline",
            },
            {
              "text-inherit group-hover:text-slate-100":
                buttonVariant === "outline-black",
            },
            {
              "text-slate-100 group-hover:text-inherit":
                buttonVariant === "outline-white",
            }
          )}
          size={classNames(
            { 20: size === "sm" || size === "base" },
            { 30: size === "lg" }
          )}
        />
      )}
    </>
  );
  const ghostVariantClasses = classNames(
    "w-full relative left-0 inline-block font-medium hover:left-1 transition-all duration-500 ease dark:text-slate-100",
    { "px-2 text-sm": size === "sm" },
    { "px-3 text-base": size === "base" },
    { "px-4 xl:text-lg": size === "lg" },
    { "opacity-20 pointer-events-none cursor-not-allowed": disabled },
    className
  )
  const otherVariantClasses = classNames(
    "w-full relative border inline-flex justify-center items-center text-center rounded-theme-button transition-all duration-500 ease",
    {
      "border-primary-600 bg-primary-600 hover:brightness-110 text-slate-100":
        buttonVariant === "primary",
      "border-secondary-600 bg-secondary-600 hover:brightness-110 text-slate-100":
        buttonVariant === "secondary",
      "border-slate-950 bg-slate-950 text-slate-100 hover:bg-slate-900 hover:border-slate-900 dark:border-slate-700":
        buttonVariant === "black",
      "border-slate-50 bg-slate-50 hover:bg-white hover:border-white text-inherit":
        buttonVariant === "white",
      "border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-slate-100":
        buttonVariant === "outline",
      "border-slate-900 text-inherit hover:bg-slate-950 hover:text-slate-100 dark:border-slate-100":
        buttonVariant === "outline-black",
      "border-white text-slate-100 hover:bg-white hover:text-inherit drop-shadow-lg":
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