import { SubmenuType } from "@/helpers/types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { FaChevronRight } from "react-icons/fa";
import { SubMenuLinkItem } from "./SubMenuLinkItem";
import { SubMenuFeaturedContent } from "./SubMenuFeaturedContent";
import { usePathname } from "next/navigation";

export const Dropdown: React.FC<{data: SubmenuType}> = 
({ data }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Sub orientation="vertical">
      <NavigationMenu.List>
        {data.menu.length > 0 &&
          data.menu.map((subItem) => (
            <NavigationMenu.Item key={subItem.id} className="relative">
              {subItem.contentType === "link" && (
                <SubMenuLinkItem
                  href={subItem.url}
                  title={subItem.text}
                />
              )}
              {subItem.contentType === "linkgroup" && (
                <>
                  <NavigationMenu.Trigger
                    className={classNames(
                      "w-full font-medium select-none text-left py-1.5 px-3 rounded-sm hover:bg-primary-50 transition-color duration-300 data-[state=open]:bg-primary-50 group",
                      {
                        "bg-primary-100":
                          subItem.links.find((link) => link.url === pathname)
                      }
                    )}
                  >
                    {subItem.title}
                    <FaChevronRight size={10} className="nline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"/>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-full -top-4 pl-4 data-[state=open]:animate-slidingLinkgroup">
                    <ul className="py-4 px-2 bg-white rounded-assets shadow-radiant w-64 flex flex-col">
                      {subItem.links.length > 0 &&
                        subItem.links.map((link) => (
                          <li key={link.id}>
                            <SubMenuLinkItem
                              href={link.url}
                              title={link.text}
                            />
                          </li>
                        ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>
      {data.featuredContent.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-y-scroll overscroll-y-contain">
          {data.featuredContent.map((data) => (
            <div key={data.id} className="basis-5/6 shrink-0 grow">
              <SubMenuFeaturedContent data={data} />
            </div>
          ))}
        </div>
      )}
    </NavigationMenu.Sub>
  );
}