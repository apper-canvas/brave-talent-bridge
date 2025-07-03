import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { path: '/jobs', label: 'Find Jobs', icon: 'Search' },
    { path: '/profile', label: 'My Profile', icon: 'User' },
    { path: '/applications', label: 'Applications', icon: 'FileText' },
    { path: '/companies', label: 'Companies', icon: 'Building' },
  ]
  
  const isActive = (path) => location.pathname === path
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Briefcase" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">TalentBridge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile')}
              icon="Settings"
            >
              Settings
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/jobs')}
              icon="Plus"
            >
              Post Job
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            icon={isMobileMenuOpen ? 'X' : 'Menu'}
            className="md:hidden"
          />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate('/profile')
                  setIsMobileMenuOpen(false)
                }}
                icon="Settings"
                className="w-full"
              >
                Settings
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  navigate('/jobs')
                  setIsMobileMenuOpen(false)
                }}
                icon="Plus"
                className="w-full"
              >
                Post Job
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header