import React from 'react'
import HeroSection from '@/components/organisms/HeroSection'
import FeaturedJobs from '@/components/organisms/FeaturedJobs'
import CompanySection from '@/components/organisms/CompanySection'
import ApplicationTracker from '@/components/organisms/ApplicationTracker'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedJobs />
      <CompanySection />
      <ApplicationTracker />
    </div>
  )
}

export default Home