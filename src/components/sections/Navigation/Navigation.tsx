//@TODO 
/* eslint-disable complexity */ 
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useStickyHeaderOnScrollUp from "@/lib/hooks/useStickyHeaderOnScrollUp";
import classNames from "classnames";
import NavMenu from "@/components/elements/NavMenu/NavMenu";
import NavMenuMobile from "@/components/elements/NavMenuMobile/NavMenuMobile";
import NavMenuMinimal from "@/components/elements/NavMenuMinimal/NavMenuMinimal";
import { Button } from "@/components/elements/Button/Button";
import { MediaType, NavigationType } from "@/lib/types";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { IoSearchOutline } from "react-icons/io5";
import { createPortal } from "react-dom";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import searchClient from '@/lib/algoliaClient';

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

const Hit = ({ hit }) => (
  <div>
    <h2>{hit.title}</h2>
    <p>{hit.description}</p>
  </div>
);

const SearchModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
  return (
    <div
      className={classNames(
        "fixed right-0 left-0 top-0 bottom-0 z-[999999] bg-neutral-800/50"
      )}
    >
      <div className="px-6 py-6 max-w-3xl max-h-[700px] min-h-[250px] mx-auto mt-20 bg-neutral-50 rounded-theme">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <InstantSearch
              searchClient={searchClient}
              indexName="your_index_name"
            >
              <SearchBox
                classNames={{
                  input: "w-full px-4 py-2.5 rounded-theme border border-primary-500",
                }}
              />
              <Hits hitComponent={Hit} />
            </InstantSearch>
          </div>
          <button className="pl-2 py-2.5" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div className="overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-4 mt-10">
            <div className="text-neutral-500">No results</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchButton = () => {
  const [display, setDisplay] = React.useState(false)
  return (
    <button className="p-4" onClick={() => setDisplay(true)}>
      <IoSearchOutline size={20} className="cursor-pointer" />
      {display ?
        createPortal(
          <SearchModal onClose={() => setDisplay(false)} />,
          document.querySelector(".main")
        ): <></>}
    </button>
  );
}

const Header: React.FC<{ data: NavigationType }> = ({ data }) => {
  const { logo, logoRedirect, menu, showSearch, buttons, appearanceVariant, darkMode } = data;
  const sticky = useStickyHeaderOnScrollUp();

  if (appearanceVariant === "minimal") {
    return (
      <header className={classNames("relative z-[99999] tracking-wider")}>
        <div
          className={classNames("absolute w-screen flex justify-center", {
            "text-neutral-50": darkMode,
          })}
        >
          <div className="px-4 pt-6 lg:pt-10 container flex items-center justify-between">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
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
  if (appearanceVariant === "overlay") {
    return (
      <header
        className={classNames("relative z-[99999] w-screen tracking-wider")}
      >
        <div
          className={classNames(
            "absolute top-0 left-0 right-0 flex justify-center",
            { "text-neutral-50": darkMode }
          )}
        >
          <div className="container px-4 flex items-center">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
            </div>
            <div className="flex-1 drop-shadow-lg lg:text-lg">
              {menu && <NavMenu menu={menu} appearanceVariant={appearanceVariant} />}
            </div>
            { showSearch && <SearchButton /> }
            {buttons && buttons.length > 0 && (
              <div className="ml-8 shrink-0 hidden lg:block">
                <ButtonGroup data={buttons} size="sm" />
              </div>
            )}
            {menu && <NavMenuMobile menu={menu} buttons={buttons ?? []} />}
          </div>
        </div>
      </header>
    );
  }
  return (
    // Default style - standard
    <header
      className={classNames(
        "relative z-[99999] tracking-wider",
        { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
        { "bg-white": !darkMode },
        { "border-b": sticky && !darkMode },
        { "text-neutral-50 bg-neutral-900": darkMode }
      )}
    >
      <div
        className={classNames(
          "container px-4 mx-auto flex items-center"
        )}
      >
        <div className="shrink-0">
          <Logo redirectUrl={logoRedirect ?? ""} logo={logo} />
        </div>
        <div className="flex-1">
          {menu && <NavMenu menu={menu} appearanceVariant={appearanceVariant} />}
        </div>
        { showSearch && <SearchButton /> }
        {buttons && buttons.length > 0 && (
          <div className="ml-8 shrink-0 hidden lg:block">
            <ButtonGroup data={buttons} size="sm" />
          </div>
        )}
        {menu && <NavMenuMobile menu={menu} buttons={buttons ?? []} />}
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
