export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined && value !== ''
}

export const validateMinLength = (value, minLength) => {
  if (typeof value !== 'string') return false
  return value.length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  if (typeof value !== 'string') return false
  return value.length <= maxLength
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type)
}

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  return file.size <= maxSizeInBytes
}

export const createValidator = (rules) => {
  return (value) => {
    for (const rule of rules) {
      const result = rule(value)
      if (result !== true) {
        return result
      }
    }
    return true
  }
}

// Common validation rules
export const rules = {
  required: (message = 'This field is required') => (value) => 
    validateRequired(value) || message,
  
  email: (message = 'Please enter a valid email address') => (value) => 
    !value || validateEmail(value) || message,
  
  phone: (message = 'Please enter a valid phone number') => (value) => 
    !value || validatePhone(value) || message,
  
  minLength: (length, message) => (value) => 
    !value || validateMinLength(value, length) || message || `Must be at least ${length} characters`,
  
  maxLength: (length, message) => (value) => 
    !value || validateMaxLength(value, length) || message || `Must be no more than ${length} characters`,
  
  url: (message = 'Please enter a valid URL') => (value) => 
    !value || validateUrl(value) || message,
}