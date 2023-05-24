'use client'
import Image from 'next/image'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import FakeMessageBox from '@/components/elements/FakeMessageBox/FakeMessageBox'

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between py-24">
    <main className="py-24">
      <div className="mb-24 flex justify-center">
        <div className="w-full md:w-[600px] h-[500px]">
          <FakeMessageBox />
        </div>
      </div>
      <div className="px-4 lg:px-32 mb-24">
        <FeatureRow />
      </div>
      <Testimonials />
    </main>
  )
}
