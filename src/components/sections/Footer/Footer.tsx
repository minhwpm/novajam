import { SNS } from "@/components/elements/SNS/SNS"
import { FooterType } from "@/helpers/types"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: FooterType
}

export const Footer: React.FC<Props> = ({ data }) => {
  const { logo, logoRedirect, copyright, sns, menu, backgroundColor, darkMode } = data
  return (
    <footer
      className={classNames(
        "py-20",
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
    >
      <div className="container mx-auto px-4 grid grid-cols-12 gap-x-5 gap-y-10">
        <div className="col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col items-center lg:items-start">
          {logo?.url && (
            <Link href={logoRedirect ?? "/"}>
              <Image
                className="w-40 h-14 object-contain object-top"
                src={logo.url}
                width={160}
                height={56}
                alt={logo.title}
              />
            </Link>
          )}
          <p
            className={classNames(
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            {copyright}
          </p>
          <div className="flex gap-2 mt-5">
            {sns && <SNS data={sns} variant="alternate" />}
          </div>
        </div>
        {menu.map((section, idx) => (
          <div
            key={idx}
            className={classNames(
              "col-span-6 lg:col-span-3 xl:col-span-2 flex flex-col gap-2",
              { "xl:col-start-10": menu.length === 1 }
            )}
          >
            <div
              className={classNames(
                "font-semibold mb-1",
                { "text-neutral-600": !darkMode },
                { "text-neutral-200": darkMode }
              )}
            >
              {section.title}
            </div>
            {section.links.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                className={classNames(
                  "self-start select-none before:bg-primary-500 underline-hover-effect",
                  { "text-neutral-600": !darkMode },
                  { "text-neutral-100": darkMode }
                )}
                target={link.openNewTab ? "_blank" : "_self"}
              >
                {link.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}