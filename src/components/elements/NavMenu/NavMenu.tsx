import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { LinkType, NavigationVariant, SubmenuType } from "@/helpers/types";
import { Submenu } from "./Submenu/Submenu";
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

export interface NavMenuProps {
  menu: Array<LinkType | SubmenuType>;
  appearanceVariant?: NavigationVariant
}

export function getMenuItemText(item: LinkType | SubmenuType): string {
  if ("text" in item) return item.text;
  return item.title;
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, appearanceVariant }) => {
  return (
    <NavigationMenu.Root
      className={classNames(
        "NavMenu hidden lg:flex justify-end"
      )}
    >
      <NavigationMenu.List
        className={classNames(
          "flex justify-center items-start px-5 list-none m-0 gap-x-10"
        )}
      >
        {menu.map((item) => (
          <NavigationMenu.Item
            key={item.id}
            className={classNames(
              "text-smd",
              { relative: "menu" in item && item.appearanceVariant === "dropdown" }
            )}
          >
            {item.contentType === "link" && (
              <div className="pb-8">
                <NavLinkItem
                  key={item.id}
                  href={item.url}
                  variant="underlined"
                  openNewTab={item.openNewTab}
                >
                  {item.text}
                </NavLinkItem>
              </div>
            )}
            {item.contentType === "submenu" && <Submenu key={item.id} data={item} appearanceVariant={appearanceVariant} />}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu