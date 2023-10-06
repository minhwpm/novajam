import { StatisticsType } from "@/utils/types"

export const Statistics: React.FC<{ data: StatisticsType }> = ({ data }) => {
  const { number, text } = data
  return (
    <div className="flex flex-col items-center gap-3 pt-6 py-10 px-4 bg-white rounded-md">
      <div className="text-7xl font-bold text-primary-500">
        {number}
      </div>
      <div className="font-semibold tracking-wide text-center ">
        {text}
      </div>
      {/* @TODO set ANIMATION based on field animation in CMS */}
    </div>
  )
}