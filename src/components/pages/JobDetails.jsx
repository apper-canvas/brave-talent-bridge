import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import companiesData from "@/services/mockData/companies.json";
import applicationsData from "@/services/mockData/applications.json";
import jobsData from "@/services/mockData/jobs.json";
import userData from "@/services/mockData/user.json";
import { JobService } from "@/services/api/JobService";

const JobDetails = () => {
const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [applying, setApplying] = useState(false)
  
  // Validate ID parameter early
  const jobId = id ? parseInt(id, 10) : null
  const isValidId = jobId && !isNaN(jobId) && jobId > 0
  
  const loadJob = async () => {
    // Early validation before API call
    if (!isValidId) {
      setError(`Invalid job ID: ${id}`)
      console.error('Invalid job ID provided:', id)
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      const jobData = await JobService.getById(jobId)
      setJob(jobData)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load job:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (!isValidId) {
      // Handle invalid ID immediately
      setError(`Invalid job ID: ${id || 'undefined'}`)
      return
    }
    loadJob()
  }, [id, isValidId])
  
  // Early return for invalid ID with navigation option
  if (!isValidId && !loading) {
    return (
      <div className="min-h-screen bg-surface pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Error 
            message={`Invalid job ID: ${id || 'not provided'}`}
            onRetry={() => navigate('/jobs')}
            type="not-found"
          />
        </div>
      </div>
    )
  }
  
  const handleApply = async () => {
    try {
      setApplying(true)
      // In a real app, this would create an application record
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Application submitted successfully!')
    } catch (err) {
      toast.error('Failed to submit application')
      console.error('Failed to apply:', err)
    } finally {
      setApplying(false)
    }
  }
  
  const handleSaveJob = () => {
    toast.success('Job saved to your favorites!')
  }
  
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified'
    
    if (typeof salary === 'object') {
      const { min, max, currency = 'USD' } = salary
      const formatAmount = (amount) => {
        if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`
        if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`
        return amount.toString()
      }
      
      if (min && max) {
        return `$${formatAmount(min)} - $${formatAmount(max)}`
      }
      if (min) return `$${formatAmount(min)}+`
      if (max) return `Up to $${formatAmount(max)}`
    }
    
    return salary
  }
  
  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'full-time':
        return 'primary'
      case 'part-time':
        return 'secondary'
      case 'contract':
        return 'accent'
      case 'freelance':
        return 'warning'
      case 'internship':
        return 'info'
      default:
        return 'default'
    }
  }
  
if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadJob} />
  if (!job) return <Error message="Job not found" onRetry={loadJob} />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            icon="ArrowLeft"
          >
            Back to Jobs
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
<Card>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {job?.company?.charAt(0) || 'C'}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job?.title}
                  </h1>
<p className="text-xl text-gray-600 mb-4">{job?.company}</p>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      {job?.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      Posted {job?.postedDate ? format(new Date(job.postedDate), 'MMM dd, yyyy') : 'Unknown'}
                    </div>
                  </div>
<div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={getJobTypeColor(job?.type)}>
                      {job?.type}
                    </Badge>
                    <Badge variant="default">
                      {formatSalary(job?.salary)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Job Description */}
<Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job?.description}
                </p>
              </div>
            </Card>
            
            {/* Requirements */}
{job?.requirements && job.requirements.length > 0 && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ApperIcon name="CheckCircle" className="w-5 h-5 text-accent mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            
            {/* Benefits */}
{job?.benefits && job.benefits.length > 0 && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ApperIcon name="Star" className="w-5 h-5 text-warning mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Apply for this job</h3>
              
<div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">{formatSalary(job?.salary)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium">{job?.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{job?.location}</span>
                </div>
{job?.applicationDeadline && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">
                      {format(new Date(job.applicationDeadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleApply}
                  loading={applying}
                  icon="Send"
                  className="w-full"
                >
                  Apply Now
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSaveJob}
                  icon="Heart"
                  className="w-full"
                >
                  Save Job
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Share this job</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Share"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Job link copied to clipboard!')
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails