"use client"
import { Button } from '@/components/elements/Button/Button'
 
export const ErrorHandler: React.FC<{
  reset: () => void;
}> = ({ reset }) => {
  return (
    <div className="mx-auto p-4 flex flex-col max-w-3xl justify-center items-center pt-32 pb-20 min-h-screen">
      <h2 className="font-bold text-4xl lg:text-6xl mb-8">
        Something went wrong!
      </h2>
      <div className="text-neutral-900 prose 2xl:prose-lg">
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
        <Button onClick={() => reset()}>Try again</Button>
        <span className="text-neutral-500 px-6">OR</span>
        <Button url="/" withArrow={true} variant="ghost">
          Go to Home page
        </Button>
      </div>
    </div>
  );
};