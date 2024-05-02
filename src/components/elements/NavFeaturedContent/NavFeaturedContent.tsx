import { BlogType, PageType } from "@/helpers/types"
import { BlogPreview } from "../BlogPreview/BlogPreview";
import { PagePreview } from "../PagePreview/PagePreview";

export const NavFeaturedContent: React.FC<{
  data: BlogType | PageType
  onClick?: () => void
}> = ({ data }) => {
  switch(data.contentType) {
    case "blog":
      return <BlogPreview data={data} />
    case "page":
      return <PagePreview data={data} alignment="center"/>;
    default:
      return null
  }
}