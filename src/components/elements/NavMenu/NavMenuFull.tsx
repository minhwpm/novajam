// This nav menu is for Minimal Header

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavigationType } from "@/helpers/types";
import SubMenuItem from "./SubMenuItem";
import { useState } from "react";
import { getMenuItemText } from "./NavMenu";
import SubMenuFeaturedContent from "./SubMenuFeaturedContent";
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button/Button";

const NavMenuFull: React.FC<{ data: NavigationType }> = ({ data }) => {
  const { menu, buttons } = data;
  const [navMenuShowed, setNavMenuShowed] = useState(false);

  return (
    <>
      <div className="ml-auto">
        {/* Hamburger icon button*/}

        <CiMenuFries
          className="relative cursor-pointer bg-white rounded-full w-14 h-14 p-3 bottom-0 shadow-md hover:shadow-lg hover:bottom-1 hover:bg-primary-600 hover:text-white transition-all duration-500 ease"
          onClick={() => {
            setNavMenuShowed(true);
            document.body.style.overflowY = "hidden";
          }}
        />
      </div>
      <NavigationMenu.Root
        className={classNames(
          "absolute top-0 left-0 z-[99999] w-screen h-screen bg-neutral-950/90 bg-text-neutral-500 text-white overflow-auto",
          { hidden: !navMenuShowed }
        )}
      >
        <AiOutlineClose
          className="cursor-pointer absolute right-10 top-10 z-10"
          size={30}
          onClick={() => {
            setNavMenuShowed(false);
            document.body.style.overflowY = "auto";
          }}
        />
        <NavigationMenu.List className="flex flex-col items-center text-xl pt-20 pb-40 px-10">
          {menu.map((item) => (
            <NavigationMenu.Item
              key={getMenuItemText(item)}
              className="border-b"
            >
              {item.contentType === "link" && (
                <NavigationMenu.Link
                  className="py-4 px-3 w-full text-center select-none inline-block"
                  href={item.url}
                >
                  {item.text}
                </NavigationMenu.Link>
              )}
              {item.contentType === "submenu" && (
                <>
                  <NavigationMenu.Trigger className="py-4 px-3 w-full text-center select-none group">
                    {item.title}{" "}
                    <FontAwesomeIcon
                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                      icon={faChevronDown}
                      size="2xs"
                      width={10}
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="pb-8">
                    <NavigationMenu.Sub
                      orientation="vertical"
                      className="py-2 px-4"
                    >
                      <NavigationMenu.List className="px-2">
                        {item.menu.length > 0 &&
                          item.menu.map((subItem) => (
                            <NavigationMenu.Item key={subItem.id}>
                              {subItem.contentType === "link" && (
                                <div className="px-3 py-2 ">
                                  <SubMenuItem
                                    key={subItem.text}
                                    href={subItem.url}
                                    title={subItem.text}
                                  />
                                </div>
                              )}
                              {subItem.contentType === "linkgroup" && (
                                <div className="">
                                  <NavigationMenu.Trigger className="w-full font-medium select-none text-left py-2 px-3 rounded-sm hover:bg-neutral-100 hover:text-neutral-900 transition-color duration-300 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 group">
                                    {subItem.title}
                                    <FontAwesomeIcon
                                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                                      icon={faChevronDown}
                                      size="2xs"
                                      width={10}
                                    />
                                  </NavigationMenu.Trigger>
                                  <NavigationMenu.Content>
                                    <ul className="px-8 py-2 flex flex-col gap-y-3">
                                      {subItem.links.length > 0 &&
                                        subItem.links.map((link) => (
                                          <SubMenuItem
                                            key={link.text}
                                            href={link.url}
                                            title={link.text}
                                          />
                                        ))}
                                    </ul>
                                  </NavigationMenu.Content>
                                </div>
                              )}
                            </NavigationMenu.Item>
                          ))}
                      </NavigationMenu.List>
                      {item.featuredContent?.length > 0 && (
                        <SubMenuFeaturedContent
                          data={item.featuredContent[0]}
                        />
                      )}
                    </NavigationMenu.Sub>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
        <div className="fixed bottom-0 bg-primary-800 bg-opacity-80 w-full md:hidden flex flex-col p-4 items-center">
          {buttons &&
            buttons.length > 0 &&
            buttons.map((button) => (
              <Button
                key={button.text}
                variant={button.buttonVariant ?? "outline-white"}
                size="lg"
                url={button.url}
                openNewTab={button.openNewTab}
              >
                {button.text}
              </Button>
            ))}
        </div>
      </NavigationMenu.Root>
    </>
  );
};

export default NavMenuFull;
