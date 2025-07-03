import React, { useState, useEffect } from 'react'
import ApplicationCard from '@/components/molecules/ApplicationCard'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { ApplicationService } from '@/services/api/ApplicationService'
import { JobService } from '@/services/api/JobService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Applications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  
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
  
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status?.toLowerCase() === filter.toLowerCase()
  })
  
  const statusCounts = applications.reduce((acc, app) => {
    const status = app.status?.toLowerCase() || 'pending'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})
  
  const filterOptions = [
    { value: 'all', label: 'All Applications', count: applications.length },
    { value: 'pending', label: 'Pending', count: statusCounts.pending || 0 },
    { value: 'reviewing', label: 'Under Review', count: statusCounts.reviewing || 0 },
    { value: 'interview', label: 'Interview', count: statusCounts.interview || 0 },
    { value: 'hired', label: 'Hired', count: statusCounts.hired || 0 },
    { value: 'rejected', label: 'Rejected', count: statusCounts.rejected || 0 },
  ]
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadApplications} type="applications" />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My <span className="gradient-text">Applications</span>
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage your job applications
          </p>
        </div>
        
        {applications.length === 0 ? (
          <Empty
            type="applications"
            onAction={() => navigate('/jobs')}
            actionLabel="Browse Jobs"
          />
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                    className="flex items-center gap-2"
                  >
                    {option.label}
                    <Badge variant="default" size="xs">
                      {option.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Applications List */}
            {filteredApplications.length === 0 ? (
              <Empty
                type="applications"
                onAction={() => setFilter('all')}
                actionLabel="View All Applications"
              />
            ) : (
              <div className="space-y-6">
                {filteredApplications.map((application) => (
                  <ApplicationCard
                    key={application.Id}
                    application={application}
                    job={application.job}
                    onViewJob={handleViewJob}
                    onWithdraw={handleWithdraw}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Applications