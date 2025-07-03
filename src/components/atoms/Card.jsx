import React from 'react'

const Card = ({ 
  children, 
  className = '',
  hover = false,
  padding = 'md',
  ...props 
}) => {
  const baseClasses = "bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200"
  
  const hoverClasses = hover 
    ? "card-hover cursor-pointer hover:shadow-lg" 
    : ""
  
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  }
  
// Filter out React-specific props that shouldn't reach DOM
  const { 
    isEditing, 
    isediting, 
    onSave, 
    onCancel, 
    onEdit,
    ...domProps 
  } = props;

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
      {...domProps}
    >
      {children}
    </div>
  )
}

export default Card