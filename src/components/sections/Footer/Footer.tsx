import { SNS } from "@/components/elements/SNS/SNS"
import { FooterType } from "@/helpers/types"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: FooterType
}

export const Footer: React.FC<Props> = ({ data }) => {
  const { logo, logoRedirect, copyright, sns, menu } = data
  return (
    <footer className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-12 gap-x-5 gap-y-10">
        <div className="col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col items-center lg:items-start">
          {logo?.url && 
            <Link href={logoRedirect ?? "/"}>
              <Image
                className="w-40 h-14 object-contain object-top"
                src={logo.url}
                width={160}
                height={56}
                alt={logo.title}
              />
            </Link>
          }
          <p className="text-neutral-500">
            {copyright}
          </p>
          <div className="flex gap-2 mt-5">
            {sns && <SNS data={sns} variant="alternate" />}
          </div>
        </div>
        {menu.map((section, idx) => (
          <div key={idx} className={classNames(
            "col-span-6 lg:col-span-3 xl:col-span-2 flex flex-col gap-2",
            { "xl:col-start-10": menu.length === 1},
          )}>
            <p className="font-semibold mb-1">{section.title}</p>
            {section.links.map(link => (
              <p key={link.text} className="text-neutral-700">
                <Link href={link.url}>
                  {link.text}
                </Link>
              </p>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}