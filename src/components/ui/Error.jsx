import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry, type = 'default' }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'jobs':
        return {
          icon: 'BriefcaseX',
          title: 'Unable to Load Jobs',
          description: 'We couldn\'t fetch the latest job listings. Please check your connection and try again.',
        }
      case 'profile':
        return {
          icon: 'UserX',
          title: 'Profile Not Found',
          description: 'We couldn\'t load your profile information. Please try refreshing the page.',
        }
      case 'applications':
        return {
          icon: 'FileX',
          title: 'Applications Unavailable',
          description: 'We couldn\'t load your application history. Please try again later.',
        }
      default:
        return {
          icon: 'AlertCircle',
          title: 'Oops! Something went wrong',
          description: message,
        }
    }
  }

  const { icon, title, description } = getErrorContent()

  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-center gap-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 btn-scale focus-ring"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4" />
              Try Again
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 btn-scale focus-ring"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error