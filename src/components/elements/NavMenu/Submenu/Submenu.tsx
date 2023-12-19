"use client"
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavigationUiVariant, SubmenuType } from "@/helpers/types";
import { usePathname } from "next/navigation";
import { Dropdown } from "./Dropdown";
import { Mega } from "./Mega";
import { FaChevronDown } from "react-icons/fa";

export const Submenu: React.FC<{ data: SubmenuType, uiVariant?: NavigationUiVariant }> = ({ data, uiVariant }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Item 
      className={classNames(
        { relative: "menu" in data && data.layout === "dropdown" }
      )}
    >
      <NavigationMenu.Trigger
        className={classNames(
          "font-bold py-2 select-none underline-hover-effect cursor-pointer before:bg-primary-500 data-[state=open]:before:w-full group",
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
      >
        {data.title}
        <FaChevronDown size={10} className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"/>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className={classNames(
          "text-neutral-800 text-base",
          {
            "absolute top-full left-0 w-full bg-white shadow-lg data-[state=open]:animate-slidingSubmenu":
              data.layout === "mega" && uiVariant === "standard",
          },
          {
            "absolute top-full left-0 w-full bg-white shadow-radiant rounded-assets data-[state=open]:animate-slidingSubmenu":
              data.layout === "mega" && uiVariant === "overlay",
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
    </NavigationMenu.Item>
  )
}