const SlidingText = ({content}) => {
  return (
    <span className="inline-flex text-center h-[51px] w-64 text-orange-300 relative">
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
