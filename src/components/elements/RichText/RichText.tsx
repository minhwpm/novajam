import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { ListItem }  from "./ListItem/ListItem"

const RichText: React.FC<{htmlString: string}> = ({htmlString}) => {
  return (
    <ReactMarkdown
      components={{
        li: ({...props}) => {
          return <ListItem {...props} />
        },
        // @TODO: parse Image, Blockquote, Table
      }}
      rehypePlugins={[rehypeRaw]} 
    >
      {htmlString}
    </ReactMarkdown>
  )
}

export default RichText