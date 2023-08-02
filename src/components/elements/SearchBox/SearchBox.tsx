import { MagnifyingGlass } from "@/components/icons/MagnifyingGlass"
import classNames from "classnames"

const SearchBox: React.FC<{placeholder: string}> = ({ placeholder }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        // @TODO searchBox function
      }}
    >
      <span className="absolute py-2 pl-3">
        <MagnifyingGlass />
      </span>
      <input
        className={classNames(
          "w-full bg-slate-100 pl-10 pr-3 py-2 rounded-3xl font-extralight focus:outline-none focus:shadow-inner"
        )}
        placeholder={placeholder}
      />
    </form>
  )
}

export default SearchBox