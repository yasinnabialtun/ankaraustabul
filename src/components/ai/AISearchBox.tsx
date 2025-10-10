'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useAISearch, useAISuggestions, useAICategoryDetection } from '@/hooks/useAISearch'
import { cn } from '@/lib/utils'

interface AISearchBoxProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
  showSuggestions?: boolean
  showTrending?: boolean
}

export function AISearchBox({
  onSearch,
  placeholder = "Ne tür bir usta arıyorsunuz? (AI destekli arama)",
  className,
  showSuggestions = true,
  showTrending = true
}: AISearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { query, results, isLoading, suggestions, trendingSearches, search, clearSearch } = useAISearch()
  const { suggestions: aiSuggestions } = useAISuggestions(query)
  const { detectedCategory, confidence } = useAICategoryDetection(query)

  const handleSearch = (searchQuery: string) => {
    search(searchQuery)
    setShowResults(true)
    onSearch?.(searchQuery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    handleSearch(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    clearSearch()
    setShowResults(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResults(false)
      inputRef.current?.blur()
    }
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={cn(
            "h-16 text-lg pl-16 pr-20 transition-all duration-300",
            isFocused && "ring-2 ring-primary/50 shadow-lg",
            showResults && "rounded-b-none"
          )}
          variant="glass"
        />
        
        {/* Search Icon */}
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
          ) : (
            <Search className="w-6 h-6 text-muted-foreground" />
          )}
        </div>

        {/* AI Badge */}
        <div className="absolute left-12 top-1/2 transform -translate-y-1/2">
          <Badge variant="neon" className="text-xs px-2 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            AI
          </Badge>
        </div>

        {/* Clear Button */}
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}

        {/* Search Button */}
        <Button
          size="lg"
          className="absolute right-2 top-2 h-12 px-6"
          onClick={() => handleSearch(query)}
          disabled={!query.trim()}
        >
          Ara
        </Button>
      </div>

      {/* AI Detection Badge */}
      {detectedCategory && confidence > 0.5 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-2"
        >
          <Badge variant="gradient" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            {detectedCategory} kategorisi tespit edildi ({Math.round(confidence * 100)}%)
          </Badge>
        </motion.div>
      )}

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (query || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-border z-50 max-h-96 overflow-y-auto"
          >
            {/* AI Suggestions */}
            {showSuggestions && aiSuggestions.length > 0 && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">AI Önerileri</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Sonuçlar ({results.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{result.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {result.category}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {Math.round(result.confidence * 100)}% eşleşme
                                </Badge>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {showTrending && !query && (
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Popüler Aramalar
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestionClick(trend)}
                      className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors flex items-center gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      {trend}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && !isLoading && (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  "{query}" için sonuç bulunamadı
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Farklı anahtar kelimeler deneyin
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-muted-foreground">AI arama yapılıyor...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Quick Search Component for smaller spaces
export function QuickAISearch({ onSearch, className }: { onSearch?: (query: string) => void, className?: string }) {
  const [query, setQuery] = useState('')
  const { search } = useAISearch()

  const handleSearch = (searchQuery: string) => {
    search(searchQuery)
    onSearch?.(searchQuery)
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder="AI ile ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        className="pr-10"
      />
      <Button
        size="sm"
        className="absolute right-1 top-1 h-8 px-3"
        onClick={() => handleSearch(query)}
        disabled={!query.trim()}
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  )
}
