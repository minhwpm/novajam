'use client'
import Image from 'next/image'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import FakeMessageBox from '@/components/elements/FakeMessageBox/FakeMessageBox'
import SlidingText from '@/components/elements/SlidingText/SlidingText'

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between py-24">
    <main className="py-24">
      <div className="mb-24 py-16 flex flex-col items-center bg-gradient-to-b from-blue-950 from-45% to-blue-700 to-100%">
        <div className="text-center mb-10">
          <h1 className="font-semibold text-5xl text-white leading-snug max-w-screen-lg mx-auto mb-8">
            Turn your website visitors into customers with{" "}
            <SlidingText content={[
              { text: "live chat"},
              { text: "chatbots"},
              { text: "ticketing"},
            ]}/>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-screen-md mx-auto">
          Tidio is a top-rated platform for small and medium businesses to grow sales through outstanding customer service.
          </p>

        </div>
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
