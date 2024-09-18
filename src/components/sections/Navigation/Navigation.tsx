"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import useStickyHeaderOnScrollUp from "@/helpers/hooks/useStickyHeaderOnScrollUp";
import NavMenu from "@/components/elements/NavMenu/NavMenu";
import NavMenuMobile from "@/components/elements/NavMenuMobile/NavMenuMobile";
import NavMenuMinimal from "@/components/elements/NavMenuMinimal/NavMenuMinimal";
import { Button } from "@/components/elements/Button/Button";
import { MediaType, NavigationType } from "@/helpers/types";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import DarkModeToggle from "@/components/elements/DarkModeToggle/DarkModeToggle";

const Logo: React.FC<{ redirectUrl?: string; logo: MediaType }> = ({
  redirectUrl,
  logo,
}) => (
  <Link href={redirectUrl ?? "/"}>
    <Image
      className="h-14 max-w-[12rem] object-contain object-left dark:invert dark:filter dark:brightness-0"
      src={logo.url}
      width={logo.width}
      height={logo.height}
      alt={logo.title ?? ""}
      priority
    />
  </Link>
);

const Header: React.FC<{ data: NavigationType }> = ({ data }) => {
  const { logo, logoRedirect, menu, buttons, layout, darkMode } = data;
  const sticky = useStickyHeaderOnScrollUp();

  if (layout === "minimal") {
    return (
      <header className={classNames("relative z-[99999] tracking-wider")}>
        <div
          className={classNames(
            "absolute w-screen flex justify-center dark:text-slate-100"
          )}
        >
          <div className="px-4 pt-6 container flex items-center justify-between flex-1">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
            </div>
            <div className="flex gap-5 items-center">
              {buttons && buttons.length > 0 && (
                <div className="hidden md:block">
                  <ButtonGroup data={buttons} />
                </div>
              )}
              <DarkModeToggle />
              <NavMenuMinimal data={data} />
            </div>
          </div>
        </div>
      </header>
    );
  }
  if (layout === "overlay") {
    return (
      <header
        className={classNames("relative z-[99999] w-screen tracking-wider", {
          "sticky w-full z-50 top-0 animate-headerSlideIn": sticky,
          dark: darkMode,
        })}
      >
        <div
          className={classNames(
            "absolute top-0 left-0 right-0 flex justify-center dark:text-slate-100 transition-all duration-500",
            {"bg-white dark:bg-slate-900/60 dark:backdrop-blur-2xl shadow": sticky}
          )}
        >
          <div className="container px-4 flex items-center gap-x-4">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
            </div>
            <div className="flex-1 lg:text-lg">
              {menu && (
                <NavMenu menu={menu} layout={layout} />
              )}
            </div>
            {buttons && buttons.length > 0 && (
              <div className="shrink-0 hidden lg:block">
                <ButtonGroup data={buttons} size="sm" />
              </div>
            )}
            <DarkModeToggle />
            {menu && <NavMenuMobile menu={menu} buttons={buttons ?? []} />}
          </div>
        </div>
      </header>
    );
  }
  return (
    // Default style - standard
    <header
      className={classNames("relative z-[99999] tracking-wider", {
        "sticky w-full z-50 top-0 animate-headerSlideIn shadow": sticky,
        dark: darkMode,
      })}
    >
      <div
        className={classNames(
          "bg-white dark:text-slate-100 dark:bg-slate-900 transition-all duration-500",
          { "dark:bg-slate-900/60 dark:backdrop-blur-2xl": sticky }
        )}
      >
        <div
          className={classNames(
            "container px-4 mx-auto flex items-center gap-x-4"
          )}
        >
          <div className="shrink-0">
            <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
          </div>
          <div className="flex-1">
            {menu && (
              <NavMenu menu={menu} layout={layout} />
            )}
          </div>
          {buttons && buttons.length > 0 && (
            <div className="shrink-0 hidden lg:block">
              <ButtonGroup data={buttons} size="sm" />
            </div>
          )}
          <DarkModeToggle />
          {menu && <NavMenuMobile menu={menu} buttons={buttons ?? []} />}
        </div>
      </div>
    </header>
  );
};

export const Navigation: React.FC<{ data: NavigationType }> = ({ data }) => {
  return (
    <>
      <Header data={data} />
      {data.hotButtons && data.hotButtons.length > 0 && (
        <div
          className={classNames(
            "fixed z-[999999]",
            "w-full bottom-0 rounded-t-theme", //sm devices
            "lg:rotate-90 lg:translate-y-1/2 lg:translate-x-1/2 lg:rounded-t-none lg:rounded-b-theme lg:w-auto lg:bottom-1/2 lg:right-0" //big devices
          )}
        >
          <div className="relative flex justify-center py-2 bg-white bg-opacity-80 shadow-radiant lg:py-0 lg:bg-transparent">
            {data.hotButtons.map((button) => (
              <div key={button.id} className="flex-1 flex justify-center">
                <Button
                  data={button}
                  className="grow absolute lg:top-1/2 mx-1 lg:my-1"
                  size="base"
                >
                  {button.text}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
