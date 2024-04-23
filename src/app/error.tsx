"use client"
import { Button } from '@/components/elements/Button/Button'
import { useEffect } from 'react'
 
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto p-4 flex flex-col max-w-3xl justify-center items-center pt-32 pb-20 min-h-screen">
      <h2 className="font-bold text-4xl lg:text-6xl mb-8">
        Something went wrong
      </h2>
      <div className="text-neutral-500 prose lg:prose-lg">
        <p>
          We’re sorry, the page you were looking for couldn’t be found. The link
          you followed may either be broken or no longer exist.
        </p>
        <p>
          Please try again, or go back to Home page by clicking the buttons
          below:
        </p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
        <Button
          data={{
            text: "Try again",
            url: null,
            withArrow: false,
            buttonVariant: "primary",
            openNewTab: false,
          }}
          onClick={() => reset()}
          size="lg"
        />
        <span className="text-neutral-500 px-6">OR</span>
        <Button
          data={{
            text: "Go to Home page",
            url: "/",
            withArrow: true,
            buttonVariant: "ghost",
            openNewTab: false,
          }}
          size="lg"
        />
      </div>
    </div>
  )
}