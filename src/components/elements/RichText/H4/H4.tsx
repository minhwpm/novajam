const H4: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <h4 className="text-[1.3em] font-semibold mb-5">
      {children}
    </h4>
  )
}

export default H4