'use client' // Error components must be Client Components
 
import Button from '@/components/elements/Button/Button'
import { useEffect } from 'react'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ERROR", error)
  }, [error])
 
  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="font-bold text-center uppercase text-4xl lg:text-6xl mb-5">
        Page Not Found
      </h2>
      <Button url="/" variant="link">
        Go to Homepage
      </Button>
    </div>
  );
}