'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export const useSEO = (seoData: SEOData) => {
  const pathname = usePathname()
  const baseUrl = 'https://ankaraustabul.com'
  const fullUrl = `${baseUrl}${pathname}`

  useEffect(() => {
    // Update document title
    document.title = seoData.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = seoData.description
      document.head.appendChild(meta)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords.join(', '))
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = seoData.keywords.join(', ')
      document.head.appendChild(meta)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', seoData.title)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = seoData.title
      document.head.appendChild(meta)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', seoData.description)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = seoData.description
      document.head.appendChild(meta)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:url')
      meta.content = fullUrl
      document.head.appendChild(meta)
    }

    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) {
      ogImage.setAttribute('content', seoData.image || `${baseUrl}/images/og-image-2025.jpg`)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:image')
      meta.content = seoData.image || `${baseUrl}/images/og-image-2025.jpg`
      document.head.appendChild(meta)
    }

    const ogType = document.querySelector('meta[property="og:type"]')
    if (ogType) {
      ogType.setAttribute('content', seoData.type || 'website')
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:type')
      meta.content = seoData.type || 'website'
      document.head.appendChild(meta)
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seoData.title)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:title'
      meta.content = seoData.title
      document.head.appendChild(meta)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seoData.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:description'
      meta.content = seoData.description
      document.head.appendChild(meta)
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]')
    if (twitterImage) {
      twitterImage.setAttribute('content', seoData.image || `${baseUrl}/images/og-image-2025.jpg`)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'twitter:image'
      meta.content = seoData.image || `${baseUrl}/images/og-image-2025.jpg`
      document.head.appendChild(meta)
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', fullUrl)
    } else {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = fullUrl
      document.head.appendChild(link)
    }

    // Article specific meta tags
    if (seoData.type === 'article') {
      if (seoData.publishedTime) {
        const publishedTime = document.querySelector('meta[property="article:published_time"]')
        if (publishedTime) {
          publishedTime.setAttribute('content', seoData.publishedTime)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('property', 'article:published_time')
          meta.content = seoData.publishedTime
          document.head.appendChild(meta)
        }
      }

      if (seoData.modifiedTime) {
        const modifiedTime = document.querySelector('meta[property="article:modified_time"]')
        if (modifiedTime) {
          modifiedTime.setAttribute('content', seoData.modifiedTime)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('property', 'article:modified_time')
          meta.content = seoData.modifiedTime
          document.head.appendChild(meta)
        }
      }

      if (seoData.author) {
        const author = document.querySelector('meta[property="article:author"]')
        if (author) {
          author.setAttribute('content', seoData.author)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('property', 'article:author')
          meta.content = seoData.author
          document.head.appendChild(meta)
        }
      }

      if (seoData.section) {
        const section = document.querySelector('meta[property="article:section"]')
        if (section) {
          section.setAttribute('content', seoData.section)
        } else {
          const meta = document.createElement('meta')
          meta.setAttribute('property', 'article:section')
          meta.content = seoData.section
          document.head.appendChild(meta)
        }
      }

      if (seoData.tags && seoData.tags.length > 0) {
        seoData.tags.forEach(tag => {
          const tagMeta = document.createElement('meta')
          tagMeta.setAttribute('property', 'article:tag')
          tagMeta.content = tag
          document.head.appendChild(tagMeta)
        })
      }
    }
  }, [seoData, pathname, fullUrl])

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    url: fullUrl
  }
}