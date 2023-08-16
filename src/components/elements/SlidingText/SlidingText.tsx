interface Props {
  content: Array<string>
}

const SlidingText = ({content}: Props) => {
  return (
    <span className="inline-flex text-center h-[40px] w-40 lg:w-60 lg:h-[51px] text-secondary-500">
      {content.map((item, idx) => (
        <span
          key={item}  
          className="opacity-0 flex items-center animate-slidingText absolute"
          style={{ 
            animationDelay: `${idx*3.33}s`
          }}
        >
          {item}
        </span>
      ))}
    </span>
  )
}

export default SlidingText
