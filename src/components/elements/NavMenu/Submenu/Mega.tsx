import { SubmenuType } from "@/helpers/types"
import classNames from "classnames"
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";

export const Mega: React.FC<{data: SubmenuType}> = ({ data }) => {
  return (
    <div className="container px-4 mx-auto">
      <div className="pt-6 pb-8 flex flex-wrap gap-8 border-t">
        {data.menu.length > 0 && (
          <div className={classNames("shrink flex flex-wrap gap-6")}>
            {data.menu.map((subItem) => (
              <div key={subItem.id} className="basis-52 shrink-0">
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
              "basis-80 shrink-0 grow flex gap-4 overflow-y-scroll overscroll-y-contain",
              {
                "justify-end": data.featuredContent.length === 1,
              }
            )}
          >
            {data.featuredContent.map((data) => (
              <div
                key={data.id}
                className="w-4/5 basis-64 shrink-0 grow max-w-xs"
              >
                <NavFeaturedContent data={data} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}