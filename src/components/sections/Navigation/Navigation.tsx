"use client";
import Image from "next/image";
import { Button } from "@/components/elements/Button/Button";
import Link from "next/link";
import useStickyHeaderOnScrollUp from "@/helpers/hooks/useStickyHeaderOnScrollUp";
import classNames from "classnames";
import NavMenu from "@/components/elements/NavMenu/NavMenu";
import NavMenuMobile from "@/components/elements/NavMenuMobile/NavMenuMobile";
import NavMenuMinimal from "@/components/elements/NavMenuMinimal/NavMenuMinimal";
import { MediaType, NavigationType } from "@/helpers/types";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";

// @TODO implement darkMode for Navigation
const Logo: React.FC<{ redirectUrl?: string; logo: MediaType }> = ({
  redirectUrl,
  logo,
}) => (
  <Link href={redirectUrl ?? "/"}>
    <Image
      className="h-14 max-w-[12rem] object-contain object-left"
      src={logo.url}
      width={logo.width}
      height={logo.height}
      alt={logo.title ?? ""}
      priority
    />
  </Link>
);

const Header: React.FC<{data: NavigationType}> = ({ data }) => {
  const { logo, logoRedirect, menu, buttons, style } = data;
  const sticky = useStickyHeaderOnScrollUp();

  if (style === "minimal") {
    return (
      <header className={classNames("relative z-[99999] tracking-wider")}>
        <div className={classNames("absolute w-screen flex justify-center")}>
          <div className="px-4 pt-10 container flex items-center justify-between">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect} logo={logo} />
            </div>
            <div className="flex gap-5 items-center">
              {buttons && buttons.length > 0 && (
                <div className="hidden md:block">
                  <ButtonGroup data={buttons} />
                </div>
              )}
              <NavMenuMinimal data={data} />
            </div>
          </div>
        </div>
      </header>
    );
  }
  if (style === "overlay") {
    return (
      <header className={classNames("relative z-[99999] w-screen tracking-wider")}>
        <div
          className={classNames(
            "absolute top-0 left-0 right-0 pt-4 flex justify-center bg-gradient-to-b from-neutral-800/60 to-neutral-10/80 text-white"
          )}
        >
          <div className="container p-4 lg:py-0 flex items-center">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect} logo={logo} />
            </div>
            <div className="flex-1 pt-6 drop-shadow-lg lg:text-lg">
              <NavMenu menu={menu} style={style} />
            </div>
            {buttons && buttons.length > 0 && (
              <div className="ml-8 shrink-0 hidden lg:block">
                <ButtonGroup data={buttons} />
              </div>
            )}
            <NavMenuMobile menu={menu} buttons={buttons} />
          </div>
        </div>
      </header>
    );
  }

  // Default style - standard
  return (
    <header
      className={classNames(
        "relative bg-white z-[99999] tracking-wider",
        { "sticky w-full z-50 top-0 border-b animate-headerSlideIn": sticky }
      )}
    >
      <div className="container p-4 lg:py-0 mx-auto flex items-center">
        <div className="shrink-0">
          <Logo redirectUrl={logoRedirect} logo={logo} />
        </div>
        <div className="flex-1 pt-6">
          <NavMenu menu={menu} style={style} />
        </div>
        {buttons && buttons.length > 0 && (
          <div className="ml-8 shrink-0 hidden lg:block">
            <ButtonGroup data={buttons} />
          </div>
        )}
        <NavMenuMobile menu={menu} buttons={buttons} />
      </div>
    </header>
  );
};

export const Navigation: React.FC<{data: NavigationType}> = ({ data }) => {
  return(
    <>
      <Header data={data} />
      {data.hotButtons.length > 0 && (
        <div className={classNames(
          "fixed z-[999999]",
          "w-full bottom-0 rounded-t-assets", //sm devices
          "lg:rotate-90 lg:translate-y-1/2 lg:translate-x-1/2 lg:rounded-t-none lg:rounded-b-assets lg:w-auto lg:bottom-1/2 lg:right-0" //big devices
        )}>
          <div className="relative flex justify-center py-2 bg-white bg-opacity-80 shadow-radiant lg:py-0 lg:bg-transparent">
            {data.hotButtons.map((button) => (
              <div key={button.id} className="flex-1 flex justify-center">
                <Button
                  url={button.url}
                  variant={button.buttonVariant ?? "outline-white"}
                  openNewTab={button.openNewTab}
                  className="grow absolute lg:top-1/2 mx-1 lg:my-1"
                  size="lg"
                >
                  {button.text}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}