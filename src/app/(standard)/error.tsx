"use client"
import { ErrorHandler } from '@/components/sections/ErrorHandler/ErrorHandler'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorHandler reset={reset} />
}