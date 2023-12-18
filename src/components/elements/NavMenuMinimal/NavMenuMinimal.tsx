// This nav menu is for Minimal Navigation
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavigationType } from "@/helpers/types";
import { LinkItem } from "./LinkItem/LinkItem";
import { useState } from "react";
import { getMenuItemText } from "../NavMenu/NavMenu";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";
import { SubmenuMinimal } from "./SubmenuMinimal/SubmenuMinimal";

const NavMenuMinimal: React.FC<{ data: NavigationType }> = ({ data }) => {
  const { menu, buttons } = data;
  const [navMenuShowed, setNavMenuShowed] = useState(false);

  return (
    <>
      <CiMenuFries
        className="ml-auto relative cursor-pointer bg-white/80 rounded-full w-14 h-14 p-3 bottom-0 shadow-md hover:shadow-lg hover:bottom-1 hover:bg-primary-600/80 hover:text-white transition-all duration-500 ease"
        onClick={() => {
          setNavMenuShowed(true);
          document.body.style.overflow = "hidden";
        }}
      />
      <div className={classNames("absolute top-0 left-0 z-[99999] w-screen h-screen  bg-neutral-950/90 bg-text-neutral-500 text-white overflow-auto",
        { hidden: !navMenuShowed }
      )}>
      <NavigationMenu.Root
        className={classNames("container mx-auto px-4")}
      >
          <AiOutlineClose
            className="cursor-pointer ml-auto mt-10 w-14 h-14 p-3 rounded-full bg-transparent hover:bg-neutral-200 hover:text-neutral-900 transition-all duration-300 ease-in-out"
            size={30}
            onClick={() => {
              setNavMenuShowed(false);
              document.body.style.overflow = "auto";
            }}
          />
          <NavigationMenu.List className="flex flex-col items-center text-xl py-20">
            {menu.map((item) => (
              <NavigationMenu.Item
                key={getMenuItemText(item)}
                className="py-2 border-b border-neutral-800"
              >
                {item.contentType === "link" && (
                  <LinkItem
                    className="before:bg-primary-500"
                    href={item.url}
                    title={item.text}
                    onClick={() => {
                      setNavMenuShowed(false);
                      document.body.style.overflow = "auto";
                    }}
                  />
                )}
                {item.contentType === "submenu" && (
                  <SubmenuMinimal data={item} />
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <div className="flex flex-col p-4 items-center">
            {buttons &&
              buttons.length > 0 &&
              buttons.map((button) => (
                <Button
                  key={button.text}
                  variant={button.buttonVariant ?? "outline-white"}
                  size="lg"
                  url={button.url}
                  openNewTab={button.openNewTab}
                  onClick={() => {
                    setNavMenuShowed(false)
                    document.body.style.overflow = "auto";
                  }}
                >
                  {button.text}
                </Button>
              ))}
          </div>
      </NavigationMenu.Root>
      </div>
    </>
  );
};

export default NavMenuMinimal;
