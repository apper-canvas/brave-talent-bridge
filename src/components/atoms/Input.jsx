import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  iconPosition = 'left',
  error,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  
  const stateClasses = error 
    ? "border-error focus:ring-error" 
    : "border-gray-300 focus:ring-primary hover:border-gray-400"
  
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : ''
  
  return (
    <div className="relative">
      {icon && (
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${iconPosition === 'left' ? 'left-4' : 'right-4'} pointer-events-none`}>
          <ApperIcon name={icon} className={`w-5 h-5 ${error ? 'text-error' : 'text-gray-400'}`} />
        </div>
      )}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${iconClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <div className="flex items-center gap-2 mt-2 text-error text-sm">
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
}

export default Input