import { ButtonVariant } from "@/helpers/types"
import classNames from "classnames"
import Image from "next/image"

interface ProfilePreviewProps {
  data: {
    label?: string
    title: string
    summary?: string
    url?: string
    media: {
      type: string
      src: string
      altText?: string
    }
    button: {
      url: string
      text: string
      type: ButtonVariant
    }
  }
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ data }) => {
  // @TODO show & style full props 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, title, summary, url, media, button } = data
  return (
    <div className={classNames(
      "flex flex-col shrink-0"
    )}>
      <Image 
        className={classNames("w-full h-full aspect-2/3 object-cover ")}
        src={media.src}
        alt={media.altText ?? title}
        width={500}
        height={750}    
      />
    </div>
  )
}

export default ProfilePreview