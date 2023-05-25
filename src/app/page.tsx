'use client'
import FeatureRow from "@/components/sections/FeatureRow/FeatureRow"
import Testimonials from '@/components/sections/Testimonials/Testimonials'
import FakeMessageBox from '@/components/elements/FakeMessageBox/FakeMessageBox'
import Hero from '@/components/sections/Hero/Hero'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-20 py-24">
      <Hero />
      <FeatureRow />
      <Testimonials />
    </main>
  )
}
