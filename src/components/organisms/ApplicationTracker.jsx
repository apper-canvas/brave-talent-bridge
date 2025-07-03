import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ApplicationCard from '@/components/molecules/ApplicationCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { ApplicationService } from '@/services/api/ApplicationService'
import { JobService } from '@/services/api/JobService'
import { toast } from 'react-toastify'

const ApplicationTracker = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const loadApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const allApplications = await ApplicationService.getAll()
      
      // Get job details for each application
      const applicationsWithJobs = await Promise.all(
        allApplications.map(async (application) => {
          try {
            const job = await JobService.getById(application.jobId)
            return { ...application, job }
          } catch (err) {
            console.error(`Failed to load job ${application.jobId}:`, err)
            return { ...application, job: null }
          }
        })
      )
      
      setApplications(applicationsWithJobs)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load applications:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadApplications()
  }, [])
  
  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`)
  }
  
  const handleWithdraw = async (applicationId) => {
    try {
      await ApplicationService.delete(applicationId)
      toast.success('Application withdrawn successfully')
      loadApplications()
    } catch (err) {
      toast.error('Failed to withdraw application')
      console.error('Failed to withdraw application:', err)
    }
  }
  
  const handleViewAll = () => {
    navigate('/applications')
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadApplications} type="applications" />
  if (applications.length === 0) return <Empty type="applications" onAction={() => navigate('/jobs')} />
  
  // Show only the 3 most recent applications
  const recentApplications = applications.slice(0, 3)
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Recent <span className="gradient-text">Applications</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track the progress of your job applications and stay updated on their status
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          {recentApplications.map((application) => (
            <ApplicationCard
              key={application.Id}
              application={application}
              job={application.job}
              onViewJob={handleViewJob}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAll}
            icon="FileText"
            className="shadow-sm"
          >
            View All Applications
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ApplicationTracker