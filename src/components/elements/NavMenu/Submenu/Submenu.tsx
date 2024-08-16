"use client";
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavigationVariant, SubmenuType } from "@/lib/types";
import { usePathname } from "next/navigation";
import { Dropdown } from "./Dropdown";
import { Mega } from "./Mega";
import { FaChevronDown } from "react-icons/fa";

export const Submenu: React.FC<{
  data: SubmenuType;
  appearanceVariant?: NavigationVariant;
}> = ({ data, appearanceVariant }) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Trigger className="group py-5 px-1">
        <span
          className={classNames(
            "select-none cursor-pointer rounded-theme-button py-2 px-4 inline-block group-data-[state=open]:text-primary-600 group-data-[state=open]:bg-white/100 duration-500 transition-colors ease-in-out",
            {
              "text-primary-600 bg-white/50":
                data.featuredContent?.find(
                  (content) =>
                    content && "url" in content && content.url === pathname
                ) ||
                data.menu?.find(
                  (subItem) =>
                    (subItem.contentType === "link" &&
                      subItem.url === pathname) ||
                    (subItem.contentType === "linkgroup" &&
                      subItem.links.find((link) => link.url === pathname))
                ),
            }
          )}
        >
          {data.title}
          <FaChevronDown
            size={10}
            className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
          />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className={classNames(
          "text-neutral-800",
          {
            "absolute top-full left-0 w-full bg-white border-t shadow-lg data-[state=open]:animate-slidingSubmenu":
              data.appearanceVariant === "mega" &&
              appearanceVariant === "standard",
          },
          {
            "absolute top-full left-0 w-full bg-white shadow-radiant rounded-md data-[state=open]:animate-slidingSubmenu":
              data.appearanceVariant === "mega" &&
              appearanceVariant === "overlay",
          },
          {
            "absolute top-full left-0 w-64 px-6 py-4 -mt-2 bg-white shadow-radiant rounded-md data-[state=open]:animate-slidingSubmenu":
              data.appearanceVariant === "dropdown",
          }
        )}
      >
        {data.appearanceVariant === "mega" && <Mega data={data} />}
        {data.appearanceVariant === "dropdown" && <Dropdown data={data} />}
      </NavigationMenu.Content>
    </>
  );
};
