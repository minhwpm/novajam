import { SubmenuType } from "@/helpers/types"
import classNames from "classnames"
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { NavLinkItem } from "./SubMenuLinkItem";

export const Mega: React.FC<{data: SubmenuType}> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 pt-5 pb-10 flex gap-12 border-t">
      {data.menu.length > 0 && (
        <div className={classNames("grow flex flex-wrap gap-8 py-5")}>
          {data.menu.map((subItem) => (
            <div key={subItem.id} className="basis-60 shrink-0 mb-3">
              {subItem.contentType === "link" && (
                <NavLinkItem href={subItem.url} title={subItem.text} />
              )}
              {subItem.contentType === "linkgroup" && (
                <p className="text-neutral-500 uppercase text-sm tracking-wide font-medium mb-2">
                  {subItem.title}
                </p>
              )}
              <ul className="flex flex-col">
                {subItem.contentType === "linkgroup" &&
                  subItem.links.length > 0 &&
                  subItem.links.map((link) => (
                    <li key={link.id}>
                      <NavLinkItem href={link.url} title={link.text} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {data.featuredContent.length > 0 && (
        <div
          className={classNames(
            "basis-1/3 xl:basis-1/4 shrink-0 grow flex gap-4 overflow-y-scroll overscroll-y-contain ",
            {
              "justify-end": data.featuredContent.length === 1,
            }
          )}
        >
          {data.featuredContent.map((data) => (
            <div key={data.id} className="basis-72 shrink-0 grow max-w-xs">
              <NavFeaturedContent data={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}