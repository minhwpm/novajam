import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ListItem = ({children} : {children: React.ReactNode}) => {
  return (
    <li className="flex gap-4 pl-5">
      <FontAwesomeIcon icon={faCircle} width={5} size="xs" color="lightGray" />
      {children}
    </li>
  )
}
