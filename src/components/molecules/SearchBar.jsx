import React, { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search jobs, companies, or skills...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          icon="Search"
          className="text-base"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        icon="Search"
        className="px-8"
      >
        Search
      </Button>
    </form>
  )
}

export default SearchBar