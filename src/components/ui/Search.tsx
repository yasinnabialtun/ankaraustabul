'use client'

import React, { useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  variant?: 'default' | 'glass' | 'neumorphism'
  showClearButton?: boolean
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Ara...",
  onSearch,
  className,
  variant = 'default',
  showClearButton = true
}) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch?.(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          variant={variant}
          className="pr-20"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {showClearButton && query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            className="h-8 px-3"
          >
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Search