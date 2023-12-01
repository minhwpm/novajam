import { SNSType } from "@/helpers/types"
import Link from "next/link";
import { RiFacebookFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import classNames from "classnames";

export const SNS: React.FC<{ data: SNSType}> = ({ data }) => {
  const { linkedInUrl, facebookUrl, twitterUrl, youtubeUrl, instagramUrl } = data
  return (
    <div className="flex gap-5 items-center">
      {linkedInUrl && 
        <Link href={linkedInUrl}>
          <FaLinkedinIn className={classNames("text-primary-500 hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {facebookUrl && 
        <Link href={facebookUrl}>
          <RiFacebookFill className={classNames("text-primary-500 hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {twitterUrl && 
        <Link href={twitterUrl}>
          <FaXTwitter className={classNames("text-primary-500 hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {youtubeUrl && 
        <Link href={youtubeUrl}>
          <FaYoutube className={classNames("text-primary-500 hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {instagramUrl && 
        <Link href={instagramUrl}>
          <FaInstagram className={classNames("text-primary-500 hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
    </div>
  )
}