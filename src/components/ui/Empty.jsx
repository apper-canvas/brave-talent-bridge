import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ type = 'default', onAction, actionLabel = 'Get Started' }) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'jobs':
        return {
          icon: 'Search',
          title: 'No Jobs Found',
          description: 'We couldn\'t find any jobs matching your criteria. Try adjusting your filters or search terms.',
          actionLabel: 'Clear Filters',
          gradient: 'from-primary to-blue-600',
        }
      case 'applications':
        return {
          icon: 'FileText',
          title: 'No Applications Yet',
          description: 'You haven\'t applied to any jobs yet. Start exploring opportunities and submit your first application.',
          actionLabel: 'Browse Jobs',
          gradient: 'from-secondary to-purple-600',
        }
      case 'profile':
        return {
          icon: 'User',
          title: 'Complete Your Profile',
          description: 'Your profile is incomplete. Add your experience, skills, and resume to attract employers.',
          actionLabel: 'Complete Profile',
          gradient: 'from-accent to-green-600',
        }
      case 'search':
        return {
          icon: 'Target',
          title: 'Start Your Job Search',
          description: 'Enter keywords, location, or job title to find opportunities that match your skills.',
          actionLabel: 'Search Jobs',
          gradient: 'from-primary to-secondary',
        }
      default:
        return {
          icon: 'Sparkles',
          title: 'Nothing Here Yet',
          description: 'This section is empty. Take action to get started with your job search journey.',
          actionLabel: actionLabel,
          gradient: 'from-gray-400 to-gray-600',
        }
    }
  }

  const { icon, title, description, actionLabel: defaultActionLabel, gradient } = getEmptyContent()

  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="text-center max-w-md">
        <div className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
          <ApperIcon name={icon} className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        
        {onAction && (
          <button
            onClick={onAction}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-scale focus-ring`}
          >
            <ApperIcon name="ArrowRight" className="w-5 h-5" />
            {actionLabel || defaultActionLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default Empty