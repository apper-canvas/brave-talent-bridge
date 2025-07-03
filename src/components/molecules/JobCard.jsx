import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const JobCard = ({ job, onApply, applied = false }) => {
  const navigate = useNavigate()
  
  const handleViewDetails = () => {
    navigate(`/jobs/${job.Id}`)
  }
  
  const handleApply = (e) => {
    e.stopPropagation()
    onApply?.(job.Id)
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
  
  return (
    <Card hover className="cursor-pointer" onClick={handleViewDetails}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {job.company?.charAt(0) || 'C'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1 hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                {format(new Date(job.postedDate), 'MMM dd, yyyy')}
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getJobTypeColor(job.type)}>
                {job.type}
              </Badge>
              <Badge variant="default">
                {formatSalary(job.salary)}
              </Badge>
            </div>
            
            <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col gap-2">
          <Button
            variant={applied ? 'accent' : 'primary'}
            size="sm"
            onClick={handleApply}
            disabled={applied}
            icon={applied ? 'Check' : 'Send'}
          >
            {applied ? 'Applied' : 'Apply'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            icon="Eye"
          >
            View
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default JobCard