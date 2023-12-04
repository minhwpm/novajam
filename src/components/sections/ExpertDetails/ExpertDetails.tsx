import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview"
import RichText2 from "@/components/elements/RichText/RichText2"
import { ExpertType } from "@/helpers/types"

export const ExpertDetails: React.FC<{data: ExpertType}> = ({ data }) => {
  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
      <ExpertPreview data={data} layout="horizontal" />
      { data.description && (
        <div className="prose lg:prose-xl">
          <RichText2 data={data.description} />
        </div>
      )}
    </div>
  )
}