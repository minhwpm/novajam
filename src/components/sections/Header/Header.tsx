'use client'
import { useState } from "react"
import Button from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyOnScroll from "@/utils/hooks/useStickyOnScroll"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudBolt, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const dummyData = {
  logo: {
    src: ""
  },
  nav: [
    {
      text: "Features",
      url: "/features"
    },
    {
      text: "Pricing",
      url: "/pricing"
    },
    {
      text: "Blog",
      url: "/blog"
    },
    {
      text: "Contact",
      url: "/contact"
    }
  ],
  button: {
    text: "Get started for free",
    url: "/register"
  }
}

interface Props {
  data?: {
    logo: {
      src: string
    },
    nav: Array<{
      text: string
      url: string
    }>
    button?: {
      text: string
      url: string
    }
  }
  variant?: "white" | "blue"
}

const Header = ({ data = dummyData, variant }: Props) => {
  const { nav, button } = data
  const fixed = useStickyOnScroll()
  const [ showed, setShowed ] = useState(false)

  return (
    <header className={classNames(
      "flex p-4 lg:px-32 lg:py-5 justify-between items-center bg-white",
      { "sticky w-full z-50 top-0 shadow-md": fixed },
    )}>
      <div>
        <Link href="/">
          <div className="flex items-center font-semibold text-blue-600 text-3xl italic tracking-widest">
            <FontAwesomeIcon width={26} icon={faCloudBolt} />
            <div>bluebiz</div>
          </div>
        </Link>
      </div>

      {/* MOBILE NAV */}
      <div className={classNames("absolute top-0 left-0 p-4 lg:px-32 lg:py-5 bg-white w-full h-screen",
        { "hidden": !showed }
      )}>
        <FontAwesomeIcon className="absolute right-5 top-5" width={26} icon={faXmark} size="xl" onClick={() => setShowed(false)}/>
        <nav className={classNames(
          "flex flex-col pt-20 justify-start gap-5",
          
        )}>
          {nav.map(item => (
            <div key={item.text}>
              <Link href={item.url} className="px-3 py-1">
                {item.text}
              </Link>
            </div>
          ))}
          <div className="self-end w-full flex justify-center items-center">
            <Link href="/login" className="px-3 py-1">
              Login
            </Link>
            <Button variant="border">
              Get started for free
            </Button>
          </div>
        </nav>
      </div>

      <nav className="hidden xl:flex gap-5 items-center">
        {nav.map(item => (
          <div key={item.text}>
            <Link href={item.url} className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-600 transition-all duration-300">
              {item.text}
            </Link>
          </div>
        ))}
      </nav>

      <div className="flex gap-4 items-center">
        <Link href="/login" className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hidden lg:block">
          Login
        </Link>
        <div className="hidden lg:block">
          {button && (
            <Button variant="border" url={button.url}>
              {button.text}
            </Button>
          )}
        </div>
        <div className="xl:hidden">
          <FontAwesomeIcon className="cursor-pointer" width={26} icon={faBars} size="xl" onClick={() => setShowed(true)}/>
        </div>
      </div>
    </header>
  )
}

export default Header