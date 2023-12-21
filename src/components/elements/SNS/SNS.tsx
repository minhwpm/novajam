import classNames from "classnames";
import { SNSType } from "@/helpers/types"
import { RiFacebookFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export const SNS: React.FC<{ data: SNSType, variant?: 'standard' | 'alternate'}> = ({ data, variant }) => {
  const { linkedInUrl, facebookUrl, twitterUrl, youtubeUrl, instagramUrl } = data
  return (
    <div className="flex gap-5 items-center">
      {linkedInUrl && 
        <Link href={linkedInUrl} className={classNames(
          { "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200 transition-colors duration-500 ease": variant === "alternate" }
        )}>
          <FaLinkedinIn className={classNames("text-primary-500 group-hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {facebookUrl && 
        <Link href={facebookUrl} className={classNames(
          { "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200": variant === "alternate" }
        )}>
          <RiFacebookFill className={classNames("text-primary-500 group-hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {twitterUrl && 
        <Link href={twitterUrl} className={classNames(
          { "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200": variant === "alternate" }
        )}>
          <FaXTwitter className={classNames("text-primary-500 group-hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {youtubeUrl && 
        <Link href={youtubeUrl} className={classNames(
          { "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200": variant === "alternate" }
        )}>
          <FaYoutube className={classNames("text-primary-500 group-hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
      {instagramUrl && 
        <Link href={instagramUrl} className={classNames(
          { "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200": variant === "alternate" }
        )}>
          <FaInstagram className={classNames("text-primary-500 group-hover:text-primary-400 transition-colors duration-500 ease")} />
        </Link>
      }
    </div>
  )
}