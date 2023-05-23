'use client'
import Image from 'next/image'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"
import Testimonials from '@/components/sections/Testimonials/Testimonials'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="px-4 lg:px-32 mb-24">
        <FeatureRow />
      </div>
      <Testimonials />
    </main>
  )
}
