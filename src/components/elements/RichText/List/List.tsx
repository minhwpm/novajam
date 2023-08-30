import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ListItem = ({children} : {children: React.ReactNode}) => {
  return (
    <li className="flex gap-4 pl-5">
      <FontAwesomeIcon
        className="mt-1.5 opacity-60"
        icon={faCircle}
        width={5}
      />
      {children}
    </li>
  )
}
