"use client"
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { SubmenuType } from "@/helpers/types";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "./Dropdown";
import { Mega } from "./Mega";

export const Submenu: React.FC<{data: SubmenuType}> = ({ data }) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Trigger
        className={classNames(
          "py-2 select-none underline-hover-effect cursor-pointer data-[state=open]:before:w-full group",
          {
            "before:w-full":
              data.featuredContent.find(
                (content) =>
                  "url" in content && content.url === pathname
              ) ||
              data.menu.find(
                (subItem) =>
                  (subItem.contentType === "link" &&
                    subItem.url === pathname) ||
                  (subItem.contentType === "linkgroup" &&
                    subItem.links.find(
                      (link) => link.url === pathname
                    ))
              ),
          }
        )}
        onPointerEnter={(e) => {
          e.preventDefault();
        }}
      >
        {data.title}
        <FontAwesomeIcon
          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
          icon={faChevronDown}
          size="2xs"
          width={10}
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        // forceMount={true}
        className={classNames(
          "text-neutral-800",
          {
            "absolute left-1/2 -translate-x-1/2 top-full mt-4 w-screen bg-white shadow-lg data-[state=open]:animate-slidingSubmenu":
              data.layout === "mega",
          },
          {
            "absolute top-full left-0 w-64 mt-4 py-4 px-2 bg-white shadow-radiant rounded-assets data-[state=open]:animate-slidingSubmenu":
              data.layout === "dropdown",
          } 
        )}
      >
        {data.layout === "mega" && (
          <Mega data={data} />
        )}
        {data.layout === "dropdown" && (
          <Dropdown data={data} />
        )}
      </NavigationMenu.Content>
    </>
  )
}