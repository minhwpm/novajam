import { SNS } from "@/components/elements/SNS/SNS"
import { FooterType } from "@/lib/types"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: FooterType
}

export const Footer: React.FC<Props> = ({ data }) => {
  const { logo, logoRedirect, copyright, sns, menu, backgroundColor, backgroundImage, darkMode } = data
  return (
    <footer
      className={classNames(
        "py-20",
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`,
        {
          "bg-center bg-no-repeat bg-cover bg-blend-multiply":
            backgroundImage,
        }
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage?.url})`,
            }
          : {}
      }
    >
      <div className="container mx-auto px-4 flex flex-wrap gap-x-5 gap-y-10">
        <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center lg:items-start">
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
              "mt-4",
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            {copyright}
          </p>
          <div className="flex gap-2 mt-2">
            {sns && <SNS darkMode={darkMode} data={sns} />}
          </div>
        </div>
        <div className="grow flex flex-wrap gap-8 justify-center lg:justify-end">
          {menu.map((section, idx) => (
            <div
              key={idx}
              className={classNames(
                "basis-40 flex flex-col gap-2",
                { "xl:col-start-10": menu.length === 1 },
                { "text-neutral-100": darkMode }
              )}
            >
              <div
                className={classNames(
                  "font-semibold mb-1",
                  { "text-neutral-500": !darkMode },
                  { "text-neutral-100/60": darkMode }
                )}
              >
                {section.title}
              </div>
              {section.links.map((link) => (
                <Link
                  key={link.text}
                  href={link.url}
                  className={classNames(
                    "self-start select-none underline-hover-effect before:bg-primary-500",
                    { "text-neutral-50": darkMode }
                  )}
                  target={link.openNewTab ? "_blank" : "_self"}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}