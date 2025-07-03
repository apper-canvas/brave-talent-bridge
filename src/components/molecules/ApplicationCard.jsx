import React from 'react'
import { format } from 'date-fns'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ApplicationCard = ({ application, job, onViewJob, onWithdraw }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'reviewing':
        return 'info'
      case 'interview':
        return 'secondary'
      case 'hired':
        return 'success'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Clock'
      case 'reviewing':
        return 'Eye'
      case 'interview':
        return 'Calendar'
      case 'hired':
        return 'CheckCircle'
      case 'rejected':
        return 'XCircle'
      default:
        return 'FileText'
    }
  }
  
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not specified'
    
    if (typeof salary === 'object') {
      const { min, max } = salary
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
  
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {job?.company?.charAt(0) || 'C'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {job?.title}
              </h3>
              <p className="text-gray-600 font-medium">{job?.company}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                {job?.location}
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                Applied {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
                <ApperIcon name={getStatusIcon(application.status)} className="w-3 h-3" />
                {application.status}
              </Badge>
              <Badge variant="default">
                {formatSalary(job?.salary)}
              </Badge>
            </div>
            
            {application.coverLetter && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 line-clamp-2">
                  <strong>Cover Letter:</strong> {application.coverLetter}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewJob?.(job?.Id)}
            icon="Eye"
          >
            View Job
          </Button>
          
          {application.status?.toLowerCase() === 'pending' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onWithdraw?.(application.Id)}
              icon="Trash2"
            >
              Withdraw
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ApplicationCard