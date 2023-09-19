// Constrains the maximum width of page content.
interface Props {
  children: React.ReactNode
}

export default function Container ({children}: Props) {
  return (
    <div className="container mx-auto px-4">
      {children}
    </div>
  )
}