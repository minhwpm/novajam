interface Props {
  content: Array<{
    text: string
  }>
}

const SlidingText = ({content}: Props) => {
  return (
    <span className="inline-flex text-center h-[40px] w-40 lg:w-60 lg:h-[51px] text-orange-300">
      {content.map((item, idx) => (
        <span className="opacity-0 flex items-center animate-slidingText absolute" key={item.text}
          style={{ 
            animationDelay: `${idx*3.33}s`
          }}
        >
          {item.text}
        </span>
      ))}
    </span>
  )
}

export default SlidingText
