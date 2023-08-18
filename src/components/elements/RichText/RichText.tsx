import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import H4 from "./H4/H4"
import { ListItem }  from "./List/List"

const RichText: React.FC<{htmlString: string}> = ({htmlString}) => {
  return (
    <ReactMarkdown
      components={{
        p: ({node, ...props}) => {
          return <p className="mb-4" {...props} />
        },
        h4: ({node, ...props}) => {
          return <H4 {...props} />
        },
        li: ({node, ...props}) => {
          return <ListItem {...props} />
        }
      }}
      rehypePlugins={[rehypeRaw]} 
    >
      {htmlString}
    </ReactMarkdown>
  )
}

export default RichText