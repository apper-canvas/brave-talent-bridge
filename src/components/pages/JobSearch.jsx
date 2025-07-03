import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import FilterPanel from '@/components/molecules/FilterPanel'
import JobCard from '@/components/molecules/JobCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { JobService } from '@/services/api/JobService'
import { toast } from 'react-toastify'

const JobSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 10
  
  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const allJobs = await JobService.getAll()
      setJobs(allJobs)
      setFilteredJobs(allJobs)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load jobs:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadJobs()
  }, [])
  
  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, filters])
  
  const filterJobs = () => {
    let filtered = [...jobs]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    // Company filter
    if (filters.company) {
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      )
    }
    
    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job =>
        job.type.toLowerCase() === filters.jobType.toLowerCase()
      )
    }
    
    // Salary filter
    if (filters.salaryMin || filters.salaryMax) {
      filtered = filtered.filter(job => {
        if (!job.salary || typeof job.salary !== 'object') return true
        
        const { min, max } = job.salary
        const minSalary = parseInt(filters.salaryMin) || 0
        const maxSalary = parseInt(filters.salaryMax) || Infinity
        
        return (min >= minSalary && max <= maxSalary)
      })
    }
    
    setFilteredJobs(filtered)
    setCurrentPage(1)
  }
  
  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term) {
      setSearchParams({ q: term })
    } else {
      setSearchParams({})
    }
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }
  
  const handleApply = (jobId) => {
    toast.success('Application submitted successfully!')
    // In a real app, this would create an application record
  }
  
  const handleClearFilters = () => {
    setSearchTerm('')
    setFilters({})
    setSearchParams({})
  }
  
  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  if (loading) return <Loading type="jobs" />
  if (error) return <Error message={error} onRetry={loadJobs} type="jobs" />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect <span className="gradient-text">Job</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search through thousands of job opportunities from top companies
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search jobs, companies, or skills..."
            />
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            {(searchTerm || Object.values(filters).some(v => v)) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                icon="X"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3">
            {filteredJobs.length === 0 ? (
              <Empty
                type="jobs"
                onAction={handleClearFilters}
                actionLabel="Clear Filters"
              />
            ) : (
              <>
                <div className="space-y-6">
                  {currentJobs.map((job) => (
                    <JobCard
                      key={job.Id}
                      job={job}
                      onApply={handleApply}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      icon="ChevronLeft"
                    />
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      icon="ChevronRight"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSearch