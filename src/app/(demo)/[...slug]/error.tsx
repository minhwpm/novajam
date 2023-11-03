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
    <div className="mx-auto p-4 flex flex-col max-w-2xl justify-center min-h-[80vh]">
      <h2 className="font-bold text-4xl lg:text-6xl mb-8">
        Page not found
      </h2>
      <div className="text-neutral-900 prose lg:prose-lg">
        <p>We’re sorry, the page you were looking for couldn’t be found. The link you followed may either be broken or no longer exist.</p>
        <p>Please try again, or click the button below:</p>
      </div>
      <Button url="/" variant="link">
        Go to Homepage
      </Button>
    </div>
  );
}