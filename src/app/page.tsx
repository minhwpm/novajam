'use client'
import Image from 'next/image'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FeatureRow />
    </main>
  )
}
