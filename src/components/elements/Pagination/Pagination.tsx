'use client'
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Pagination: React.FC<{totalPages: number, currentPageNumber?: number}> = ({totalPages, currentPageNumber = 1}) => {
  const router = useRouter()
  return (
    <div className="relative w-full flex flex-col items-center gap-5 my-12">
      <div className="flex justify-center gap-5">
        <Link
          href={(currentPageNumber - 1 === 1) ? "/blog" : `/blog/page/${currentPageNumber - 1}`}
          className={classNames(
            "py-2 px-4 rounded-md border-2 border-primary-600 text-primary-600",
            { hidden: currentPageNumber <= 1 }
          )}
        >
          Previous
        </Link>
        <Link 
          href={`/blog/page/${currentPageNumber + 1}`}
          className={classNames(
            "py-2 px-8 rounded-md border-2 border-primary-600 bg-primary-600 text-white",
          )}
        >
          Next page
        </Link>
      </div>
      <div className="xl:absolute right-0 bottom-0">
        Page 
        <select
          className="border-slate-400 border w-14 inline-block p-2 mx-2 rounded-md text-center"
          name="page"
          defaultValue={currentPageNumber} 
          onChange={(e) => {
            const targetPageNumber = parseInt(e.target.value)
            router.push(targetPageNumber === 1 ? "/blog" : `/blog/page/${targetPageNumber}`)
          }}
        >
          {Array.from({length: totalPages}, (_, i) => i + 1).map(pageNumber => (
            <option key={pageNumber} value={pageNumber}>
              {pageNumber}
            </option>
          ))}
        </select>
        of {totalPages}
      </div>
    </div>
  )
}

export default Pagination