import { StatisticsType } from "@/helpers/types"

export const Statistics: React.FC<{ data: StatisticsType }> = ({ data }) => {
  const { number, text } = data
  return (
    <div className="flex flex-col items-center gap-3 pt-6 py-10 px-4 bg-white rounded-sm">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-500 text-center">
        {number}
      </div>
      <div className="font-semibold tracking-wide text-center text-neutral-600 max-w-[150px]">
        {text}
      </div>
      {/* @TODO set ANIMATION based on field animation in CMS */}
    </div>
  )
}