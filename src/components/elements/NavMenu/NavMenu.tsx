import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { LinkType, NavigationVariant, SubmenuType } from "@/lib/types";
import { Submenu } from "./Submenu/Submenu";
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

export function getMenuItemText(item: LinkType | SubmenuType): string {
  if ("text" in item) return item.text;
  return item.title;
}

const NavMenu: React.FC<{
  menu: Array<LinkType | SubmenuType>;
  appearanceVariant?: NavigationVariant
}> = ({ menu, appearanceVariant }) => {
  return (
    <NavigationMenu.Root
      className={classNames("NavMenu hidden lg:flex justify-end")}
    >
      <NavigationMenu.List
        className={classNames(
          "flex justify-center items-start px-5 list-none m-0"
        )}
      >
        {menu.map(
          (item) =>
            item && (
              <NavigationMenu.Item
                key={item.id}
                className={classNames("text-smd", {
                  relative:
                    "menu" in item && item.appearanceVariant === "dropdown",
                })}
              >
                {item.contentType === "link" && (
                  <div className="py-7 px-5">
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
                {item.contentType === "submenu" && (
                  <Submenu
                    key={item.id}
                    data={item}
                    appearanceVariant={appearanceVariant}
                  />
                )}
              </NavigationMenu.Item>
            )
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu