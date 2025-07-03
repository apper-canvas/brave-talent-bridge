import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '@/components/molecules/JobCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { JobService } from '@/services/api/JobService'
import { toast } from 'react-toastify'

const FeaturedJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const loadFeaturedJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const allJobs = await JobService.getAll()
      // Get the 6 most recent jobs as featured
      const featuredJobs = allJobs.slice(0, 6)
      setJobs(featuredJobs)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load featured jobs:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadFeaturedJobs()
  }, [])
  
  const handleApply = (jobId) => {
    toast.success('Application submitted successfully!')
    // In a real app, this would create an application record
  }
  
  const handleViewAll = () => {
    navigate('/jobs')
  }
  
  if (loading) return <Loading type="jobs" />
  if (error) return <Error message={error} onRetry={loadFeaturedJobs} type="jobs" />
  if (jobs.length === 0) return <Empty type="jobs" onAction={handleViewAll} />
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="gradient-text">Job Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked job opportunities from top companies across various industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job) => (
            <JobCard
              key={job.Id}
              job={job}
              onApply={handleApply}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleViewAll}
            icon="ArrowRight"
            className="shadow-lg"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs