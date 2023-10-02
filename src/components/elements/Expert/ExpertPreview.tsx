import { ExpertType } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: ExpertType
  layout: "row" | "column"
}

export const ExpertPreview: React.FC<Props> = ({ data, layout }) => {
  const { slug, fullName, portrait, role, specialization, organization, summary } = data
  if (layout === "row") {
    return (
      <div className="flex flex-wrap py-5">
        <div className="w-1/3 md:w-1/4">
          <div className="aspect-square">
            <Image
              className="w-full h-full object-cover rounded-full"
              src={portrait?.url ?? "/bluebiz_square.webp"}
              alt={portrait?.title ?? fullName}
              width={portrait?.width ?? 500}
              height={portrait?.height ?? 500}
            />
          </div>
        </div>
        <div className="w-full pt-6 md:w-3/4 md:pt-0 md:pl-10 prose lg:prose-lg max-w-none">
          <div className="font-semibold text-2xl md:text-3xl mb-5">
            <Link href={`/expert/${slug}`}>
              {fullName}
            </Link>
          </div>
          <div className="font-semibold">
            {role}
          </div>
          <div>
            {specialization}
          </div>
          <div>
            {organization}
          </div>
          {summary && 
            <div className="my-5">
              {summary}
            </div>
          }
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="">
        <div className="aspect-square">
          <Image
            className="w-full h-full object-cover"
            src={portrait?.url ?? "/bluebiz_square.webp"}
            alt={portrait?.title ?? fullName}
            width={portrait?.width ?? 500}
            height={portrait?.height ?? 500}
          />
        </div>
        <div className="w-full px-2 py-4">
          <div className="flex flex-wrap mb-2 items-center gap-2">
            <Link className="block underline-hover-effect font-semibold text-xl" href={`/expert/${slug}`}>
              {fullName}
            </Link>
            <div className="font-semibold text-slate-600">
              {role}
            </div>
          </div>
          
          <div className="text-base flex flex-wrap items-center gap-2">
            <div className="text-slate-500 uppercase text-sm tracking-wider">
              Specialty: 
            </div>
            {specialization}
          </div>
        </div>
      </div>
    </div>
  )
}