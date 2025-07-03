import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const HeroSection = () => {
  const navigate = useNavigate()
  
  const handleSearch = (searchTerm) => {
    navigate(`/jobs?q=${encodeURIComponent(searchTerm)}`)
  }
  
  const stats = [
    { value: '10,000+', label: 'Active Jobs' },
    { value: '5,000+', label: 'Companies' },
    { value: '100,000+', label: 'Job Seekers' },
  ]
  
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-purple-700 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
            Find Your Dream Job
            <br />
            <span className="text-yellow-300">Today</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with top employers and discover opportunities that match your skills and career goals. Your next career move is just a search away.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search jobs, companies, or skills..."
              className="bg-white/10 backdrop-blur-md rounded-xl p-2"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/jobs')}
              icon="Search"
              className="bg-white text-primary hover:bg-gray-100 shadow-lg"
            >
              Browse All Jobs
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/profile')}
              icon="User"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Create Profile
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection