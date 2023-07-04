import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ListProps {
  items: Array<{
    text: string
  }>
}

const List: React.FC<ListProps> = ({items}) => {

  return (
    <ul className="list">
      {items.map((item, idx) => (
        <li key={`list-item-${idx}`}>
          <FontAwesomeIcon icon={faCircle} width={18} size="lg"/>
          {item.text}
        </li>
      ))}
    </ul>
  )
}

export default List