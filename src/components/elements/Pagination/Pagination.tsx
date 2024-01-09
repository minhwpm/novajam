"use client";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button } from "../Button/Button";

export const Pagination: React.FC<{
  totalPages: number;
  currentPageNumber?: number;
}> = ({ totalPages, currentPageNumber = 1 }) => {
  const router = useRouter();
  const pathname = usePathname().split("/")

  return (
    <div className="relative w-full flex flex-col items-center gap-5 my-12">
      <div className="flex justify-center gap-5">
        <Button
          onClick={() => {
            if (currentPageNumber - 1 === 1) {
              pathname.splice(pathname.length - 2, 2)
            }
            if (currentPageNumber - 1 > 1) {
              pathname[pathname.length - 1] = (currentPageNumber - 1).toString()
            }
            router.push(pathname.join("/"))
          }}
          variant="outline"
          disabled={currentPageNumber <= 1}
        >
          <AiOutlineArrowLeft size={20} />
        </Button>
        <Button 
          onClick={() => {
            if (currentPageNumber === 1) {
              pathname.splice(pathname.length, 0, "page", "2")
            }
            if (currentPageNumber > 1) {
              pathname[pathname.length - 1] = (currentPageNumber + 1).toString()
            }
            router.push(pathname.join("/"))
          }}
        >
          Next page
        </Button>
      </div>
      <div className="xl:absolute right-0 bottom-0">
        Page
        <select
          className="border-slate-400 border w-14 inline-block p-2 mx-2 rounded-assets text-center"
          name="page"
          defaultValue={currentPageNumber}
          onChange={(e) => {
            const targetPageNumber = parseInt(e.target.value);
            if (currentPageNumber > 1 && targetPageNumber === 1) {
              pathname.splice(pathname.length - 2, 2)
            }
            if (currentPageNumber === 1 && targetPageNumber > 1) {
              pathname.splice(pathname.length, 0, "page", targetPageNumber.toString())
            }
            if (currentPageNumber > 1  && targetPageNumber > 1) {
              pathname[pathname.length - 1] = targetPageNumber.toString()
            }
            router.push(pathname.join("/"))
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                {pageNumber}
              </option>
            )
          )}
        </select>
        of {totalPages}
      </div>
    </div>
  );
};