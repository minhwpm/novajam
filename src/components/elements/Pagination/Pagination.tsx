'use client'
import { useRouter } from "next/navigation"
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../Button/Button";

const Pagination: React.FC<{totalPages: number, currentPageNumber?: number}> = ({totalPages, currentPageNumber = 1}) => {
  const router = useRouter()
  return (
    <div className="relative w-full flex flex-col items-center gap-5 my-12">
      <div className="flex justify-center gap-5">
        <Button
          url={
            currentPageNumber - 1 <= 1
              ? "/blog"
              : `/blog/page/${currentPageNumber - 1}`
          }
          variant="outline"
          disabled={ currentPageNumber <= 1 }
        >
          <AiOutlineArrowLeft size={20} />
        </Button>
        <Button url={`/blog/page/${currentPageNumber - -1}`}>Next page</Button>
      </div>
      <div className="xl:absolute right-0 bottom-0">
        Page
        <select
          className="border-slate-400 border w-14 inline-block p-2 mx-2 rounded-assets text-center"
          name="page"
          defaultValue={currentPageNumber}
          onChange={(e) => {
            const targetPageNumber = parseInt(e.target.value);
            router.push(
              targetPageNumber === 1
                ? "/blog"
                : `/blog/page/${targetPageNumber}`
            );
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
}

export default Pagination