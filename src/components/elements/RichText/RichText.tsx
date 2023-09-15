import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import H4 from "./H4/H4"
import { ListItem }  from "./List/List"

const RichText: React.FC<{htmlString: string}> = ({htmlString}) => {
  return (
    <ReactMarkdown
      components={{
        p: ({...props}) => {
          return <p className="mb-4" {...props} />
        },
        h4: ({...props}) => {
          return <H4 {...props} />
        },
        li: ({...props}) => {
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