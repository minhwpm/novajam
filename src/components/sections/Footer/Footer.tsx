import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

interface FooterProps {
  data: {
    logo: {
      url: string
      title: string
    }
    copyright?: string
    sns?: Array<{
      url: string
      icon: {
        url: string
        altText: string
      }
    }>
    menu: Array<{
      title?:  string
      links: Array<{
        text: string
        url: string
      }>
    }>
  }
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { logo, copyright, sns, menu } = data
  return (
    <footer className="pt-6 pb-20">
      <div className="container mx-auto px-4 grid grid-cols-12 gap-x-5 gap-y-10">
        <div className="col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col items-center lg:items-start">
          {logo?.url && 
            <Link href="/">
              <Image
                className="w-40 h-14 object-contain object-top"
                src={logo.url}
                width={160}
                height={56}
                alt={logo.title}
              />
            </Link>
          }
          <p className="text-slate-500">
            {copyright}
          </p>
          <div className="flex gap-2 mt-5">
            {sns && sns.length > 0 && sns.map((item, idx) => (
              <div key={idx}>
                <Link href={item.url}>
                  <Image
                    src={item.icon.url}
                    width={30}
                    height={30}
                    alt={item.icon.altText}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {menu.map((section, idx) => (
          <div key={idx} className={classNames(
            "col-span-6 lg:col-span-3 xl:col-span-2 flex flex-col gap-2",
            { "xl:col-start-10": menu.length === 1},
          )}>
            <p className="font-semibold mb-1">{section.title}</p>
            {section.links.map(link => (
              <p key={link.text} className="text-slate-700">
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

export default Footer