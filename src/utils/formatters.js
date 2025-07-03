export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return 'N/A'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A'
  
  const dateObj = new Date(date)
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const formats = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    relative: null, // Handle separately
  }
  
  if (format === 'relative') {
    const now = new Date()
    const diffInMs = now - dateObj
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }
  
  return dateObj.toLocaleDateString('en-US', formats[format])
}

export const formatNumber = (num) => {
  if (typeof num !== 'number') return 'N/A'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatSalaryRange = (salary) => {
  if (!salary) return 'Salary not specified'
  
  if (typeof salary === 'object') {
    const { min, max, currency = 'USD' } = salary
    
    if (min && max) {
      return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`
    }
    if (min) return `${formatCurrency(min, currency)}+`
    if (max) return `Up to ${formatCurrency(max, currency)}`
  }
  
  return salary
}