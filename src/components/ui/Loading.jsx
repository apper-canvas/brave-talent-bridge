import React from 'react'

const Loading = ({ type = 'default' }) => {
  if (type === 'jobs') {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shimmer"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded-lg mb-2 shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-3/4 shimmer"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16 shimmer"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20 shimmer"></div>
                  </div>
                </div>
              </div>
              <div className="h-10 w-24 bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'profile') {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-8 border border-gray-100 animate-pulse">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full shimmer"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded-lg mb-3 w-1/3 shimmer"></div>
              <div className="h-5 bg-gray-200 rounded-lg mb-2 w-1/2 shimmer"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/4 shimmer"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 border border-gray-100 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg mb-6 w-1/4 shimmer"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-l-4 border-gray-200 pl-4">
                <div className="h-5 bg-gray-200 rounded-lg mb-2 w-1/3 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-1 w-1/2 shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}

export default Loading