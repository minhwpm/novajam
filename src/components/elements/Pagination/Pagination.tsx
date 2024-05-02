"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Button } from "@/components/elements/Button/Button";

export const Pagination: React.FC<{
  currentPageNumber?: number;
}> = ({ currentPageNumber = 1 }) => {
  const router = useRouter();
  const pathname = usePathname().split("/")
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic")

  return (
    <div className="relative w-full flex flex-col items-center gap-5 my-12">
      <div className="flex justify-center gap-5">
        <Button
          data={{
            text: "Back",
            url: null,
            buttonVariant: "primary",
            withArrow: false,
            openNewTab: false
          }}
          onClick={() => {
            if (currentPageNumber - 1 === 1) {
              pathname.splice(pathname.length - 2, 2)
            }
            if (currentPageNumber - 1 > 1) {
              pathname[pathname.length - 1] = (currentPageNumber - 1).toString()
            }
            router.push(pathname.join("/"))
          }}
          disabled={currentPageNumber <= 1}
        >
          <GoArrowLeft size={20} />
        </Button>
        <Button
          data={{
            text: "Next",
            url: null,
            buttonVariant: "primary",
            withArrow: false,
            openNewTab: false
          }}
          onClick={() => {
            if (currentPageNumber === 1) {
              pathname.splice(pathname.length, 0, "page", "2")
            }
            if (currentPageNumber > 1) {
              pathname[pathname.length - 1] = (currentPageNumber + 1).toString()
            }
            router.push(pathname.join("/") + (topic ? ("?topic=" + topic) : "") )
          }}
        >
          <GoArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};