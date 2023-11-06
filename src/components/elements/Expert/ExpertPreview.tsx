import { ExpertType } from "@/helpers/types"
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: ExpertType
  layout: "horizontal" | "vertical"
}

export const ExpertPreview: React.FC<Props> = ({ data, layout }) => {
  const { slug, fullName, portrait, role, specialization, organization, summary } = data
  if (layout === "horizontal") {
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
        <div className="w-full pt-6 md:w-3/4 md:pt-0 md:pl-10">
          <div className="font-semibold text-2xl md:text-3xl mb-5">
            <Link className="underline-hover-effect" href={`/expert/${slug}`}>
              {fullName}
            </Link>
          </div>
          <div className="font-semibold">
            {role}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-slate-500 uppercase text-sm tracking-wider">
              Specialty: 
            </div>
            {specialization}
          </div>
          <div>
            {organization}
          </div>
          {summary && 
            <div className="my-5 prose lg:prose-lg max-w-none">
              {summary}
            </div>
          }
        </div>
      </div>
    )
  }
  return (
    <div className="group">
      <div className="aspect-square overflow-hidden rounded-t-assets">
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out rounded-t-assets"
          src={portrait?.url ?? "/bluebiz_square.webp"}
          alt={portrait?.title ?? fullName}
          width={portrait?.width ?? 500}
          height={portrait?.height ?? 500}
        />
      </div>
      <div className="w-full px-4 py-4 bg-neutral-100 rounded-b-assets">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link className="block underline-hover-effect font-semibold text-xl" href={`/expert/${slug}`}>
            {fullName}
          </Link>
          <div className="font-semibold text-neutral-600">
            {role}
          </div>
        </div>
        { specialization && 
          <div className="text-base flex flex-wrap items-center justify-center gap-2 text-neutral-600 font-semibold tracking-wide">
            {specialization}
          </div>
        }
      </div>
    </div>
  )
}