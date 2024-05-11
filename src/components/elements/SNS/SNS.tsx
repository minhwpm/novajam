import classNames from "classnames";
import { SNSType } from "@/helpers/types"
import { RiFacebookFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export const SNS: React.FC<{
  data: SNSType;
  variant?: "standard" | "alternate";
  darkMode: boolean;
}> = ({ data, variant, darkMode = false }) => {
  const { linkedInUrl, facebookUrl, twitterUrl, youtubeUrl, instagramUrl } =
    data;
  return (
    <div className={classNames("flex gap-5 items-center py-3")}>
      {linkedInUrl && (
        <Link
          href={linkedInUrl}
          className={classNames({
            "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300 ease-in-out":
              variant === "alternate",
          })}
        >
          <FaLinkedinIn
            className={classNames(
              "transition-colors duration-300 ease-in-out",
              { "text-primary-600 group-hover:text-primary-500": !darkMode },
              { "text-neutral-100 group-hover:text-neutral-50": darkMode }
            )}
          />
        </Link>
      )}
      {facebookUrl && (
        <Link
          href={facebookUrl}
          className={classNames({
            "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200":
              variant === "alternate",
          })}
        >
          <RiFacebookFill
            className={classNames(
              "transition-colors duration-300 ease-in-out",
              { "text-primary-600 group-hover:text-primary-500": !darkMode },
              { "text-neutral-100 group-hover:text-neutral-50": darkMode }
            )}
          />
        </Link>
      )}
      {twitterUrl && (
        <Link
          href={twitterUrl}
          className={classNames({
            "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200":
              variant === "alternate",
          })}
        >
          <FaXTwitter
            className={classNames(
              "transition-colors duration-300 ease-in-out",
              { "text-primary-600 group-hover:text-primary-500": !darkMode },
              { "text-neutral-100 group-hover:text-neutral-50": darkMode }
            )}
          />
        </Link>
      )}
      {youtubeUrl && (
        <Link
          href={youtubeUrl}
          className={classNames({
            "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200":
              variant === "alternate",
          })}
        >
          <FaYoutube
            className={classNames(
              "transition-colors duration-300 ease-in-out",
              { "text-primary-600 group-hover:text-primary-500": !darkMode },
              { "text-neutral-100 group-hover:text-neutral-50": darkMode }
            )}
          />
        </Link>
      )}
      {instagramUrl && (
        <Link
          href={instagramUrl}
          className={classNames({
            "group w-10 h-10 rounded-full flex justify-center items-center bg-neutral-100 hover:bg-neutral-200":
              variant === "alternate",
          })}
        >
          <FaInstagram
            className={classNames(
              "transition-colors duration-300 ease-in-out",
              { "text-primary-600 group-hover:text-primary-500": !darkMode },
              { "text-neutral-100 group-hover:text-neutral-50": darkMode }
            )}
          />
        </Link>
      )}
    </div>
  );
};