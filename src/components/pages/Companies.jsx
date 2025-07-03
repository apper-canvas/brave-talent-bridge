import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Input from '@/components/atoms/Input'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { CompanyService } from '@/services/api/CompanyService'
import ApperIcon from '@/components/ApperIcon'

const Companies = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const allCompanies = await CompanyService.getAll()
      setCompanies(allCompanies)
      setFilteredCompanies(allCompanies)
    } catch (err) {
      setError(err.message)
      console.error('Failed to load companies:', err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadCompanies()
  }, [])
  
  useEffect(() => {
    filterCompanies()
  }, [companies, searchTerm])
  
  const filterCompanies = () => {
    if (!searchTerm) {
      setFilteredCompanies(companies)
      return
    }
    
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setFilteredCompanies(filtered)
  }
  
  const handleViewCompany = (companyId) => {
    navigate(`/companies/${companyId}`)
  }
  
  const handleViewJobs = (companyName) => {
    navigate(`/jobs?company=${encodeURIComponent(companyName)}`)
  }
  
  const getIndustryColor = (industry) => {
    switch (industry?.toLowerCase()) {
      case 'technology':
        return 'primary'
      case 'finance':
        return 'accent'
      case 'healthcare':
        return 'secondary'
      case 'education':
        return 'info'
      case 'retail':
        return 'warning'
      default:
        return 'default'
    }
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCompanies} />
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore <span className="gradient-text">Companies</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover great companies and find your next opportunity
          </p>
          
          <div className="max-w-md">
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="Search"
            />
          </div>
        </div>
        
        {filteredCompanies.length === 0 ? (
          <Empty
            type="search"
            onAction={() => setSearchTerm('')}
            actionLabel="Clear Search"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card
                key={company.Id}
                hover
                className="cursor-pointer"
                onClick={() => handleViewCompany(company.Id)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {company.name?.charAt(0) || 'C'}
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    {company.name}
                  </h3>
                  
                  {company.industry && (
                    <Badge variant={getIndustryColor(company.industry)} className="mb-3">
                      {company.industry}
                    </Badge>
                  )}
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {company.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Users" className="w-4 h-4" />
                      {company.size || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <ApperIcon name="Briefcase" className="w-4 h-4" />
                      {company.openJobs || 0} open jobs
                    </div>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewJobs(company.name)
                      }}
                      icon="ArrowRight"
                    >
                      View Jobs
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Companies