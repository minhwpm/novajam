import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { LinkType, NavigationUiVariant, SubmenuType } from "@/helpers/types";
import { Submenu } from "./Submenu/Submenu";
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

export interface NavMenuProps {
  menu: Array<LinkType | SubmenuType>;
  uiVariant?: NavigationUiVariant
}

export function getMenuItemText(item: LinkType | SubmenuType): string {
  if ("text" in item) return item.text;
  return item.title;
}

const NavMenu: React.FC<NavMenuProps> = ({ menu }) => {
  return (
    <NavigationMenu.Root
      className={classNames(
        "hidden lg:flex justify-center pt-2 pb-3 font-medium",
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
              <NavLinkItem
                className="font-bold"
                href={item.url}
                variant="underlined"
              >
                {item.text}
              </NavLinkItem>
            )}
            {item.contentType === "submenu" && (
              <Submenu data={item} />
            )}
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Indicator className="NavigationMenuIndicator"> 
        {/* @TODO NavigationMenuIndicator ?? */}
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu