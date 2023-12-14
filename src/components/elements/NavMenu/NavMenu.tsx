"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import Link from "next/link";
import { LinkType, NavigationUiVariant, SubmenuType } from "@/helpers/types";
import { usePathname } from "next/navigation";
import { Submenu } from "./Submenu/Submenu";

export interface NavMenuProps {
  menu: Array<LinkType | SubmenuType>;
  uiVariant: NavigationUiVariant
}

export function getMenuItemText(item: LinkType | SubmenuType): string {
  if ("text" in item) return item.text;
  return item.title;
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, uiVariant }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root
      className={classNames(
        "NavMenu hidden lg:flex pt-2 pb-3",
        { "justify-center": uiVariant === "standard" },
        { "justify-end": uiVariant === "overlay" }
      )}
    >
      <NavigationMenu.List
        className={classNames(
          "flex justify-center px-5 list-none m-0 gap-x-10"
        )}
      >
        {menu.map((item) => (
          <NavigationMenu.Item
            key={item.id}
            className={classNames({
              relative: "menu" in item && item.layout === "dropdown",
            })}
          >
            {item.contentType === "link" && (
              <Link
                href={item.url}
                className={classNames(
                  "py-2 select-none inline-block underline-hover-effect",
                  { "before:w-full": pathname === item.url }
                )}
              >
                {item.text}
              </Link>
            )}
            {item.contentType === "submenu" && (
              <Submenu data={item} />
            )}
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu