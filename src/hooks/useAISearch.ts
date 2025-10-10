import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { debounce } from '@/lib/utils'

interface AISearchResult {
  id: string
  name: string
  category: string
  description: string
  confidence: number
  suggestions?: string[]
}

interface AISearchOptions {
  debounceMs?: number
  maxResults?: number
  minConfidence?: number
}

export function useAISearch(options: AISearchOptions = {}) {
  const {
    debounceMs = 300,
    maxResults = 10,
    minConfidence = 0.7
  } = options

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AISearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock AI search function - in real app, this would call OpenAI API
  const performAISearch = useCallback(async (searchQuery: string): Promise<AISearchResult[]> => {
    if (!searchQuery.trim()) return []

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock AI search results based on query
    const mockResults: AISearchResult[] = [
      {
        id: '1',
        name: 'Elektrik Ustası - Ahmet Yılmaz',
        category: 'Elektrik',
        description: '15 yıl deneyimli elektrik ustası. Ev ve işyeri elektrik tesisatı, arıza giderme.',
        confidence: 0.95,
        suggestions: ['elektrik arızası', 'elektrik tesisatı', 'elektrikçi']
      },
      {
        id: '2',
        name: 'Su Tesisatçısı - Mehmet Kaya',
        category: 'Su Tesisatı',
        description: 'Su tesisatı uzmanı. Tıkanıklık açma, boru değişimi, musluk tamiri.',
        confidence: 0.88,
        suggestions: ['su tesisatı', 'tıkanıklık açma', 'boru değişimi']
      },
      {
        id: '3',
        name: 'Temizlik Hizmetleri - Ayşe Demir',
        category: 'Temizlik',
        description: 'Profesyonel temizlik hizmetleri. Ev, ofis, cam temizliği.',
        confidence: 0.82,
        suggestions: ['ev temizliği', 'ofis temizliği', 'cam temizliği']
      },
      {
        id: '4',
        name: 'Mobilya Ustası - Ali Özkan',
        category: 'Mobilya',
        description: 'Mobilya montajı, tamiri ve özel tasarım mobilya yapımı.',
        confidence: 0.79,
        suggestions: ['mobilya montajı', 'mobilya tamiri', 'özel mobilya']
      },
      {
        id: '5',
        name: 'Boyacı - Fatma Şen',
        category: 'Boyacılık',
        description: 'İç ve dış cephe boyama, dekoratif boyama teknikleri.',
        confidence: 0.76,
        suggestions: ['iç cephe boyama', 'dış cephe boyama', 'dekoratif boyama']
      }
    ]

    // Filter results based on query similarity (mock AI logic)
    const filteredResults = mockResults
      .filter(result => {
        const queryLower = searchQuery.toLowerCase()
        const nameMatch = result.name.toLowerCase().includes(queryLower)
        const categoryMatch = result.category.toLowerCase().includes(queryLower)
        const descriptionMatch = result.description.toLowerCase().includes(queryLower)
        
        return nameMatch || categoryMatch || descriptionMatch
      })
      .filter(result => result.confidence >= minConfidence)
      .slice(0, maxResults)

    return filteredResults
  }, [maxResults, minConfidence])

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const searchResults = await performAISearch(searchQuery)
        setResults(searchResults)
      } catch (err) {
        setError('Arama sırasında bir hata oluştu')
        console.error('AI Search Error:', err)
      } finally {
        setIsLoading(false)
      }
    }, debounceMs),
    [performAISearch, debounceMs]
  )

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    debouncedSearch(searchQuery)
  }, [debouncedSearch])

  const clearSearch = useCallback(() => {
    setQuery('')
    setResults([])
    setError(null)
  }, [])

  // Get search suggestions based on current results
  const suggestions = useMemo(() => {
    const allSuggestions = results.flatMap(result => result.suggestions || [])
    return [...new Set(allSuggestions)].slice(0, 5)
  }, [results])

  // Get trending searches (mock data)
  const trendingSearches = useMemo(() => [
    'elektrik arızası',
    'su tesisatı',
    'temizlik hizmetleri',
    'mobilya montajı',
    'boyacı'
  ], [])

  return {
    query,
    results,
    isLoading,
    error,
    suggestions,
    trendingSearches,
    search,
    clearSearch
  }
}

// AI-powered search suggestions hook
export function useAISuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    try {
      // Simulate AI suggestion generation
      await new Promise(resolve => setTimeout(resolve, 200))

      const mockSuggestions = [
        `${searchQuery} ustası`,
        `${searchQuery} hizmetleri`,
        `${searchQuery} tamiri`,
        `${searchQuery} montajı`,
        `${searchQuery} arızası`
      ].filter(suggestion => suggestion !== searchQuery)

      setSuggestions(mockSuggestions.slice(0, 5))
    } catch (error) {
      console.error('AI Suggestions Error:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const debouncedGenerateSuggestions = useMemo(
    () => debounce(generateSuggestions, 300),
    [generateSuggestions]
  )

  // Update suggestions when query changes    
  useEffect(() => {   
    debouncedGenerateSuggestions(query)       
  }, [query, debouncedGenerateSuggestions])

  return {
    suggestions,
    isLoading
  }
}

// AI-powered category detection
export function useAICategoryDetection(query: string) {
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)

  const detectCategory = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setDetectedCategory(null)
      setConfidence(0)
      return
    }

    // Mock AI category detection
    const categoryKeywords = {
      'Elektrik': ['elektrik', 'elektrikçi', 'elektrik arızası', 'elektrik tesisatı', 'kablo', 'priz', 'anahtar'],
      'Su Tesisatı': ['su', 'tesisat', 'tıkanıklık', 'boru', 'musluk', 'lavabo', 'klozet'],
      'Temizlik': ['temizlik', 'temizlikçi', 'ev temizliği', 'ofis temizliği', 'cam temizliği'],
      'Mobilya': ['mobilya', 'dolap', 'masa', 'sandalye', 'yatak', 'montaj'],
      'Boyacılık': ['boya', 'boyacı', 'boyama', 'duvar', 'tavan', 'dekoratif'],
      'İnşaat': ['inşaat', 'duvar', 'sıva', 'fayans', 'seramik', 'tuğla'],
      'Klima': ['klima', 'soğutma', 'ısıtma', 'hava', 'kondisyoner'],
      'Güvenlik': ['güvenlik', 'kamera', 'alarm', 'kilit', 'kapı', 'pencere']
    }

    const queryLower = searchQuery.toLowerCase()
    let bestMatch = { category: null as string | null, score: 0 }

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        if (queryLower.includes(keyword)) {
          return acc + 1
        }
        return acc
      }, 0)

      if (score > bestMatch.score) {
        bestMatch = { category, score }
      }
    })

    setDetectedCategory(bestMatch.category)
    setConfidence(bestMatch.score / Math.max(1, searchQuery.split(' ').length))
  }, [])

  const debouncedDetectCategory = useMemo(
    () => debounce(detectCategory, 500),
    [detectCategory]
  )

  React.useEffect(() => {
    debouncedDetectCategory(query)
  }, [query, debouncedDetectCategory])

  return {
    detectedCategory,
    confidence
  }
}
