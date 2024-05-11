import { BlogType, PageType } from "@/helpers/types"
import { BlogPreview } from "../BlogPreview/BlogPreview";
import { PagePreview } from "../PagePreview/PagePreview";

export const NavFeaturedContent: React.FC<{
  data: BlogType | PageType
  onClick?: () => void
}> = ({ data, onClick }) => {
  return (
    <div onClick={onClick} onKeyDown={onClick} role="link" tabIndex={0}>
      {data.contentType === "blog" && <BlogPreview data={data} alignment="center" />}
      {data.contentType === "page" && <PagePreview data={data} alignment="center" />}
    </div>
  )
}