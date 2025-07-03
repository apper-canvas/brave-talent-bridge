import React, { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const FilterPanel = ({ onFilterChange, className = '' }) => {
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    company: '',
  })
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
  ]
  
  const experienceLevels = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive',
  ]
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }
  
  const clearFilters = () => {
    const emptyFilters = {
      location: '',
      jobType: '',
      salaryMin: '',
      salaryMax: '',
      experience: '',
      company: '',
    }
    setFilters(emptyFilters)
    onFilterChange?.(emptyFilters)
  }
  
  const hasActiveFilters = Object.values(filters).some(value => value !== '')
  
  return (
    <Card className={`sticky top-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              icon="X"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? 'ChevronDown' : 'ChevronUp'}
          />
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              placeholder="Enter city or remote"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              icon="MapPin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <Input
              placeholder="Company name"
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              icon="Building"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Job Type
            </label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    checked={filters.jobType === type}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Experience Level
            </label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value={level}
                    checked={filters.experience === level}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Salary Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={filters.salaryMin}
                onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                icon="DollarSign"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.salaryMax}
                onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                icon="DollarSign"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default FilterPanel