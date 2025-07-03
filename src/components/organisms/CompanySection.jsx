import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { CompanyService } from '@/services/api/CompanyService'
import ApperIcon from '@/components/ApperIcon'

const CompanySection = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const allCompanies = await CompanyService.getAll()
      // Get the top 8 companies
      const topCompanies = allCompanies.slice(0, 8)
      setCompanies(topCompanies)
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
  
  const handleViewCompany = (companyId) => {
    navigate(`/companies/${companyId}`)
  }
  
  const handleViewAll = () => {
    navigate('/companies')
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCompanies} />
  if (companies.length === 0) return <Empty onAction={handleViewAll} />
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top <span className="gradient-text">Companies</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore opportunities at industry-leading companies that are actively hiring
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {companies.map((company) => (
            <Card
              key={company.Id}
              hover
              className="cursor-pointer text-center"
              onClick={() => handleViewCompany(company.Id)}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {company.name?.charAt(0) || 'C'}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {company.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  {company.location}
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Briefcase" className="w-4 h-4" />
                  {company.openJobs} jobs
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAll}
            icon="Building"
            className="shadow-sm"
          >
            View All Companies
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CompanySection